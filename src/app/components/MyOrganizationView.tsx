import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { mockDirections, mockAgents, mockWorkflows } from '../utils/mockData'
import { Building2, Users, Bot, ChevronRight, MapPin, Star, CheckCircle2, Workflow, Globe, Lock, Activity, Clock, TrendingUp, Play, ChevronDown, Briefcase } from 'lucide-react'
import { AgentDetailCard } from './AgentDetailCard'
import { WorkflowDetailCard } from './WorkflowDetailCard'

interface MyOrganizationViewProps {
  userDirection?: string
  userDepartement?: string
  onExecuteAgent?: (agentId: string) => void
  onExecuteWorkflow?: (workflowId: string) => void
  organizationName?: string
  currentUserId?: string
}

export function MyOrganizationView({ 
  userDirection = 'dir-2', // Default: Direction Commerciale
  userDepartement = 'dept-2-1', // Default: Département Ventes
  onExecuteAgent,
  onExecuteWorkflow,
  organizationName = 'Hexagone Digitale',
  currentUserId
}: MyOrganizationViewProps) {
  const [expandedDirections, setExpandedDirections] = useState<string[]>([userDirection])

  const toggleDirection = (directionId: string) => {
    setExpandedDirections(prev =>
      prev.includes(directionId)
        ? prev.filter(id => id !== directionId)
        : [...prev, directionId]
    )
  }

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; bgLight: string }> = {
      purple: { 
        bg: 'bg-purple-500', 
        border: 'border-purple-200', 
        text: 'text-purple-600',
        bgLight: 'bg-purple-50'
      },
      blue: { 
        bg: 'bg-blue-500', 
        border: 'border-blue-200', 
        text: 'text-blue-600',
        bgLight: 'bg-blue-50'
      },
      green: { 
        bg: 'bg-green-500', 
        border: 'border-green-200', 
        text: 'text-green-600',
        bgLight: 'bg-green-50'
      },
      orange: { 
        bg: 'bg-orange-500', 
        border: 'border-orange-200', 
        text: 'text-orange-600',
        bgLight: 'bg-orange-50'
      },
      pink: { 
        bg: 'bg-pink-500', 
        border: 'border-pink-200', 
        text: 'text-pink-600',
        bgLight: 'bg-pink-50'
      },
      emerald: { 
        bg: 'bg-emerald-500', 
        border: 'border-emerald-200', 
        text: 'text-emerald-600',
        bgLight: 'bg-emerald-50'
      },
    }
    return colors[color] || colors.blue
  }

  // Get user's direction and department
  const userDirectionData = mockDirections.find(d => d.id === userDirection)
  const userDepartementData = userDirectionData?.departements.find(d => d.id === userDepartement)

  // Filter agents and workflows for user's department and direction
  const myAgents = mockAgents.filter(agent => 
    agent.departementId === userDepartement || 
    (agent.directionId === userDirection && agent.shared)
  )

  const myWorkflows = mockWorkflows.filter(workflow => 
    workflow.departementId === userDepartement || 
    (workflow.directionId === userDirection && workflow.shared)
  )

  // Calculate total stats
  const totalDepartments = mockDirections.reduce((acc, d) => acc + d.departements.length, 0)
  const totalUsers = mockDirections.reduce((acc, d) => 
    acc + d.departements.reduce((sum, dept) => sum + dept.userCount, 0), 0
  )
  const totalAgents = mockDirections.reduce((acc, d) => 
    acc + d.departements.reduce((sum, dept) => sum + dept.agentCount, 0), 0
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">{organizationName}</h1>
        <p className="text-gray-600">
          Structure organisationnelle complète et votre positionnement
        </p>
      </div>

      {/* Organization Global Structure - Vertical Tree */}
      <Card className="shadow-soft border border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-blue rounded-xl">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Organisation Globale</CardTitle>
                <CardDescription>Arborescence complète de l'entreprise</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                <Building2 className="w-3.5 h-3.5 mr-1" />
                {mockDirections.length} Directions
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                <Users className="w-3.5 h-3.5 mr-1" />
                {totalUsers} Collaborateurs
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">
                <Bot className="w-3.5 h-3.5 mr-1" />
                {totalAgents} Agents IA
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Company Root */}
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md mb-6">
              <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white text-lg">{organizationName}</h3>
                <p className="text-blue-100 text-sm">Entreprise • {totalDepartments} départements • {totalUsers} collaborateurs</p>
              </div>
            </div>

            {/* Directions and Departments Tree */}
            <div className="space-y-3 pl-6 border-l-2 border-gray-200">
              {mockDirections.map((direction, dirIndex) => {
                const isExpanded = expandedDirections.includes(direction.id)
                const isMyDirection = direction.id === userDirection
                const colorClasses = getColorClasses(direction.color)
                const isLastDirection = dirIndex === mockDirections.length - 1

                return (
                  <div key={direction.id} className="relative">
                    {/* Horizontal connector line */}
                    <div className="absolute left-0 top-6 w-6 h-px bg-gray-200"></div>
                    
                    {/* Direction Card */}
                    <div className="ml-6">
                      <Card 
                        className={`transition-all duration-200 cursor-pointer ${
                          isMyDirection 
                            ? 'border-2 border-blue-400 bg-gradient-to-r from-blue-50 to-white shadow-md' 
                            : 'border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }`}
                        onClick={() => toggleDirection(direction.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 ${colorClasses.bg} rounded-lg flex-shrink-0`}>
                              <span className="text-2xl">{direction.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-gray-900">{direction.name}</h4>
                                {isMyDirection && (
                                  <Badge className="bg-blue-500 text-white">
                                    <Star className="w-3 h-3 mr-1 fill-white" />
                                    Ma Direction
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{direction.description}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Building2 className="w-3.5 h-3.5" />
                                  {direction.departements.length} départements
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-3.5 h-3.5" />
                                  {direction.departements.reduce((acc, d) => acc + d.userCount, 0)} collaborateurs
                                </span>
                                <span className="flex items-center gap-1">
                                  <Bot className="w-3.5 h-3.5" />
                                  {direction.departements.reduce((acc, d) => acc + d.agentCount, 0)} agents IA
                                </span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="flex-shrink-0">
                              <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Departments List */}
                      {isExpanded && (
                        <div className="mt-3 space-y-2 pl-6 border-l-2 border-gray-200">
                          {direction.departements.map((dept, deptIndex) => {
                            const isMyDept = dept.id === userDepartement
                            const isLastDept = deptIndex === direction.departements.length - 1

                            return (
                              <div key={dept.id} className="relative">
                                {/* Horizontal connector line */}
                                <div className="absolute left-0 top-5 w-6 h-px bg-gray-200"></div>
                                
                                <div className="ml-6">
                                  <div
                                    className={`p-4 rounded-lg border transition-all duration-200 ${
                                      isMyDept
                                        ? 'border-2 border-blue-500 bg-gradient-to-r from-blue-50 to-white shadow-md'
                                        : `border ${colorClasses.border} ${colorClasses.bgLight} hover:shadow-sm hover:border-opacity-80`
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className={`p-2 ${isMyDept ? 'bg-blue-500' : colorClasses.bg} rounded-lg flex-shrink-0`}>
                                        <Building2 className="w-4 h-4 text-white" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                          <h5 className="font-medium text-gray-900">{dept.name}</h5>
                                          {isMyDept && (
                                            <Badge className="bg-blue-500 text-white">
                                              <CheckCircle2 className="w-3 h-3 mr-1" />
                                              Mon Département
                                            </Badge>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-gray-600">
                                          <span className="flex items-center gap-1">
                                            <Users className="w-3.5 h-3.5" />
                                            {dept.userCount} personnes
                                          </span>
                                          <span className="flex items-center gap-1">
                                            <Bot className="w-3.5 h-3.5" />
                                            {dept.agentCount} agents
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* My Position Card */}
      <Card className="shadow-soft border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500 rounded-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="text-xl">Ma Position Actuelle</CardTitle>
          </div>
          <CardDescription>Votre rattachement organisationnel dans l'entreprise</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Direction */}
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-blue-200">
              <div className={`p-3 ${getColorClasses(userDirectionData?.color || 'blue').bg} rounded-lg flex-shrink-0`}>
                <span className="text-2xl">{userDirectionData?.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{userDirectionData?.name}</h3>
                  <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                    <Star className="w-3 h-3 mr-1" />
                    Ma Direction
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{userDirectionData?.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {userDirectionData?.departements.reduce((acc, d) => acc + d.userCount, 0)} collaborateurs
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {userDirectionData?.departements.length} départements
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>

            {/* Department */}
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg border-2 border-blue-400 shadow-sm">
              <div className="p-3 bg-gradient-blue rounded-lg flex-shrink-0">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{userDepartementData?.name}</h3>
                  <Badge className="bg-blue-500 text-white">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Mon Département
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {userDepartementData?.userCount} collaborateurs
                  </span>
                  <span className="flex items-center gap-1">
                    <Bot className="w-4 h-4" />
                    {userDepartementData?.agentCount} agents IA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* My Agents and Workflows */}
      <Card className="shadow-soft border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl">Mes Ressources</CardTitle>
          <CardDescription>Agents IA et workflows disponibles dans mon périmètre</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="agents" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="agents" className="flex items-center gap-2">
                <Bot className="w-4 h-4" />
                Agents IA ({myAgents.length})
              </TabsTrigger>
              <TabsTrigger value="workflows" className="flex items-center gap-2">
                <Workflow className="w-4 h-4" />
                Workflows ({myWorkflows.length})
              </TabsTrigger>
            </TabsList>

            {/* Agents Tab */}
            <TabsContent value="agents" className="space-y-3 mt-4">
              {myAgents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Aucun agent disponible dans votre périmètre</p>
                </div>
              ) : (
                myAgents.map((agent) => (
                  <AgentDetailCard
                    key={agent.id}
                    agent={agent}
                    onExecute={onExecuteAgent}
                    onEdit={(agentId) => console.log('Edit agent:', agentId)}
                    onShare={(agentId) => console.log('Share agent:', agentId)}
                    currentUserId={currentUserId}
                  />
                ))
              )}
            </TabsContent>

            {/* Workflows Tab */}
            <TabsContent value="workflows" className="space-y-3 mt-4">
              {myWorkflows.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Workflow className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Aucun workflow disponible dans votre périmètre</p>
                </div>
              ) : (
                myWorkflows.map((workflow) => (
                  <WorkflowDetailCard
                    key={workflow.id}
                    workflow={workflow}
                    onExecute={onExecuteWorkflow}
                    onEdit={(workflowId) => console.log('Edit workflow:', workflowId)}
                    onShare={(workflowId) => console.log('Share workflow:', workflowId)}
                    currentUserId={currentUserId}
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}