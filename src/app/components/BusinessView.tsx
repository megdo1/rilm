import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { ScrollArea } from './ui/scroll-area'
import { Badge } from './ui/badge'
import { Play, MessageCircle, Loader2 } from 'lucide-react'
import { AgentCard } from './AgentCard'
import { projectId } from '../utils/supabase/info'
import { toast } from 'sonner@2.0.3'

interface BusinessViewProps {
  accessToken: string
}

export function BusinessView({ accessToken }: BusinessViewProps) {
  const [agents, setAgents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionResult, setExecutionResult] = useState<any>(null)
  const [userInput, setUserInput] = useState('')

  useEffect(() => {
    fetchAgents()
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

  const executeAgent = async () => {
    if (!selectedAgent || !userInput.trim()) {
      toast.error('Veuillez entrer votre requête')
      return
    }

    setIsExecuting(true)
    setExecutionResult(null)

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/agents/${selectedAgent.id}/execute`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            input: userInput,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error)
        return
      }

      setExecutionResult(data.result)
      toast.success('Agent exécuté avec succès')
    } catch (error) {
      console.error('Error executing agent:', error)
      toast.error("Erreur lors de l'exécution de l'agent")
    } finally {
      setIsExecuting(false)
    }
  }

  const handleExecute = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId)
    setSelectedAgent(agent)
    setExecutionResult(null)
    setUserInput('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-2">Utilisation des Agents IA</h2>
        <p className="text-gray-600">
          Sélectionnez et utilisez les agents IA disponibles dans votre organisation
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Chargement...</div>
      ) : agents.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8 text-gray-500">
            Aucun agent disponible pour le moment
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onExecute={handleExecute}
              showActions={true}
            />
          ))}
        </div>
      )}

      {/* Execution Dialog */}
      <Dialog open={selectedAgent !== null} onOpenChange={(open) => !open && setSelectedAgent(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-indigo-600" />
              {selectedAgent?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedAgent?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{selectedAgent?.llmModel}</Badge>
              <Badge variant="secondary">
                {selectedAgent?.type === 'code-based' ? 'Code' : 'Prompt'}
              </Badge>
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-input">Votre requête</Label>
              <Textarea
                id="user-input"
                placeholder="Entrez votre question ou requête..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            <Button 
              onClick={executeAgent} 
              className="w-full" 
              disabled={isExecuting || !userInput.trim()}
            >
              {isExecuting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Exécution en cours...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Exécuter l'agent
                </>
              )}
            </Button>

            {executionResult && (
              <Card className="mt-4 bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-sm">Résultat</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="max-h-[300px]">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Entrée:</p>
                        <p className="text-sm bg-white p-3 rounded border">
                          {executionResult.input}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Sortie:</p>
                        <p className="text-sm bg-white p-3 rounded border">
                          {executionResult.output}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        Exécuté le {new Date(executionResult.timestamp).toLocaleString('fr-FR')}
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
