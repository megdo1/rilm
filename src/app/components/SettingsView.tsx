import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { Separator } from './ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Settings, Bell, Shield, Globe, Database, Palette, Key, Mail } from 'lucide-react'
import { toast } from 'sonner@2.0.3'

interface SettingsViewProps {
  accessToken: string
  userRole: string
}

export function SettingsView({ accessToken, userRole }: SettingsViewProps) {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(false)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('✅ Paramètres généraux enregistrés')
  }

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('✅ Paramètres de sécurité enregistrés')
  }

  const canAccessPlatformSettings = userRole === 'platform_admin'
  const canAccessClientSettings = ['platform_admin', 'client_admin'].includes(userRole)

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">Paramètres</h2>
        <p className="text-gray-600">
          Configurez votre compte et vos préférences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="general">
            <Settings className="w-4 h-4 mr-2" />
            Général
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="w-4 h-4 mr-2" />
            Sécurité
          </TabsTrigger>
          {canAccessClientSettings && (
            <TabsTrigger value="integration">
              <Database className="w-4 h-4 mr-2" />
              Intégrations
            </TabsTrigger>
          )}
          {canAccessPlatformSettings && (
            <TabsTrigger value="platform">
              <Globe className="w-4 h-4 mr-2" />
              Plateforme
            </TabsTrigger>
          )}
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle>Informations du Profil</CardTitle>
              <CardDescription>
                Gérez vos informations personnelles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveGeneral} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      defaultValue="Jean"
                      className="border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      defaultValue="Dupont"
                      className="border-gray-200"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="jean.dupont@entreprise.com"
                    className="border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organisation</Label>
                  <Input
                    id="organization"
                    defaultValue="Hexagone Digitale"
                    className="border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Langue</Label>
                  <Select defaultValue="fr">
                    <SelectTrigger className="border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">🇫🇷 Français</SelectItem>
                      <SelectItem value="en">🇬🇧 English</SelectItem>
                      <SelectItem value="es">🇪🇸 Español</SelectItem>
                      <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Select defaultValue="paris">
                    <SelectTrigger className="border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paris">Europe/Paris (GMT+1)</SelectItem>
                      <SelectItem value="london">Europe/London (GMT+0)</SelectItem>
                      <SelectItem value="newyork">America/New_York (GMT-5)</SelectItem>
                      <SelectItem value="tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Enregistrer les modifications
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle>Apparence</CardTitle>
              <CardDescription>
                Personnalisez l'interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Palette className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Thème</p>
                    <p className="text-sm text-gray-500">Clair, sombre ou automatique</p>
                  </div>
                </div>
                <Select defaultValue="light">
                  <SelectTrigger className="w-32 border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">☀️ Clair</SelectItem>
                    <SelectItem value="dark">🌙 Sombre</SelectItem>
                    <SelectItem value="auto">🔄 Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle>Préférences de Notifications</CardTitle>
              <CardDescription>
                Choisissez comment vous souhaitez être notifié
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <Label htmlFor="email-notif">Notifications par email</Label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Recevez des emails pour les mises à jour importantes
                  </p>
                </div>
                <Switch
                  id="email-notif"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-gray-600" />
                    <Label htmlFor="push-notif">Notifications push</Label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Recevez des notifications dans votre navigateur
                  </p>
                </div>
                <Switch
                  id="push-notif"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weekly-report">Rapport hebdomadaire</Label>
                  <p className="text-sm text-gray-500">
                    Recevez un résumé de votre activité chaque lundi
                  </p>
                </div>
                <Switch
                  id="weekly-report"
                  checked={weeklyReport}
                  onCheckedChange={setWeeklyReport}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle>Sécurité du Compte</CardTitle>
              <CardDescription>
                Protégez votre compte avec des paramètres de sécurité avancés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveSecurity} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Mot de passe actuel</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="••••••••"
                    className="border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nouveau mot de passe</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    className="border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="border-gray-200"
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4 text-gray-600" />
                      <Label htmlFor="2fa">Authentification à deux facteurs</Label>
                    </div>
                    <p className="text-sm text-gray-500">
                      Ajoutez une couche de sécurité supplémentaire
                    </p>
                  </div>
                  <Switch
                    id="2fa"
                    checked={twoFactorAuth}
                    onCheckedChange={setTwoFactorAuth}
                  />
                </div>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Enregistrer les modifications
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle>Sessions Actives</CardTitle>
              <CardDescription>
                Gérez vos sessions actives sur différents appareils
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { device: 'Chrome sur Windows', location: 'Paris, France', lastActive: 'Maintenant' },
                { device: 'Safari sur iPhone', location: 'Lyon, France', lastActive: 'Il y a 2h' },
              ].map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{session.device}</p>
                    <p className="text-sm text-gray-500">{session.location} • {session.lastActive}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Révoquer
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integration Settings */}
        {canAccessClientSettings && (
          <TabsContent value="integration" className="space-y-6">
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle>Clés API</CardTitle>
                <CardDescription>
                  Gérez vos clés d'API pour les intégrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Key className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Clé API Production</p>
                      <code className="text-sm text-gray-600 bg-white px-2 py-1 rounded mt-2 inline-block">
                        hex_prod_••••••••••••••••
                      </code>
                      <p className="text-xs text-gray-500 mt-2">
                        Créée le 15 janvier 2024 • Dernière utilisation: Il y a 2h
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Régénérer
                    </Button>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer une nouvelle clé API
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle>Webhooks</CardTitle>
                <CardDescription>
                  Configurez des webhooks pour recevoir des événements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un webhook
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Platform Settings */}
        {canAccessPlatformSettings && (
          <TabsContent value="platform" className="space-y-6">
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle>Configuration Plateforme</CardTitle>
                <CardDescription>
                  Paramètres globaux de la plateforme HEXAGONE.AI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Mode de déploiement par défaut</Label>
                  <Select defaultValue="saas">
                    <SelectTrigger className="border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saas">☁️ SaaS</SelectItem>
                      <SelectItem value="onpremise">🏢 On-Premise</SelectItem>
                      <SelectItem value="hybrid">🔄 Hybride</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Modèle LLM par défaut</Label>
                  <Select defaultValue="gpt-4">
                    <SelectTrigger className="border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                      <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketplace publique</Label>
                    <p className="text-sm text-gray-500">
                      Autoriser le partage d'agents publics
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mode maintenance</Label>
                    <p className="text-sm text-gray-500">
                      Activer le mode maintenance de la plateforme
                    </p>
                  </div>
                  <Switch />
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">
                  Enregistrer les paramètres plateforme
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}