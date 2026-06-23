import { PrismaClient, Theme, Niveau } from '@prisma/client';

const prisma = new PrismaClient();

const questions: Array<{
  theme: Theme;
  niveau: Niveau;
  question: string;
  rep1: string;
  rep2: string;
  rep3: string;
  rep4: string;
  repCorrecte: number;
  explication: string;
}> = [
  // ─── HTML FACILE ───────────────────────────────────────────────
  {
    theme: 'html', niveau: 'facile',
    question: 'Quelle balise HTML est utilisée pour créer un lien hypertexte ?',
    rep1: '<link>', rep2: '<a>', rep3: '<href>', rep4: '<url>',
    repCorrecte: 2,
    explication: 'La balise <a> (anchor) crée des liens. L\'attribut href définit la destination.',
  },
  {
    theme: 'html', niveau: 'facile',
    question: 'Quelle balise représente le plus grand titre ?',
    rep1: '<h6>', rep2: '<title>', rep3: '<h1>', rep4: '<header>',
    repCorrecte: 3,
    explication: 'Les balises <h1> à <h6> définissent les titres. <h1> est le plus important.',
  },
  {
    theme: 'html', niveau: 'facile',
    question: 'Quelle balise est utilisée pour insérer une image ?',
    rep1: '<picture>', rep2: '<image>', rep3: '<src>', rep4: '<img>',
    repCorrecte: 4,
    explication: 'La balise <img> insère une image. L\'attribut src indique le chemin du fichier.',
  },
  {
    theme: 'html', niveau: 'facile',
    question: 'Quel attribut rend un champ de formulaire obligatoire ?',
    rep1: 'mandatory', rep2: 'required', rep3: 'validate', rep4: 'must',
    repCorrecte: 2,
    explication: 'L\'attribut required rend la saisie d\'un champ obligatoire avant soumission du formulaire.',
  },
  {
    theme: 'html', niveau: 'facile',
    question: 'Quelle balise définit la structure de base d\'un tableau ?',
    rep1: '<grid>', rep2: '<list>', rep3: '<tab>', rep4: '<table>',
    repCorrecte: 4,
    explication: 'La balise <table> crée un tableau. <tr> pour les lignes, <td> pour les cellules.',
  },
  {
    theme: 'html', niveau: 'facile',
    question: 'Quel élément HTML contient les métadonnées d\'une page ?',
    rep1: '<body>', rep2: '<meta>', rep3: '<head>', rep4: '<info>',
    repCorrecte: 3,
    explication: '<head> contient les métadonnées : titre, charset, liens CSS, balises meta...',
  },
  {
    theme: 'html', niveau: 'facile',
    question: 'Quelle balise crée une liste à puces ?',
    rep1: '<ol>', rep2: '<list>', rep3: '<dl>', rep4: '<ul>',
    repCorrecte: 4,
    explication: '<ul> (unordered list) crée une liste non ordonnée. <ol> crée une liste numérotée.',
  },
  {
    theme: 'html', niveau: 'facile',
    question: 'Comment rendre du texte en gras en HTML ?',
    rep1: '<bold>', rep2: '<strong>', rep3: '<b>', rep4: 'B et C sont corrects',
    repCorrecte: 4,
    explication: '<b> et <strong> mettent le texte en gras. <strong> indique aussi une importance sémantique.',
  },
  {
    theme: 'html', niveau: 'facile',
    question: 'Quel attribut de <input> définit le texte indicatif affiché dans le champ vide ?',
    rep1: 'hint', rep2: 'default', rep3: 'placeholder', rep4: 'label',
    repCorrecte: 3,
    explication: 'placeholder affiche un texte grisé qui disparaît dès que l\'utilisateur commence à taper.',
  },
  {
    theme: 'html', niveau: 'facile',
    question: 'Quelle valeur de type d\'input permet de sélectionner un fichier ?',
    rep1: 'upload', rep2: 'document', rep3: 'attach', rep4: 'file',
    repCorrecte: 4,
    explication: '<input type="file"> ouvre le sélecteur de fichiers du système d\'exploitation.',
  },

  // ─── HTML MOYEN ────────────────────────────────────────────────
  {
    theme: 'html', niveau: 'moyen',
    question: 'Quel attribut permet de spécifier que des colonnes d\'une cellule de tableau doivent être fusionnées ?',
    rep1: 'merge', rep2: 'colspan', rep3: 'colgroup', rep4: 'span',
    repCorrecte: 2,
    explication: 'colspan="N" fait s\'étendre une cellule sur N colonnes. rowspan fait de même sur les lignes.',
  },
  {
    theme: 'html', niveau: 'moyen',
    question: 'Qu\'est-ce que l\'attribut "defer" sur une balise <script> ?',
    rep1: 'Exécute le script immédiatement', rep2: 'Désactive le script', rep3: 'Charge le script en parallèle et l\'exécute après le parsing', rep4: 'Met le script en cache',
    repCorrecte: 3,
    explication: 'defer télécharge le script de façon asynchrone mais l\'exécute seulement après la fin du parsing HTML.',
  },
  {
    theme: 'html', niveau: 'moyen',
    question: 'Quel élément HTML5 représente un contenu autonome pouvant être syndiqué (article de blog, commentaire...) ?',
    rep1: '<section>', rep2: '<aside>', rep3: '<article>', rep4: '<main>',
    repCorrecte: 3,
    explication: '<article> représente un contenu indépendant et autonome. <section> regroupe des contenus thématiques.',
  },
  {
    theme: 'html', niveau: 'moyen',
    question: 'Quel est le rôle de l\'attribut "rel=noopener" sur un lien avec target="_blank" ?',
    rep1: 'Améliore le SEO', rep2: 'Empêche la page ouverte d\'accéder à window.opener', rep3: 'Désactive le cache', rep4: 'Crée un lien HTTP',
    repCorrecte: 2,
    explication: 'Sans noopener, une page ouverte dans un nouvel onglet peut manipuler la page parente via window.opener (faille de sécurité).',
  },
  {
    theme: 'html', niveau: 'moyen',
    question: 'Quelle balise HTML5 est utilisée pour embarquer du contenu audio ?',
    rep1: '<sound>', rep2: '<media>', rep3: '<mp3>', rep4: '<audio>',
    repCorrecte: 4,
    explication: '<audio> avec l\'attribut controls affiche un lecteur audio natif dans le navigateur.',
  },

  // ─── HTML DIFFICILE ────────────────────────────────────────────
  {
    theme: 'html', niveau: 'difficile',
    question: 'Quelle est la différence entre les attributs "async" et "defer" sur une balise <script> ?',
    rep1: 'Aucune différence', rep2: 'async exécute dès le téléchargement, defer exécute après le parsing complet', rep3: 'defer exécute dès le téléchargement, async exécute après', rep4: 'async bloque le parsing, defer non',
    repCorrecte: 2,
    explication: 'async : exécution immédiate après téléchargement (peut interrompre le parsing). defer : exécution ordonnée après le parsing complet.',
  },
  {
    theme: 'html', niveau: 'difficile',
    question: 'Que fait l\'élément <template> en HTML5 ?',
    rep1: 'Crée un modèle CSS', rep2: 'Génère du contenu côté serveur', rep3: 'Définit du contenu HTML inerte qui peut être cloné et inséré via JS', rep4: 'Remplace les composants React',
    repCorrecte: 3,
    explication: '<template> contient du HTML qui n\'est pas rendu mais peut être instancié avec JS via cloneNode(). Utilisé pour les Web Components.',
  },
  {
    theme: 'html', niveau: 'difficile',
    question: 'Quel attribut ARIA permet de lier un label descriptif à un élément interactif ?',
    rep1: 'aria-label', rep2: 'aria-describedby', rep3: 'aria-labelledby', rep4: 'aria-hint',
    repCorrecte: 3,
    explication: 'aria-labelledby référence l\'ID d\'un élément dont le texte sert de label. aria-label fournit directement le texte. aria-describedby donne une description complémentaire.',
  },
  {
    theme: 'html', niveau: 'difficile',
    question: 'Que définit l\'attribut "integrity" sur une balise <script> ou <link> ?',
    rep1: 'L\'auteur du script', rep2: 'La version du fichier', rep3: 'Le hash cryptographique pour vérifier l\'intégrité du fichier externe (SRI)', rep4: 'La licence du fichier',
    repCorrecte: 3,
    explication: 'Subresource Integrity (SRI) : le navigateur vérifie que le hash du fichier téléchargé correspond à integrity. Protège contre les CDN compromis.',
  },
  {
    theme: 'html', niveau: 'difficile',
    question: 'Dans le contexte des formulaires HTML, que fait l\'attribut "autocomplete=off" ?',
    rep1: 'Désactive la validation', rep2: 'Empêche le navigateur de proposer des suggestions d\'autocomplétion', rep3: 'Vide le champ automatiquement', rep4: 'Désactive le champ',
    repCorrecte: 2,
    explication: 'autocomplete="off" indique au navigateur de ne pas mémoriser ni proposer de valeurs précédemment saisies pour ce champ.',
  },

  // ─── CSS FACILE ────────────────────────────────────────────────
  {
    theme: 'css', niveau: 'facile',
    question: 'Quelle propriété CSS change la couleur de texte ?',
    rep1: 'text-color', rep2: 'font-color', rep3: 'color', rep4: 'foreground',
    repCorrecte: 3,
    explication: 'La propriété color définit la couleur du texte. background-color définit la couleur de fond.',
  },
  {
    theme: 'css', niveau: 'facile',
    question: 'Comment centrer horizontalement un élément bloc avec CSS ?',
    rep1: 'text-align: center', rep2: 'margin: 0 auto', rep3: 'align: center', rep4: 'position: center',
    repCorrecte: 2,
    explication: 'margin: 0 auto centre un bloc de largeur fixe. L\'élément doit avoir une width définie.',
  },
  {
    theme: 'css', niveau: 'facile',
    question: 'Quelle valeur de display crée un conteneur flex ?',
    rep1: 'inline', rep2: 'grid', rep3: 'block', rep4: 'flex',
    repCorrecte: 4,
    explication: 'display: flex active Flexbox sur le conteneur. Ses enfants deviennent des flex items.',
  },
  {
    theme: 'css', niveau: 'facile',
    question: 'Quelle propriété CSS contrôle l\'espace à l\'intérieur d\'un élément (entre le contenu et la bordure) ?',
    rep1: 'margin', rep2: 'spacing', rep3: 'padding', rep4: 'border-spacing',
    repCorrecte: 3,
    explication: 'padding est l\'espace intérieur. margin est l\'espace extérieur entre l\'élément et ses voisins.',
  },
  {
    theme: 'css', niveau: 'facile',
    question: 'Que fait la propriété "display: none" ?',
    rep1: 'Rend l\'élément transparent', rep2: 'Retire l\'élément du flux et le masque', rep3: 'Cache l\'élément mais conserve son espace', rep4: 'Désactive les événements',
    repCorrecte: 2,
    explication: 'display: none retire l\'élément du flux du document. visibility: hidden le cache mais conserve l\'espace qu\'il occupait.',
  },
  {
    theme: 'css', niveau: 'facile',
    question: 'Quelle unité CSS est relative à la taille de police de l\'élément parent ?',
    rep1: 'px', rep2: 'vh', rep3: 'em', rep4: '%',
    repCorrecte: 3,
    explication: '1em = taille de police de l\'élément parent. 1rem = taille de police de l\'élément racine (html).',
  },
  {
    theme: 'css', niveau: 'facile',
    question: 'Comment appliquer un style uniquement au premier enfant d\'un élément ?',
    rep1: ':nth-child(1)', rep2: ':first-child', rep3: ':first', rep4: 'A et B sont corrects',
    repCorrecte: 4,
    explication: ':first-child et :nth-child(1) ciblent tous les deux le premier enfant d\'un parent.',
  },
  {
    theme: 'css', niveau: 'facile',
    question: 'Quelle propriété CSS définit la taille de la police ?',
    rep1: 'text-size', rep2: 'font-size', rep3: 'size', rep4: 'font',
    repCorrecte: 2,
    explication: 'font-size définit la taille de la police. Peut s\'exprimer en px, em, rem, %, vw...',
  },
  {
    theme: 'css', niveau: 'facile',
    question: 'Quelle propriété arrondit les coins d\'un élément ?',
    rep1: 'corner-radius', rep2: 'round', rep3: 'border-radius', rep4: 'border-curve',
    repCorrecte: 3,
    explication: 'border-radius arrondit les coins. border-radius: 50% crée un cercle parfait sur un élément carré.',
  },
  {
    theme: 'css', niveau: 'facile',
    question: 'Quelle propriété CSS contrôle la transparence d\'un élément ?',
    rep1: 'transparency', rep2: 'alpha', rep3: 'opacity', rep4: 'visibility',
    repCorrecte: 3,
    explication: 'opacity: 0 rend invisible, opacity: 1 rend opaque. Contrairement à visibility, opacity affecte aussi les enfants.',
  },

  // ─── CSS MOYEN ─────────────────────────────────────────────────
  {
    theme: 'css', niveau: 'moyen',
    question: 'Quelle propriété Flexbox aligne les éléments sur l\'axe principal ?',
    rep1: 'align-items', rep2: 'justify-content', rep3: 'align-content', rep4: 'flex-align',
    repCorrecte: 2,
    explication: 'justify-content aligne sur l\'axe principal (horizontal par défaut). align-items aligne sur l\'axe croisé (vertical).',
  },
  {
    theme: 'css', niveau: 'moyen',
    question: 'Que fait "position: sticky" ?',
    rep1: 'L\'élément reste en position fixe toujours', rep2: 'L\'élément suit le scroll jusqu\'à atteindre un seuil puis reste fixé', rep3: 'L\'élément est retiré du flux', rep4: 'L\'élément ne peut pas être déplacé',
    repCorrecte: 2,
    explication: 'sticky combine relative et fixed : l\'élément suit le scroll normalement, puis se fixe quand il atteint la valeur top/left définie.',
  },
  {
    theme: 'css', niveau: 'moyen',
    question: 'Quelle est la différence entre "width: 100%" et "width: 100vw" ?',
    rep1: 'Aucune différence', rep2: '100% est relatif au parent, 100vw est relatif à la largeur de la fenêtre', rep3: '100vw inclut les marges du parent', rep4: '100% inclut la scrollbar',
    repCorrecte: 2,
    explication: '100% = 100% de la largeur du conteneur parent. 100vw = 100% de la largeur de la viewport (peut causer un scroll horizontal si parent a du padding).',
  },
  {
    theme: 'css', niveau: 'moyen',
    question: 'Comment créer une grille CSS de 3 colonnes égales ?',
    rep1: 'grid-template-columns: 1fr 1fr 1fr', rep2: 'columns: 3', rep3: 'grid-columns: repeat(3)', rep4: 'display: grid-3',
    repCorrecte: 1,
    explication: 'grid-template-columns: 1fr 1fr 1fr ou repeat(3, 1fr) crée 3 colonnes qui se partagent l\'espace disponible équitablement.',
  },
  {
    theme: 'css', niveau: 'moyen',
    question: 'Que permet la pseudo-classe :not() ?',
    rep1: 'Inverser un style', rep2: 'Cibler des éléments qui ne correspondent pas au sélecteur donné', rep3: 'Désactiver un sélecteur', rep4: 'Sélectionner les éléments vides',
    repCorrecte: 2,
    explication: ':not(.classe) cible tous les éléments qui n\'ont pas cette classe. Exemple : li:not(:last-child) cible tous les li sauf le dernier.',
  },

  // ─── CSS DIFFICILE ─────────────────────────────────────────────
  {
    theme: 'css', niveau: 'difficile',
    question: 'Qu\'est-ce que le "stacking context" en CSS ?',
    rep1: 'L\'ordre d\'affichage des flexbox', rep2: 'Un contexte de rendu 3D', rep3: 'Un contexte isolé qui détermine l\'ordre d\'empilement (z-index) de ses enfants', rep4: 'L\'empilement des règles CSS',
    repCorrecte: 3,
    explication: 'Un stacking context est créé par opacity<1, transform, filter, position+z-index... Les z-index des éléments internes ne sont comparés qu\'entre eux.',
  },
  {
    theme: 'css', niveau: 'difficile',
    question: 'Quelle est la différence entre "transform: translateX()" et "left" pour animer un élément ?',
    rep1: 'Aucune différence visible', rep2: 'translateX est plus précis', rep3: 'left est plus performant', rep4: 'translateX utilise le GPU et ne provoque pas de reflow contrairement à left',
    repCorrecte: 4,
    explication: 'transform et opacity s\'exécutent sur le GPU (couche de composition) sans déclencher layout/reflow. left/top redéclenchent le layout complet — moins performant.',
  },
  {
    theme: 'css', niveau: 'difficile',
    question: 'Que fait "contain: layout" en CSS ?',
    rep1: 'Contient les enfants débordants', rep2: 'Isole le layout de l\'élément : les changements internes ne déclenchent pas de reflow externe', rep3: 'Applique un overflow: hidden', rep4: 'Crée un nouveau stacking context',
    repCorrecte: 2,
    explication: 'La propriété contain améliore les performances en indiquant au navigateur que les changements de layout d\'un sous-arbre sont isolés.',
  },
  {
    theme: 'css', niveau: 'difficile',
    question: 'Que calcule "clamp(min, val, max)" ?',
    rep1: 'La valeur moyenne entre min et max', rep2: 'Fixe une valeur entre un minimum et un maximum selon une valeur préférée', rep3: 'Arrondit la valeur', rep4: 'Calcule le max de deux valeurs',
    repCorrecte: 2,
    explication: 'clamp(1rem, 2.5vw, 3rem) = min(max(1rem, 2.5vw), 3rem). Idéal pour la typography fluide responsive sans media queries.',
  },
  {
    theme: 'css', niveau: 'difficile',
    question: 'Quelle est l\'utilité de "@layer" en CSS moderne ?',
    rep1: 'Créer des couches d\'animation', rep2: 'Gérer les z-index', rep3: 'Définir des couches de cascade pour contrôler explicitement la priorité des styles', rep4: 'Importer des fichiers CSS',
    repCorrecte: 3,
    explication: '@layer permet de définir l\'ordre de priorité des couches CSS explicitement, résolvant les problèmes de spécificité entre bibliothèques et styles applicatifs.',
  },

  // ─── JAVASCRIPT FACILE ─────────────────────────────────────────
  {
    theme: 'javascript', niveau: 'facile',
    question: 'Quelle méthode ajoute un élément à la fin d\'un tableau ?',
    rep1: 'append()', rep2: 'add()', rep3: 'insert()', rep4: 'push()',
    repCorrecte: 4,
    explication: 'push() ajoute un ou plusieurs éléments à la fin d\'un tableau et retourne la nouvelle longueur.',
  },
  {
    theme: 'javascript', niveau: 'facile',
    question: 'Comment déclarer une constante en JavaScript moderne ?',
    rep1: 'constant x = 5', rep2: 'var x = 5', rep3: 'const x = 5', rep4: 'let x = 5',
    repCorrecte: 3,
    explication: 'const déclare une variable dont la référence ne peut pas être réassignée. Pour une variable modifiable, on préfère let à var.',
  },
  {
    theme: 'javascript', niveau: 'facile',
    question: 'Quelle méthode convertit une chaîne JSON en objet JavaScript ?',
    rep1: 'JSON.parse()', rep2: 'JSON.decode()', rep3: 'JSON.convert()', rep4: 'JSON.stringify()',
    repCorrecte: 1,
    explication: 'JSON.parse() convertit une chaîne JSON en objet JS. JSON.stringify() fait l\'inverse (objet → chaîne).',
  },
  {
    theme: 'javascript', niveau: 'facile',
    question: 'Que retourne "typeof null" en JavaScript ?',
    rep1: '"null"', rep2: '"undefined"', rep3: '"object"', rep4: '"nothing"',
    repCorrecte: 3,
    explication: 'typeof null === "object" est un bug historique de JavaScript (présent depuis 1995). null n\'est pas vraiment un objet.',
  },
  {
    theme: 'javascript', niveau: 'facile',
    question: 'Comment sélectionner un élément HTML par son ID en JavaScript ?',
    rep1: 'document.selectById("id")', rep2: 'document.findElement("id")', rep3: 'document.getElement("id")', rep4: 'document.getElementById("id")',
    repCorrecte: 4,
    explication: 'getElementById retourne l\'élément avec l\'ID donné. querySelector("#id") fait la même chose avec la syntaxe CSS.',
  },
  {
    theme: 'javascript', niveau: 'facile',
    question: 'Que fait la méthode "Array.map()" ?',
    rep1: 'Filtre les éléments', rep2: 'Transforme chaque élément et retourne un nouveau tableau', rep3: 'Trie le tableau', rep4: 'Recherche un élément',
    repCorrecte: 2,
    explication: 'map() applique une fonction à chaque élément et retourne un nouveau tableau de même longueur. Le tableau original n\'est pas modifié.',
  },
  {
    theme: 'javascript', niveau: 'facile',
    question: 'Quelle est la différence entre "==" et "===" en JavaScript ?',
    rep1: '=== est plus rapide', rep2: '== compare avec conversion de type, === compare sans conversion (strict)', rep3: 'Aucune différence', rep4: '=== ne fonctionne qu\'avec les nombres',
    repCorrecte: 2,
    explication: '"5" == 5 → true (conversion). "5" === 5 → false (types différents). Toujours préférer ===.',
  },
  {
    theme: 'javascript', niveau: 'facile',
    question: 'Comment écrire une fonction fléchée qui retourne x + 1 ?',
    rep1: 'function(x) => x + 1', rep2: 'x -> x + 1', rep3: '(x) => x + 1', rep4: 'fn x: x + 1',
    repCorrecte: 3,
    explication: 'Les arrow functions : (params) => expression. Quand le corps est une seule expression, le return est implicite.',
  },
  {
    theme: 'javascript', niveau: 'facile',
    question: 'Comment accéder à la longueur d\'un tableau "arr" ?',
    rep1: 'arr.count', rep2: 'arr.size()', rep3: 'arr.length', rep4: 'len(arr)',
    repCorrecte: 3,
    explication: 'La propriété length (pas une méthode) retourne le nombre d\'éléments d\'un tableau.',
  },
  {
    theme: 'javascript', niveau: 'facile',
    question: 'Que fait setTimeout(fn, 1000) ?',
    rep1: 'Exécute fn 1000 fois', rep2: 'Met le programme en pause 1000ms', rep3: 'Exécute fn après 1000 millisecondes minimum', rep4: 'Annule fn après 1000ms',
    repCorrecte: 3,
    explication: 'setTimeout planifie l\'exécution de fn au bout de minimum 1000ms. Le délai peut être plus long si le thread JS est occupé.',
  },

  // ─── JAVASCRIPT MOYEN ──────────────────────────────────────────
  {
    theme: 'javascript', niveau: 'moyen',
    question: 'Qu\'est-ce qu\'une Promise en JavaScript ?',
    rep1: 'Un type de boucle', rep2: 'Un objet représentant le résultat éventuel (succès ou échec) d\'une opération asynchrone', rep3: 'Une fonction synchrone', rep4: 'Un pattern de conception',
    repCorrecte: 2,
    explication: 'Une Promise peut être pending, fulfilled ou rejected. On chaîne .then() pour le succès et .catch() pour l\'erreur.',
  },
  {
    theme: 'javascript', niveau: 'moyen',
    question: 'Que fait l\'opérateur spread "..." sur un tableau ?',
    rep1: 'Le trie', rep2: 'L\'étale : décompose les éléments individuellement', rep3: 'Le copie en profondeur', rep4: 'Le fusionne avec undefined',
    repCorrecte: 2,
    explication: '[...arr1, ...arr2] fusionne deux tableaux. {...obj1, ...obj2} fusionne des objets. Utile pour copier sans mutation.',
  },
  {
    theme: 'javascript', niveau: 'moyen',
    question: 'Quelle est la différence entre "null" et "undefined" ?',
    rep1: 'Ils sont identiques', rep2: 'undefined = variable non initialisée, null = absence de valeur intentionnelle', rep3: 'null est un nombre, undefined est un objet', rep4: 'undefined ne peut pas être assigné',
    repCorrecte: 2,
    explication: 'undefined : JS l\'assigne automatiquement. null : le développeur l\'assigne volontairement pour indiquer "pas de valeur".',
  },
  {
    theme: 'javascript', niveau: 'moyen',
    question: 'Que fait "Array.reduce()" ?',
    rep1: 'Réduit la taille du tableau', rep2: 'Supprime les doublons', rep3: 'Accumule les éléments en une seule valeur via une fonction accumulatrice', rep4: 'Filtre les valeurs falsy',
    repCorrecte: 3,
    explication: 'reduce((acc, curr) => acc + curr, 0) calcule la somme. La valeur initiale (0 ici) est l\'accumulateur de départ.',
  },
  {
    theme: 'javascript', niveau: 'moyen',
    question: 'Qu\'est-ce que le "hoisting" en JavaScript ?',
    rep1: 'Une technique de performance', rep2: 'Le déplacement des déclarations (var, function) en haut de leur portée avant exécution', rep3: 'L\'héritage prototypal', rep4: 'L\'optimisation par le moteur JS',
    repCorrecte: 2,
    explication: 'var et function declarations sont "hissées". let et const sont hissées mais restent dans la TDZ (Temporal Dead Zone) jusqu\'à leur déclaration.',
  },

  // ─── JAVASCRIPT DIFFICILE ──────────────────────────────────────
  {
    theme: 'javascript', niveau: 'difficile',
    question: 'Qu\'est-ce que la "Temporal Dead Zone" (TDZ) pour let et const ?',
    rep1: 'Un délai de chargement', rep2: 'La période entre le début du scope et la déclaration effective, où accéder à la variable lève une ReferenceError', rep3: 'Un contexte asynchrone', rep4: 'La durée de vie d\'une closure',
    repCorrecte: 2,
    explication: 'let/const sont hoistées mais non initialisées. Accéder avant la ligne de déclaration lève ReferenceError : c\'est la TDZ.',
  },
  {
    theme: 'javascript', niveau: 'difficile',
    question: 'Que retourne "Promise.allSettled([...promises])" ?',
    rep1: 'La première Promise résolue', rep2: 'Rejette si une Promise échoue', rep3: 'Un tableau des résultats de TOUTES les Promises (fulfilled et rejected)', rep4: 'La Promise la plus rapide',
    repCorrecte: 3,
    explication: 'allSettled attend toutes les Promises et retourne [{status:"fulfilled",value:...},{status:"rejected",reason:...}] sans jamais rejeter.',
  },
  {
    theme: 'javascript', niveau: 'difficile',
    question: 'Comment fonctionne le "prototype chain" en JavaScript ?',
    rep1: 'C\'est l\'héritage via classe uniquement', rep2: 'Chaque objet a un __proto__ qui pointe vers son prototype, formant une chaîne jusqu\'à null', rep3: 'Les prototypes sont immuables', rep4: 'C\'est une copie des propriétés parentes',
    repCorrecte: 2,
    explication: 'Quand une propriété est absente d\'un objet, JS remonte la chaîne de prototypes. Object.prototype est au sommet, son __proto__ est null.',
  },
  {
    theme: 'javascript', niveau: 'difficile',
    question: 'Qu\'est-ce qu\'un WeakMap en JavaScript ?',
    rep1: 'Une Map avec des valeurs null', rep2: 'Une Map dont les clés doivent être des primitives', rep3: 'Une Map dont les clés sont des objets référencés faiblement (garbage collectable)', rep4: 'Une Map avec des performances réduites',
    repCorrecte: 3,
    explication: 'WeakMap : clés = objets uniquement, référence faible. Si l\'objet-clé n\'est plus référencé ailleurs, il peut être garbage collecté. Utile pour les métadonnées privées.',
  },
  {
    theme: 'javascript', niveau: 'difficile',
    question: 'Que fait "Object.freeze()" ?',
    rep1: 'Met l\'objet en cache', rep2: 'Empêche toute modification, ajout ou suppression de propriétés (shallow)', rep3: 'Crée une copie profonde immuable', rep4: 'Sérialise l\'objet',
    repCorrecte: 2,
    explication: 'freeze() rend un objet immuable en surface (shallow). Les objets imbriqués ne sont pas gelés. Pour une immutabilité profonde, il faut freeze() récursivement.',
  },

  // ─── PHP FACILE ────────────────────────────────────────────────
  {
    theme: 'php', niveau: 'facile',
    question: 'Comment déclarer une variable en PHP ?',
    rep1: 'var nom = "valeur"', rep2: 'let nom = "valeur"', rep3: '$nom = "valeur"', rep4: 'string nom = "valeur"',
    repCorrecte: 3,
    explication: 'En PHP, toutes les variables commencent par $. PHP est typé dynamiquement.',
  },
  {
    theme: 'php', niveau: 'facile',
    question: 'Quelle fonction PHP affiche du texte ?',
    rep1: 'print_text()', rep2: 'display()', rep3: 'echo ou print', rep4: 'console.log()',
    repCorrecte: 3,
    explication: 'echo et print affichent du texte. echo est légèrement plus rapide, print retourne 1 (utilisable dans des expressions).',
  },
  {
    theme: 'php', niveau: 'facile',
    question: 'Comment concaténer deux chaînes en PHP ?',
    rep1: '+', rep2: '&', rep3: '.', rep4: '||',
    repCorrecte: 3,
    explication: 'L\'opérateur . concatène des chaînes en PHP. "Bonjour" . " " . "monde" = "Bonjour monde".',
  },
  {
    theme: 'php', niveau: 'facile',
    question: 'Quelle superglobale PHP contient les données d\'un formulaire POST ?',
    rep1: '$POST', rep2: '$_REQUEST', rep3: '$form', rep4: '$_POST',
    repCorrecte: 4,
    explication: '$_POST contient les données envoyées via HTTP POST. $_GET pour les paramètres d\'URL. $_REQUEST contient les deux.',
  },
  {
    theme: 'php', niveau: 'facile',
    question: 'Comment créer un tableau en PHP (syntaxe moderne) ?',
    rep1: 'array{1, 2, 3}', rep2: 'new Array(1, 2, 3)', rep3: '[1, 2, 3]', rep4: '{1, 2, 3}',
    repCorrecte: 3,
    explication: 'Depuis PHP 5.4, [1, 2, 3] est la syntaxe courte. array(1, 2, 3) fonctionne aussi (ancienne syntaxe).',
  },
  {
    theme: 'php', niveau: 'facile',
    question: 'Quelle fonction retourne la longueur d\'une chaîne PHP ?',
    rep1: 'length()', rep2: 'str_length()', rep3: 'count()', rep4: 'strlen()',
    repCorrecte: 4,
    explication: 'strlen($str) retourne le nombre d\'octets. Pour le nombre de caractères UTF-8, utiliser mb_strlen().',
  },
  {
    theme: 'php', niveau: 'facile',
    question: 'Comment écrire un commentaire sur une ligne en PHP ?',
    rep1: '<!-- commentaire -->', rep2: '/* commentaire */', rep3: '# commentaire ou // commentaire', rep4: '-- commentaire',
    repCorrecte: 3,
    explication: 'PHP supporte // et # pour les commentaires sur une ligne, et /* */ pour les blocs multi-lignes.',
  },
  {
    theme: 'php', niveau: 'facile',
    question: 'Quelle fonction PHP vérifie si une variable est définie et non null ?',
    rep1: 'exists()', rep2: 'defined()', rep3: 'isset()', rep4: 'isnull()',
    repCorrecte: 3,
    explication: 'isset($var) retourne true si $var existe et n\'est pas null. empty() vérifie si la valeur est "vide" (0, "", [], false, null...).',
  },
  {
    theme: 'php', niveau: 'facile',
    question: 'Comment inclure un fichier PHP dans un autre ?',
    rep1: 'import("fichier.php")', rep2: 'require("fichier.php") ou include("fichier.php")', rep3: 'load("fichier.php")', rep4: 'use "fichier.php"',
    repCorrecte: 2,
    explication: 'include et require insèrent le fichier. require génère une erreur fatale si le fichier est manquant, include une simple notice.',
  },
  {
    theme: 'php', niveau: 'facile',
    question: 'Quelle fonction PHP trie un tableau dans l\'ordre croissant ?',
    rep1: 'order()', rep2: 'array_sort()', rep3: 'sort()', rep4: 'asort()',
    repCorrecte: 3,
    explication: 'sort() trie et réindexe le tableau. asort() trie en conservant les clés. ksort() trie par clé.',
  },

  // ─── PHP MOYEN ─────────────────────────────────────────────────
  {
    theme: 'php', niveau: 'moyen',
    question: 'Quelle est la différence entre "require" et "require_once" ?',
    rep1: 'Aucune différence', rep2: 'require_once vérifie si le fichier a déjà été inclus et ne l\'inclut pas une deuxième fois', rep3: 'require_once est plus rapide', rep4: 'require_once fonctionne en HTTPS uniquement',
    repCorrecte: 2,
    explication: 'require_once évite les inclusions multiples du même fichier, ce qui causerait des erreurs de redéclaration de fonctions/classes.',
  },
  {
    theme: 'php', niveau: 'moyen',
    question: 'Que fait PDO::prepare() en PHP ?',
    rep1: 'Ouvre une connexion DB', rep2: 'Prépare une requête SQL avec des paramètres liés pour éviter les injections SQL', rep3: 'Exécute une requête directement', rep4: 'Formate une requête SQL',
    repCorrecte: 2,
    explication: 'Les requêtes préparées séparent le code SQL des données. $stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id"); $stmt->bindParam(":id", $id);',
  },
  {
    theme: 'php', niveau: 'moyen',
    question: 'Qu\'est-ce que le type hinting en PHP ?',
    rep1: 'Des commentaires dans le code', rep2: 'Un système d\'autocomplétion IDE', rep3: 'La déclaration explicite du type des paramètres et valeurs de retour des fonctions', rep4: 'Une extension PHP',
    repCorrecte: 3,
    explication: 'function add(int $a, int $b): int {} déclare que les paramètres et le retour sont des entiers. PHP 8 supporte union types : int|string.',
  },
  {
    theme: 'php', niveau: 'moyen',
    question: 'Comment gérer les exceptions en PHP ?',
    rep1: 'try/catch/finally', rep2: 'error_handler()', rep3: 'on_error()', rep4: 'exception { }',
    repCorrecte: 1,
    explication: 'try { code risqué } catch (Exception $e) { gestion } finally { toujours exécuté }. On peut lancer avec throw new Exception("message").',
  },
  {
    theme: 'php', niveau: 'moyen',
    question: 'Qu\'est-ce qu\'un trait en PHP ?',
    rep1: 'Une interface', rep2: 'Un mécanisme de réutilisation de code horizontal entre classes sans héritage', rep3: 'Un type de variable', rep4: 'Un namespace',
    repCorrecte: 2,
    explication: 'Les traits résolvent le problème d\'héritage multiple. trait Loggable { ... } puis use Loggable dans une classe l\'incorpore.',
  },

  // ─── PHP DIFFICILE ─────────────────────────────────────────────
  {
    theme: 'php', niveau: 'difficile',
    question: 'Qu\'est-ce que le "late static binding" en PHP ?',
    rep1: 'Le chargement tardif des classes', rep2: 'L\'utilisation de static:: au lieu de self:: pour référencer la classe appelée réellement au runtime', rep3: 'L\'initialisation différée des propriétés', rep4: 'Le binding automatique des événements',
    repCorrecte: 2,
    explication: 'self:: référence toujours la classe où la méthode est définie. static:: référence la classe réelle appelée (enfant). Essentiel pour les patterns factory dans l\'héritage.',
  },
  {
    theme: 'php', niveau: 'difficile',
    question: 'Comment fonctionne la sérialisation personnalisée avec __sleep() et __wakeup() ?',
    rep1: '__sleep() et __wakeup() gèrent les erreurs', rep2: '__sleep() retourne les propriétés à sérialiser, __wakeup() réinitialise après désérialisation', rep3: 'Ils gèrent la mise en cache', rep4: 'Ils contrôlent la connexion DB',
    repCorrecte: 2,
    explication: '__sleep() est appelé avant serialize() et doit retourner un tableau des noms de propriétés à inclure. __wakeup() est appelé après unserialize() pour restaurer les ressources.',
  },
  {
    theme: 'php', niveau: 'difficile',
    question: 'Qu\'est-ce que le Fiber en PHP 8.1 ?',
    rep1: 'Un type de tableau performant', rep2: 'Une extension pour les connexions DB', rep3: 'Une primitive de concurrence légère permettant la suspension/reprise d\'exécution', rep4: 'Un remplaçant des threads',
    repCorrecte: 3,
    explication: 'Les Fibers sont des coroutines en PHP 8.1. Elles peuvent être suspendues (Fiber::suspend()) et reprises (->resume()). Base des implémentations async comme ReactPHP.',
  },
  {
    theme: 'php', niveau: 'difficile',
    question: 'Quelle est la différence entre un Iterator et un Generator en PHP ?',
    rep1: 'Aucune différence fonctionnelle', rep2: 'Un Generator est une fonction qui yield des valeurs à la demande sans stocker tout en mémoire, un Iterator est une interface à implémenter', rep3: 'Un Iterator est plus rapide', rep4: 'Un Generator requiert plus de mémoire',
    repCorrecte: 2,
    explication: 'Generator (yield) : syntaxe simple, évaluation paresseuse, idéal pour grands ensembles de données. Iterator : interface avec rewind/current/key/next/valid — plus verbeux mais plus flexible.',
  },
  {
    theme: 'php', niveau: 'difficile',
    question: 'Que signifie "Readonly Properties" introduit en PHP 8.1 ?',
    rep1: 'Les propriétés ne peuvent pas être lues de l\'extérieur', rep2: 'Les propriétés ne peuvent être initialisées qu\'une seule fois et ne peuvent plus être modifiées', rep3: 'Les propriétés sont en lecture seule depuis le constructeur uniquement', rep4: 'Les propriétés publiques en lecture seule',
    repCorrecte: 2,
    explication: 'public readonly string $name; peut être initialisée une seule fois (dans le constructeur). Toute réassignation lève Error. Parfait pour les Value Objects.',
  },

  // ─── SQL FACILE ────────────────────────────────────────────────
  {
    theme: 'sql', niveau: 'facile',
    question: 'Quelle commande SQL récupère des données d\'une table ?',
    rep1: 'GET', rep2: 'FETCH', rep3: 'SELECT', rep4: 'READ',
    repCorrecte: 3,
    explication: 'SELECT * FROM table récupère toutes les colonnes. SELECT col1, col2 récupère des colonnes spécifiques.',
  },
  {
    theme: 'sql', niveau: 'facile',
    question: 'Quelle clause SQL filtre les résultats ?',
    rep1: 'FILTER', rep2: 'HAVING', rep3: 'WHERE', rep4: 'LIMIT',
    repCorrecte: 3,
    explication: 'WHERE filtre les lignes avant le GROUP BY. HAVING filtre après l\'agrégation.',
  },
  {
    theme: 'sql', niveau: 'facile',
    question: 'Quelle commande ajoute des données dans une table ?',
    rep1: 'ADD', rep2: 'INSERT INTO', rep3: 'PUSH', rep4: 'APPEND',
    repCorrecte: 2,
    explication: 'INSERT INTO table (col1, col2) VALUES (val1, val2) insère une nouvelle ligne.',
  },
  {
    theme: 'sql', niveau: 'facile',
    question: 'Quelle clause SQL trie les résultats ?',
    rep1: 'SORT BY', rep2: 'GROUP BY', rep3: 'ORDER BY', rep4: 'ARRANGE BY',
    repCorrecte: 3,
    explication: 'ORDER BY col ASC (croissant, par défaut) ou DESC (décroissant) trie les résultats.',
  },
  {
    theme: 'sql', niveau: 'facile',
    question: 'Quelle commande supprime des lignes d\'une table ?',
    rep1: 'REMOVE', rep2: 'DROP', rep3: 'DELETE FROM', rep4: 'ERASE',
    repCorrecte: 3,
    explication: 'DELETE FROM table WHERE condition supprime les lignes correspondantes. Sans WHERE, supprime toutes les lignes !',
  },
  {
    theme: 'sql', niveau: 'facile',
    question: 'Que fait "SELECT COUNT(*) FROM table" ?',
    rep1: 'Retourne la taille de la table en octets', rep2: 'Compte les colonnes', rep3: 'Retourne le nombre total de lignes', rep4: 'Liste les contraintes',
    repCorrecte: 3,
    explication: 'COUNT(*) compte toutes les lignes, y compris celles avec NULL. COUNT(colonne) exclut les NULL.',
  },
  {
    theme: 'sql', niveau: 'facile',
    question: 'Quelle clause limite le nombre de résultats retournés ?',
    rep1: 'TOP', rep2: 'MAX', rep3: 'FIRST', rep4: 'LIMIT',
    repCorrecte: 4,
    explication: 'LIMIT 10 retourne les 10 premières lignes (MySQL/SQLite/PostgreSQL). SQL Server utilise TOP 10.',
  },
  {
    theme: 'sql', niveau: 'facile',
    question: 'Quelle commande modifie des données existantes ?',
    rep1: 'MODIFY', rep2: 'CHANGE', rep3: 'UPDATE', rep4: 'EDIT',
    repCorrecte: 3,
    explication: 'UPDATE table SET col=valeur WHERE condition modifie les lignes correspondantes. Sans WHERE, modifie toutes les lignes !',
  },
  {
    theme: 'sql', niveau: 'facile',
    question: 'Que fait "DISTINCT" dans une requête SELECT ?',
    rep1: 'Trie les résultats', rep2: 'Élimine les doublons des résultats', rep3: 'Sélectionne des colonnes aléatoires', rep4: 'Filtre les NULL',
    repCorrecte: 2,
    explication: 'SELECT DISTINCT ville FROM clients retourne chaque ville une seule fois, même si plusieurs clients y habitent.',
  },
  {
    theme: 'sql', niveau: 'facile',
    question: 'Quelle commande crée une nouvelle table ?',
    rep1: 'MAKE TABLE', rep2: 'NEW TABLE', rep3: 'ADD TABLE', rep4: 'CREATE TABLE',
    repCorrecte: 4,
    explication: 'CREATE TABLE nom (id INT PRIMARY KEY, nom VARCHAR(100)) crée une table avec ses colonnes et contraintes.',
  },

  // ─── SQL MOYEN ─────────────────────────────────────────────────
  {
    theme: 'sql', niveau: 'moyen',
    question: 'Quelle est la différence entre INNER JOIN et LEFT JOIN ?',
    rep1: 'Aucune différence', rep2: 'INNER JOIN retourne seulement les lignes avec correspondance dans les deux tables, LEFT JOIN retourne toutes les lignes de la table gauche', rep3: 'LEFT JOIN est plus rapide', rep4: 'INNER JOIN retourne plus de résultats',
    repCorrecte: 2,
    explication: 'INNER JOIN : intersection. LEFT JOIN : toutes les lignes gauche + correspondances droite (NULL si pas de correspondance).',
  },
  {
    theme: 'sql', niveau: 'moyen',
    question: 'Que fait GROUP BY en SQL ?',
    rep1: 'Trie les résultats', rep2: 'Fusionne des tables', rep3: 'Regroupe les lignes avec les mêmes valeurs pour appliquer des fonctions d\'agrégation', rep4: 'Filtre les groupes',
    repCorrecte: 3,
    explication: 'SELECT pays, COUNT(*) FROM clients GROUP BY pays compte les clients par pays. HAVING filtre sur les agrégats.',
  },
  {
    theme: 'sql', niveau: 'moyen',
    question: 'Qu\'est-ce qu\'une clé étrangère (FOREIGN KEY) ?',
    rep1: 'Une clé primaire externe', rep2: 'Une colonne qui référence la clé primaire d\'une autre table, assurant l\'intégrité référentielle', rep3: 'Un index sur une autre table', rep4: 'Une contrainte d\'unicité',
    repCorrecte: 2,
    explication: 'FOREIGN KEY (user_id) REFERENCES users(id) garantit que user_id existe bien dans la table users. Empêche les enregistrements orphelins.',
  },
  {
    theme: 'sql', niveau: 'moyen',
    question: 'Que fait "COALESCE(a, b, c)" ?',
    rep1: 'Calcule la moyenne', rep2: 'Fusionne des colonnes', rep3: 'Retourne la première valeur non-NULL parmi les arguments', rep4: 'Concatène des chaînes',
    repCorrecte: 3,
    explication: 'COALESCE(NULL, NULL, "valeur", "autre") retourne "valeur". Utile pour remplacer les NULL par une valeur par défaut.',
  },
  {
    theme: 'sql', niveau: 'moyen',
    question: 'Quelle est la différence entre WHERE et HAVING ?',
    rep1: 'Aucune différence', rep2: 'WHERE filtre avant agrégation, HAVING filtre après GROUP BY sur les résultats agrégés', rep3: 'HAVING fonctionne sans GROUP BY', rep4: 'WHERE ne peut pas utiliser les fonctions',
    repCorrecte: 2,
    explication: 'WHERE col > 5 filtre les lignes. HAVING COUNT(*) > 5 filtre les groupes. On ne peut pas utiliser WHERE sur les alias d\'agrégation.',
  },

  // ─── SQL DIFFICILE ─────────────────────────────────────────────
  {
    theme: 'sql', niveau: 'difficile',
    question: 'Qu\'est-ce qu\'une CTE (Common Table Expression) ?',
    rep1: 'Une table temporaire stockée', rep2: 'Un résultat nommé défini avec WITH, utilisable dans la requête principale comme une table virtuelle', rep3: 'Un type d\'index', rep4: 'Une procédure stockée',
    repCorrecte: 2,
    explication: 'WITH cte AS (SELECT ...) SELECT * FROM cte. Améliore la lisibilité et permet la récursivité (WITH RECURSIVE).',
  },
  {
    theme: 'sql', niveau: 'difficile',
    question: 'Que fait "EXPLAIN" avant une requête SQL ?',
    rep1: 'Documente la requête', rep2: 'Retourne le plan d\'exécution du moteur de base de données sans exécuter la requête', rep3: 'Optimise la requête automatiquement', rep4: 'Vérifie la syntaxe SQL',
    repCorrecte: 2,
    explication: 'EXPLAIN SELECT... affiche le plan d\'exécution : type de jointure, index utilisé, nombre de lignes estimées. Essentiel pour l\'optimisation.',
  },
  {
    theme: 'sql', niveau: 'difficile',
    question: 'Qu\'est-ce qu\'une fenêtre de fonction (Window Function) ?',
    rep1: 'Une requête dans une requête', rep2: 'Une fonction qui s\'applique sur un ensemble de lignes en rapport avec la ligne courante, sans GROUP BY', rep3: 'Un type de vue', rep4: 'Un curseur SQL',
    repCorrecte: 2,
    explication: 'ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salaire DESC) numérote les lignes par département selon le salaire. Les lignes ne sont pas regroupées.',
  },
  {
    theme: 'sql', niveau: 'difficile',
    question: 'Que signifient les niveaux d\'isolation de transaction SERIALIZABLE vs READ COMMITTED ?',
    rep1: 'Ils contrôlent la compression', rep2: 'SERIALIZABLE est le plus strict (transactions séquentielles logiques), READ COMMITTED lit seulement les données validées', rep3: 'READ COMMITTED est plus strict', rep4: 'Ils gèrent uniquement les lectures',
    repCorrecte: 2,
    explication: 'READ COMMITTED évite les dirty reads mais permet les phantom reads. SERIALIZABLE élimine tous les problèmes de concurrence mais réduit les performances.',
  },
  {
    theme: 'sql', niveau: 'difficile',
    question: 'Qu\'est-ce qu\'un index couvrant (covering index) ?',
    rep1: 'Un index sur toutes les colonnes', rep2: 'Un index qui contient toutes les colonnes nécessaires à une requête, évitant d\'accéder à la table principale', rep3: 'Un index dupliqué', rep4: 'Un index partiel',
    repCorrecte: 2,
    explication: 'Si une requête SELECT a, b FROM t WHERE c=1 a un index sur (c, a, b), le moteur lit seulement l\'index sans toucher la table → index only scan.',
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.question.deleteMany();
  console.log('   Cleared existing questions');

  await prisma.question.createMany({ data: questions });
  console.log(`   ✓ ${questions.length} questions insérées`);

  const counts = await prisma.question.groupBy({
    by: ['theme', 'niveau'],
    _count: true,
  });
  console.log('\n📊 Résumé par thème/niveau:');
  counts.forEach(({ theme, niveau, _count }) => {
    console.log(`   ${theme.padEnd(12)} ${niveau.padEnd(10)} → ${_count} questions`);
  });

  console.log('\n✅ Seed terminé !');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
