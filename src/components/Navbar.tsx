import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LayoutGrid, ScrollText, User, LogOut } from 'lucide-react';

function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <LayoutGrid className="h-6 w-6 text-indigo-600" />
            <span className="font-bold text-xl">Gerenciador de Cartas</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/cards/create" className="nav-link">
                  <LayoutGrid className="h-5 w-5" />
                  <span>Criar Carta</span>
                </Link>
                <Link to="/decks" className="nav-link">
                  <ScrollText className="h-5 w-5" />
                  <span>Baralhos</span>
                </Link>
                <Link to="/profile" className="nav-link">
                  <User className="h-5 w-5" />
                  <span>Perfil</span>
                </Link>
                <button
                  onClick={logout}
                  className="nav-link text-red-600 hover:text-red-800"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sair</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Entrar</Link>
                <Link to="/register" className="nav-link">Cadastrar</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;