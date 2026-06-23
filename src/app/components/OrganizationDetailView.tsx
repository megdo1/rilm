import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Avatar, AvatarFallback } from './ui/avatar'
import { 
  Users, 
  Bot, 
  Workflow, 
  ArrowLeft, 
  Plus, 
  Settings, 
  TrendingUp,
  Activity,
  Code,
  MessageSquare,
  Play,
  Mail,
  UserPlus
} from 'lucide-react'
import { projectId } from '../utils/supabase/info'
import { toast } from 'sonner@2.0.3'

interface OrganizationDetailViewProps {
  organizationId: string
  accessToken: string
  userRole: string
  onBack: () => void
  onCreateAgent: (orgId: string) => void
  onCreateWorkflow: (orgId: string) => void
}

export function OrganizationDetailView({ 
  organizationId, 
  accessToken, 
  userRole,
  onBack,
  onCreateAgent,
  onCreateWorkflow
}: OrganizationDetailViewProps) {
  const [organization, setOrganization] = useState<any>(null)
  const [agents, setAgents] = useState<any[]>([])
  const [workflows, setWorkflows] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchOrganizationDetails()
  }, [organizationId])

  const fetchOrganizationDetails = async () => {
    try {
      // Fetch organization
      const orgResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/organizations`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      const orgData = await orgResponse.json()
      const org = orgData.organizations?.find((o: any) => o.id === organizationId)
      setOrganization(org)

      // Fetch agents for this organization
      const agentsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/agents?orgId=${organizationId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      const agentsData = await agentsResponse.json()
      setAgents(agentsData.agents || [])

      // Fetch workflows for this organization
      const workflowsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/workflows?orgId=${organizationId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      const workflowsData = await workflowsResponse.json()
      setWorkflows(workflowsData.workflows || [])

    } catch (error) {
      console.error('Error fetching organization details:', error)
      toast.error('Erreur lors du chargement de l\'organisation')
    } finally {
      setIsLoading(false)
    }
  }

  const getOrgIcon = (type: string) => {
    switch (type) {
      case 'juridique': return '⚖️'
      case 'commercial': return '💼'
      case 'rh': return '👥'
      case 'marketing': return '📢'
      case 'it': return '💻'
      case 'generaux': return '🏢'
      default: return '📁'
    }
  }

  const canManage = ['platform_admin', 'client_admin', 'developer'].includes(userRole)

  // Mock users for this organization
  const orgUsers = [
    { id: '1', name: 'Marie Dubois', email: 'marie.dubois@org.com', role: 'developer', status: 'active' },
    { id: '2', name: 'Pierre Martin', email: 'pierre.martin@org.com', role: 'business', status: 'active' },
    { id: '3', name: 'Sophie Bernard', email: 'sophie.bernard@org.com', role: 'business', status: 'active' },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!organization) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Organisation non trouvée</p>
        <Button onClick={onBack} className="mt-4" variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button onClick={onBack} variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-green-50 rounded-xl">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 flex items-center gap-2">
                <span>{getOrgIcon(organization.type)}</span>
                {organization.name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="border-green-200 text-green-700 capitalize">
                  {organization.type}
                </Badge>
                <span className="text-sm text-gray-500">
                  Créée le {new Date(organization.createdAt).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>
          </div>
        </div>
        {canManage && (
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Gérer
          </Button>
        )}
      </div>

      {/* KPIs */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Agents</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">{agents.length}</h3>
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
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">{workflows.length}</h3>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <Workflow className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Membres</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">{orgUsers.length}</h3>
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
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">1,247</h3>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +18% ce mois
                </p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="agents" className="space-y-6">
        <TabsList>
          <TabsTrigger value="agents">
            <Bot className="w-4 h-4 mr-2" />
            Agents ({agents.length})
          </TabsTrigger>
          <TabsTrigger value="workflows">
            <Workflow className="w-4 h-4 mr-2" />
            Workflows ({workflows.length})
          </TabsTrigger>
          <TabsTrigger value="members">
            <Users className="w-4 h-4 mr-2" />
            Membres ({orgUsers.length})
          </TabsTrigger>
          <TabsTrigger value="activity">
            <Activity className="w-4 h-4 mr-2" />
            Activité
          </TabsTrigger>
        </TabsList>

        {/* Agents Tab */}
        <TabsContent value="agents" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Agents de l'organisation</h3>
              <p className="text-sm text-gray-600 mt-1">
                Agents IA créés pour cette organisation
              </p>
            </div>
            {canManage && (
              <Button 
                className="bg-blue-600 hover:bg-blue-700 shadow-soft"
                onClick={() => onCreateAgent(organizationId)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nouvel agent
              </Button>
            )}
          </div>

          {agents.length === 0 ? (
            <Card className="shadow-soft border-0">
              <CardContent className="text-center py-12">
                <Bot className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Aucun agent pour cette organisation</p>
                {canManage && (
                  <p className="text-sm text-gray-400 mt-1">Créez votre premier agent</p>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {agents.map((agent) => (
                <Card key={agent.id} className="shadow-soft border-0 hover:shadow-soft-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-50 rounded-xl">
                        {agent.type === 'code-based' ? (
                          <Code className="w-5 h-5 text-blue-600" />
                        ) : (
                          <MessageSquare className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base">{agent.name}</CardTitle>
                        <CardDescription className="text-xs line-clamp-1">
                          {agent.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-0">
                        {agent.llmModel}
                      </Badge>
                      <Badge variant="outline" className="border-gray-200 text-gray-600">
                        {agent.type === 'code-based' ? '💻 Code' : '💬 Prompt'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{agent.usageCount || 0} exécutions</span>
                      <span className="text-xs">{new Date(agent.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Play className="w-3 h-3 mr-1" />
                      Tester
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Workflows Tab */}
        <TabsContent value="workflows" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Workflows de l'organisation</h3>
              <p className="text-sm text-gray-600 mt-1">
                Workflows automatisés pour cette organisation
              </p>
            </div>
            {canManage && (
              <Button 
                className="bg-blue-600 hover:bg-blue-700 shadow-soft"
                onClick={() => onCreateWorkflow(organizationId)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nouveau workflow
              </Button>
            )}
          </div>

          {workflows.length === 0 ? (
            <Card className="shadow-soft border-0">
              <CardContent className="text-center py-12">
                <Workflow className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Aucun workflow pour cette organisation</p>
                {canManage && (
                  <p className="text-sm text-gray-400 mt-1">Créez votre premier workflow</p>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {workflows.map((workflow) => (
                <Card key={workflow.id} className="shadow-soft border-0 hover:shadow-soft-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-purple-50 rounded-xl">
                        <Workflow className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base">{workflow.name}</CardTitle>
                        <CardDescription className="text-xs line-clamp-1">
                          {workflow.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <p>{workflow.agentIds?.length || 0} agents dans ce workflow</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      Créé le {new Date(workflow.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Play className="w-3 h-3 mr-1" />
                      Exécuter
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Membres de l'organisation</h3>
              <p className="text-sm text-gray-600 mt-1">
                Utilisateurs ayant accès à cette organisation
              </p>
            </div>
            {canManage && (
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-soft">
                <UserPlus className="w-4 h-4 mr-2" />
                Inviter un membre
              </Button>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {orgUsers.map((user) => (
              <Card key={user.id} className="shadow-soft border-0 hover:shadow-soft-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-base">{user.name}</CardTitle>
                      <CardDescription className="text-xs flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="border-blue-200 text-blue-700 capitalize">
                    {user.role === 'developer' ? '💻 Développeur' : '📊 Métier'}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle>Activité Récente</CardTitle>
              <CardDescription>Dernières actions dans cette organisation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'Agent créé', name: 'Assistant RH', user: 'Marie Dubois', time: 'Il y a 2h', type: 'agent' },
                  { action: 'Workflow exécuté', name: 'Analyse candidatures', user: 'Pierre Martin', time: 'Il y a 3h', type: 'workflow' },
                  { action: 'Membre ajouté', name: 'Sophie Bernard', user: 'Marie Dubois', time: 'Il y a 5h', type: 'user' },
                  { action: 'Agent modifié', name: 'ChatBot RH', user: 'Marie Dubois', time: 'Il y a 1j', type: 'agent' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`p-2 rounded-lg ${
                      item.type === 'agent' ? 'bg-blue-50' :
                      item.type === 'workflow' ? 'bg-purple-50' : 'bg-green-50'
                    }`}>
                      {item.type === 'agent' && <Bot className="w-4 h-4 text-blue-600" />}
                      {item.type === 'workflow' && <Workflow className="w-4 h-4 text-purple-600" />}
                      {item.type === 'user' && <Users className="w-4 h-4 text-green-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.action}: {item.name}</p>
                      <p className="text-xs text-gray-500">Par {item.user} • {item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
