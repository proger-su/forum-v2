import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Email } from '../types';
import { useFirestore } from '../hooks/useFirestore';
import { Modal } from '../components/ui/Modal';
import { EmailForm } from '../components/forms/EmailForm';

export default function Emails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const { getAll, add, update } = useFirestore('emails');
  const queryClient = useQueryClient();

  const { data: emails, isLoading } = useQuery<Email[]>({
    queryKey: ['emails'],
    queryFn: () => getAll(),
  });

  const mutation = useMutation({
    mutationFn: async (data: Partial<Email>) => {
      if (selectedEmail?.id) {
        return update(selectedEmail.id, data);
      }
      return add(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emails'] });
      setIsModalOpen(false);
      setSelectedEmail(null);
    },
  });

  const handleAddEmail = () => {
    setSelectedEmail(null);
    setIsModalOpen(true);
  };

  const handleEditEmail = (email: Email) => {
    setSelectedEmail(email);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: Partial<Email>) => {
    const formattedData = {
      ...data,
      aliases: data.aliases.split('\n').map(a => a.trim()).filter(Boolean),
      createdAt: selectedEmail?.createdAt || new Date(),
      updatedAt: new Date(),
    };
    
    await mutation.mutateAsync(formattedData);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Emails</h1>
        <button
          onClick={handleAddEmail}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un email
        </button>
      </div>

      {isLoading ? (
        <div className="mt-6 text-center">Chargement...</div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">URL Webmail</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Alias</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {emails?.map((email) => (
                <tr key={email.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {email.email}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {email.webmailUrl}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {email.aliases.join(', ')}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <button
                      onClick={() => handleEditEmail(email)}
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
          setSelectedEmail(null);
        }}
        title={selectedEmail ? 'Modifier l\'email' : 'Ajouter un email'}
      >
        <EmailForm
          onSubmit={handleSubmit}
          initialData={selectedEmail ? {
            ...selectedEmail,
            aliases: selectedEmail.aliases.join('\n')
          } : undefined}
          isLoading={mutation.isPending}
        />
      </Modal>
    </div>
  );
}