import { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Workflow, Globe, Lock, Activity, Clock, TrendingUp, Play, Edit, Share2, 
  ChevronDown, ChevronUp, User, CheckCircle2, XCircle, 
  BarChart3, Zap, Award, GitBranch, Calendar
} from 'lucide-react'

interface WorkflowDetailCardProps {
  workflow: any
  onExecute?: (workflowId: string) => void
  onEdit?: (workflowId: string) => void
  onShare?: (workflowId: string) => void
  currentUserId?: string
}

export function WorkflowDetailCard({ workflow, onExecute, onEdit, onShare, currentUserId }: WorkflowDetailCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isOwner = workflow.owner === currentUserId

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; bgLight: string }> = {
      purple: { bg: 'bg-purple-500', border: 'border-purple-200', text: 'text-purple-600', bgLight: 'bg-purple-50' },
      blue: { bg: 'bg-blue-500', border: 'border-blue-200', text: 'text-blue-600', bgLight: 'bg-blue-50' },
      green: { bg: 'bg-green-500', border: 'border-green-200', text: 'text-green-600', bgLight: 'bg-green-50' },
      orange: { bg: 'bg-orange-500', border: 'border-orange-200', text: 'text-orange-600', bgLight: 'bg-orange-50' },
      pink: { bg: 'bg-pink-500', border: 'border-pink-200', text: 'text-pink-600', bgLight: 'bg-pink-50' },
      emerald: { bg: 'bg-emerald-500', border: 'border-emerald-200', text: 'text-emerald-600', bgLight: 'bg-emerald-50' },
      red: { bg: 'bg-red-500', border: 'border-red-200', text: 'text-red-600', bgLight: 'bg-red-50' },
    }
    return colors[color] || colors.blue
  }

  const colorClasses = getColorClasses(workflow.color)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `Il y a ${diffMins}min`
    if (diffHours < 24) return `Il y a ${diffHours}h`
    if (diffDays < 7) return `Il y a ${diffDays}j`
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  }

  // Mock execution history if not provided
  const executionHistory = workflow.executionHistory || [
    { date: '2024-12-02', count: 12, avgDuration: workflow.avgExecutionTime || 4.2, successRate: workflow.successRate || 98 },
    { date: '2024-12-01', count: 15, avgDuration: workflow.avgExecutionTime || 4.1, successRate: workflow.successRate || 97 },
    { date: '2024-11-30', count: 10, avgDuration: workflow.avgExecutionTime || 4.5, successRate: workflow.successRate || 99 },
    { date: '2024-11-29', count: 13, avgDuration: workflow.avgExecutionTime || 4.0, successRate: workflow.successRate || 98 },
    { date: '2024-11-28', count: 14, avgDuration: workflow.avgExecutionTime || 4.3, successRate: workflow.successRate || 97 },
    { date: '2024-11-27', count: 11, avgDuration: workflow.avgExecutionTime || 4.2, successRate: workflow.successRate || 99 },
    { date: '2024-11-26', count: 13, avgDuration: workflow.avgExecutionTime || 4.1, successRate: workflow.successRate || 98 },
  ]

  const recentActivities = workflow.recentActivities || [
    { date: new Date(Date.now() - 15 * 60 * 1000).toISOString(), user: 'Sophie Martin', action: 'Exécution', duration: workflow.avgExecutionTime || 4.2, status: 'success' },
    { date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), user: 'Pierre Durand', action: 'Exécution', duration: workflow.avgExecutionTime || 4.5, status: 'success' },
    { date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), user: 'Marie Bernard', action: 'Exécution', duration: workflow.avgExecutionTime || 4.0, status: 'success' },
    { date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), user: 'Luc Petit', action: 'Exécution', duration: workflow.avgExecutionTime || 5.2, status: 'error' },
    { date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), user: 'Julie Roux', action: 'Exécution', duration: workflow.avgExecutionTime || 4.1, status: 'success' },
  ]

  return (
    <Card className="border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        {/* Compact View */}
        <div className="flex items-start gap-4">
          <div className={`p-3 ${colorClasses.bg} rounded-lg flex-shrink-0`}>
            <span className="text-2xl">{workflow.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{workflow.name}</h4>
                  {isOwner && (
                    <Badge className="bg-purple-500 text-white text-xs">
                      <Award className="w-3 h-3 mr-1" />
                      Propriétaire
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{workflow.description}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {workflow.shared ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                    <Globe className="w-3 h-3 mr-1" />
                    Partagé
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
                    <Lock className="w-3 h-3 mr-1" />
                    Privé
                  </Badge>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
              <span className="flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" />
                {workflow.executionCount?.toLocaleString() || 0} exécutions
              </span>
              <span className="flex items-center gap-1">
                <GitBranch className="w-3.5 h-3.5" />
                {workflow.steps} étapes
              </span>
              <Badge variant="outline" className={`text-xs ${workflow.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50'}`}>
                {workflow.status === 'active' ? 'Actif' : 'Inactif'}
              </Badge>
              {workflow.avgExecutionTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  {workflow.avgExecutionTime}s moy.
                </span>
              )}
              {workflow.successRate && (
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                  {workflow.successRate}% succès
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button 
                size="sm"
                onClick={() => onExecute?.(workflow.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Play className="w-4 h-4 mr-1" />
                Exécuter
              </Button>
              {isOwner && (
                <>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit?.(workflow.id)}
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Modifier
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => onShare?.(workflow.id)}
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Partager
                  </Button>
                </>
              )}
              <Button 
                size="sm"
                variant="ghost"
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-auto"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-1" />
                    Moins de détails
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-1" />
                    Plus de détails
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Expanded View */}
        {isExpanded && (
          <>
            <Separator className="my-4" />
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="history">Historique</TabsTrigger>
                <TabsTrigger value="activities">Activités</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Catégorie</p>
                    <p className="font-medium text-gray-900">{workflow.category}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Nombre d'étapes</p>
                    <p className="font-medium text-gray-900">{workflow.steps} étapes</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Statut</p>
                    <p className="font-medium text-gray-900">
                      {workflow.status === 'active' ? '✅ Actif' : '⏸️ Inactif'}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Créé le</p>
                    <p className="font-medium text-gray-900">
                      {new Date(workflow.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>

                {/* Workflow Steps */}
                {workflow.nodes && workflow.nodes.length > 0 && (
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <h5 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <GitBranch className="w-4 h-4" />
                      Étapes du workflow
                    </h5>
                    <div className="space-y-2">
                      {workflow.nodes.map((node: any, index: number) => (
                        <div key={node.id} className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-medium flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1 p-2 bg-white rounded border border-gray-200">
                            <p className="text-sm font-medium text-gray-900">{node.label}</p>
                            <p className="text-xs text-gray-500 capitalize">{node.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="space-y-3 mt-4">
                {executionHistory && executionHistory.length > 0 ? (
                  <>
                    <div className="grid grid-cols-7 gap-2">
                      {executionHistory.map((day: any) => (
                        <div key={day.date} className="p-2 bg-gray-50 rounded-lg text-center">
                          <p className="text-xs text-gray-500 mb-1">
                            {new Date(day.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                          </p>
                          <p className="font-semibold text-gray-900">{day.count}</p>
                          <p className="text-xs text-gray-500">{day.avgDuration}s</p>
                          <Badge variant="outline" className="text-xs mt-1 bg-green-50 text-green-700 border-green-200">
                            {day.successRate}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-600">Total sur 7 jours</p>
                          <p className="text-xl font-semibold text-gray-900">
                            {executionHistory.reduce((acc: number, day: any) => acc + day.count, 0)} exécutions
                          </p>
                        </div>
                        <BarChart3 className="w-8 h-8 text-blue-500" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Aucun historique disponible</p>
                  </div>
                )}
              </TabsContent>

              {/* Activities Tab */}
              <TabsContent value="activities" className="space-y-2 mt-4">
                {recentActivities && recentActivities.length > 0 ? (
                  recentActivities.map((activity: any, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className={`p-2 rounded-lg flex-shrink-0 ${
                        activity.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {activity.status === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <span className="text-xs text-gray-500">{formatDate(activity.date)}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {activity.user}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {activity.duration}s
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Aucune activité récente</p>
                  </div>
                )}
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-4 mt-4">
                {workflow.avgExecutionTime || workflow.successRate ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      {workflow.avgExecutionTime && (
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                          <div className="flex items-center justify-between mb-2">
                            <Clock className="w-5 h-5 text-blue-600" />
                          </div>
                          <p className="text-2xl font-semibold text-gray-900">{workflow.avgExecutionTime}s</p>
                          <p className="text-xs text-gray-600">Temps d'exécution moyen</p>
                        </div>
                      )}
                      {workflow.successRate && (
                        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                          <div className="flex items-center justify-between mb-2">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          </div>
                          <p className="text-2xl font-semibold text-gray-900">{workflow.successRate}%</p>
                          <p className="text-xs text-gray-600">Taux de succès</p>
                        </div>
                      )}
                    </div>
                    <div className="p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-gray-900 mb-3">Analyse de performance</h5>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p>✅ Workflow très fiable avec un taux de succès de {workflow.successRate}%</p>
                        <p>⚡ Exécution efficace : {workflow.avgExecutionTime}s en moyenne</p>
                        <p>📊 Exécuté {workflow.executionCount?.toLocaleString() || 0} fois au total</p>
                        <p>🔄 {workflow.steps} étapes automatisées</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Aucune donnée de performance disponible</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </CardContent>
    </Card>
  )
}
