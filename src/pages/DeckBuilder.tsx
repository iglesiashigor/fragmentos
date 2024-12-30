// Previous imports remain the same...

function DeckBuilder() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const { cards } = useCardStore();
  const { addDeck, updateDeck } = useDeckStore();
  const { showToast } = useToastStore();
  const [selectedCards, setSelectedCards] = useState<Record<string, number>>({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingDeck, setPendingDeck] = useState<{form: DeckForm, cards: Card[]} | null>(null);

  // Get deck from location state if editing
  const editingDeck = location.state?.deck as Deck | undefined;

  // Initialize form with deck data if editing
  useEffect(() => {
    if (editingDeck) {
      const cardCounts: Record<string, number> = {};
      editingDeck.cards.forEach(card => {
        cardCounts[card.id] = (cardCounts[card.id] || 0) + 1;
      });
      setSelectedCards(cardCounts);
    }
  }, [editingDeck]);

  // Rest of the component remains the same...
}

export default DeckBuilder;