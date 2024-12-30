import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCardStore } from '../store/cardStore';
import { useToastStore } from '../store/toastStore';
import { cardSchema } from '../utils/validation';
import { generateHash } from '../utils/hash';
import type { Card, CardType } from '../types/card';

type CardForm = {
  name: string;
  type: CardType;
  attack?: number;
  defense?: number;
  health?: number;
  manaCost?: number;
  description: string;
};

function CardEditor() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const { updateCard } = useCardStore();
  const { showToast } = useToastStore();
  
  const card = location.state?.card as Card;
  
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<CardForm>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      type: card?.type || 'unit',
      name: card?.name || '',
      description: card?.description || '',
      attack: 'attack' in card ? card.attack : undefined,
      defense: 'defense' in card ? card.defense : undefined,
      health: 'health' in card ? card.health : undefined,
      manaCost: 'manaCost' in card ? card.manaCost : undefined,
    },
  });

  useEffect(() => {
    if (!card) {
      showToast('Card not found', 'error');
      navigate('/profile');
    }
  }, [card, navigate, showToast]);

  const selectedType = watch('type');

  const onSubmit = (data: CardForm) => {
    if (!user || !card) {
      showToast('You must be logged in to edit cards', 'error');
      return;
    }

    try {
      const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
      );

      const updatedCard = {
        ...cleanData,
        hash: generateHash(cleanData),
      } as Partial<Card>;

      updateCard(card.id, updatedCard);
      showToast('Card updated successfully!', 'success');
      navigate('/profile');
    } catch (error) {
      showToast('Error updating card. Please try again.', 'error');
      console.error('Error updating card:', error);
    }
  };

  if (!card) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h1 className="text-2xl font-bold mb-6">Edit Card</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Card Type</label>
            <select {...register('type')} className="input mt-1">
              <option value="hero">Hero</option>
              <option value="unit">Unit</option>
              <option value="terrain">Terrain</option>
              <option value="equipment">Equipment</option>
              <option value="spell">Spell</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...register('name')}
              className="input mt-1"
              placeholder="Card Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {(selectedType === 'hero' || selectedType === 'unit') && (
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Attack</label>
                <input
                  type="number"
                  {...register('attack', { valueAsNumber: true })}
                  className="input mt-1"
                  min={0}
                  max={10}
                />
                {errors.attack && (
                  <p className="text-red-500 text-sm mt-1">{errors.attack.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Defense</label>
                <input
                  type="number"
                  {...register('defense', { valueAsNumber: true })}
                  className="input mt-1"
                  min={0}
                  max={10}
                />
                {errors.defense && (
                  <p className="text-red-500 text-sm mt-1">{errors.defense.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Health</label>
                <input
                  type="number"
                  {...register('health', { valueAsNumber: true })}
                  className="input mt-1"
                  min={1}
                  max={20}
                />
                {errors.health && (
                  <p className="text-red-500 text-sm mt-1">{errors.health.message}</p>
                )}
              </div>
            </div>
          )}

          {selectedType === 'equipment' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Attack Bonus</label>
                <input
                  type="number"
                  {...register('attack', { valueAsNumber: true })}
                  className="input mt-1"
                  min={0}
                  max={10}
                />
                {errors.attack && (
                  <p className="text-red-500 text-sm mt-1">{errors.attack.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Defense Bonus</label>
                <input
                  type="number"
                  {...register('defense', { valueAsNumber: true })}
                  className="input mt-1"
                  min={0}
                  max={10}
                />
                {errors.defense && (
                  <p className="text-red-500 text-sm mt-1">{errors.defense.message}</p>
                )}
              </div>
            </div>
          )}

          {(selectedType === 'unit' || selectedType === 'equipment' || selectedType === 'spell') && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Mana Cost</label>
              <input
                type="number"
                {...register('manaCost', { valueAsNumber: true })}
                className="input mt-1"
                min={0}
                max={10}
              />
              {errors.manaCost && (
                <p className="text-red-500 text-sm mt-1">{errors.manaCost.message}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register('description')}
              className="input mt-1"
              rows={3}
              placeholder="Card description and effects..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="flex space-x-4">
            <button type="submit" className="btn btn-primary flex-1">
              Update Card
            </button>
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="btn btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CardEditor;