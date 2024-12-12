import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Activity, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // TODO: Implement API call
      return {
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        failedTasks: 0,
      };
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord</h1>
      
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Activity className="h-6 w-6 text-gray-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500">Total des tâches</dt>
                <dd className="text-2xl font-semibold text-gray-900">{stats?.totalTasks}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle2 className="h-6 w-6 text-green-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500">Terminées</dt>
                <dd className="text-2xl font-semibold text-gray-900">{stats?.completedTasks}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Activity className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500">En attente</dt>
                <dd className="text-2xl font-semibold text-gray-900">{stats?.pendingTasks}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-red-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500">Échouées</dt>
                <dd className="text-2xl font-semibold text-gray-900">{stats?.failedTasks}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}