import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'
import { mockWorkflows } from '../utils/mockData'
import { 
  ArrowLeft, Play, Pause, RotateCcw, CheckCircle2, XCircle, 
  Clock, Activity, TrendingUp, AlertCircle, Loader2, ChevronRight 
} from 'lucide-react'

interface ExecutionStep {
  id: string
  label: string
  status: 'pending' | 'running' | 'completed' | 'error'
  duration?: number
  message?: string
}

interface WorkflowExecutionViewProps {
  workflowId: string
  onBack: () => void
}

export function WorkflowExecutionView({ workflowId, onBack }: WorkflowExecutionViewProps) {
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [executionResults, setExecutionResults] = useState<any>(null)

  const workflow = mockWorkflows.find(w => w.id === workflowId)

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

  if (!workflow) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Workflow introuvable</h2>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>
      </div>
    )
  }

  const colorClasses = getColorClasses(workflow.color)

  const handleStartExecution = async () => {
    setIsExecuting(true)
    setCurrentStep(0)
    setExecutionResults(null)

    // Initialize steps
    const steps: ExecutionStep[] = workflow.nodes.map((node) => ({
      id: node.id,
      label: node.label,
      status: 'pending' as const
    }))
    setExecutionSteps(steps)

    // Simulate step-by-step execution
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i)
      
      // Update step to running
      setExecutionSteps(prev => prev.map((step, idx) => 
        idx === i ? { ...step, status: 'running' as const } : step
      ))

      // Simulate execution time
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))

      // Update step to completed (or error randomly for demo)
      const success = Math.random() > 0.1 // 90% success rate
      setExecutionSteps(prev => prev.map((step, idx) => 
        idx === i ? { 
          ...step, 
          status: success ? 'completed' as const : 'error' as const,
          duration: Number((1 + Math.random() * 2).toFixed(2)),
          message: success ? 'Étape complétée avec succès' : 'Erreur lors de l\'exécution'
        } : step
      ))

      if (!success) {
        setIsExecuting(false)
        return
      }
    }

    // Execution completed
    setIsExecuting(false)
    setExecutionResults({
      success: true,
      totalDuration: workflow.avgExecutionTime,
      timestamp: new Date()
    })
  }

  const handleReset = () => {
    setExecutionSteps([])
    setCurrentStep(0)
    setExecutionResults(null)
    setIsExecuting(false)
  }

  const getStepIcon = (status: ExecutionStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'running':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
    }
  }

  const getStepTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      trigger: 'bg-purple-100 text-purple-700 border-purple-300',
      agent: 'bg-blue-100 text-blue-700 border-blue-300',
      action: 'bg-green-100 text-green-700 border-green-300',
      condition: 'bg-orange-100 text-orange-700 border-orange-300',
      notification: 'bg-pink-100 text-pink-700 border-pink-300',
      schedule: 'bg-indigo-100 text-indigo-700 border-indigo-300',
    }
    return colors[type] || 'bg-gray-100 text-gray-700 border-gray-300'
  }

  const progress = executionSteps.length > 0 
    ? ((executionSteps.filter(s => s.status === 'completed').length) / executionSteps.length) * 100 
    : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="mt-1">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className={`p-3 ${colorClasses.bg} rounded-xl flex-shrink-0`}>
          <span className="text-3xl">{workflow.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-semibold text-gray-900">{workflow.name}</h1>
            <Badge variant="outline" className={workflow.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50'}>
              {workflow.status === 'active' ? 'Actif' : 'Inactif'}
            </Badge>
          </div>
          <p className="text-gray-600 mb-3">{workflow.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Activity className="w-4 h-4" />
              {workflow.executionCount.toLocaleString()} exécutions
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {workflow.avgExecutionTime}s en moyenne
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {workflow.successRate}% de succès
            </span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Execution Controls */}
      <Card className="shadow-soft border-2 border-gray-200">
        <CardHeader>
          <CardTitle>Contrôle d'exécution</CardTitle>
          <CardDescription>
            Démarrez et suivez l'exécution du workflow en temps réel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            {!isExecuting && executionSteps.length === 0 ? (
              <Button 
                onClick={handleStartExecution} 
                size="lg"
                disabled={workflow.status !== 'active'}
                className="bg-gradient-blue"
              >
                <Play className="w-5 h-5 mr-2" />
                Démarrer l'exécution
              </Button>
            ) : (
              <>
                <Button 
                  onClick={handleReset} 
                  variant="outline"
                  disabled={isExecuting}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Réinitialiser
                </Button>
                {executionResults && (
                  <div className="flex items-center gap-2 ml-4 text-green-700">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-medium">Exécution terminée avec succès</span>
                  </div>
                )}
              </>
            )}
          </div>

          {executionSteps.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progression</span>
                <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Workflow Steps */}
      <Card className="shadow-soft border border-gray-200">
        <CardHeader>
          <CardTitle>Étapes du workflow</CardTitle>
          <CardDescription>
            {workflow.steps} étapes • Visualisation et état d'exécution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-3">
              {workflow.nodes.map((node, index) => {
                const executionStep = executionSteps.find(s => s.id === node.id)
                const isActive = executionSteps.length > 0 && currentStep === index && isExecuting

                return (
                  <div key={node.id}>
                    <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      executionStep?.status === 'completed' ? 'bg-green-50 border-green-300' :
                      executionStep?.status === 'error' ? 'bg-red-50 border-red-300' :
                      isActive ? 'bg-blue-50 border-blue-300 shadow-md' :
                      'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {executionStep ? getStepIcon(executionStep.status) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs text-gray-500">
                              {index + 1}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{node.label}</h4>
                            <Badge variant="outline" className={`text-xs ${getStepTypeColor(node.type)}`}>
                              {node.type}
                            </Badge>
                            {executionStep?.duration && (
                              <span className="text-xs text-gray-500">
                                {executionStep.duration}s
                              </span>
                            )}
                          </div>
                          {executionStep?.message && (
                            <p className={`text-sm ${
                              executionStep.status === 'error' ? 'text-red-700' : 'text-gray-600'
                            }`}>
                              {executionStep.message}
                            </p>
                          )}
                          {isActive && (
                            <div className="flex items-center gap-2 mt-2 text-blue-600">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span className="text-sm font-medium">En cours d'exécution...</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {index < workflow.nodes.length - 1 && (
                      <div className="flex justify-center py-1">
                        <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Execution Results */}
      {executionResults && (
        <Card className="shadow-soft border-2 border-green-300 bg-green-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-green-900">Exécution réussie</CardTitle>
                <CardDescription className="text-green-700">
                  Le workflow s'est terminé sans erreur
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Durée totale</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {executionResults.totalDuration}s
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Étapes complétées</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {executionSteps.filter(s => s.status === 'completed').length}/{executionSteps.length}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Horodatage</p>
                <p className="text-lg font-semibold text-gray-900">
                  {executionResults.timestamp.toLocaleTimeString('fr-FR')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {executionSteps.some(s => s.status === 'error') && (
        <Card className="shadow-soft border-2 border-red-300 bg-red-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500 rounded-lg">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-red-900">Erreur d'exécution</CardTitle>
                <CardDescription className="text-red-700">
                  Une erreur s'est produite lors de l'exécution du workflow
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-white rounded-lg p-4 border border-red-200">
              <p className="text-sm text-gray-600 mb-2">Étape en erreur :</p>
              <p className="font-medium text-gray-900">
                {executionSteps.find(s => s.status === 'error')?.label}
              </p>
              <p className="text-sm text-red-600 mt-2">
                {executionSteps.find(s => s.status === 'error')?.message}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
