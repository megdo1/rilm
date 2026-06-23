import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Badge } from './ui/badge'
import { Switch } from './ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Workflow, Plus, Play, Trash2, ArrowRight, Sparkles, Zap, Clock, Activity } from 'lucide-react'
import { projectId } from '../utils/supabase/info'
import { toast } from 'sonner@2.0.3'
import { mockWorkflows, mockAgents } from '../utils/mockData'

interface WorkflowBuilderProps {
  accessToken: string
  userRole?: string
}

export function WorkflowBuilder({ accessToken, userRole = 'business' }: WorkflowBuilderProps) {
  const [workflows, setWorkflows] = useState<any[]>(mockWorkflows)
  const [agents, setAgents] = useState<any[]>(mockAgents)
  const [clients, setClients] = useState<any[]>([])
  const [organizations, setOrganizations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedAgents, setSelectedAgents] = useState<string[]>([])
  const [selectedClient, setSelectedClient] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const isBusinessUser = userRole === 'business'

  const workflowTemplates = [
    {
      icon: '🎫',
      name: 'Traitement des Tickets',
      description: 'Analyse et routage automatique des tickets support',
      category: 'Support',
      steps: ['Réception ticket', 'Analyse sentiment', 'Priorisation', 'Routage équipe', 'Notification']
    },
    {
      icon: '📊',
      name: 'Rapport Quotidien',
      description: 'Génération automatique de rapports d\'activité',
      category: 'Analytics',
      steps: ['Collecte données', 'Analyse', 'Génération rapport', 'Envoi email']
    },
    {
      icon: '📧',
      name: 'Campagne Email',
      description: 'Envoi automatisé de campagnes email personnalisées',
      category: 'Marketing',
      steps: ['Segmentation', 'Personnalisation', 'Envoi', 'Suivi ouvertures']
    },
    {
      icon: '👔',
      name: 'Recrutement Automatisé',
      description: 'Pipeline de recrutement avec screening IA',
      category: 'RH',
      steps: ['Collecte CV', 'Screening IA', 'Planification', 'Suivi']
    },
  ]

  useEffect(() => {
    // Use mock data, uncomment when backend is ready
    // fetchWorkflows()
    // fetchAgents()
    // fetchClients()
    // fetchOrganizations()
  }, [])

  const fetchWorkflows = async () => {
    try {
      // Mock data is already loaded
      /*
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/workflows`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      const data = await response.json()
      setWorkflows(data.workflows || [])
      */
    } catch (error) {
      console.error('Error fetching workflows:', error)
      toast.error('Erreur lors du chargement des workflows')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAgents = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/agents`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      const data = await response.json()
      setAgents(data.agents || [])
    } catch (error) {
      console.error('Error fetching agents:', error)
    }
  }

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
    }
  }

  const createWorkflow = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsCreating(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('workflow-name') as string
    const description = formData.get('workflow-description') as string
    const clientId = formData.get('workflow-client') as string
    const orgId = formData.get('workflow-org') as string
    const isPublic = formData.get('workflow-public') === 'on'

    if (selectedAgents.length === 0) {
      toast.error('Veuillez sélectionner au moins un agent')
      setIsCreating(false)
      return
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/workflows`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name,
            description,
            clientId,
            orgId,
            agentIds: selectedAgents,
            isPublic,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error)
        return
      }

      toast.success('Workflow créé avec succès')
      fetchWorkflows()
      setIsDialogOpen(false)
      setSelectedAgents([])
      
      // Reset form
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      console.error('Error creating workflow:', error)
      toast.error('Erreur lors de la création du workflow')
    } finally {
      setIsCreating(false)
    }
  }

  const executeWorkflow = async (workflowId: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/workflows/${workflowId}/execute`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            input: 'Test workflow execution',
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error)
        return
      }

      toast.success('Workflow exécuté avec succès')
      console.log('Workflow results:', data.results)
    } catch (error) {
      console.error('Error executing workflow:', error)
      toast.error("Erreur lors de l'exécution du workflow")
    }
  }

  const toggleAgent = (agentId: string) => {
    setSelectedAgents(prev =>
      prev.includes(agentId)
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    )
  }

  const removeAgent = (agentId: string) => {
    setSelectedAgents(prev => prev.filter(id => id !== agentId))
  }

  const filteredOrganizations = selectedClient
    ? organizations.filter(org => org.clientId === selectedClient)
    : organizations

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Workflow className="w-8 h-8 text-indigo-600" />
          <h2 className="text-gray-900">Workflows d'Agents</h2>
        </div>
        <p className="text-gray-600">
          Créez des workflows complexes en chaînant plusieurs agents IA
        </p>
      </div>

      <div className="flex items-center justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau workflow
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Créer un nouveau workflow</DialogTitle>
              <DialogDescription>
                Combinez plusieurs agents pour créer un processus automatisé
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={createWorkflow} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workflow-name">Nom du workflow</Label>
                <Input
                  id="workflow-name"
                  name="workflow-name"
                  placeholder="Processus de recrutement"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workflow-description">Description</Label>
                <Textarea
                  id="workflow-description"
                  name="workflow-description"
                  placeholder="Ce workflow permet de..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workflow-client">Client</Label>
                <Select
                  name="workflow-client"
                  value={selectedClient}
                  onValueChange={setSelectedClient}
                  required
                >
                  <SelectTrigger>
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
                <Label htmlFor="workflow-org">Organisation</Label>
                <Select name="workflow-org" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une organisation" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredOrganizations.map((org) => (
                      <SelectItem key={org.id} value={org.id}>
                        {org.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Agents du workflow (dans l'ordre d'exécution)</Label>
                
                {/* Selected Agents */}
                {selectedAgents.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    {selectedAgents.map((agentId, index) => {
                      const agent = agents.find(a => a.id === agentId)
                      return agent ? (
                        <div key={agentId} className="flex items-center gap-2">
                          <Badge variant="secondary" className="flex items-center gap-2">
                            {index + 1}. {agent.name}
                            <button
                              type="button"
                              onClick={() => removeAgent(agentId)}
                              className="ml-1 hover:text-red-600"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </Badge>
                          {index < selectedAgents.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      ) : null
                    })}
                  </div>
                )}

                {/* Available Agents */}
                <div className="border rounded-lg p-3 max-h-[200px] overflow-y-auto space-y-2">
                  {agents.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Aucun agent disponible
                    </p>
                  ) : (
                    agents.map((agent) => (
                      <div
                        key={agent.id}
                        onClick={() => toggleAgent(agent.id)}
                        className={`p-3 rounded cursor-pointer transition-colors ${
                          selectedAgents.includes(agent.id)
                            ? 'bg-indigo-50 border-indigo-200 border'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <p className="text-sm">
                          {agent.name}
                        </p>
                        <p className="text-xs text-gray-500">{agent.llmModel}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="workflow-public" name="workflow-public" />
                <Label htmlFor="workflow-public">Rendre ce workflow public</Label>
              </div>

              <Button type="submit" className="w-full" disabled={isCreating}>
                {isCreating ? 'Création...' : 'Créer le workflow'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Chargement...</div>
      ) : workflows.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8 text-gray-500">
            Aucun workflow pour le moment. Créez votre premier workflow !
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workflows.map((workflow) => (
            <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Workflow className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {workflow.name}
                        {workflow.isPublic && (
                          <Badge variant="outline" className="text-xs">
                            Public
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {workflow.agentIds?.length || 0} agents
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {workflow.description}
                </p>
                <Button
                  size="sm"
                  onClick={() => executeWorkflow(workflow.id)}
                  className="w-full"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Exécuter
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
