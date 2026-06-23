import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore';

const btnStyle: React.CSSProperties = {
  backgroundColor: '#95acc4', border: '2px solid #4d4b4b',
  borderRadius: '8px', padding: '12px 32px', fontWeight: 'bold',
  fontSize: '1.1rem', cursor: 'pointer', fontFamily: 'Raleway, sans-serif',
  textDecoration: 'none', color: 'black', display: 'inline-block',
  letterSpacing: '0.05em', transition: 'background-color 0.2s, box-shadow 0.2s',
};

export function HomePage() {
  const { isAuthenticated } = useAuthStore();
  const openAuthModal = useUiStore((s) => s.openAuthModal);

  return (
    <div style={{ fontFamily: 'Raleway, sans-serif' }}>
      <p className="text-xl mb-4">
        🎮 <span className="font-bold underline" style={{ letterSpacing: '0.04em' }}>Présentation – Bienvenue dans l'univers d'Ehtukon.</span>
      </p>
      <p className="text-lg leading-relaxed text-justify mb-4" style={{ color: '#222' }}>
        <span className="font-bold">Ehtukon</span>, c'est bien plus qu'un simple quiz : c'est une aventure interactive
        dédiée à tous ceux qui veulent apprendre, réviser ou tester leurs connaissances en programmation... tout en s'amusant !
      </p>
      <p className="text-lg leading-relaxed text-justify mb-4" style={{ color: '#222' }}>
        Pensé comme un jeu, Ehtukon te plonge dans un univers ludique où chaque bonne réponse te rapproche du titre de
        <span className="font-bold"> Maître du Code</span>. Que tu sois débutant curieux, passionné autodidacte ou
        développeur confirmé, tu trouveras ici de quoi stimuler ton cerveau et relever des défis amusants à travers
        des centaines de questions réparties sur différents langages et concepts.
      </p>
      <p className="text-lg leading-relaxed text-justify mb-4" style={{ color: '#222' }}>
        Tu aimes le <span className="font-bold">HTML</span> et le <span className="font-bold">CSS</span> ? Tu veux
        maîtriser <span className="font-bold">JavaScript</span>, <span className="font-bold">PHP</span> ou encore{' '}
        <span className="font-bold">SQL</span> ? Parfait ! Ehtukon te propose des questionnaires variés, allant des
        bases jusqu'aux notions avancées, sous forme de QCM. Chaque module a été conçu pour t'apporter à la fois
        apprentissage, challenge et fun.
      </p>
      <p className="text-lg leading-relaxed text-justify mb-4" style={{ color: '#222' }}>
        Le but ? T'amuser tout en consolidant tes compétences, et te comparer à la communauté ! Avec un système de
        points et de classements, tu progresses à ton rythme, selon tes envies.
      </p>
      <p className="text-lg leading-relaxed text-justify mb-6" style={{ color: '#222' }}>
        Alors n'attends plus ! Lance ta première partie, choisis ton langage, et laisse-toi embarquer dans cette
        expérience unique où <span className="font-bold">le code devient un jeu</span>. 🚀
      </p>

      <div className="flex justify-center gap-4 flex-wrap mt-4">
        {isAuthenticated ? (
          <Link
            to="/jouer"
            style={btnStyle}
            onMouseOver={e => { e.currentTarget.style.backgroundColor = '#ce5867'; e.currentTarget.style.boxShadow = '0 0 14px rgba(206,88,103,0.7)'; }}
            onMouseOut={e => { e.currentTarget.style.backgroundColor = '#95acc4'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            🎮 Commencer à jouer
          </Link>
        ) : (
          <>
            <button
              onClick={() => openAuthModal('login')}
              style={btnStyle}
              onMouseOver={e => { e.currentTarget.style.backgroundColor = '#ce5867'; e.currentTarget.style.boxShadow = '0 0 14px rgba(206,88,103,0.7)'; }}
              onMouseOut={e => { e.currentTarget.style.backgroundColor = '#95acc4'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              🔑 Se connecter pour jouer
            </button>
            <button
              onClick={() => openAuthModal('register')}
              style={{ ...btnStyle, backgroundColor: '#f1eddf' }}
              onMouseOver={e => { e.currentTarget.style.backgroundColor = '#ce5867'; e.currentTarget.style.boxShadow = '0 0 14px rgba(206,88,103,0.7)'; }}
              onMouseOut={e => { e.currentTarget.style.backgroundColor = '#f1eddf'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              ✏️ Créer un compte
            </button>
          </>
        )}
      </div>
    </div>
  );
}
