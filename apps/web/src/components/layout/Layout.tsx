import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { AuthModal } from '../auth/AuthModal';

export function Layout() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header />
      <main className="w-[60%] mx-auto mt-6 mb-8 rounded-2xl border-2 p-4 sm:p-6"
        style={{ backgroundColor: '#f1eddf', borderColor: '#4d4b4b', boxShadow: '0 5px 20px rgba(0,0,0,0.2), 0 0 30px rgba(149,172,196,0.15)' }}
      >
        <Outlet />
      </main>
      <footer className="text-center text-lg mt-auto pb-6">
        <p style={{ margin: '5px 0' }}>© 2025 <strong style={{ color: '#95acc4', fontWeight: 600 }}>Ehtukon?</strong> - Le code, mais en fun 🎮</p>
        <p style={{ margin: '5px 0' }}>Développé avec ❤️ pour les passionnés de programmation</p>
      </footer>
      <AuthModal />
    </div>
  );
}
