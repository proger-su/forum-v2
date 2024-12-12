import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Website } from '../types';
import { useFirestore } from '../hooks/useFirestore';
import { Modal } from '../components/ui/Modal';
import { WebsiteForm } from '../components/forms/WebsiteForm';

export default function Websites() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);
  const { getAll, add, update } = useFirestore('websites');
  const queryClient = useQueryClient();

  const { data: websites, isLoading } = useQuery<Website[]>({
    queryKey: ['websites'],
    queryFn: () => getAll(),
  });

  const mutation = useMutation({
    mutationFn: async (data: Partial<Website>) => {
      if (selectedWebsite?.id) {
        return update(selectedWebsite.id, data);
      }
      return add(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websites'] });
      setIsModalOpen(false);
      setSelectedWebsite(null);
    },
  });

  const handleAddWebsite = () => {
    setSelectedWebsite(null);
    setIsModalOpen(true);
  };

  const handleEditWebsite = (website: Website) => {
    setSelectedWebsite(website);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: Partial<Website>) => {
    const formattedData = {
      ...data,
      createdAt: selectedWebsite?.createdAt || new Date(),
      updatedAt: new Date(),
    };
    
    await mutation.mutateAsync(formattedData);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Sites Web</h1>
        <button
          onClick={handleAddWebsite}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un site web
        </button>
      </div>

      {isLoading ? (
        <div className="mt-6 text-center">Chargement...</div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nom</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">URL</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Sujet</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {websites?.map((website) => (
                <tr key={website.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {website.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {website.url}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {website.topic}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <button
                      onClick={() => handleEditWebsite(website)}
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
          setSelectedWebsite(null);
        }}
        title={selectedWebsite ? 'Modifier le site web' : 'Ajouter un site web'}
      >
        <WebsiteForm
          onSubmit={handleSubmit}
          initialData={selectedWebsite}
          isLoading={mutation.isPending}
        />
      </Modal>
    </div>
  );
}