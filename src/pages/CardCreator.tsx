import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
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

function CardCreator() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addCard } = useCardStore();
  const { showToast } = useToastStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<CardForm>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      type: 'unit',
      health: 20,
    },
  });

  const selectedType = watch('type');

  const onSubmit = (data: CardForm) => {
    if (!user) {
      showToast('Você precisa estar logado para criar cartas', 'error');
      return;
    }

    try {
      // Remove undefined properties
      const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
      );

      const card = {
        id: crypto.randomUUID(),
        ...cleanData,
        createdBy: user.id,
        hash: generateHash(cleanData),
      } as Card;

      addCard(card);
      showToast('Carta criada com sucesso!', 'success');
      reset();
      navigate('/profile');
    } catch (error) {
      showToast('Erro ao criar carta. Tente novamente.', 'error');
      console.error('Erro ao criar carta:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h1 className="text-2xl font-bold mb-6">Criar Nova Carta</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo da Carta
            </label>
            <select {...register('type')} className="input mt-1">
              <option value="hero">hero</option>
              <option value="unit">unit</option>
              <option value="terrain">terrain</option>
              <option value="equipment">equipment</option>
              <option value="spell">spell</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              {...register('name')}
              className="input mt-1"
              placeholder="Nome da Carta"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {(selectedType === 'hero' || selectedType === 'unit') && (
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ataque
                </label>
                <input
                  type="number"
                  {...register('attack', { valueAsNumber: true })}
                  className="input mt-1"
                  min={0}
                  max={selectedType === 'hero' ? 7 : 10}
                />
                {errors.attack && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.attack.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Defesa
                </label>
                <input
                  type="number"
                  {...register('defense', { valueAsNumber: true })}
                  className="input mt-1"
                  min={0}
                  max={selectedType === 'hero' ? 7 : 10}
                />
                {errors.defense && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.defense.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Vida
                </label>
                <input
                  type="number"
                  {...register('health', { valueAsNumber: true })}
                  className="input mt-1"
                  min={selectedType === 'hero' ? 20 : 1}
                  max={20}
                  readOnly={selectedType === 'hero'}
                />
                {errors.health && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.health.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {selectedType === 'equipment' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bônus de Ataque
                </label>
                <input
                  type="number"
                  {...register('attack', { valueAsNumber: true })}
                  className="input mt-1"
                  min={0}
                  max={10}
                />
                {errors.attack && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.attack.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bônus de Defesa
                </label>
                <input
                  type="number"
                  {...register('defense', { valueAsNumber: true })}
                  className="input mt-1"
                  min={0}
                  max={10}
                />
                {errors.defense && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.defense.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {(selectedType === 'unit' ||
            selectedType === 'equipment' ||
            selectedType === 'spell') && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Custo de Mana
              </label>
              <input
                type="number"
                {...register('manaCost', { valueAsNumber: true })}
                className="input mt-1"
                min={0}
                max={10}
              />
              {errors.manaCost && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.manaCost.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              {...register('description')}
              className="input mt-1"
              rows={3}
              placeholder="Descrição e efeitos da carta..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Criar Carta
          </button>
        </form>
      </div>
    </div>
  );
}

export default CardCreator;
