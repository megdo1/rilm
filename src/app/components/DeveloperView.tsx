import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Switch } from './ui/switch'
import { Code, MessageSquare, Plus } from 'lucide-react'
import { AgentCard } from './AgentCard'
import { projectId } from '../utils/supabase/info'
import { toast } from 'sonner@2.0.3'

interface DeveloperViewProps {
  accessToken: string
}

export function DeveloperView({ accessToken }: DeveloperViewProps) {
  const [agents, setAgents] = useState<any[]>([])
  const [llmModels, setLLMModels] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [organizations, setOrganizations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedClient, setSelectedClient] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchAgents()
    fetchLLMModels()
    fetchClients()
    fetchOrganizations()
  }, [])

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
      toast.error('Erreur lors du chargement des agents')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchLLMModels = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/llm-models`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      const data = await response.json()
      setLLMModels(data.models || [])
    } catch (error) {
      console.error('Error fetching LLM models:', error)
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

  const createAgent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsCreating(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('agent-name') as string
    const description = formData.get('agent-description') as string
    const type = formData.get('agent-type') as string
    const prompt = formData.get('agent-prompt') as string
    const code = formData.get('agent-code') as string
    const llmModel = formData.get('agent-llm') as string
    const clientId = formData.get('agent-client') as string
    const orgId = formData.get('agent-org') as string
    const isPublic = formData.get('agent-public') === 'on'

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
            type,
            prompt,
            code,
            llmModel,
            clientId,
            orgId,
            isPublic,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error)
        return
      }

      toast.success('Agent créé avec succès')
      fetchAgents()
      setIsDialogOpen(false)
      
      // Reset form
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      console.error('Error creating agent:', error)
      toast.error("Erreur lors de la création de l'agent")
    } finally {
      setIsCreating(false)
    }
  }

  const filteredOrganizations = selectedClient
    ? organizations.filter(org => org.clientId === selectedClient)
    : organizations

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-2">Développement d'Agents IA</h2>
        <p className="text-gray-600">
          Créez et personnalisez des agents IA en mode code ou prompt
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="outline">
            <Code className="w-4 h-4 mr-2" />
            Mode Code
          </Button>
          <Button variant="outline">
            <MessageSquare className="w-4 h-4 mr-2" />
            Mode No-Code
          </Button>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvel agent
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Créer un nouvel agent IA</DialogTitle>
              <DialogDescription>
                Développez un agent personnalisé basé sur un prompt ou du code
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={createAgent} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agent-name">Nom de l'agent</Label>
                <Input
                  id="agent-name"
                  name="agent-name"
                  placeholder="Assistant RH"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="agent-description">Description</Label>
                <Textarea
                  id="agent-description"
                  name="agent-description"
                  placeholder="Cet agent aide à..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="agent-client">Client</Label>
                <Select
                  name="agent-client"
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
                <Label htmlFor="agent-org">Organisation</Label>
                <Select name="agent-org" required>
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
                <Label htmlFor="agent-llm">Modèle LLM</Label>
                <Select name="agent-llm" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un modèle" />
                  </SelectTrigger>
                  <SelectContent>
                    {llmModels.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.name} ({model.provider})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Tabs defaultValue="prompt" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="prompt">Mode Prompt</TabsTrigger>
                  <TabsTrigger value="code">Mode Code</TabsTrigger>
                </TabsList>
                <TabsContent value="prompt" className="space-y-2">
                  <input type="hidden" name="agent-type" value="prompt-based" />
                  <Label htmlFor="agent-prompt">Prompt système</Label>
                  <Textarea
                    id="agent-prompt"
                    name="agent-prompt"
                    placeholder="Tu es un assistant RH qui aide à..."
                    className="min-h-[200px] font-mono"
                  />
                </TabsContent>
                <TabsContent value="code" className="space-y-2">
                  <input type="hidden" name="agent-type" value="code-based" />
                  <Label htmlFor="agent-code">Code personnalisé</Label>
                  <Textarea
                    id="agent-code"
                    name="agent-code"
                    placeholder="// Votre code ici..."
                    className="min-h-[200px] font-mono"
                  />
                </TabsContent>
              </Tabs>

              <div className="flex items-center space-x-2">
                <Switch id="agent-public" name="agent-public" />
                <Label htmlFor="agent-public">Rendre cet agent public (marketplace)</Label>
              </div>

              <Button type="submit" className="w-full" disabled={isCreating}>
                {isCreating ? 'Création...' : "Créer l'agent"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Chargement...</div>
      ) : agents.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8 text-gray-500">
            Aucun agent pour le moment. Créez votre premier agent !
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onEdit={(id) => console.log('Edit agent:', id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
