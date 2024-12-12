import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Globe, CheckSquare, Mail, Globe2 } from 'lucide-react';

const navigation = [
  { name: 'Tableau de bord', href: '/', icon: LayoutDashboard },
  { name: 'Forums', href: '/forums', icon: Globe },
  { name: 'Tâches', href: '/tasks', icon: CheckSquare },
  { name: 'Emails', href: '/emails', icon: Mail },
  { name: 'Sites Web', href: '/websites', icon: Globe2 },
];

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-white shadow">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Gestionnaire de Forums</h1>
          </div>
          
          <nav className="flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-1 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-indigo-600'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  <Icon
                    className={`mr-2 h-5 w-5 ${
                      isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}