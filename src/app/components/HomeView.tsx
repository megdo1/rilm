import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Badge } from './ui/badge'
import { 
  Send, 
  Paperclip, 
  Sparkles,
  FlaskConical
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'

interface HomeViewProps {
  accessToken: string
  userRole: string
  onNavigate?: (view: string) => void
}

export function HomeView({ accessToken, userRole, onNavigate }: HomeViewProps) {
  const [prompt, setPrompt] = useState('')
  const [selectedLLM, setSelectedLLM] = useState('gpt-4')
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([])

  const llmOptions = [
    { value: 'gpt-4', label: 'GPT-4 Turbo', icon: '🚀', description: 'Le plus puissant' },
    { value: 'gpt-3.5', label: 'GPT-3.5 Turbo', icon: '⚡', description: 'Rapide et économique' },
    { value: 'claude-3', label: 'Claude 3 Opus', icon: '🎯', description: 'Excellent pour l\'analyse' },
    { value: 'gemini-pro', label: 'Gemini Pro', icon: '✨', description: 'Multimodal puissant' },
    { value: 'mistral', label: 'Mistral Large', icon: '🇫🇷', description: 'Français natif' },
  ]



  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAttachedFiles([...attachedFiles, ...files])
    toast.success(`✅ ${files.length} fichier(s) ajouté(s)`)
  }

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast.error('Veuillez entrer une requête')
      return
    }

    setIsLoading(true)
    
    // Add user message
    const userMessage = { role: 'user' as const, content: prompt }
    setMessages([...messages, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage = { 
        role: 'assistant' as const, 
        content: `Je suis votre assistant IA Hexagone AI. J'ai bien reçu votre requête : "${prompt}". Pour le moment, je suis en mode démonstration. Cette fonctionnalité sera bientôt disponible avec l'intégration complète de ${llmOptions.find(l => l.value === selectedLLM)?.label}.` 
      }
      setMessages([...messages, userMessage, assistantMessage])
      setPrompt('')
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col max-w-4xl mx-auto w-full relative">
      {/* Debug Button - Gradient Test */}
      {onNavigate && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('gradient-test')}
          className="absolute top-0 right-0 gap-2 border-2 border-dashed border-purple-300 text-purple-600 hover:bg-purple-50"
        >
          <FlaskConical className="w-4 h-4" />
          Test Gradients
        </Button>
      )}

      {/* Header - Minimaliste */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl text-gray-900">
          <span className="text-blue-600">Hexagone AI</span>
        </h2>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          // Empty state - Minimaliste
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4 max-w-md">
              <div className="w-16 h-16 bg-gradient-blue rounded-2xl flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-600">
                Posez une question, créez un agent, ou automatisez un workflow
              </p>
            </div>
          </div>
        ) : (
          // Messages Area
          <div className="flex-1 overflow-y-auto mb-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-4 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-gradient-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                <Card className={`max-w-2xl shadow-soft border-0 ${
                  message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-white'
                }`}>
                  <CardContent className="p-4">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </CardContent>
                </Card>
                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-gray-600">U</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Input Area - Always at bottom */}
        <div className="mt-auto">
          {attachedFiles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {attachedFiles.map((file, index) => (
                <Badge key={index} variant="outline" className="gap-2">
                  <Paperclip className="w-3 h-3" />
                  {file.name}
                </Badge>
              ))}
            </div>
          )}
          
          <Card className="shadow-soft-lg border-2 border-gray-200 focus-within:border-blue-400 transition-colors">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Posez une question, créez un agent, automatisez un workflow..."
                  className="min-h-[60px] resize-none border-0 focus-visible:ring-0 text-base"
                  disabled={isLoading}
                />
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  {/* LLM Selector */}
                  <Select value={selectedLLM} onValueChange={setSelectedLLM}>
                    <SelectTrigger className="w-[160px] h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {llmOptions.map((llm) => (
                        <SelectItem key={llm.value} value={llm.value}>
                          <span>{llm.icon} {llm.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <Paperclip className="w-4 h-4" />
                    Joindre
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                  <span className="text-xs text-gray-500 ml-2 hidden md:inline">
                    Shift + Enter pour nouvelle ligne
                  </span>
                </div>
                <Button 
                  onClick={handleSubmit} 
                  disabled={isLoading || !prompt.trim()}
                  className="bg-blue-600 hover:bg-blue-700 gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Traitement...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Envoyer
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-gray-500 mt-3">
            Hexagone AI peut faire des erreurs. Vérifiez les informations importantes.
          </p>
        </div>
      </div>
    </div>
  )
}