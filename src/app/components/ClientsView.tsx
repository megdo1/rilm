import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Building2, Plus, Users, Bot, Workflow, Eye, TrendingUp } from 'lucide-react'
import { projectId } from '../utils/supabase/info'
import { toast } from 'sonner@2.0.3'

interface ClientsViewProps {
  accessToken: string
  onViewClient?: (clientId: string) => void
}

export function ClientsView({ accessToken, onViewClient }: ClientsViewProps) {
  const [clients, setClients] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/clients`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      const data = await response.json()
      setClients(data.clients || [])
    } catch (error) {
      console.error('Error fetching clients:', error)
      toast.error('Erreur lors du chargement des clients')
    } finally {
      setIsLoading(false)
    }
  }

  const createClient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsCreating(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('client-name') as string
    const contactEmail = formData.get('client-email') as string
    const contactName = formData.get('client-contact') as string
    const industry = formData.get('client-industry') as string

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/clients`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name,
            contactEmail,
            contactName,
            industry,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error)
        return
      }

      toast.success('✅ Client créé avec succès')
      fetchClients()
      
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      console.error('Error creating client:', error)
      toast.error('Erreur lors de la création du client')
    } finally {
      setIsCreating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">Gestion des Clients</h2>
          <p className="text-gray-600">
            Créez et gérez les clients de la plateforme
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-soft">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer un nouveau client</DialogTitle>
              <DialogDescription>
                Ajoutez un nouveau client à la plateforme
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={createClient} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="client-name">Nom du client</Label>
                <Input
                  id="client-name"
                  name="client-name"
                  placeholder="Entreprise ABC"
                  required
                  className="border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-contact">Nom du contact</Label>
                <Input
                  id="client-contact"
                  name="client-contact"
                  placeholder="Jean Dupont"
                  required
                  className="border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-email">Email de contact</Label>
                <Input
                  id="client-email"
                  name="client-email"
                  type="email"
                  placeholder="contact@entreprise.com"
                  required
                  className="border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-industry">Secteur d'activité</Label>
                <Input
                  id="client-industry"
                  name="client-industry"
                  placeholder="Finance, Santé, Retail..."
                  required
                  className="border-gray-200"
                />
              </div>
              <div className="flex justify-end gap-3">
                <DialogTrigger asChild>
                  <Button type="button" variant="outline">
                    Annuler
                  </Button>
                </DialogTrigger>
                <Button type="submit" disabled={isCreating} className="bg-blue-600 hover:bg-blue-700">
                  {isCreating ? 'Création...' : 'Créer le client'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">{clients.length}</h3>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Utilisateurs</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">
                  {clients.reduce((sum, c) => sum + (c.userCount || 0), 0)}
                </h3>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Agents Actifs</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">
                  {clients.reduce((sum, c) => sum + (c.agentCount || 0), 0)}
                </h3>
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
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">
                  {clients.reduce((sum, c) => sum + (c.workflowCount || 0), 0)}
                </h3>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl">
                <Workflow className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clients List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Liste des clients</h3>
        
        {clients.length === 0 ? (
          <Card className="shadow-soft border-0">
            <CardContent className="text-center py-12">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucun client pour le moment</p>
              <p className="text-sm text-gray-400 mt-1">Créez votre premier client</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {clients.map((client) => (
              <Card key={client.id} className="shadow-soft border-0 hover:shadow-soft-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 rounded-xl">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">{client.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {client.industry}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>👤 Contact: {client.contactName}</p>
                    <p>📧 {client.contactEmail}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{client.userCount || 0} utilisateurs</span>
                    <span>•</span>
                    <span>{client.agentCount || 12} agents</span>
                  </div>
                  <Badge variant="outline" className="border-green-200 text-green-700">
                    Actif
                  </Badge>
                  {onViewClient && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => onViewClient(client.id)}
                    >
                      <Eye className="w-3 h-3 mr-2" />
                      Voir les détails
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
