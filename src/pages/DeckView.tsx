import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDeckStore } from '../store/deckStore';
import { useToastStore } from '../store/toastStore';
import { CardList } from '../components/CardList';

export default function DeckView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { decks } = useDeckStore();
  const { showToast } = useToastStore();
  
  const deck = decks.find(d => d.id === id);

  if (!deck) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card">
          <h1 className="text-2xl font-bold mb-4">Baralho não encontrado</h1>
          <button
            onClick={() => navigate('/profile')}
            className="btn btn-primary"
          >
            Voltar ao Perfil
          </button>
        </div>
      </div>
    );
  }

  const copyDeckCode = () => {
    navigator.clipboard.writeText(deck.code);
    showToast('Código do baralho copiado!', 'success');
  };

  const handleEditDeck = () => {
    navigate('/decks', { state: { deck } });
  };

  // Adiciona índices únicos para cada carta
  const neutralDeckWithKeys = deck.neutralDeck.map((card, index) => ({
    ...card,
    uniqueKey: `neutral-${card.id}-${index}`
  }));

  const mainDeckWithKeys = deck.mainDeck.map((card, index) => ({
    ...card,
    uniqueKey: `main-${card.id}-${index}`
  }));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">{deck.name}</h1>
            <p className="text-gray-600">
              {deck.cards.length} cartas
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={copyDeckCode}
              className="btn btn-secondary"
              title="Copiar código do baralho"
            >
              Copiar Código
            </button>
            <button
              onClick={handleEditDeck}
              className="btn btn-primary"
            >
              Editar Baralho
            </button>
          </div>
        </div>

        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <p className="font-mono text-sm break-all">
            Código do baralho: {deck.code}
          </p>
        </div>

        <CardList
          title="Herói"
          cards={neutralDeckWithKeys}
          showActions={false}
        />
        <CardList
          title="Cartas"
          cards={mainDeckWithKeys}
          showActions={false}
        />
      </div>
    </div>
  );
}