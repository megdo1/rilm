import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  Bot, 
  Workflow,
  Plus,
  Settings
} from 'lucide-react'
import { projectId } from '../utils/supabase/info'
import { toast } from 'sonner@2.0.3'

interface ClientDetailViewProps {
  clientId: string
  accessToken: string
  onBack: () => void
  onViewOrganizations?: (clientId: string) => void
  onViewUsers?: (clientId: string) => void
}

export function ClientDetailView({ 
  clientId, 
  accessToken, 
  onBack,
  onViewOrganizations,
  onViewUsers
}: ClientDetailViewProps) {
  const [client, setClient] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchClientDetails()
  }, [clientId])

  const fetchClientDetails = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/clients`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      const data = await response.json()
      const clientData = data.clients?.find((c: any) => c.id === clientId)
      setClient(clientData)
    } catch (error) {
      console.error('Error fetching client details:', error)
      toast.error('Erreur lors du chargement du client')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Client non trouvé</p>
        <Button onClick={onBack} className="mt-4" variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button onClick={onBack} variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-gray-900">{client.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="border-blue-200 text-blue-700">
                  {client.industry}
                </Badge>
                <span className="text-sm text-gray-500">
                  Client depuis le {new Date(client.createdAt || Date.now()).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Paramètres
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Organisations</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">{client.orgCount || 8}</h3>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Utilisateurs</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">{client.userCount || 45}</h3>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Agents</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">{client.agentCount || 67}</h3>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <Bot className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Workflows</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">{client.workflowCount || 23}</h3>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl">
                <Workflow className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-soft border-0 hover:shadow-soft-lg transition-shadow cursor-pointer"
              onClick={() => onViewOrganizations?.(clientId)}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-green-50 rounded-xl">
                  <Building2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-base">Organisations</CardTitle>
                  <CardDescription className="text-xs">
                    Gérer les organisations du client
                  </CardDescription>
                </div>
              </div>
              <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
            </div>
          </CardHeader>
        </Card>

        <Card className="shadow-soft border-0 hover:shadow-soft-lg transition-shadow cursor-pointer"
              onClick={() => onViewUsers?.(clientId)}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 rounded-xl">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-base">Utilisateurs</CardTitle>
                  <CardDescription className="text-xs">
                    Gérer les utilisateurs du client
                  </CardDescription>
                </div>
              </div>
              <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Client Info */}
      <Card className="shadow-soft border-0">
        <CardHeader>
          <CardTitle>Informations du client</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Contact principal</p>
            <p className="text-base text-gray-900 mt-1">{client.contactName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Email de contact</p>
            <p className="text-base text-gray-900 mt-1">{client.contactEmail}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Secteur d'activité</p>
            <p className="text-base text-gray-900 mt-1">{client.industry}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
