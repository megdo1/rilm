import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'
import { mockAgents } from '../utils/mockData'
import { ArrowLeft, Send, Bot, User, Sparkles, Copy, RotateCcw, Settings, Trash2, Clock } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AgentExecutionViewProps {
  agentId: string
  onBack: () => void
}

export function AgentExecutionView({ agentId, onBack }: AgentExecutionViewProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const agent = mockAgents.find(a => a.id === agentId)

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      purple: { bg: 'bg-purple-500', text: 'text-purple-600' },
      blue: { bg: 'bg-blue-500', text: 'text-blue-600' },
      green: { bg: 'bg-green-500', text: 'text-green-600' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-600' },
      pink: { bg: 'bg-pink-500', text: 'text-pink-600' },
      emerald: { bg: 'bg-emerald-500', text: 'text-emerald-600' },
      red: { bg: 'bg-red-500', text: 'text-red-600' },
    }
    return colors[color] || colors.blue
  }

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  if (!agent) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Agent introuvable</h2>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>
      </div>
    )
  }

  const colorClasses = getColorClasses(agent.color)

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Ceci est une réponse simulée de l'agent "${agent.name}". En production, cette réponse serait générée par le modèle ${agent.model} avec les paramètres configurés.`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const clearConversation = () => {
    setMessages([])
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className={`p-2 ${colorClasses.bg} rounded-lg`}>
            <span className="text-2xl">{agent.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-semibold text-gray-900">{agent.name}</h1>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Sparkles className="w-3 h-3 mr-1" />
                {agent.model}
              </Badge>
              <Badge variant="outline" className={agent.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-50'}>
                {agent.status === 'active' ? 'Actif' : 'Inactif'}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{agent.description}</p>
          </div>
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearConversation}>
                <Trash2 className="w-4 h-4 mr-2" />
                Effacer
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden bg-gray-50">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md px-4">
              <div className={`w-20 h-20 mx-auto mb-6 ${colorClasses.bg} rounded-2xl flex items-center justify-center`}>
                <span className="text-4xl">{agent.icon}</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Prêt à vous assister
              </h2>
              <p className="text-gray-600 mb-6">
                {agent.systemPrompt}
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-left">
                <p className="font-medium text-blue-900 mb-2">Suggestions de prompts :</p>
                <ul className="space-y-1 text-blue-700">
                  {agent.tags.slice(0, 3).map((tag, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>Aide-moi avec {tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-full">
            <div ref={scrollAreaRef} className="p-6 space-y-4 max-w-4xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className={`w-8 h-8 rounded-lg ${colorClasses.bg} flex items-center justify-center flex-shrink-0`}>
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div className={`flex-1 max-w-2xl ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                    <div
                      className={`rounded-2xl p-4 ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <div className={`flex items-center justify-between mt-2 pt-2 border-t ${
                        message.role === 'user' ? 'border-blue-400' : 'border-gray-200'
                      }`}>
                        <span className={`text-xs ${
                          message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          <Clock className="w-3 h-3 inline mr-1" />
                          {formatTime(message.timestamp)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-6 px-2 ${
                            message.role === 'user' 
                              ? 'hover:bg-blue-400 text-blue-100' 
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={() => copyMessage(message.content)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <div className={`w-8 h-8 rounded-lg ${colorClasses.bg} flex items-center justify-center flex-shrink-0`}>
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 max-w-2xl">
                    <div className="bg-white border border-gray-200 rounded-2xl p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Écrivez votre message... (Entrée pour envoyer, Shift+Entrée pour nouvelle ligne)"
              className="min-h-[60px] max-h-[200px] resize-none"
              disabled={isLoading || agent.status !== 'active'}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading || agent.status !== 'active'}
              size="lg"
              className="px-6"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Modèle : {agent.model} • Température : {agent.temperature} • {agent.usageCount.toLocaleString()} utilisations
          </p>
        </div>
      </div>
    </div>
  )
}
