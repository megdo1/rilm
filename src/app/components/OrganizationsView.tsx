import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Badge } from './ui/badge'
import { Users, Plus, Building2, TrendingUp, Eye, ChevronRight } from 'lucide-react'
import { projectId } from '../utils/supabase/info'
import { toast } from 'sonner@2.0.3'

interface OrganizationsViewProps {
  accessToken: string
  userRole: string
  onViewOrganization?: (orgId: string) => void
}

export function OrganizationsView({ accessToken, userRole, onViewOrganization }: OrganizationsViewProps) {
  const [clients, setClients] = useState<any[]>([])
  const [organizations, setOrganizations] = useState<any[]>([])
  const [isLoadingClients, setIsLoadingClients] = useState(true)
  const [isLoadingOrgs, setIsLoadingOrgs] = useState(true)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    fetchClients()
    fetchOrganizations()
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
      setIsLoadingClients(false)
    }
  }

  const fetchOrganizations = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/organizations`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      const data = await response.json()
      setOrganizations(data.organizations || [])
    } catch (error) {
      console.error('Error fetching organizations:', error)
      toast.error('Erreur lors du chargement des organisations')
    } finally {
      setIsLoadingOrgs(false)
    }
  }

  const createOrganization = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsCreating(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('org-name') as string
    const clientId = formData.get('org-client') as string
    const type = formData.get('org-type') as string

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/organizations`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name,
            clientId,
            type,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error)
        return
      }

      toast.success('✅ Organisation créée avec succès')
      fetchOrganizations()
      
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      console.error('Error creating organization:', error)
      toast.error("Erreur lors de la création de l'organisation")
    } finally {
      setIsCreating(false)
    }
  }

  const canCreateOrganization = ['platform_admin', 'client_admin'].includes(userRole)

  const getOrgIcon = (type: string) => {
    switch (type) {
      case 'juridique':
        return '⚖️'
      case 'commercial':
        return '💼'
      case 'rh':
        return '👥'
      case 'marketing':
        return '📢'
      case 'it':
        return '💻'
      case 'generaux':
        return '🏢'
      default:
        return '📁'
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">Organisations</h2>
          <p className="text-gray-600">
            {canCreateOrganization ? 'Gérez les départements et équipes de vos clients' : 'Vue d\'ensemble de votre organisation'}
          </p>
        </div>
        {canCreateOrganization && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-soft">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle organisation
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Créer une nouvelle organisation</DialogTitle>
                <DialogDescription>
                  Ajoutez un département ou une équipe
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={createOrganization} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Nom de l'organisation</Label>
                  <Input
                    id="org-name"
                    name="org-name"
                    placeholder="Service Commercial, Équipe RH..."
                    required
                    className="border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-client">Client</Label>
                  <Select name="org-client" required>
                    <SelectTrigger className="border-gray-200">
                      <SelectValue placeholder="Sélectionnez un client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-type">Type d'organisation</Label>
                  <Select name="org-type" required>
                    <SelectTrigger className="border-gray-200">
                      <SelectValue placeholder="Sélectionnez le type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="juridique">⚖️ Service Juridique</SelectItem>
                      <SelectItem value="commercial">💼 Service Commercial</SelectItem>
                      <SelectItem value="rh">👥 Service RH</SelectItem>
                      <SelectItem value="marketing">📢 Service Marketing</SelectItem>
                      <SelectItem value="it">💻 Service IT</SelectItem>
                      <SelectItem value="generaux">🏢 Services Généraux</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isCreating}>
                  {isCreating ? 'Création...' : "Créer l'organisation"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Organisations</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">{organizations.length}</h3>
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
                <p className="text-sm font-medium text-gray-600">Clients Actifs</p>
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
                <p className="text-sm font-medium text-gray-600">Croissance</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">+15%</h3>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Ce mois
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Organizations List */}
      {isLoadingOrgs ? (
        <div className="text-center py-12 text-gray-500">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2">Chargement...</p>
        </div>
      ) : organizations.length === 0 ? (
        <Card className="shadow-soft border-0">
          <CardContent className="text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucune organisation pour le moment</p>
            {canCreateOrganization && (
              <p className="text-sm text-gray-400 mt-1">Créez votre première organisation</p>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {organizations.map((org) => (
            <Card key={org.id} className="shadow-soft border-0 hover:shadow-soft-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-green-50 rounded-xl">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span>{getOrgIcon(org.type)}</span>
                      {org.name}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {new Date(org.createdAt).toLocaleDateString('fr-FR')}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge variant="outline" className="border-green-200 text-green-700 capitalize">
                  {org.type}
                </Badge>
                <div className="text-sm text-gray-600">
                  <p>• Agents actifs: 12</p>
                  <p>• Utilisateurs: 24</p>
                  <p>• Workflows: 5</p>
                </div>
                {onViewOrganization && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => onViewOrganization(org.id)}
                  >
                    <Eye className="w-3 h-3 mr-2" />
                    Voir les détails
                    <ChevronRight className="w-3 h-3 ml-auto" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
