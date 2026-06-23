import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Badge } from './ui/badge'
import { Building2, Users, Plus, TrendingUp, Activity, Zap, BarChart3 } from 'lucide-react'
import { projectId } from '../utils/supabase/info'
import { toast } from 'sonner@2.0.3'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface AdminViewProps {
  accessToken: string
}

// Mock data for charts
const usageData = [
  { name: 'Lun', value: 245 },
  { name: 'Mar', value: 312 },
  { name: 'Mer', value: 289 },
  { name: 'Jeu', value: 378 },
  { name: 'Ven', value: 421 },
  { name: 'Sam', value: 198 },
  { name: 'Dim', value: 156 },
]

const performanceData = [
  { name: 'Jan', agents: 12, workflows: 8 },
  { name: 'Fév', agents: 19, workflows: 12 },
  { name: 'Mar', agents: 25, workflows: 18 },
  { name: 'Avr', agents: 32, workflows: 24 },
  { name: 'Mai', agents: 38, workflows: 29 },
  { name: 'Jun', agents: 45, workflows: 35 },
]

export function AdminView({ accessToken }: AdminViewProps) {
  const [clients, setClients] = useState<any[]>([])
  const [organizations, setOrganizations] = useState<any[]>([])
  const [isLoadingClients, setIsLoadingClients] = useState(true)
  const [isLoadingOrgs, setIsLoadingOrgs] = useState(true)
  const [isCreatingClient, setIsCreatingClient] = useState(false)
  const [isCreatingOrg, setIsCreatingOrg] = useState(false)

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

  const createClient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsCreatingClient(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('client-name') as string
    const deploymentMode = formData.get('deployment-mode') as string

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
            deploymentMode,
            allowedLLMs: ['gpt-4', 'claude-3-opus', 'gemini-pro'],
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error)
        return
      }

      toast.success('Client créé avec succès')
      fetchClients()
      
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      console.error('Error creating client:', error)
      toast.error('Erreur lors de la création du client')
    } finally {
      setIsCreatingClient(false)
    }
  }

  const createOrganization = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsCreatingOrg(true)

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

      toast.success('Organisation créée avec succès')
      fetchOrganizations()
      
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      console.error('Error creating organization:', error)
      toast.error("Erreur lors de la création de l'organisation")
    } finally {
      setIsCreatingOrg(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">Administration</h2>
        <p className="text-gray-600">
          Gérez les clients, organisations et surveillez les performances de la plateforme
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clients Actifs</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">
                  {clients.length}
                </h3>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% ce mois
                </p>
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
                <p className="text-sm font-medium text-gray-600">Organisations</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">
                  {organizations.length}
                </h3>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +8% ce mois
                </p>
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
                <p className="text-sm font-medium text-gray-600">Requêtes IA</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">2,847</h3>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +23% ce mois
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uptime</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">99.8%</h3>
                <p className="text-xs text-gray-500 mt-2">30 derniers jours</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-soft border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Utilisation Hebdomadaire
            </CardTitle>
            <CardDescription>Requêtes IA des 7 derniers jours</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={usageData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Croissance
            </CardTitle>
            <CardDescription>Agents et workflows créés par mois</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="agents" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="workflows" 
                  stroke="#60A5FA" 
                  strokeWidth={2}
                  dot={{ fill: '#60A5FA', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Clients Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Clients</h3>
            <p className="text-sm text-gray-600 mt-1">Gérez vos clients et leurs configurations</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-soft">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau client
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Créer un nouveau client</DialogTitle>
                <DialogDescription>
                  Ajoutez un nouveau client à la plateforme HEXAGONE.AI
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={createClient} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client-name">Nom du client</Label>
                  <Input
                    id="client-name"
                    name="client-name"
                    placeholder="Nom de l'entreprise"
                    required
                    className="border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deployment-mode">Mode de déploiement</Label>
                  <Select name="deployment-mode" required>
                    <SelectTrigger className="border-gray-200">
                      <SelectValue placeholder="Sélectionnez le mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SAAS">SAAS</SelectItem>
                      <SelectItem value="On-Premise">On-Premise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isCreatingClient}>
                  {isCreatingClient ? 'Création...' : 'Créer le client'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoadingClients ? (
          <div className="text-center py-12 text-gray-500">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2">Chargement...</p>
          </div>
        ) : clients.length === 0 ? (
          <Card className="shadow-soft border-0">
            <CardContent className="text-center py-12">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucun client pour le moment</p>
              <p className="text-sm text-gray-400 mt-1">Créez votre premier client pour commencer</p>
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
                        {new Date(client.createdAt).toLocaleDateString('fr-FR')}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-0">
                      {client.deploymentMode}
                    </Badge>
                    <p className="text-sm text-gray-600">
                      {client.allowedLLMs?.length || 0} modèles LLM
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Organizations Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Organisations</h3>
            <p className="text-sm text-gray-600 mt-1">Organisez vos équipes et départements</p>
          </div>
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
                  Ajoutez une organisation à un client existant
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={createOrganization} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Nom de l'organisation</Label>
                  <Input
                    id="org-name"
                    name="org-name"
                    placeholder="Service Commercial"
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
                      <SelectItem value="juridique">Service Juridique</SelectItem>
                      <SelectItem value="commercial">Service Commercial</SelectItem>
                      <SelectItem value="rh">Service RH</SelectItem>
                      <SelectItem value="marketing">Service Marketing</SelectItem>
                      <SelectItem value="it">Service IT</SelectItem>
                      <SelectItem value="generaux">Services Généraux</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isCreatingOrg}>
                  {isCreatingOrg ? 'Création...' : "Créer l'organisation"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

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
              <p className="text-sm text-gray-400 mt-1">Créez votre première organisation</p>
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
                      <CardTitle className="text-base">{org.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {new Date(org.createdAt).toLocaleDateString('fr-FR')}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="border-green-200 text-green-700">
                    {org.type}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
