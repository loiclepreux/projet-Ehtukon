import { type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useUiStore } from "../../store/uiStore";
import { useLogout } from "../../hooks/useAuth";

const NAV_BTN_BASE =
    "px-4 py-1 font-bold rounded border-2 cursor-pointer no-underline text-black";
const NAV_BTN_STYLE: CSSProperties = {
    backgroundColor: "#f8fafc",
    borderColor: "#4d4b4b",
    fontFamily: "Raleway, sans-serif",
    fontSize: "0.95rem",
};

const hoverOn = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = "#ce5867";
    e.currentTarget.style.boxShadow =
        "0 0 10px rgba(206,88,103,0.8), 0 0 20px rgba(206,88,103,0.4)";
};
const hoverOff = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = "#f8fafc";
    e.currentTarget.style.boxShadow = "none";
};

function NavLink({ to, children }: { to: string; children: ReactNode }) {
    return (
        <Link
            to={to}
            className={NAV_BTN_BASE}
            style={{
                ...NAV_BTN_STYLE,
                transition: "background-color 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={hoverOn}
            onMouseOut={hoverOff}
        >
            {children}
        </Link>
    );
}

function NavButton({
    onClick,
    children,
}: {
    onClick: () => void;
    children: ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            className={NAV_BTN_BASE}
            style={{
                ...NAV_BTN_STYLE,
                transition: "background-color 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={hoverOn}
            onMouseOut={hoverOff}
        >
            {children}
        </button>
    );
}

export function Header() {
    const { user, isAuthenticated } = useAuthStore();
    const openAuthModal = useUiStore((s) => s.openAuthModal);
    const logout = useLogout();
    const { pathname } = useLocation();
    const isJouer = pathname === "/jouer";
    const isScores = pathname === "/scores";

    return (
        <header
            style={{
                backgroundColor: "#95acc4",
                border: "2px solid #4d4b4b",
                boxShadow:
                    "0 0 18px rgba(149,172,196,0.5), 0 4px 20px rgba(0,0,0,0.4)",
            }}
            className="w-[90%] mx-auto mt-4 rounded-2xl flex flex-col"
        >
            <div className="w-full flex justify-around items-center py-3 px-4">
                <img
                    src="/logo-Ehtukon.png"
                    alt="logo"
                    className="w-28 h-auto hidden sm:block"
                />
                <h1
                    className="text-center font-extrabold"
                    style={{
                        fontSize: "clamp(2.5rem, 7vw, 5rem)",
                        margin: 0,
                        fontFamily: "Raleway, sans-serif",
                        letterSpacing: "0.06em",
                        textShadow:
                            "0 0 15px rgba(255,255,255,0.7), 0 0 40px rgba(149,172,196,0.5)",
                    }}
                >
                    Ehtukon?
                </h1>
                <img
                    src="/logo-Ehtukon.png"
                    alt="logo"
                    className="w-28 h-auto hidden sm:block"
                />
            </div>

            <nav className="w-full flex justify-around py-3 px-4 flex-wrap gap-2">
                {isAuthenticated ? (
                    <NavButton onClick={() => logout.mutate()}>
                        <span
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                            }}
                        >
                            <span
                                style={{
                                    maxWidth: "100px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    display: "inline-block",
                                }}
                            >
                                {user?.nom}
                            </span>
                            <span>— Déconnexion</span>
                        </span>
                    </NavButton>
                ) : (
                    <NavButton onClick={() => openAuthModal("login")}>
                        Connexion / Inscription
                    </NavButton>
                )}
                {!isJouer && <NavLink to="/jouer">Jouer</NavLink>}
                {!isScores && <NavLink to="/scores">Scores</NavLink>}
                {(isJouer || isScores) && <NavLink to="/">Accueil</NavLink>}
            </nav>
        </header>
    );
}
