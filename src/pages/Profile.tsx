import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCardStore } from '../store/cardStore';
import { useDeckStore } from '../store/deckStore';
import { useToastStore } from '../store/toastStore';
import { User, Import } from 'lucide-react';
import { CardList } from '../components/CardList';
import { DeckList } from '../components/DeckList';
import { ImportDeckModal } from '../components/ImportDeckModal';
import { handleDeckImport } from '../utils/deckImport';

function Profile() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { cards, removeCard } = useCardStore();
  const { decks, removeDeck } = useDeckStore();
  const { showToast } = useToastStore();
  const [importCode, setImportCode] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);

  const userCards = cards.filter(card => card.createdBy === user?.id);
  const userDecks = decks.filter(deck => deck.createdBy === user?.id);

  const handleEditCard = (card) => {
    navigate(`/cards/edit/${card.id}`, { state: { card } });
  };

  const handleDeleteCard = (cardId) => {
    if (window.confirm('Tem certeza que deseja excluir esta carta?')) {
      try {
        removeCard(cardId);
        showToast('Carta excluída com sucesso', 'success');
      } catch (error) {
        showToast('Erro ao excluir carta', 'error');
      }
    }
  };

  const handleEditDeck = (deckId) => {
    const deck = decks.find(d => d.id === deckId);
    if (deck) {
      navigate(`/decks/${deckId}`);
    }
  };

  const handleDeleteDeck = (deckId) => {
    if (window.confirm('Tem certeza que deseja excluir este baralho?')) {
      try {
        removeDeck(deckId);
        showToast('Baralho excluído com sucesso', 'success');
      } catch (error) {
        showToast('Erro ao excluir baralho', 'error');
      }
    }
  };

  const onImportDeck = async () => {
    if (!user) {
      showToast('Você precisa estar logado para importar baralhos', 'error');
      return;
    }

    const result = await handleDeckImport(importCode, user.id);
    
    if (result.success) {
      showToast('Baralho importado com sucesso!', 'success');
      setShowImportModal(false);
      setImportCode('');
    } else {
      showToast(result.error || 'Erro ao importar baralho', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <User className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => setShowImportModal(true)}
            className="btn btn-secondary flex items-center space-x-2"
          >
            <Import className="w-4 h-4" />
            <span>Importar Baralho</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Suas Cartas</h2>
            <button
              onClick={() => navigate('/cards/create')}
              className="btn btn-primary"
            >
              Nova Carta
            </button>
          </div>
          <CardList
            cards={userCards}
            onEdit={handleEditCard}
            onDelete={handleDeleteCard}
          />
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Seus Baralhos</h2>
            <button
              onClick={() => navigate('/decks')}
              className="btn btn-primary"
            >
              Novo Baralho
            </button>
          </div>
          <DeckList
            decks={userDecks}
            onEdit={handleEditDeck}
            onDelete={handleDeleteDeck}
          />
        </div>
      </div>

      <ImportDeckModal
        isOpen={showImportModal}
        importCode={importCode}
        onImport={onImportDeck}
        onClose={() => setShowImportModal(false)}
        onChange={setImportCode}
      />
    </div>
  );
}

export default Profile;