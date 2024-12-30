import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, ScrollText } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

function Home() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Bem-vindo ao Gerenciador de Cartas</h1>
      <div className="text-center mb-12">
        <p className="text-xl text-gray-600 mb-4">
          Crie, gerencie e compartilhe suas coleções de cartas personalizadas
        </p>
        {!isAuthenticated && (
          <div className="space-x-4">
            <Link to="/register" className="btn btn-primary">Começar Agora</Link>
            <Link to="/login" className="btn btn-secondary">Entrar</Link>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <LayoutGrid className="w-12 h-12 text-indigo-600 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Crie Cartas Personalizadas</h2>
          <p className="text-gray-600 mb-4">
            Desenvolva cartas únicas com atributos, habilidades e arte personalizados
          </p>
          {isAuthenticated && (
            <Link to="/cards/create" className="btn btn-primary">Criar Carta</Link>
          )}
        </div>

        <div className="card">
          <ScrollText className="w-12 h-12 text-indigo-600 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Monte Seu Baralho</h2>
          <p className="text-gray-600 mb-4">
            Combine suas cartas em baralhos poderosos e compartilhe com outros jogadores
          </p>
          {isAuthenticated && (
            <Link to="/decks" className="btn btn-primary">Montar Baralho</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;