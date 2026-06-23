import { useState } from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Card } from './ui/card'
import { Shield, Code, Briefcase, UserCog, Settings, LogOut, Crown } from 'lucide-react'
import { toast } from 'sonner@2.0.3'

interface UserMenuProps {
  userData: any
  onRoleChange: (role: 'platform_admin' | 'client_admin' | 'developer' | 'business') => void
  onLogout: () => void
}

export function UserMenu({ userData, onRoleChange, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleRoleChange = (role: 'platform_admin' | 'client_admin' | 'developer' | 'business') => {
    onRoleChange(role)
    setIsOpen(false)
  }

  const getRoleName = (role: string) => {
    switch (role) {
      case 'platform_admin':
        return 'Admin Plateforme'
      case 'client_admin':
        return 'Admin Client'
      case 'developer':
        return 'Développeur IT'
      case 'business':
        return 'Utilisateur Métier'
      default:
        return role
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <Avatar>
          <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
            {userData?.name?.charAt(0).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute right-0 mt-2 w-72 z-50 shadow-soft-lg border-0">
            <div className="p-4 border-b border-gray-100 bg-gradient-blue-light">
              <p className="font-medium text-gray-900">{userData?.name}</p>
              <p className="text-xs text-gray-600 mt-0.5">{getRoleName(userData?.role)}</p>
              {userData?.organization && (
                <p className="text-xs text-blue-600 mt-1">🏢 {userData?.organization}</p>
              )}
            </div>

            <div className="p-2">
              <div className="px-2 py-1.5 text-sm font-medium text-gray-500">
                🎭 Changer de profil
              </div>

              <button
                onClick={() => handleRoleChange('platform_admin')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-gray-50 transition-colors ${
                  userData?.role === 'platform_admin' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                <Crown className="w-4 h-4" />
                <span className="flex-1 text-left">Admin Plateforme</span>
                {userData?.role === 'platform_admin' && <span className="text-blue-600">✓</span>}
              </button>

              <button
                onClick={() => handleRoleChange('client_admin')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-gray-50 transition-colors ${
                  userData?.role === 'client_admin' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                <UserCog className="w-4 h-4" />
                <span className="flex-1 text-left">Admin Client</span>
                {userData?.role === 'client_admin' && <span className="text-blue-600">✓</span>}
              </button>

              <button
                onClick={() => handleRoleChange('developer')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-gray-50 transition-colors ${
                  userData?.role === 'developer' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                <Code className="w-4 h-4" />
                <span className="flex-1 text-left">Développeur IT</span>
                {userData?.role === 'developer' && <span className="text-blue-600">✓</span>}
              </button>

              <button
                onClick={() => handleRoleChange('business')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-gray-50 transition-colors ${
                  userData?.role === 'business' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span className="flex-1 text-left">Utilisateur Métier</span>
                {userData?.role === 'business' && <span className="text-blue-600">✓</span>}
              </button>
            </div>

            <div className="border-t border-gray-100 p-2">
              <button
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                <Settings className="w-4 h-4" />
                Paramètres
              </button>
              <button
                onClick={() => {
                  setIsOpen(false)
                  onLogout()
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-gray-700"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
