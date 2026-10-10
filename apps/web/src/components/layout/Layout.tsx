import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { AuthModal } from "../auth/AuthModal";
import { useAuthInit } from "../../hooks/useAuth";

export function Layout() {
    useAuthInit();
    return (
        <div className="w-full flex flex-col min-h-screen">
            <Header />
            <main
                className="mx-auto mt-6 mb-8 w-[calc(100%-2rem)] max-w-5xl rounded-2xl border-2 p-5 sm:p-8"
                style={{
                    backgroundColor: "#f1eddf",
                    borderColor: "#4d4b4b",
                    boxShadow:
                        "0 5px 20px rgba(0,0,0,0.2), 0 0 30px rgba(149,172,196,0.15)",
                }}
            >
                <Outlet />
            </main>
            <footer className="mt-auto pb-6 text-center text-sm text-[#333]">
                <p className="my-1">
                    © {new Date().getFullYear()}{" "}
                    <strong className="text-primary">Ehtukon?</strong> · Le
                    code, mais en fun 🎮
                </p>
                <p className="my-1">
                    Réalisé par{" "}
                    <a
                        href="https://loic-lepreux.com"
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-accent"
                    >
                        Loïc Lepreux
                    </a>{" "}
                    ·{" "}
                    <a
                        href="https://github.com/loiclepreux/projet-ehtukon"
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-accent"
                    >
                        Code source
                    </a>
                </p>
            </footer>
            <AuthModal />
        </div>
    );
}
