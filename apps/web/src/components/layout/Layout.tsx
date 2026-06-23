import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { AuthModal } from '../auth/AuthModal';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a2e]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <AuthModal />
    </div>
  );
}
