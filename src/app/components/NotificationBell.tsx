import { useState } from 'react'
import { Bell } from 'lucide-react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
}

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Nouvel agent déployé',
      message: 'L\'agent "Support Client" a été déployé avec succès',
      time: 'Il y a 5 min',
      read: false
    },
    {
      id: '2',
      title: 'Workflow terminé',
      message: 'Le workflow "Analyse Sentiment" s\'est exécuté sans erreur',
      time: 'Il y a 1h',
      read: false
    },
    {
      id: '3',
      title: 'Mise à jour disponible',
      message: 'Une nouvelle version du connecteur Salesforce est disponible',
      time: 'Il y a 3h',
      read: true
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute right-0 mt-2 w-80 z-50 shadow-soft-lg">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {unreadCount} nouvelles
                  </Badge>
                )}
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      !notification.read ? 'bg-blue-500' : 'bg-gray-300'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t bg-gray-50">
              <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
                Voir toutes les notifications
              </button>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
