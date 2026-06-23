import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select'
import { Building2, Check, ChevronDown } from 'lucide-react'
import { projectId } from '../utils/supabase/info'
import { Badge } from './ui/badge'

interface OrganizationSelectorProps {
  accessToken: string
  selectedOrgId: string | null
  onSelectOrganization: (orgId: string | null) => void
  compact?: boolean
}

export function OrganizationSelector({ 
  accessToken, 
  selectedOrgId, 
  onSelectOrganization,
  compact = false
}: OrganizationSelectorProps) {
  const [organizations, setOrganizations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchOrganizations()
  }, [])

  const fetchOrganizations = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-73c2e870/organizations`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      const data = await response.json()
      setOrganizations(data.organizations || [])
    } catch (error) {
      console.error('Error fetching organizations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getOrgIcon = (type: string) => {
    switch (type) {
      case 'juridique': return '⚖️'
      case 'commercial': return '💼'
      case 'rh': return '👥'
      case 'marketing': return '📢'
      case 'it': return '💻'
      case 'generaux': return '🏢'
      default: return '📁'
    }
  }

  const selectedOrg = organizations.find(org => org.id === selectedOrgId)

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
        <div className="h-4 w-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin"></div>
        <span className="text-sm text-gray-500">Chargement...</span>
      </div>
    )
  }

  if (compact) {
    return (
      <div className="relative">
        <Select 
          value={selectedOrgId || 'all'} 
          onValueChange={(value) => onSelectOrganization(value === 'all' ? null : value)}
        >
          <SelectTrigger className="w-[220px] border-gray-200">
            <SelectValue placeholder="Toutes les organisations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span>Toutes les organisations</span>
              </div>
            </SelectItem>
            {organizations.map((org) => (
              <SelectItem key={org.id} value={org.id}>
                <div className="flex items-center gap-2">
                  <span>{getOrgIcon(org.type)}</span>
                  <span>{org.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-soft">
      <div className="flex items-center gap-3 mb-3">
        <Building2 className="w-5 h-5 text-blue-600" />
        <h3 className="font-medium text-gray-900">Organisation active</h3>
      </div>
      
      <Select 
        value={selectedOrgId || 'all'} 
        onValueChange={(value) => onSelectOrganization(value === 'all' ? null : value)}
      >
        <SelectTrigger className="w-full border-gray-200">
          <SelectValue placeholder="Sélectionnez une organisation" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span>Toutes les organisations</span>
              </div>
              {!selectedOrgId && <Check className="w-4 h-4 text-blue-600" />}
            </div>
          </SelectItem>
          {organizations.map((org) => (
            <SelectItem key={org.id} value={org.id}>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span>{getOrgIcon(org.type)}</span>
                  <div>
                    <p className="font-medium">{org.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{org.type}</p>
                  </div>
                </div>
                {selectedOrgId === org.id && <Check className="w-4 h-4 text-blue-600" />}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedOrg && (
        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <span>{getOrgIcon(selectedOrg.type)}</span>
            <span className="font-medium text-gray-900">{selectedOrg.name}</span>
          </div>
          <Badge variant="outline" className="border-blue-200 text-blue-700 capitalize">
            {selectedOrg.type}
          </Badge>
        </div>
      )}

      {organizations.length === 0 && (
        <p className="text-sm text-gray-500 mt-2">
          Aucune organisation disponible
        </p>
      )}
    </div>
  )
}
