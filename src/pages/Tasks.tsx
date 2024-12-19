import React, { useState, Suspense } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Task, Forum, Email, Website, TaskProcessStatus } from '../types';
import { SlideOver } from '../components/ui/SlideOver';
import { TaskForm } from '../components/forms/TaskForm';
import { Badge } from '../components/ui/Badge';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select';
import { determineProcessStatus } from '../lib/utils';
import { api } from '../lib/api';
import { useFirestore } from '../hooks/useFirestore';
import { TASK_STATUS_OPTIONS, PROCESS_STATUS_OPTIONS } from '../lib/constants/task-status-options';

// Composant pour le tableau virtualisé
const VirtualizedTasksTable = React.memo(({ tasks, forums, emails, websites, onEdit }) => {
  const parentRef = React.useRef();
  
  const rowVirtualizer = useVirtualizer({
    count: tasks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 10,
  });

  return (
    <div ref={parentRef} className="h-[600px] overflow-auto">
      <table className="w-full">
        <thead className="sticky top-0 bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Forum</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Email</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Site Web</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Statut Inscription</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Statut Post</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Statut Lien</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Vérification Lien</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Statut Indexation</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const task = tasks[virtualRow.index];
            return (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">
                  {forums?.find(f => f.id === task.forumId)?.url || task.forumId}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {emails?.find(e => e.id === task.emailId)?.email || task.emailId}
                  {task.emailAlias && <span className="ml-1 text-xs text-gray-400">({task.emailAlias})</span>}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {websites?.find(w => w.id === task.websiteId)?.name || task.websiteId}
                </td>
                <td className="px-4 py-3 text-sm">
                  <Badge className={getStatusColor(task.registrationStatus, 'registration')}>
                    {getStatusLabel(task.registrationStatus, 'registration')}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm">
                  <Badge className={getStatusColor(task.postStatus, 'post')}>
                    {getStatusLabel(task.postStatus, 'post')}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm">
                  <Badge className={getStatusColor(task.linkStatus, 'link')}>
                    {getStatusLabel(task.linkStatus, 'link')}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm">
                  <Badge className={getStatusColor(task.linkVerificationStatus, 'linkVerification')}>
                    {getStatusLabel(task.linkVerificationStatus, 'linkVerification')}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm">
                  <Badge className={getStatusColor(task.indexationStatus, 'indexation')}>
                    {getStatusLabel(task.indexationStatus, 'indexation')}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => onEdit(task)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Modifier
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

// Composant principal
export default function Tasks() {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedProcessStatus, setSelectedProcessStatus] = useState<TaskProcessStatus | 'all'>('all');
  const queryClient = useQueryClient();

  // Utilisation de staleTime et cacheTime pour optimiser les requêtes
  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => api.tasks.getAll(),
    staleTime: 30000, // 30 secondes
    cacheTime: 300000, // 5 minutes
  });

  const { data: forums, isLoading: forumsLoading } = useQuery({
    queryKey: ['forums'],
    queryFn: () => useFirestore('forums').getAll(),
    staleTime: 60000,
    cacheTime: 300000,
  });

  const { data: emails, isLoading: emailsLoading } = useQuery({
    queryKey: ['emails'],
    queryFn: () => useFirestore('emails').getAll(),
    staleTime: 60000,
    cacheTime: 300000,
  });

  const { data: websites, isLoading: websitesLoading } = useQuery({
    queryKey: ['websites'],
    queryFn: () => useFirestore('websites').getAll(),
    staleTime: 60000,
    cacheTime: 300000,
  });

  const { data: selectedTaskDetails, isLoading: taskDetailsLoading } = useQuery({
    queryKey: ['task', selectedTask?.id],
    queryFn: () => selectedTask ? api.tasks.getOne(selectedTask.id!) : null,
    enabled: !!selectedTask?.id,
    staleTime: 30000,
  });

  const mutation = useMutation({
    mutationFn: async (data: Partial<Task>) => {
      if (selectedTask?.id) {
        return api.tasks.update(selectedTask.id, data);
      }
      return api.tasks.create(data as Omit<Task, 'id'>);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setIsSlideOverOpen(false);
      setSelectedTask(null);
    },
  });

  const handleAddTask = () => {
    setSelectedTask(null);
    setIsSlideOverOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsSlideOverOpen(true);
  };

  const handleSubmit = async (data: Partial<Task>) => {
    await mutation.mutateAsync(data);
  };

  const filteredTasks = React.useMemo(() => {
    if (!tasks) return [];
    return selectedProcessStatus === 'all' 
      ? tasks 
      : tasks.filter(task => determineProcessStatus(task) === selectedProcessStatus);
  }, [tasks, selectedProcessStatus]);

  const isLoading = tasksLoading || forumsLoading || emailsLoading || websitesLoading;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Tâches</h1>
        <div className="flex items-center space-x-4">
          <Select
            value={selectedProcessStatus}
            onValueChange={(value: TaskProcessStatus | 'all') => setSelectedProcessStatus(value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              {PROCESS_STATUS_OPTIONS.map(option => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button
            onClick={handleAddTask}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle tâche
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-6 text-center">Chargement...</div>
      ) : (
        <Suspense fallback={<div className="mt-6 text-center">Chargement...</div>}>
          <VirtualizedTasksTable
            tasks={filteredTasks}
            forums={forums}
            emails={emails}
            websites={websites}
            onEdit={handleEditTask}
          />
        </Suspense>
      )}

      <SlideOver
        isOpen={isSlideOverOpen}
        onClose={() => {
          setIsSlideOverOpen(false);
          setSelectedTask(null);
        }}
        title={selectedTask ? 'Modifier la tâche' : 'Nouvelle tâche'}
      >
        <TaskForm
          onSubmit={handleSubmit}
          initialData={selectedTaskDetails || undefined}
          isLoading={mutation.isPending || taskDetailsLoading}
          forums={forums || []}
          emails={emails || []}
          websites={websites || []}
        />
      </SlideOver>
    </div>
  );
}