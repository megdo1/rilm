import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Users, Plus, UserPlus, Crown, UserCog, Code, Briefcase, Mail, Shield } from 'lucide-react'
import { toast } from 'sonner@2.0.3'

interface UsersViewProps {
  accessToken: string
  userRole: string
}

// Mock users data
const mockUsers = [
  { id: '1', name: 'Jean Dupont', email: 'jean.dupont@entreprise.com', role: 'platform_admin', organization: 'HEXAGONE.AI', status: 'active', lastLogin: '2024-01-15' },
  { id: '2', name: 'Marie Martin', email: 'marie.martin@client.com', role: 'client_admin', organization: 'Client Corp', status: 'active', lastLogin: '2024-01-14' },
  { id: '3', name: 'Pierre Dubois', email: 'pierre.dubois@dev.com', role: 'developer', organization: 'Tech Team', status: 'active', lastLogin: '2024-01-15' },
  { id: '4', name: 'Sophie Bernard', email: 'sophie.bernard@business.com', role: 'business', organization: 'Sales Team', status: 'active', lastLogin: '2024-01-13' },
  { id: '5', name: 'Luc Moreau', email: 'luc.moreau@client.com', role: 'business', organization: 'Marketing', status: 'inactive', lastLogin: '2024-01-10' },
]

export function UsersView({ accessToken, userRole }: UsersViewProps) {
  const [users] = useState(mockUsers)
  const [isCreating, setIsCreating] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const canManageUsers = ['platform_admin', 'client_admin'].includes(userRole)

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'platform_admin':
        return <Crown className="w-4 h-4 text-purple-600" />
      case 'client_admin':
        return <UserCog className="w-4 h-4 text-blue-600" />
      case 'developer':
        return <Code className="w-4 h-4 text-green-600" />
      case 'business':
        return <Briefcase className="w-4 h-4 text-orange-600" />
      default:
        return <Users className="w-4 h-4 text-gray-600" />
    }
  }

  const getRoleName = (role: string) => {
    switch (role) {
      case 'platform_admin':
        return 'Admin Plateforme'
      case 'client_admin':
        return 'Admin Client'
      case 'developer':
        return 'Développeur IT'
      case 'business':
        return 'Utilisateur Métier'
      default:
        return role
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'platform_admin':
        return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'client_admin':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'developer':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'business':
        return 'bg-orange-50 text-orange-700 border-orange-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsCreating(true)

    // Simulation
    setTimeout(() => {
      toast.success('✅ Utilisateur créé avec succès')
      setIsCreating(false)
      ;(e.target as HTMLFormElement).reset()
    }, 1000)
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.organization.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">Utilisateurs</h2>
          <p className="text-gray-600">
            {canManageUsers ? 'Gérez les accès et permissions des utilisateurs' : 'Liste des utilisateurs de votre organisation'}
          </p>
        </div>
        {canManageUsers && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-soft">
                <Plus className="w-4 h-4 mr-2" />
                Nouvel utilisateur
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Inviter un nouvel utilisateur</DialogTitle>
                <DialogDescription>
                  Ajoutez un membre à votre équipe
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={createUser} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="user-name">Nom complet</Label>
                  <Input
                    id="user-name"
                    name="user-name"
                    placeholder="Jean Dupont"
                    required
                    className="border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-email">Email</Label>
                  <Input
                    id="user-email"
                    name="user-email"
                    type="email"
                    placeholder="jean.dupont@entreprise.com"
                    required
                    className="border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-role">Rôle</Label>
                  <Select name="user-role" required>
                    <SelectTrigger className="border-gray-200">
                      <SelectValue placeholder="Sélectionnez un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      {userRole === 'platform_admin' && (
                        <SelectItem value="platform_admin">🔐 Admin Plateforme</SelectItem>
                      )}
                      <SelectItem value="client_admin">👤 Admin Client</SelectItem>
                      <SelectItem value="developer">💻 Développeur IT</SelectItem>
                      <SelectItem value="business">📊 Utilisateur Métier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-org">Organisation</Label>
                  <Select name="user-org" required>
                    <SelectTrigger className="border-gray-200">
                      <SelectValue placeholder="Sélectionnez une organisation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="org1">Service Commercial</SelectItem>
                      <SelectItem value="org2">Service RH</SelectItem>
                      <SelectItem value="org3">Service IT</SelectItem>
                      <SelectItem value="org4">Service Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isCreating}>
                  {isCreating ? 'Envoi invitation...' : 'Inviter l\'utilisateur'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Utilisateurs</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">{users.length}</h3>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Actifs</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">
                  {users.filter(u => u.status === 'active').length}
                </h3>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Développeurs</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">
                  {users.filter(u => u.role === 'developer').length}
                </h3>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Métier</p>
                <h3 className="text-3xl font-semibold text-gray-900 mt-2">
                  {users.filter(u => u.role === 'business').length}
                </h3>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl">
                <Briefcase className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-gray-200"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="shadow-soft border-0 hover:shadow-soft-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-base">{user.name}</CardTitle>
                  <CardDescription className="text-xs flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {user.email}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                  {getRoleIcon(user.role)}
                  <span className="ml-1">{getRoleName(user.role)}</span>
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {user.organization}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Dernière connexion: {new Date(user.lastLogin).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className={
                  user.status === 'active' 
                    ? 'bg-green-50 text-green-700 border-0' 
                    : 'bg-gray-50 text-gray-600 border-0'
                }>
                  {user.status === 'active' ? '🟢 Actif' : '⚪ Inactif'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
