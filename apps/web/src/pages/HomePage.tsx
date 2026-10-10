import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useUiStore } from "../store/uiStore";

// Une vraie question du quiz, jouable directement depuis l'accueil
const DEMO = {
    question: "Quelle balise HTML crée un lien hypertexte ?",
    answers: ["<link>", "<a>", "<href>", "<url>"],
    correct: 1,
    explication:
        "La balise <a> (anchor) crée les liens. L'attribut href indique la destination.",
};

const LANGUAGES = [
    { label: "HTML", color: "#e96b3c" },
    { label: "CSS", color: "#3c8de9" },
    { label: "JavaScript", color: "#e9c23c" },
    { label: "PHP", color: "#7b7fc4" },
    { label: "SQL", color: "#3cb08a" },
];

const STEPS = [
    {
        title: "Choisis ton défi",
        text: "Un langage parmi cinq, puis un niveau : facile, moyen ou difficile.",
    },
    {
        title: "Réponds aux questions",
        text: "Après chaque réponse, une explication courte te dit pourquoi.",
    },
    {
        title: "Grimpe au classement",
        text: "Crée un compte pour enregistrer tes scores et te comparer aux autres.",
    },
];

const keyBtn =
    "inline-block rounded-lg border-2 border-border px-6 py-3 font-bold text-black no-underline cursor-pointer shadow-[4px_4px_0_#4d4b4b] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#4d4b4b] active:translate-y-0.5 active:shadow-[2px_2px_0_#4d4b4b] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function HomePage() {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const openAuthModal = useUiStore((s) => s.openAuthModal);
    const [picked, setPicked] = useState<number | null>(null);

    return (
        <div className="flex flex-col gap-16">
            {/* Accroche + question de démo */}
            <section className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
                <div>
                    <h2 className="mb-4 text-4xl font-extrabold leading-tight text-[#222] sm:text-5xl">
                        Le code, mais en fun.
                    </h2>
                    <p className="mb-8 max-w-md text-lg leading-relaxed text-[#333]">
                        Des QCM sur HTML, CSS, JavaScript, PHP et SQL, avec une
                        explication après chaque réponse. Pour réviser,
                        apprendre ou te mesurer aux autres.
                    </p>
                    <div className="mb-4 flex flex-wrap gap-4">
                        <Link
                            to="/jouer"
                            className={`${keyBtn} bg-primary hover:bg-accent`}
                        >
                            🎮 Jouer maintenant
                        </Link>
                        <Link
                            to="/scores"
                            className={`${keyBtn} bg-content hover:bg-accent`}
                        >
                            🏅 Voir le classement
                        </Link>
                    </div>
                    <p className="text-sm text-[#555]">
                        Pas besoin de compte pour jouer.{" "}
                        {!isAuthenticated && (
                            <button
                                onClick={() => openAuthModal("register")}
                                className="cursor-pointer border-0 bg-transparent p-0 font-semibold text-accent underline"
                            >
                                Crée-en un pour entrer au classement.
                            </button>
                        )}
                    </p>
                </div>

                <div className="rotate-1 rounded-2xl border-2 border-border bg-[#a8a3a3] p-5 shadow-[6px_6px_0_#4d4b4b]">
                    <p className="mb-3 text-sm font-semibold text-[#333]">
                        Essaie tout de suite :
                    </p>
                    <p className="mb-4 rounded-lg border border-black bg-content p-3 text-center font-semibold text-black">
                        {DEMO.question}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        {DEMO.answers.map((answer, i) => {
                            const isCorrect = i === DEMO.correct;
                            const isPicked = picked === i;
                            let bg = "bg-content hover:bg-primary";
                            if (picked !== null && isCorrect)
                                bg = "bg-[rgb(127,255,170)]";
                            else if (isPicked) bg = "bg-[rgb(228,79,79)]";
                            else if (picked !== null)
                                bg = "bg-content opacity-50";

                            return (
                                <button
                                    key={answer}
                                    onClick={() => setPicked(i)}
                                    disabled={picked !== null}
                                    className={`rounded-lg border border-black p-3 text-left font-mono font-semibold text-black transition ${bg} ${picked === null ? "cursor-pointer" : ""}`}
                                >
                                    {answer}
                                </button>
                            );
                        })}
                    </div>

                    {picked !== null && (
                        <div className="mt-4 rounded-lg border border-black bg-content p-3 text-sm text-black">
                            <p className="mb-1 font-bold">
                                {picked === DEMO.correct
                                    ? "✓ Bonne réponse !"
                                    : "✗ Raté, la bonne réponse était <a>."}
                            </p>
                            <p className="mb-3">{DEMO.explication}</p>
                            <Link
                                to="/questionnaire?theme=html&niveau=facile"
                                className="font-bold text-accent underline"
                            >
                                Continuer avec le quiz HTML facile
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Les langages */}
            <section>
                <h3 className="mb-5 text-2xl font-bold text-[#222]">
                    Cinq langages, trois niveaux
                </h3>
                <div className="flex flex-wrap gap-3">
                    {LANGUAGES.map(({ label, color }) => (
                        <Link
                            key={label}
                            to="/jouer"
                            className="rounded-full border-2 border-border px-5 py-2 font-bold text-white no-underline shadow-[3px_3px_0_#4d4b4b] transition hover:-translate-y-0.5"
                            style={{ backgroundColor: color }}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </section>

            {/* Comment ça marche */}
            <section>
                <h3 className="mb-5 text-2xl font-bold text-[#222]">
                    Comment ça marche
                </h3>
                <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-3">
                    {STEPS.map((step, i) => (
                        <li
                            key={step.title}
                            className="rounded-xl border-2 border-border bg-white/50 p-5"
                        >
                            <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-border bg-primary font-extrabold">
                                {i + 1}
                            </span>
                            <p className="mb-2 font-bold text-[#222]">
                                {step.title}
                            </p>
                            <p className="m-0 text-sm leading-relaxed text-[#444]">
                                {step.text}
                            </p>
                        </li>
                    ))}
                </ol>
            </section>
        </div>
    );
}
