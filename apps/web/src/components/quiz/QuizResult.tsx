import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useUiStore } from "../../store/uiStore";

interface Props {
    score: number;
    total: number;
    scoreSaved: boolean;
    onReplay: () => void;
}

const btnClass =
    "px-6 py-3 rounded border-2 border-[#4d4b4b] font-bold no-underline text-black bg-[#95acc4] cursor-pointer transition hover:bg-[#ce5867] hover:shadow-[0_0_14px_rgba(206,88,103,0.7)]";

export function QuizResult({ score, total, scoreSaved, onReplay }: Props) {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const openAuthModal = useUiStore((s) => s.openAuthModal);
    const percentage = Math.round((score / total) * 100);

    return (
        <div className="flex flex-col items-center gap-6 py-8 text-center">
            <h2
                className="font-extrabold w-full sm:w-4/5 lg:w-3/5"
                style={{
                    fontSize: "clamp(1.5em, 3vw, 3em)",
                    color: "#333",
                    border: "2px solid #4d4b4b",
                    backgroundColor: "#f1eddf",
                    borderRadius: "15px",
                    padding: "10px",
                }}
            >
                Résultat : {score}/{total}
            </h2>
            <p className="text-xl font-semibold" style={{ color: "#555" }}>
                {percentage >= 80
                    ? "🏆 Excellent ! Tu maîtrises ce sujet."
                    : percentage >= 50
                      ? "👍 Bon travail, continue à t'entraîner !"
                      : "💪 Continue à pratiquer, tu vas y arriver !"}
            </p>

            {isAuthenticated ? (
                <p className="font-semibold" style={{ color: "#2f7a4b" }}>
                    {scoreSaved
                        ? "✓ Score enregistré au classement"
                        : "Enregistrement du score…"}
                </p>
            ) : (
                <div className="w-full sm:w-4/5 rounded-xl border-2 border-dashed border-[#4d4b4b] p-4">
                    <p className="mb-3" style={{ color: "#333" }}>
                        Tu joues en invité : ce score n'est pas enregistré.
                        <br />
                        Connecte-toi pour apparaître au classement !
                    </p>
                    <div className="flex gap-3 justify-center flex-wrap">
                        <button
                            onClick={() => openAuthModal("register")}
                            className={btnClass}
                        >
                            ✏️ Créer un compte
                        </button>
                        <button
                            onClick={() => openAuthModal("login")}
                            className={btnClass}
                        >
                            🔑 Se connecter
                        </button>
                    </div>
                </div>
            )}

            <div className="flex gap-4 mt-4 flex-wrap justify-center">
                <button onClick={onReplay} className={btnClass}>
                    🔄 Rejouer
                </button>
                <Link to="/jouer" className={btnClass}>
                    🎮 Autre quiz
                </Link>
                <Link to="/scores" className={btnClass}>
                    🏅 Voir les scores
                </Link>
                <Link to="/" className={btnClass}>
                    🏠 Accueil
                </Link>
            </div>
        </div>
    );
}
