import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Activity, Zap, AlertTriangle, CheckCircle2, Clock, TrendingUp, Server, Database, Globe } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface MonitoringViewProps {
  accessToken: string
  userRole: string
}

// Mock data
const uptimeData = [
  { time: '00:00', uptime: 100, requests: 1240 },
  { time: '04:00', uptime: 100, requests: 980 },
  { time: '08:00', uptime: 99.8, requests: 2100 },
  { time: '12:00', uptime: 100, requests: 3200 },
  { time: '16:00', uptime: 100, requests: 2800 },
  { time: '20:00', uptime: 99.9, requests: 2100 },
]

const responseTimeData = [
  { name: 'Lun', api: 120, agents: 340, workflows: 280 },
  { name: 'Mar', api: 115, agents: 325, workflows: 265 },
  { name: 'Mer', api: 125, agents: 350, workflows: 290 },
  { name: 'Jeu', api: 110, agents: 310, workflows: 260 },
  { name: 'Ven', api: 118, agents: 330, workflows: 275 },
  { name: 'Sam', api: 105, agents: 300, workflows: 250 },
  { name: 'Dim', api: 100, agents: 295, workflows: 245 },
]

const errorRateData = [
  { name: 'Lun', errors: 12, total: 1240 },
  { name: 'Mar', errors: 8, total: 1580 },
  { name: 'Mer', errors: 15, total: 1450 },
  { name: 'Jeu', errors: 6, total: 1890 },
  { name: 'Ven', errors: 10, total: 2100 },
  { name: 'Sam', errors: 4, total: 990 },
  { name: 'Dim', errors: 3, total: 780 },
]

export function MonitoringView({ accessToken, userRole }: MonitoringViewProps) {
  const services = [
    { name: 'API Gateway', status: 'operational', uptime: '99.98%', responseTime: '112ms' },
    { name: 'Agent Engine', status: 'operational', uptime: '99.95%', responseTime: '320ms' },
    { name: 'Workflow Engine', status: 'degraded', uptime: '99.87%', responseTime: '380ms' },
    { name: 'Database', status: 'operational', uptime: '99.99%', responseTime: '45ms' },
    { name: 'Storage', status: 'operational', uptime: '99.96%', responseTime: '89ms' },
    { name: 'Authentication', status: 'operational', uptime: '100%', responseTime: '78ms' },
  ]

  const recentIncidents = [
    {
      id: 1,
      title: 'Ralentissement du Workflow Engine',
      status: 'investigating',
      severity: 'medium',
      time: 'Il y a 15 min',
      description: 'Temps de réponse élevé détecté'
    },
    {
      id: 2,
      title: 'Maintenance programmée',
      status: 'scheduled',
      severity: 'low',
      time: 'Aujourd\'hui 23:00',
      description: 'Mise à jour de sécurité planifiée'
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'degraded':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'outage':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />
      case 'degraded':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case 'outage':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-700'
      case 'high':
        return 'bg-orange-100 text-orange-700'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700'
      case 'low':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">Monitoring</h2>
        <p className="text-gray-600">
          Surveillance en temps réel des performances et disponibilité
        </p>
      </div>

      {/* System Status Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uptime Global</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">99.9%</h3>
                <p className="text-xs text-gray-500 mt-2">30 derniers jours</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Temps de réponse</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">112ms</h3>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  -8ms vs hier
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taux d'erreur</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">0.3%</h3>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  -0.1% vs hier
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Requêtes/jour</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">28.4K</h3>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% vs hier
                </p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Status */}
      <Card className="shadow-soft border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-600" />
            État des Services
          </CardTitle>
          <CardDescription>Statut en temps réel de tous les services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {service.name.includes('Database') && <Database className="w-5 h-5 text-gray-600" />}
                    {service.name.includes('Gateway') && <Globe className="w-5 h-5 text-gray-600" />}
                    {!service.name.includes('Database') && !service.name.includes('Gateway') && (
                      <Server className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{service.name}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-500">Uptime: {service.uptime}</span>
                      <span className="text-xs text-gray-500">Temps: {service.responseTime}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(service.status)}>
                  {getStatusIcon(service.status)}
                  <span className="ml-1 capitalize">{service.status === 'operational' ? 'Opérationnel' : service.status}</span>
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-soft border-0 bg-white">
          <CardHeader>
            <CardTitle>Uptime & Requêtes (24h)</CardTitle>
            <CardDescription>Disponibilité et volume de requêtes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={uptimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="time" stroke="#94A3B8" fontSize={12} />
                <YAxis yAxisId="left" stroke="#94A3B8" fontSize={12} domain={[99, 100]} />
                <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" fontSize={12} />
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
                  yAxisId="left"
                  type="monotone" 
                  dataKey="uptime" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ fill: '#10B981', r: 4 }}
                  name="Uptime (%)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="requests" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', r: 4 }}
                  name="Requêtes"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0 bg-white">
          <CardHeader>
            <CardTitle>Temps de Réponse (7 jours)</CardTitle>
            <CardDescription>Performance moyenne par composant</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={responseTimeData}>
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
                <Bar dataKey="api" fill="#3B82F6" name="API (ms)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="agents" fill="#60A5FA" name="Agents (ms)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="workflows" fill="#93C5FD" name="Workflows (ms)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Error Rate */}
      <Card className="shadow-soft border-0 bg-white">
        <CardHeader>
          <CardTitle>Taux d'Erreurs (7 jours)</CardTitle>
          <CardDescription>Évolution des erreurs par rapport au volume total</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={errorRateData}>
              <defs>
                <linearGradient id="colorErrors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
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
                dataKey="errors" 
                stroke="#EF4444" 
                strokeWidth={2}
                fill="url(#colorErrors)"
                name="Erreurs"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Incidents */}
      <Card className="shadow-soft border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Incidents & Maintenances
          </CardTitle>
          <CardDescription>Historique des incidents et maintenances planifiées</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentIncidents.map((incident) => (
              <div key={incident.id} className="p-4 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{incident.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{incident.description}</p>
                  </div>
                  <Badge className={getSeverityColor(incident.severity)}>
                    {incident.severity === 'critical' && '🔴'}
                    {incident.severity === 'high' && '🟠'}
                    {incident.severity === 'medium' && '🟡'}
                    {incident.severity === 'low' && '🔵'}
                    <span className="ml-1 capitalize">{incident.severity}</span>
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {incident.time}
                  </span>
                  <span className="capitalize">{incident.status === 'investigating' ? '🔍 Investigation' : '📅 Planifié'}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
