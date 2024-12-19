import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Forum } from '../types';
import { useFirestore } from '../hooks/useFirestore';
import { Modal } from '../components/ui/Modal';
import { ForumForm } from '../components/forms/ForumForm';
import { Badge } from '../components/ui/Badge';

export default function Forums() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null);
  const { getAll, add, update } = useFirestore('forums');
  const queryClient = useQueryClient();

  const { data: forums, isLoading } = useQuery<Forum[]>({
    queryKey: ['forums'],
    queryFn: () => getAll(),
  });

  const mutation = useMutation({
    mutationFn: async (data: Partial<Forum>) => {
      if (selectedForum?.id) {
        return update(selectedForum.id, data);
      }
      return add(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forums'] });
      setIsModalOpen(false);
      setSelectedForum(null);
    },
  });

  const handleAddForum = () => {
    setSelectedForum(null);
    setIsModalOpen(true);
  };

  const handleEditForum = (forum: Forum) => {
    setSelectedForum(forum);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: Partial<Forum>) => {
    const formattedData = {
      ...data,
      createdAt: selectedForum?.createdAt || new Date(),
      updatedAt: new Date(),
    };
    
    await mutation.mutateAsync(formattedData);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Forums</h1>
        <button
          onClick={handleAddForum}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un forum
        </button>
      </div>

      {isLoading ? (
        <div className="mt-6 text-center">Chargement...</div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">URL</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Statut</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Sujets</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {forums?.map((forum) => (
                <tr key={forum.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {forum.url}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <Badge>
                      {forum.status}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {forum.topics.join(', ')}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <button
                      onClick={() => handleEditForum(forum)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedForum(null);
        }}
        title={selectedForum ? 'Modifier le forum' : 'Ajouter un forum'}
      >
        <ForumForm
          onSubmit={handleSubmit}
          initialData={selectedForum}
          isLoading={mutation.isPending}
        />
      </Modal>
    </div>
  );
}