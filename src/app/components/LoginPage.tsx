import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Badge } from './ui/badge'
import { Info, User, Lock } from 'lucide-react'
import { projectId, publicAnonKey } from '../utils/supabase/info'
import { supabase } from '../utils/supabase/client'

interface LoginPageProps {
  onLogin: (accessToken: string, userData: any) => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isInitializing, setIsInitializing] = useState(true)

  // Auto-create test accounts on component mount
  useEffect(() => {
    const initializeTestAccounts = async () => {
      try {
        const testAccounts = [
          { email: 'test-platform@example.com', password: 'platform1234', name: 'Admin Platform', role: 'platform_admin' },
          { email: 'test-admin@example.com', password: 'admin1234', name: 'Admin Client', role: 'client_admin' },
          { email: 'test-dev@example.com', password: 'dev1234', name: 'Dev IT', role: 'developer' },
          { email: 'test-business@example.com', password: 'business1234', name: 'User Business', role: 'business' },
        ]

        let createdCount = 0

        for (const account of testAccounts) {
          try {
            const response = await fetch(
              `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/auth/signup`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${publicAnonKey}`,
                },
                body: JSON.stringify({
                  email: account.email,
                  password: account.password,
                  name: account.name,
                  role: account.role,
                  clientId: 'test-client',
                  organization: 'Hexagone Digitale',
                }),
              }
            )

            const result = await response.json()
            
            if (response.ok) {
              createdCount++
              console.log(`✅ Created test account: ${account.email}`)
            } else {
              // Account might already exist, which is fine
              if (result.error?.includes('already') || result.error?.includes('exists') || result.error?.includes('duplicate')) {
                console.log(`ℹ️ Test account already exists: ${account.email}`)
              } else {
                console.log(`⚠️ Could not create ${account.email}:`, result.error)
              }
            }
          } catch (err) {
            console.log(`⚠️ Error creating ${account.email}:`, err)
          }
        }

        if (createdCount > 0) {
          setSuccessMessage(`✅ ${createdCount} nouveau(x) compte(s) de test créé(s) !`)
        }

        setIsInitializing(false)
      } catch (err) {
        console.error('Error initializing test accounts:', err)
        setIsInitializing(false)
      }
    }

    initializeTestAccounts()
  }, [])

  const createTestAccount = async (email: string, password: string, name: string, role: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email,
            password,
            name,
            role,
            clientId: 'test-client',
            organization: 'Hexagone Digitale',
          }),
        }
      )

      const result = await response.json()
      
      if (!response.ok) {
        console.error(`Error creating ${email}:`, result.error)
        return { success: false, error: result.error }
      }
      
      return { success: true }
    } catch (err: any) {
      console.error(`Error creating ${email}:`, err)
      return { success: false, error: err.message }
    }
  }

  const handleCreateAllTestAccounts = async () => {
    setIsLoading(true)
    setError('')
    setSuccessMessage('')

    const testAccounts = [
      { email: 'test-platform@example.com', password: 'platform1234', name: 'Admin Platform', role: 'platform_admin' },
      { email: 'test-admin@example.com', password: 'admin1234', name: 'Admin Client', role: 'client_admin' },
      { email: 'test-dev@example.com', password: 'dev1234', name: 'Dev IT', role: 'developer' },
      { email: 'test-business@example.com', password: 'business1234', name: 'User Business', role: 'business' },
    ]

    let successCount = 0
    let errorMessages = []

    for (const account of testAccounts) {
      const result = await createTestAccount(account.email, account.password, account.name, account.role)
      if (result.success) {
        successCount++
      } else {
        // Ignore "User already exists" errors
        if (!result.error?.includes('already') && !result.error?.includes('exists')) {
          errorMessages.push(`${account.email}: ${result.error}`)
        } else {
          successCount++ // Count as success if already exists
        }
      }
    }

    if (errorMessages.length > 0) {
      setError(`Erreur lors de la création de certains comptes: ${errorMessages.join(', ')}`)
    } else {
      setSuccessMessage(`✅ ${successCount} compte(s) de test créé(s) ou déjà existant(s) ! Vous pouvez maintenant vous connecter.`)
    }

    setIsLoading(false)
  }

  const handleQuickTestLogin = async (email: string, password: string, defaultName: string, defaultRole: string) => {
    setIsLoading(true)
    setError('')
    setSuccessMessage('')

    try {
      await supabase.auth.signOut()
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Quick test login error:', error)
        
        // If account doesn't exist, try to create it first
        if (error.message.includes('Invalid login credentials')) {
          console.log(`Attempting to create account: ${email}`)
          const createResult = await createTestAccount(email, password, defaultName, defaultRole)
          
          if (createResult.success) {
            // Try login again after creating account
            const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
              email,
              password,
            })
            
            if (retryError) {
              setError(`Erreur: ${retryError.message}`)
              setIsLoading(false)
              return
            }
            
            if (retryData.session) {
              const userData = {
                name: retryData.user.user_metadata?.name || defaultName,
                role: retryData.user.user_metadata?.role || defaultRole,
                organization: retryData.user.user_metadata?.organization || 'Test Organization',
                ...retryData.user.user_metadata
              }
              
              onLogin(retryData.session.access_token, userData)
              return
            }
          } else {
            setError(`❌ Impossible de créer le compte: ${createResult.error}`)
            setIsLoading(false)
            return
          }
        } else {
          setError(`Erreur de connexion: ${error.message}`)
        }
        setIsLoading(false)
        return
      }

      if (data.session) {
        const userData = {
          name: data.user.user_metadata?.name || defaultName,
          role: data.user.user_metadata?.role || defaultRole,
          organization: data.user.user_metadata?.organization || 'Test Organization',
          ...data.user.user_metadata
        }
        
        onLogin(data.session.access_token, userData)
      }
    } catch (err: any) {
      console.error('Quick test login error:', err)
      setError(err?.message || 'Erreur de connexion')
    }

    setIsLoading(false)
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('signin-email') as string
    const password = formData.get('signin-password') as string

    try {
      // Clear any existing invalid sessions first
      await supabase.auth.signOut()
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Sign in error:', error)
        setError(error.message === 'Invalid login credentials' 
          ? 'Email ou mot de passe incorrect' 
          : error.message)
        setIsLoading(false)
        return
      }

      if (data.session) {
        // Use user metadata or default values
        const userData = {
          name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'Utilisateur',
          role: data.user.user_metadata?.role || 'business',
          organization: data.user.user_metadata?.organization || 'Mon Organisation',
          ...data.user.user_metadata
        }
        
        onLogin(data.session.access_token, userData)
      }
    } catch (err: any) {
      console.error('Sign in error:', err)
      setError(err?.message || 'Erreur de connexion')
    }

    setIsLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('signup-email') as string
    const password = formData.get('signup-password') as string
    const name = formData.get('signup-name') as string
    const role = formData.get('signup-role') as string

    try {
      // Clear any existing invalid sessions first
      await supabase.auth.signOut()
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email,
            password,
            name,
            role,
            clientId: 'default',
            organization: 'Default Org',
          }),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || "Erreur lors de l'inscription")
        setIsLoading(false)
        return
      }

      // Auto sign in after signup
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Auto sign-in error:', error)
        setError(error.message)
        setIsLoading(false)
        return
      }

      if (data.session) {
        const userData = {
          name,
          role,
          organization: 'Default Org'
        }
        onLogin(data.session.access_token, userData)
      }
    } catch (err: any) {
      console.error('Sign up error:', err)
      setError(err?.message || "Erreur lors de l'inscription")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-blue rounded-xl mb-4 shadow-soft">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold bg-gradient-blue bg-clip-text text-transparent mb-2">HEXAGONE.AI</h1>
          <p className="text-gray-600">Plateforme IA Générative Sécurisée</p>
        </div>

        {/* Test Accounts Cards - 4 different profiles */}
        <Card className="mb-6 shadow-soft border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Info className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-blue-900">🧪 Comptes de Test - Connexion Rapide</h3>
            </div>
            
            <p className="text-xs text-blue-700 mb-4">
              💡 Si un compte n'existe pas, créez-le via l'onglet "Inscription" avec les identifiants ci-dessous.
            </p>

            <div className="grid grid-cols-1 gap-3">
              {/* Admin Plateforme */}
              <div className="bg-gradient-to-r from-purple-50 to-white border border-purple-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔐</span>
                    <span className="font-semibold text-purple-900">Admin Plateforme</span>
                  </div>
                  <Badge className="bg-purple-100 text-purple-700 border-purple-300">platform_admin</Badge>
                </div>
                <div className="space-y-1 text-xs mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3 text-purple-600" />
                    <code className="text-purple-700 font-mono">test-platform@example.com</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-3 h-3 text-purple-600" />
                    <code className="text-purple-700 font-mono">platform1234</code>
                  </div>
                </div>
                <Button 
                  onClick={() => handleQuickTestLogin('test-platform@example.com', 'platform1234', 'Admin Platform', 'platform_admin')}
                  variant="outline"
                  size="sm"
                  className="w-full border-purple-300 text-purple-700 hover:bg-purple-100"
                  disabled={isLoading}
                >
                  {isLoading ? 'Connexion...' : '⚡ Connexion'}
                </Button>
              </div>

              {/* Admin Client */}
              <div className="bg-gradient-to-r from-blue-50 to-white border border-blue-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👤</span>
                    <span className="font-semibold text-blue-900">Admin Client</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-300">client_admin</Badge>
                </div>
                <div className="space-y-1 text-xs mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3 text-blue-600" />
                    <code className="text-blue-700 font-mono">test-admin@example.com</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-3 h-3 text-blue-600" />
                    <code className="text-blue-700 font-mono">admin1234</code>
                  </div>
                </div>
                <Button 
                  onClick={() => handleQuickTestLogin('test-admin@example.com', 'admin1234', 'Admin Client', 'client_admin')}
                  variant="outline"
                  size="sm"
                  className="w-full border-blue-300 text-blue-700 hover:bg-blue-100"
                  disabled={isLoading}
                >
                  {isLoading ? 'Connexion...' : '⚡ Connexion'}
                </Button>
              </div>

              {/* Développeur IT */}
              <div className="bg-gradient-to-r from-green-50 to-white border border-green-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">💻</span>
                    <span className="font-semibold text-green-900">Développeur IT</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-300">developer</Badge>
                </div>
                <div className="space-y-1 text-xs mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3 text-green-600" />
                    <code className="text-green-700 font-mono">test-dev@example.com</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-3 h-3 text-green-600" />
                    <code className="text-green-700 font-mono">dev1234</code>
                  </div>
                </div>
                <Button 
                  onClick={() => handleQuickTestLogin('test-dev@example.com', 'dev1234', 'Dev IT', 'developer')}
                  variant="outline"
                  size="sm"
                  className="w-full border-green-300 text-green-700 hover:bg-green-100"
                  disabled={isLoading}
                >
                  {isLoading ? 'Connexion...' : '⚡ Connexion'}
                </Button>
              </div>

              {/* Utilisateur Métier */}
              <div className="bg-gradient-to-r from-orange-50 to-white border border-orange-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📊</span>
                    <span className="font-semibold text-orange-900">Utilisateur Métier</span>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 border-orange-300">business</Badge>
                </div>
                <div className="space-y-1 text-xs mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3 text-orange-600" />
                    <code className="text-orange-700 font-mono">test-business@example.com</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-3 h-3 text-orange-600" />
                    <code className="text-orange-700 font-mono">business1234</code>
                  </div>
                </div>
                <Button 
                  onClick={() => handleQuickTestLogin('test-business@example.com', 'business1234', 'User Business', 'business')}
                  variant="outline"
                  size="sm"
                  className="w-full border-orange-300 text-orange-700 hover:bg-orange-100"
                  disabled={isLoading}
                >
                  {isLoading ? 'Connexion...' : '⚡ Connexion'}
                </Button>
              </div>
            </div>

            {/* Create All Test Accounts Button */}
            <div className="mt-4">
              <Button
                onClick={handleCreateAllTestAccounts}
                variant="outline"
                size="sm"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
                disabled={isLoading}
              >
                {isLoading ? 'Création...' : '🔧 Créer tous les comptes de test'}
              </Button>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm mt-4">
                {successMessage}
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Connexion</TabsTrigger>
            <TabsTrigger value="signup">Inscription</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle>Se connecter</CardTitle>
                <CardDescription>
                  Accédez à votre compte HEXAGONE.AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      name="signin-email"
                      type="email"
                      placeholder="votre@email.com"
                      required
                      className="border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Mot de passe</Label>
                    <Input
                      id="signin-password"
                      name="signin-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="border-gray-200"
                    />
                  </div>
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      {error}
                    </div>
                  )}
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? 'Connexion...' : 'Se connecter'}
                  </Button>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      Pas encore de compte ? Cliquez sur l'onglet Inscription
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle>Créer un compte</CardTitle>
                <CardDescription>
                  Rejoignez HEXAGONE.AI dès maintenant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Nom complet</Label>
                    <Input
                      id="signup-name"
                      name="signup-name"
                      type="text"
                      placeholder="Jean Dupont"
                      required
                      className="border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="signup-email"
                      type="email"
                      placeholder="votre@email.com"
                      required
                      className="border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Mot de passe</Label>
                    <Input
                      id="signup-password"
                      name="signup-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-role">Profil</Label>
                    <Select name="signup-role" required>
                      <SelectTrigger className="border-gray-200">
                        <SelectValue placeholder="Sélectionnez votre profil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="platform_admin">🔐 Admin Plateforme</SelectItem>
                        <SelectItem value="client_admin">👤 Admin Client</SelectItem>
                        <SelectItem value="developer">💻 Développeur IT</SelectItem>
                        <SelectItem value="business">📊 Utilisateur Métier</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      {error}
                    </div>
                  )}
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? 'Création...' : 'Créer un compte'}
                  </Button>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-xs">
                    💡 <strong>Note :</strong> Après inscription, vous pourrez créer des organisations et y inviter des membres.
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}