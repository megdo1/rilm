import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { 
  Play, Send, CheckCircle2, Sparkles, Bot, Zap, 
  Heart, Star, Shield, Rocket, Crown, Flag 
} from 'lucide-react'

export function GradientTestView() {
  const colors = [
    { name: 'Blue', class: 'blue', icon: '🔵' },
    { name: 'Purple', class: 'purple', icon: '🟣' },
    { name: 'Green', class: 'green', icon: '🟢' },
    { name: 'Orange', class: 'orange', icon: '🟠' },
    { name: 'Pink', class: 'pink', icon: '🩷' },
    { name: 'Emerald', class: 'emerald', icon: '💚' },
    { name: 'Red', class: 'red', icon: '🔴' },
    { name: 'Indigo', class: 'indigo', icon: '🔵' },
  ]

  const buttonVariants = [
    { label: 'Avec Play', icon: Play },
    { label: 'Avec Send', icon: Send },
    { label: 'Avec Check', icon: CheckCircle2 },
    { label: 'Avec Sparkles', icon: Sparkles },
  ]

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Test des Gradients & Boutons
        </h1>
        <p className="text-gray-600">
          Vérification de tous les gradients de couleurs et des boutons "Exécuter"
        </p>
      </div>

      <Separator />

      {/* Gradient Backgrounds */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>1. Gradients de fond (Background)</CardTitle>
          <CardDescription>
            Classes .bg-gradient-[color] pour les fonds colorés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colors.map((color) => (
              <div key={color.class}>
                <div className={`p-6 bg-gradient-${color.class} rounded-xl shadow-soft flex items-center justify-center`}>
                  <div className="text-center">
                    <div className="text-4xl mb-2">{color.icon}</div>
                    <p className="text-white font-medium">{color.name}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                  .bg-gradient-{color.class}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Light Gradients */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>2. Gradients clairs (Light)</CardTitle>
          <CardDescription>
            Classes .bg-gradient-[color]-light pour les fonds clairs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colors.map((color) => (
              <div key={color.class}>
                <div className={`p-6 bg-gradient-${color.class}-light rounded-xl border-2 border-gray-200 flex items-center justify-center`}>
                  <div className="text-center">
                    <div className="text-4xl mb-2">{color.icon}</div>
                    <p className="text-gray-900 font-medium">{color.name} Light</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                  .bg-gradient-{color.class}-light
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Icon Boxes */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>3. Boîtes d'icônes avec gradients</CardTitle>
          <CardDescription>
            Utilisation des gradients pour les conteneurs d'icônes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {colors.map((color) => (
              <div key={color.class} className="text-center">
                <div className={`p-3 bg-gradient-${color.class} rounded-xl shadow-soft inline-flex items-center justify-center mb-2`}>
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs text-gray-600">{color.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Execute Buttons */}
      <Card className="shadow-soft border-2 border-blue-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            4. Boutons "Exécuter" avec gradients
          </CardTitle>
          <CardDescription>
            Test des boutons d'exécution pour agents et workflows - CRITIQUE
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {colors.map((color) => (
            <div key={color.class} className="space-y-3">
              <h4 className="font-medium text-gray-900 flex items-center gap-2">
                <span className="text-2xl">{color.icon}</span>
                {color.name}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {buttonVariants.map((variant) => {
                  const Icon = variant.icon
                  return (
                    <Button 
                      key={variant.label}
                      className={`bg-gradient-${color.class} hover:opacity-90 text-white`}
                      size="lg"
                    >
                      <Icon className="w-5 h-5 mr-2" />
                      {variant.label}
                    </Button>
                  )
                })}
              </div>
              <Separator className="mt-4" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Workflow Execution Button Test */}
      <Card className="shadow-soft border-2 border-green-300 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-900">
            <CheckCircle2 className="w-5 h-5" />
            5. Simulation de l'interface Workflow
          </CardTitle>
          <CardDescription className="text-green-700">
            Test du bouton "Démarrer l'exécution" comme dans WorkflowExecutionView
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white rounded-lg p-6 border border-green-200">
            <h3 className="font-semibold text-gray-900 mb-4">Contrôle d'exécution</h3>
            <div className="flex items-center gap-3">
              <Button 
                size="lg"
                className="bg-gradient-blue text-white hover:opacity-90"
              >
                <Play className="w-5 h-5 mr-2" />
                Démarrer l'exécution
              </Button>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Actif
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {colors.slice(0, 4).map((color) => (
              <div key={color.class} className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">{color.name} Workflow</p>
                <Button 
                  size="sm"
                  className={`w-full bg-gradient-${color.class} text-white hover:opacity-90`}
                >
                  <Play className="w-4 h-4 mr-1" />
                  Exécuter
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Agent Execution Button Test */}
      <Card className="shadow-soft border-2 border-purple-300 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <Bot className="w-5 h-5" />
            6. Simulation de l'interface Agent
          </CardTitle>
          <CardDescription className="text-purple-700">
            Test du bouton d'envoi de message comme dans AgentExecutionView
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white rounded-lg p-6 border border-purple-200">
            <h3 className="font-semibold text-gray-900 mb-4">Interface de chat</h3>
            <div className="flex gap-3">
              <div className="flex-1 bg-gray-100 rounded-lg p-3 text-gray-500">
                Écrivez votre message...
              </div>
              <Button size="lg" className="px-6 bg-gradient-blue text-white hover:opacity-90">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {colors.slice(0, 4).map((color) => (
              <div key={color.class} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-2 bg-gradient-${color.class} rounded-lg`}>
                    <span className="text-xl">{color.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Agent {color.name}</p>
                  </div>
                </div>
                <Button 
                  size="sm"
                  className={`w-full bg-gradient-${color.class} text-white hover:opacity-90`}
                >
                  <Send className="w-4 h-4 mr-1" />
                  Envoyer
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status Summary */}
      <Card className="shadow-soft-lg border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Shield className="w-5 h-5" />
            Résumé du test
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border-2 border-green-300">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <h4 className="font-semibold text-gray-900">Gradients</h4>
              </div>
              <p className="text-2xl font-bold text-gray-900">{colors.length * 2}</p>
              <p className="text-sm text-gray-600">Classes de gradient</p>
            </div>

            <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                <h4 className="font-semibold text-gray-900">Couleurs</h4>
              </div>
              <p className="text-2xl font-bold text-gray-900">{colors.length}</p>
              <p className="text-sm text-gray-600">Variantes de couleur</p>
            </div>

            <div className="bg-white rounded-lg p-4 border-2 border-purple-300">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-purple-500" />
                <h4 className="font-semibold text-gray-900">Boutons</h4>
              </div>
              <p className="text-2xl font-bold text-gray-900">{colors.length * buttonVariants.length}</p>
              <p className="text-sm text-gray-600">Combinaisons testées</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-900 mb-1">
                  ✅ Test des gradients terminé
                </p>
                <p className="text-sm text-green-700">
                  Tous les gradients de couleurs sont maintenant disponibles dans globals.css. 
                  Les boutons "Exécuter" dans AgentExecutionView et WorkflowExecutionView 
                  devraient s'afficher correctement avec le gradient bleu.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-900 mb-1">
                  💡 Classes CSS disponibles
                </p>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• <code className="bg-blue-100 px-1 rounded">.bg-gradient-blue</code> - Gradient bleu principal</p>
                  <p>• <code className="bg-blue-100 px-1 rounded">.bg-gradient-[color]</code> - Gradients pour purple, green, orange, pink, emerald, red, indigo</p>
                  <p>• <code className="bg-blue-100 px-1 rounded">.bg-gradient-[color]-light</code> - Versions claires de tous les gradients</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}