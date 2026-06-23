import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Bot, Plus, Code, MessageSquare, Play, Settings, TrendingUp, Activity, Building2, Sparkles, Zap } from 'lucide-react'
import { projectId } from '../utils/supabase/info'
import { toast } from 'sonner@2.0.3'
import { OrganizationSelector } from './OrganizationSelector'
import { mockAgents } from '../utils/mockData'

interface AgentsViewProps {
  accessToken: string
  userRole: string
  selectedOrgId?: string | null
  onSelectOrganization?: (orgId: string | null) => void
}

export function AgentsView({ accessToken, userRole, selectedOrgId, onSelectOrganization }: AgentsViewProps) {
  const [agents, setAgents] = useState<any[]>([])
  const [organizations, setOrganizations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [testInput, setTestInput] = useState('')
  const [testResult, setTestResult] = useState<any>(null)

  useEffect(() => {
    fetchAgents()
    fetchOrganizations()
  }, [selectedOrgId])

  const fetchAgents = async () => {
    try {
      // Use mock data for now
      const filteredAgents = selectedOrgId 
        ? mockAgents.filter(agent => agent.organizationId === selectedOrgId)
        : mockAgents
      setAgents(filteredAgents)
      
      // Uncomment when backend is ready
      /*
      const url = selectedOrgId 
        ? `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/agents?orgId=${selectedOrgId}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/agents`
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const data = await response.json()
      setAgents(data.agents || [])
      */
    } catch (error) {
      console.error('Error fetching agents:', error)
      toast.error('Erreur lors du chargement des agents')
    } finally {
      setIsLoading(false)
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

  const createAgent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsCreating(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('agent-name') as string
    const description = formData.get('agent-description') as string
    const prompt = formData.get('agent-prompt') as string
    const llmModel = formData.get('agent-llm') as string
    const type = formData.get('agent-type') as string
    const orgId = formData.get('agent-org') as string

    if (!orgId) {
      toast.error('Veuillez sélectionner une organisation')
      setIsCreating(false)
      return
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/agents`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name,
            description,
            prompt,
            llmModel,
            type,
            clientId: 'default',
            orgId,
            isPublic: false,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error)
        return
      }

      toast.success('✅ Agent créé avec succès')
      fetchAgents()
      
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      console.error('Error creating agent:', error)
      toast.error("Erreur lors de la création de l'agent")
    } finally {
      setIsCreating(false)
    }
  }

  const executeAgent = async () => {
    if (!selectedAgent || !testInput) return

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/agents/${selectedAgent.id}/execute`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ input: testInput }),
        }
      )

      const data = await response.json()
      setTestResult(data.result)
      toast.success('✅ Agent exécuté avec succès')
    } catch (error) {
      console.error('Error executing agent:', error)
      toast.error("Erreur lors de l'exécution de l'agent")
    }
  }

  const canCreateAgent = ['platform_admin', 'client_admin', 'developer', 'business'].includes(userRole)
  const isBusinessUser = userRole === 'business'

  const agentTemplates = [
    {
      icon: '💬',
      name: 'ChatBot Support',
      description: 'Agent conversationnel pour le support client 24/7',
      category: 'Support',
      prompt: 'Tu es un assistant de support client professionnel et empathique. Analyse les demandes et réponds avec courtoisie.',
      model: 'gpt-4'
    },
    {
      icon: '📄',
      name: 'Analyseur de Documents',
      description: 'Extraction et résumé de documents automatique',
      category: 'Analyse',
      prompt: 'Tu es un expert en analyse documentaire. Extrais les informations clés et fournis des résumés structurés.',
      model: 'claude-3-opus'
    },
    {
      icon: '✍️',
      name: 'Rédacteur Marketing',
      description: 'Création de contenu marketing engageant',
      category: 'Marketing',
      prompt: 'Tu es un expert marketing créatif. Génère du contenu engageant et optimisé pour les conversions.',
      model: 'gpt-3.5-turbo'
    },
    {
      icon: '💰',
      name: 'Analyste Financier',
      description: 'Analyse de données financières et recommandations',
      category: 'Finance',
      prompt: 'Tu es un analyste financier expert. Analyse les données et fournis des insights précis et actionnables.',
      model: 'gpt-4'
    },
  ]

  const createAgentFromTemplate = (template: any) => {
    toast.success(`✅ Agent "${template.name}" créé avec succès!`)
    const newAgent = {
      id: `agent-${Date.now()}`,
      name: template.name,
      description: template.description,
      category: template.category,
      status: 'active',
      model: template.model,
      systemPrompt: template.prompt,
      usageCount: 0,
      lastUsed: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      organizationId: selectedOrgId || 'org-1',
      tags: [],
      icon: template.icon,
      color: 'blue'
    }
    setAgents([newAgent, ...agents])
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">Agents IA</h2>
          <p className="text-gray-600">
            {isBusinessUser ? 'Créez des agents IA en quelques clics, sans code' : 'Créez et gérez vos agents IA intelligents'}
          </p>
        </div>
        {canCreateAgent && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-soft">
                {isBusinessUser ? <Sparkles className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                {isBusinessUser ? 'Créer un agent' : 'Nouvel agent'}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {isBusinessUser ? '✨ Créer un agent en quelques clics' : 'Créer un nouvel agent IA'}
                </DialogTitle>
                <DialogDescription>
                  {isBusinessUser 
                    ? 'Choisissez un template ou personnalisez votre agent'
                    : 'Définissez les paramètres de votre agent intelligent'}
                </DialogDescription>
              </DialogHeader>
              
              {isBusinessUser ? (
                <Tabs defaultValue="templates" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="templates">
                      <Zap className="w-4 h-4 mr-2" />
                      Templates
                    </TabsTrigger>
                    <TabsTrigger value="custom">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Personnalisé
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="templates" className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Créez un agent en 1 clic avec nos templates prêts à l'emploi
                    </p>
                    <div className="grid gap-3 md:grid-cols-2">
                      {agentTemplates.map((template, index) => (
                        <Card 
                          key={index}
                          className="shadow-soft border-0 hover:shadow-soft-lg transition-all cursor-pointer group"
                          onClick={() => createAgentFromTemplate(template)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="text-3xl">{template.icon}</div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {template.name}
                                </h4>
                                <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                                <Badge variant="outline" className="mt-2 text-xs">
                                  {template.category}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="custom">
                    <form onSubmit={createAgent} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="agent-name">Nom de l'agent</Label>
                        <Input
                          id="agent-name"
                          name="agent-name"
                          placeholder="Mon Assistant Personnel"
                          required
                          className="border-gray-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="agent-description">Description</Label>
                        <Textarea
                          id="agent-description"
                          name="agent-description"
                          placeholder="Que va faire cet agent ?"
                          required
                          className="border-gray-200"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="agent-prompt">Instructions pour l'agent</Label>
                        <Textarea
                          id="agent-prompt"
                          name="agent-prompt"
                          placeholder="Exemple: Tu es un assistant qui aide à rédiger des emails professionnels..."
                          required
                          className="border-gray-200"
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="agent-llm">Intelligence à utiliser</Label>
                        <Select name="agent-llm" required defaultValue="gpt-4">
                          <SelectTrigger className="border-gray-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gpt-4">🚀 GPT-4 (Le plus puissant)</SelectItem>
                            <SelectItem value="gpt-3.5-turbo">⚡ GPT-3.5 (Rapide)</SelectItem>
                            <SelectItem value="claude-3-opus">🎯 Claude 3 (Excellent pour l'analyse)</SelectItem>
                            <SelectItem value="gemini-pro">✨ Gemini Pro (Multimodal)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <input type="hidden" name="agent-type" value="prompt-based" />
                      <input type="hidden" name="agent-org" value={selectedOrgId || 'org-1'} />
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isCreating}>
                        <Sparkles className="w-4 h-4 mr-2" />
                        {isCreating ? 'Création...' : 'Créer mon agent'}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              ) : (
              <form onSubmit={createAgent} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="agent-name">Nom de l'agent</Label>
                  <Input
                    id="agent-name"
                    name="agent-name"
                    placeholder="Assistant RH, ChatBot Support..."
                    required
                    className="border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-description">Description</Label>
                  <Textarea
                    id="agent-description"
                    name="agent-description"
                    placeholder="Décrivez le rôle et les capacités de cet agent..."
                    required
                    className="border-gray-200"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-type">Type d'agent</Label>
                  <Select name="agent-type" required>
                    <SelectTrigger className="border-gray-200">
                      <SelectValue placeholder="Sélectionnez le type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prompt-based">💬 Basé sur Prompt</SelectItem>
                      <SelectItem value="code-based">💻 Basé sur Code</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-prompt">Prompt système</Label>
                  <Textarea
                    id="agent-prompt"
                    name="agent-prompt"
                    placeholder="Vous êtes un assistant spécialisé en..."
                    required
                    className="border-gray-200"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-llm">Modèle LLM</Label>
                  <Select name="agent-llm" required>
                    <SelectTrigger className="border-gray-200">
                      <SelectValue placeholder="Sélectionnez un modèle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4 (OpenAI)</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (OpenAI)</SelectItem>
                      <SelectItem value="claude-3-opus">Claude 3 Opus (Anthropic)</SelectItem>
                      <SelectItem value="claude-3-sonnet">Claude 3 Sonnet (Anthropic)</SelectItem>
                      <SelectItem value="gemini-pro">Gemini Pro (Google)</SelectItem>
                      <SelectItem value="mistral-large">Mistral Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <input type="hidden" name="agent-org" value={selectedOrgId || 'org-1'} />
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isCreating}>
                  {isCreating ? 'Création...' : "Créer l'agent"}
                </Button>
              </form>
              )}
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
                <p className="text-sm font-medium text-gray-600">Total Agents</p>
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
                <p className="text-sm font-medium text-gray-600">Exécutions</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">
                  {agents.reduce((sum, agent) => sum + (agent.usageCount || 0), 0).toLocaleString()}
                </h3>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +23% ce mois
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <Activity className="w-6 h-6 text-green-600" />
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
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <Play className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agents List */}
      {isLoading ? (
        <div className="text-center py-12 text-gray-500">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2">Chargement...</p>
        </div>
      ) : agents.length === 0 ? (
        <Card className="shadow-soft border-0">
          <CardContent className="text-center py-12">
            <Bot className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucun agent pour le moment</p>
            {canCreateAgent && (
              <p className="text-sm text-gray-400 mt-1">Créez votre premier agent pour commencer</p>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => {
            const colorClasses = {
              blue: 'bg-blue-50 text-blue-600',
              green: 'bg-green-50 text-green-600',
              purple: 'bg-purple-50 text-purple-600',
              orange: 'bg-orange-50 text-orange-600',
              emerald: 'bg-emerald-50 text-emerald-600',
              pink: 'bg-pink-50 text-pink-600',
            }[agent.color || 'blue'] || 'bg-blue-50 text-blue-600'

            return (
            <Card key={agent.id} className="shadow-soft border-0 hover:shadow-soft-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 ${colorClasses} rounded-xl text-2xl flex items-center justify-center w-12 h-12`}>
                    {agent.icon || (agent.type === 'code-based' ? '💻' : '💬')}
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
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-0 text-xs">
                    {agent.model || agent.llmModel}
                  </Badge>
                  <Badge variant="outline" className="border-gray-200 text-gray-600 text-xs">
                    {agent.category}
                  </Badge>
                  {agent.status === 'active' && (
                    <Badge variant="outline" className="border-green-200 text-green-700 text-xs">
                      ● Actif
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{(agent.usageCount || 0).toLocaleString()} utilisations</span>
                  <span className="text-xs">{new Date(agent.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setSelectedAgent(agent)
                          setTestInput('')
                          setTestResult(null)
                        }}
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Tester
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Tester l'agent : {agent.name}</DialogTitle>
                        <DialogDescription>{agent.description}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Message d'entrée</Label>
                          <Textarea
                            value={testInput}
                            onChange={(e) => setTestInput(e.target.value)}
                            placeholder="Entrez votre message..."
                            rows={4}
                            className="border-gray-200"
                          />
                        </div>
                        <Button
                          onClick={executeAgent}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          disabled={!testInput}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Exécuter
                        </Button>
                        {testResult && (
                          <div className="space-y-2">
                            <Label>Résultat</Label>
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-sm text-gray-900">{testResult.output}</p>
                              <p className="text-xs text-gray-500 mt-2">
                                Exécuté avec {testResult.llmModel} • {new Date(testResult.timestamp).toLocaleString('fr-FR')}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                  {canCreateAgent && (
                    <Button variant="ghost" size="sm">
                      <Settings className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
