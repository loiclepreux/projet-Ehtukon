import * as mysql from 'mysql2/promise';
import { PrismaClient, Theme, Niveau } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const THEMES: { key: Theme; table: string }[] = [
  { key: 'html', table: 'html' },
  { key: 'css', table: 'css' },
  { key: 'javascript', table: 'javascript' },
  { key: 'php', table: 'php' },
  { key: 'sql', table: 'sql' },
];

const NIVEAUX: { key: Niveau; table: string }[] = [
  { key: 'facile', table: 'facile' },
  { key: 'moyen', table: 'moyen' },
  { key: 'difficile', table: 'difficile' },
];

interface LegacyQuestion {
  id: number;
  question: string;
  rep_1: string;
  rep_2: string;
  rep_3: string;
  rep_4: string;
  rep_E: string;
  explication: string;
}

interface LegacyUser {
  id: number;
  nom: string;
  email: string;
  mot_de_passe: string;
}

function deriveRepCorrecte(row: LegacyQuestion): number {
  const answers = [row.rep_1, row.rep_2, row.rep_3, row.rep_4];
  const index = answers.indexOf(row.rep_E);
  if (index === -1) {
    console.warn(`  ⚠️  rep_E ne correspond à aucune réponse pour question id=${row.id}: "${row.rep_E}"`);
    return 1;
  }
  return index + 1;
}

async function main() {
  const prisma = new PrismaClient();

  const legacyConn = await mysql.createConnection({
    host: process.env.LEGACY_DB_HOST ?? 'mysql-loic.alwaysdata.net',
    user: process.env.LEGACY_DB_USER ?? 'loic',
    password: process.env.LEGACY_DB_PASSWORD ?? '',
    database: process.env.LEGACY_DB_NAME ?? 'loic_ehtukon',
    ssl: { rejectUnauthorized: false },
  });

  console.log('✅ Connecté à la base legacy');

  let totalQuestions = 0;
  let skipped = 0;

  for (const { key: themeKey, table: themeTable } of THEMES) {
    for (const { key: niveauKey, table: niveauTable } of NIVEAUX) {
      const tableName = `${themeTable}_${niveauTable}`;
      console.log(`\n📖 Migration de ${tableName}...`);

      try {
        const [rows] = await legacyConn.execute<mysql.RowDataPacket[]>(
          `SELECT * FROM \`${tableName}\``,
        );
        const questions = rows as unknown as LegacyQuestion[];

        for (const row of questions) {
          const repCorrecte = deriveRepCorrecte(row);

          await prisma.question.upsert({
            where: { id: row.id },
            create: {
              id: row.id,
              theme: themeKey,
              niveau: niveauKey,
              question: row.question,
              rep1: row.rep_1,
              rep2: row.rep_2,
              rep3: row.rep_3,
              rep4: row.rep_4,
              repCorrecte,
              explication: row.explication,
            },
            update: {
              theme: themeKey,
              niveau: niveauKey,
              question: row.question,
              rep1: row.rep_1,
              rep2: row.rep_2,
              rep3: row.rep_3,
              rep4: row.rep_4,
              repCorrecte,
              explication: row.explication,
            },
          });
          totalQuestions++;
        }

        console.log(`  ✓ ${questions.length} questions importées`);
      } catch (err) {
        console.warn(`  ⚠️  Table ${tableName} introuvable ou vide, passage...`);
        skipped++;
      }
    }
  }

  console.log('\n👥 Migration des utilisateurs...');
  try {
    const [users] = await legacyConn.execute<mysql.RowDataPacket[]>(
      'SELECT * FROM utilisateur',
    );
    const legacyUsers = users as unknown as LegacyUser[];

    for (const user of legacyUsers) {
      await prisma.user.upsert({
        where: { email: user.email },
        create: {
          nom: user.nom,
          email: user.email,
          password: user.mot_de_passe,
        },
        update: {
          nom: user.nom,
          password: user.mot_de_passe,
        },
      });
    }
    console.log(`  ✓ ${legacyUsers.length} utilisateurs importés`);
  } catch (err) {
    console.error('  ✗ Erreur migration utilisateurs:', err);
  }

  await legacyConn.end();
  await prisma.$disconnect();

  console.log(`\n🎉 Migration terminée !`);
  console.log(`   Questions importées : ${totalQuestions}`);
  console.log(`   Tables ignorées : ${skipped}`);
}

main().catch((err) => {
  console.error('❌ Erreur fatale:', err);
  process.exit(1);
});
