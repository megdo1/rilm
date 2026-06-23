import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Plug, Check } from 'lucide-react'
import { projectId } from '../utils/supabase/info'
import { toast } from 'sonner@2.0.3'

interface ConnectorsViewProps {
  accessToken: string
}

export function ConnectorsView({ accessToken }: ConnectorsViewProps) {
  const [connectors, setConnectors] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [connectedIds, setConnectedIds] = useState<string[]>([])

  useEffect(() => {
    fetchConnectors()
  }, [])

  const fetchConnectors = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/connectors`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      const data = await response.json()
      setConnectors(data.connectors || [])
    } catch (error) {
      console.error('Error fetching connectors:', error)
      toast.error('Erreur lors du chargement des connecteurs')
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnect = (connectorId: string) => {
    setConnectedIds(prev =>
      prev.includes(connectorId)
        ? prev.filter(id => id !== connectorId)
        : [...prev, connectorId]
    )
    toast.success(
      connectedIds.includes(connectorId)
        ? 'Connecteur déconnecté'
        : 'Connecteur connecté avec succès'
    )
  }

  const groupedConnectors = connectors.reduce((acc, connector) => {
    if (!acc[connector.type]) {
      acc[connector.type] = []
    }
    acc[connector.type].push(connector)
    return acc
  }, {} as Record<string, any[]>)

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Plug className="w-8 h-8 text-indigo-600" />
          <h2 className="text-gray-900">Connecteurs</h2>
        </div>
        <p className="text-gray-600">
          Intégrez HEXAGONE.AI avec vos outils CRM, ERP, jobboards et logiciels de facturation
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Chargement...</div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedConnectors).map(([type, typeConnectors]) => (
            <div key={type}>
              <h3 className="text-gray-900 mb-4">{type}</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {typeConnectors.map((connector) => {
                  const isConnected = connectedIds.includes(connector.id)
                  return (
                    <Card
                      key={connector.id}
                      className={`hover:shadow-lg transition-shadow ${
                        isConnected ? 'border-green-200 bg-green-50' : ''
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">{connector.icon}</div>
                            <div>
                              <CardTitle>{connector.name}</CardTitle>
                              <CardDescription>
                                <Badge variant="secondary" className="mt-1">
                                  {connector.type}
                                </Badge>
                              </CardDescription>
                            </div>
                          </div>
                          {isConnected && (
                            <Check className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button
                          variant={isConnected ? 'outline' : 'default'}
                          className="w-full"
                          onClick={() => handleConnect(connector.id)}
                        >
                          {isConnected ? 'Déconnecter' : 'Connecter'}
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
