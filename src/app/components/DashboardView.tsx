import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Building2, Users, Activity, TrendingUp, Zap, BarChart3, Bot, Workflow as WorkflowIcon } from 'lucide-react'
import { projectId } from '../utils/supabase/info'
import { toast } from 'sonner@2.0.3'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface DashboardViewProps {
  accessToken: string
  userRole: string
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

const platformUsageData = [
  { name: 'Lun', clients: 12, agents: 245, requests: 1240 },
  { name: 'Mar', clients: 13, agents: 312, requests: 1580 },
  { name: 'Mer', clients: 13, agents: 289, requests: 1450 },
  { name: 'Jeu', clients: 15, agents: 378, requests: 1890 },
  { name: 'Ven', clients: 16, agents: 421, requests: 2100 },
  { name: 'Sam', clients: 16, agents: 198, requests: 990 },
  { name: 'Dim', clients: 16, agents: 156, requests: 780 },
]

export function DashboardView({ accessToken, userRole }: DashboardViewProps) {
  const [clients, setClients] = useState<any[]>([])
  const [organizations, setOrganizations] = useState<any[]>([])
  const [agents, setAgents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [clientsRes, orgsRes, agentsRes] = await Promise.all([
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/clients`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/organizations`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/agents`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      ])

      const clientsData = await clientsRes.json()
      const orgsData = await orgsRes.json()
      const agentsData = await agentsRes.json()

      setClients(clientsData.clients || [])
      setOrganizations(orgsData.organizations || [])
      setAgents(agentsData.agents || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast.error('Erreur lors du chargement des données')
    } finally {
      setIsLoading(false)
    }
  }

  const getDashboardTitle = () => {
    switch (userRole) {
      case 'platform_admin':
        return 'Dashboard Plateforme'
      case 'client_admin':
        return 'Dashboard Client'
      case 'developer':
        return 'Dashboard Développeur'
      case 'business':
        return 'Dashboard Utilisateur'
      default:
        return 'Dashboard'
    }
  }

  const getDashboardDescription = () => {
    switch (userRole) {
      case 'platform_admin':
        return 'Vue d\'ensemble globale de la plateforme HEXAGONE.AI'
      case 'client_admin':
        return 'Vue d\'ensemble de votre organisation et ses activités'
      case 'developer':
        return 'Statistiques de vos développements et agents'
      case 'business':
        return 'Vos activités et agents favoris'
      default:
        return 'Vue d\'ensemble de vos activités'
    }
  }

  // KPIs adaptés selon le rôle
  const renderKPIs = () => {
    if (userRole === 'platform_admin') {
      return (
        <>
          <Card className="shadow-soft border-0 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Clients</p>
                  <h3 className="text-3xl font-semibold text-gray-900 mt-2">{clients.length}</h3>
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
                  <h3 className="text-3xl font-semibold text-gray-900 mt-2">{organizations.length}</h3>
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
                  <h3 className="text-3xl font-semibold text-gray-900 mt-2">{agents.length}</h3>
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +42% ce mois
                  </p>
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
        </>
      )
    }

    // KPIs pour les autres rôles
    return (
      <>
        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mes Agents</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">{agents.length}</h3>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% ce mois
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <Bot className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Workflows</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">8</h3>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +3 ce mois
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <WorkflowIcon className="w-6 h-6 text-green-600" />
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
                <p className="text-sm font-medium text-gray-600">Taux de réussite</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">98.5%</h3>
                <p className="text-xs text-gray-500 mt-2">7 derniers jours</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    )
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
      <div>
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">{getDashboardTitle()}</h2>
        <p className="text-gray-600">{getDashboardDescription()}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {renderKPIs()}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-soft border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Utilisation Hebdomadaire
            </CardTitle>
            <CardDescription>Activité des 7 derniers jours</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
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
            <CardDescription>Évolution agents et workflows</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
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
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="agents" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', r: 4 }}
                  name="Agents"
                />
                <Line 
                  type="monotone" 
                  dataKey="workflows" 
                  stroke="#60A5FA" 
                  strokeWidth={2}
                  dot={{ fill: '#60A5FA', r: 4 }}
                  name="Workflows"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-soft border-0 bg-white">
        <CardHeader>
          <CardTitle>Activité Récente</CardTitle>
          <CardDescription>Dernières actions sur la plateforme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'Agent créé', name: 'Assistant RH', time: 'Il y a 2h', type: 'agent' },
              { action: 'Workflow exécuté', name: 'Analyse de contrats', time: 'Il y a 3h', type: 'workflow' },
              { action: 'Utilisateur ajouté', name: 'marie.dubois@entreprise.com', time: 'Il y a 5h', type: 'user' },
              { action: 'Agent modifié', name: 'ChatBot Support', time: 'Il y a 1j', type: 'agent' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-lg ${
                  item.type === 'agent' ? 'bg-blue-50' :
                  item.type === 'workflow' ? 'bg-green-50' : 'bg-purple-50'
                }`}>
                  {item.type === 'agent' && <Bot className="w-4 h-4 text-blue-600" />}
                  {item.type === 'workflow' && <WorkflowIcon className="w-4 h-4 text-green-600" />}
                  {item.type === 'user' && <Users className="w-4 h-4 text-purple-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.action}</p>
                  <p className="text-xs text-gray-500">{item.name}</p>
                </div>
                <p className="text-xs text-gray-400">{item.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
