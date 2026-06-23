import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Search, Store, TrendingUp, Star, Download, CheckCircle, Bot, Workflow } from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import { mockMarketplaceAgents, mockMarketplaceWorkflows } from '../utils/mockData'

interface MarketplaceViewProps {
  accessToken: string
}

export function MarketplaceView({ accessToken }: MarketplaceViewProps) {
  const [marketplaceAgents] = useState<any[]>(mockMarketplaceAgents)
  const [marketplaceWorkflows] = useState<any[]>(mockMarketplaceWorkflows)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAgents = marketplaceAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredWorkflows = marketplaceWorkflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const installItem = (item: any, type: 'agent' | 'workflow') => {
    toast.success(`✅ ${type === 'agent' ? 'Agent' : 'Workflow'} "${item.name}" installé avec succès!`)
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Store className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-semibold text-gray-900">Marketplace</h2>
        </div>
        <p className="text-gray-600">
          Découvrez et installez des agents et workflows prêts à l'emploi
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Agents Disponibles</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">{marketplaceAgents.length}</h3>
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
                <p className="text-sm font-medium text-gray-600">Workflows</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">{marketplaceWorkflows.length}</h3>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <Workflow className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Téléchargements</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">
                  {(marketplaceAgents.reduce((sum, a) => sum + a.downloads, 0) + 
                    marketplaceWorkflows.reduce((sum, w) => sum + w.downloads, 0)).toLocaleString()}
                </h3>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <Download className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Rechercher un agent ou workflow..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 border-gray-200"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="agents" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="agents">
            <Bot className="w-4 h-4 mr-2" />
            Agents ({filteredAgents.length})
          </TabsTrigger>
          <TabsTrigger value="workflows">
            <Workflow className="w-4 h-4 mr-2" />
            Workflows ({filteredWorkflows.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-6 mt-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg font-semibold text-gray-900">Agents les plus populaires</h3>
            </div>
            
            {filteredAgents.length === 0 ? (
              <Card className="shadow-soft border-0">
                <CardContent className="text-center py-12 text-gray-500">
                  {searchTerm ? 'Aucun agent trouvé' : 'Aucun agent disponible'}
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredAgents.map((agent) => (
                  <Card key={agent.id} className="shadow-soft border-0 hover:shadow-soft-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="text-3xl">{agent.icon}</div>
                          <div className="flex-1">
                            <CardTitle className="text-base">{agent.name}</CardTitle>
                            <CardDescription className="text-xs mt-1 line-clamp-2">
                              {agent.description}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {agent.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {agent.price}
                        </Badge>
                        {agent.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span>{agent.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{agent.downloads.toLocaleString()} téléchargements</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {agent.capabilities?.slice(0, 3).map((cap: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-xs bg-gray-50">
                            {cap}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        size="sm"
                        onClick={() => installItem(agent, 'agent')}
                      >
                        <Download className="w-3 h-3 mr-2" />
                        Installer
                      </Button>
                      <p className="text-xs text-gray-500">Par {agent.publisher}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-6 mt-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-900">Workflows populaires</h3>
            </div>

            {filteredWorkflows.length === 0 ? (
              <Card className="shadow-soft border-0">
                <CardContent className="text-center py-12 text-gray-500">
                  {searchTerm ? 'Aucun workflow trouvé' : 'Aucun workflow disponible'}
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredWorkflows.map((workflow) => (
                  <Card key={workflow.id} className="shadow-soft border-0 hover:shadow-soft-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{workflow.icon}</div>
                        <div className="flex-1">
                          <CardTitle className="text-base">{workflow.name}</CardTitle>
                          <CardDescription className="text-xs mt-1 line-clamp-2">
                            {workflow.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {workflow.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {workflow.price}
                        </Badge>
                        {workflow.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span>{workflow.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{workflow.steps} étapes</span>
                        <span>•</span>
                        <span>{workflow.downloads.toLocaleString()} installs</span>
                      </div>
                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        size="sm"
                        onClick={() => installItem(workflow, 'workflow')}
                      >
                        <Download className="w-3 h-3 mr-2" />
                        Installer
                      </Button>
                      <p className="text-xs text-gray-500">Par {workflow.publisher}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
