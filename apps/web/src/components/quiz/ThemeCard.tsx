import { useNavigate } from "react-router-dom";
import { Theme, Niveau } from "@ehtukon/shared";

const THEME_LABELS: Record<Theme, string> = {
    [Theme.HTML]: "HTML",
    [Theme.CSS]: "CSS",
    [Theme.JAVASCRIPT]: "JavaScript",
    [Theme.PHP]: "PHP",
    [Theme.SQL]: "SQL",
};

const NIVEAU_STYLES: Record<
    Niveau,
    { backgroundColor: string; glow: string; label: string }
> = {
    [Niveau.FACILE]: {
        backgroundColor: "rgb(127,255,170)",
        glow: "rgba(127,255,170,0.8)",
        label: "Facile",
    },
    [Niveau.MOYEN]: {
        backgroundColor: "rgb(240,144,81)",
        glow: "rgba(240,144,81,0.8)",
        label: "Moyen",
    },
    [Niveau.DIFFICILE]: {
        backgroundColor: "rgb(228,79,79)",
        glow: "rgba(228,79,79,0.8)",
        label: "Difficile",
    },
};

interface Props {
    theme: Theme;
}

export function ThemeCard({ theme }: Props) {
    const navigate = useNavigate();

    const handlePlay = (niveau: Niveau) => {
        navigate(`/questionnaire?theme=${theme}&niveau=${niveau}`);
    };

    return (
        <div
            className="rounded-2xl border-2 p-4 flex flex-col gap-3"
            style={{
                backgroundColor: "#f1eddf",
                borderColor: "#4d4b4b",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                transition: "box-shadow 0.3s",
            }}
            onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                    "0 0 18px rgba(149,172,196,0.5), 0 0 6px rgba(0,0,0,0.2)")
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)")
            }
        >
            <h3
                className="text-xl font-bold text-center"
                style={{
                    color: "#333",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                }}
            >
                {THEME_LABELS[theme]}
            </h3>
            <div className="flex flex-col gap-2">
                {Object.values(Niveau).map((niveau) => {
                    const { backgroundColor, glow, label } =
                        NIVEAU_STYLES[niveau];
                    return (
                        <button
                            key={niveau}
                            onClick={() => handlePlay(niveau)}
                            className="w-full py-3 px-4 rounded-lg border-2 font-semibold text-black text-lg cursor-pointer"
                            style={{
                                backgroundColor,
                                borderColor: "#4d4b4b",
                                boxShadow: "0 0 6px rgba(0,0,0,0.2)",
                                transition: "box-shadow 0.2s, transform 0.2s",
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.boxShadow = `0 0 14px ${glow}, 0 0 28px ${glow.replace("0.8", "0.4")}`;
                                e.currentTarget.style.transform = "scale(1.04)";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.boxShadow =
                                    "0 0 6px rgba(0,0,0,0.2)";
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
