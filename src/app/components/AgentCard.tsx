import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Bot, Copy, Play, Code, MessageSquare } from 'lucide-react'

interface AgentCardProps {
  agent: {
    id: string
    name: string
    description: string
    type: string
    llmModel: string
    isPublic: boolean
    usageCount: number
    createdAt: string
  }
  onExecute?: (agentId: string) => void
  onDuplicate?: (agentId: string) => void
  onEdit?: (agentId: string) => void
  showActions?: boolean
}

export function AgentCard({ agent, onExecute, onDuplicate, onEdit, showActions = true }: AgentCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Bot className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                {agent.name}
                {agent.isPublic && (
                  <Badge variant="outline" className="text-xs">
                    Public
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                {agent.type === 'code-based' ? (
                  <Code className="w-3 h-3" />
                ) : (
                  <MessageSquare className="w-3 h-3" />
                )}
                {agent.type === 'code-based' ? 'Code' : 'Prompt'}
                <span className="mx-1">•</span>
                {agent.llmModel}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-2">{agent.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>{agent.usageCount} utilisations</span>
          <span>{new Date(agent.createdAt).toLocaleDateString('fr-FR')}</span>
        </div>

        {showActions && (
          <div className="flex gap-2">
            {onExecute && (
              <Button
                size="sm"
                onClick={() => onExecute(agent.id)}
                className="flex-1"
              >
                <Play className="w-4 h-4 mr-2" />
                Exécuter
              </Button>
            )}
            {onDuplicate && agent.isPublic && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDuplicate(agent.id)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            )}
            {onEdit && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(agent.id)}
              >
                Modifier
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
