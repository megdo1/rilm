import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Badge } from './ui/badge'
import { Building2, Users, Plus, TrendingUp, Activity, Zap, BarChart3, Crown, Database, Globe } from 'lucide-react'
import { projectId } from '../utils/supabase/info'
import { toast } from 'sonner@2.0.3'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface PlatformAdminViewProps {
  accessToken: string
}

// Mock data for Platform-wide analytics
const platformUsageData = [
  { name: 'Lun', clients: 12, agents: 245, requests: 1240 },
  { name: 'Mar', clients: 13, agents: 312, requests: 1580 },
  { name: 'Mer', clients: 13, agents: 289, requests: 1450 },
  { name: 'Jeu', clients: 15, agents: 378, requests: 1890 },
  { name: 'Ven', clients: 16, agents: 421, requests: 2100 },
  { name: 'Sam', clients: 16, agents: 198, requests: 990 },
  { name: 'Dim', clients: 16, agents: 156, requests: 780 },
]

const clientGrowthData = [
  { name: 'Jan', total: 5 },
  { name: 'Fév', total: 7 },
  { name: 'Mar', total: 10 },
  { name: 'Avr', total: 12 },
  { name: 'Mai', total: 14 },
  { name: 'Jun', total: 16 },
]

export function PlatformAdminView({ accessToken }: PlatformAdminViewProps) {
  const [clients, setClients] = useState<any[]>([])
  const [organizations, setOrganizations] = useState<any[]>([])
  const [isLoadingClients, setIsLoadingClients] = useState(true)
  const [isLoadingOrgs, setIsLoadingOrgs] = useState(true)
  const [isCreatingClient, setIsCreatingClient] = useState(false)

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

      toast.success('✅ Client créé avec succès')
      fetchClients()
      
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      console.error('Error creating client:', error)
      toast.error('Erreur lors de la création du client')
    } finally {
      setIsCreatingClient(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-blue rounded-xl shadow-soft">
          <Crown className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">Administration Plateforme</h2>
          <p className="text-gray-600 mt-1">
            Vue d'ensemble complète de la plateforme HEXAGONE.AI
          </p>
        </div>
      </div>

      {/* Platform-wide KPIs */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">
                  {clients.length}
                </h3>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +28% ce trimestre
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
                  +15% ce mois
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
                <p className="text-sm font-medium text-gray-600">Agents Actifs</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">1,247</h3>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +42% ce mois
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
                <p className="text-sm font-medium text-gray-600">Uptime Global</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">99.9%</h3>
                <p className="text-xs text-gray-500 mt-2">30 derniers jours</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-soft border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Activité Plateforme (7 jours)
            </CardTitle>
            <CardDescription>Évolution des clients, agents et requêtes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={platformUsageData}>
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
                <Legend />
                <Bar dataKey="clients" fill="#3B82F6" name="Clients" radius={[4, 4, 0, 0]} />
                <Bar dataKey="agents" fill="#60A5FA" name="Agents" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Croissance Clients (6 mois)
            </CardTitle>
            <CardDescription>Nombre total de clients au fil du temps</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={clientGrowthData}>
                <defs>
                  <linearGradient id="colorClients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
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
                  dataKey="total" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  fill="url(#colorClients)"
                  name="Clients"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Clients Management */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              Gestion des Clients
            </h3>
            <p className="text-sm text-gray-600 mt-1">Tous les clients de la plateforme</p>
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
                      <SelectItem value="SAAS">☁️ SAAS</SelectItem>
                      <SelectItem value="On-Premise">🏢 On-Premise</SelectItem>
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
                    <Badge 
                      variant="secondary" 
                      className={client.deploymentMode === 'SAAS' ? 'bg-blue-50 text-blue-700 border-0' : 'bg-purple-50 text-purple-700 border-0'}
                    >
                      {client.deploymentMode === 'SAAS' ? '☁️' : '🏢'} {client.deploymentMode}
                    </Badge>
                    <p className="text-sm text-gray-600">
                      {client.allowedLLMs?.length || 0} modèles LLM autorisés
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Platform Info */}
      <Card className="shadow-soft border-0 bg-gradient-blue-light">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500 rounded-xl">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">Informations Plateforme</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Version</p>
                  <p className="font-medium text-gray-900">v2.4.1</p>
                </div>
                <div>
                  <p className="text-gray-600">Environnement</p>
                  <p className="font-medium text-gray-900">Production</p>
                </div>
                <div>
                  <p className="text-gray-600">Base de données</p>
                  <p className="font-medium text-gray-900">Supabase</p>
                </div>
                <div>
                  <p className="text-gray-600">Cloud</p>
                  <p className="font-medium text-gray-900">Multi-Cloud</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
