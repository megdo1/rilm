import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { ScrollArea } from './ui/scroll-area'
import { Separator } from './ui/separator'
import { Shield, Lock, FileText, Scale, AlertCircle, CheckCircle2 } from 'lucide-react'

interface EthicsSecurityScreenProps {
  onAccept: () => void
}

export function EthicsSecurityScreen({ onAccept }: EthicsSecurityScreenProps) {
  const [hasReadAll, setHasReadAll] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false)
  const [acceptedSecurity, setAcceptedSecurity] = useState(false)

  // Pour les tests : autoriser l'acceptation sans lecture complète
  const canProceed = acceptedTerms && acceptedPrivacy && acceptedSecurity

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 50
    if (isAtBottom && !hasReadAll) {
      setHasReadAll(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50 p-4">
      <Card className="w-full max-w-4xl shadow-xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-center space-y-3 pb-6">
          <div className="flex justify-center">
            <div className="p-4 bg-gradient-blue rounded-2xl shadow-soft">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl">Éthique, Propriété & Sécurité</CardTitle>
          <CardDescription className="text-base">
            Veuillez prendre connaissance des mentions juridiques et conditions d'utilisation de la plateforme HEXAGONE.AI
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Scrollable Content Area */}
          <ScrollArea 
            className="h-[400px] rounded-lg border border-gray-200 bg-white p-6"
            onScroll={handleScroll}
          >
            <div className="space-y-8 pr-4">
              {/* Section 1: Éthique et Usage Responsable */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Scale className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">1. Éthique et Usage Responsable de l'IA</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                  <p>
                    <strong>1.1 Engagement éthique :</strong> HEXAGONE.AI s'engage à promouvoir un usage éthique et responsable de l'intelligence artificielle. Les utilisateurs doivent utiliser la plateforme dans le respect des principes suivants :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Respect de la dignité humaine et des droits fondamentaux</li>
                    <li>Non-discrimination et équité dans l'utilisation des modèles IA</li>
                    <li>Transparence sur l'utilisation de l'IA auprès des parties prenantes</li>
                    <li>Responsabilité dans les décisions prises avec l'assistance de l'IA</li>
                  </ul>
                  <p>
                    <strong>1.2 Usages interdits :</strong> Il est strictement interdit d'utiliser HEXAGONE.AI pour :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Générer du contenu illégal, diffamatoire, haineux ou discriminatoire</li>
                    <li>Créer des deepfakes ou contenus trompeurs à des fins malveillantes</li>
                    <li>Porter atteinte à la vie privée ou aux droits d'autrui</li>
                    <li>Contourner les mesures de sécurité ou tenter d'accéder à des données non autorisées</li>
                    <li>Utiliser la plateforme pour des activités frauduleuses ou criminelles</li>
                  </ul>
                  <p>
                    <strong>1.3 Conformité RGPD et IA Act :</strong> La plateforme est conçue en conformité avec le Règlement Général sur la Protection des Données (RGPD) et anticipe les exigences de l'AI Act européen concernant les systèmes d'IA à haut risque.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Section 2: Propriété Intellectuelle */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">2. Propriété Intellectuelle et Données</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                  <p>
                    <strong>2.1 Propriété des contenus générés :</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Les contenus générés par les utilisateurs via la plateforme restent la propriété exclusive de l'utilisateur ou de son organisation</li>
                    <li>HEXAGONE.AI ne revendique aucun droit sur les prompts, workflows ou résultats générés par les utilisateurs</li>
                    <li>Les données des clients sont strictement cloisonnées et ne sont jamais partagées entre organisations</li>
                  </ul>
                  <p>
                    <strong>2.2 Propriété de la plateforme :</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Le code source, l'architecture et les composants de HEXAGONE.AI restent la propriété exclusive de l'éditeur</li>
                    <li>Les modèles IA sous-jacents (GPT, Claude, etc.) restent la propriété de leurs éditeurs respectifs</li>
                    <li>La marque HEXAGONE.AI et ses éléments graphiques sont protégés</li>
                  </ul>
                  <p>
                    <strong>2.3 Utilisation des données pour amélioration :</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>En mode SaaS : Les métadonnées d'usage anonymisées peuvent être utilisées pour améliorer la plateforme</li>
                    <li>En mode On-Premise : Aucune donnée ne quitte l'infrastructure du client</li>
                    <li>Les données d'entraînement des modèles ne sont jamais utilisées sans consentement explicite</li>
                  </ul>
                  <p>
                    <strong>2.4 Responsabilité sur les contenus :</strong> L'utilisateur est seul responsable des contenus qu'il génère et doit s'assurer de disposer des droits nécessaires sur les données qu'il fournit à la plateforme.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Section 3: Sécurité et Confidentialité */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Lock className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">3. Sécurité et Confidentialité</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                  <p>
                    <strong>3.1 Mesures de sécurité :</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Chiffrement de bout en bout des données en transit (TLS 1.3)</li>
                    <li>Chiffrement au repos des données sensibles (AES-256)</li>
                    <li>Authentification multi-facteurs disponible pour tous les utilisateurs</li>
                    <li>Contrôles d'accès basés sur les rôles (RBAC) et les organisations</li>
                    <li>Journalisation et audit de toutes les opérations sensibles</li>
                    <li>Tests de sécurité et audits réguliers</li>
                  </ul>
                  <p>
                    <strong>3.2 Isolation multi-tenant :</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Séparation stricte des données entre clients et organisations</li>
                    <li>Base de données avec isolation logique et physique</li>
                    <li>Impossibilité d'accès croisé entre organisations</li>
                  </ul>
                  <p>
                    <strong>3.3 Conformité et certifications :</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Conformité RGPD (Règlement Général sur la Protection des Données)</li>
                    <li>Hébergement en zone UE pour les données européennes</li>
                    <li>Conformité aux standards ISO 27001 (en cours de certification)</li>
                    <li>Respect des directives de la CNIL concernant l'IA</li>
                  </ul>
                  <p>
                    <strong>3.4 Gestion des incidents :</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Procédure de notification en cas de violation de données (sous 72h)</li>
                    <li>Équipe de réponse aux incidents disponible 24/7 en mode Enterprise</li>
                    <li>Plan de continuité et de reprise d'activité (PCA/PRA)</li>
                  </ul>
                  <p>
                    <strong>3.5 Obligations des utilisateurs :</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Maintenir la confidentialité de vos identifiants de connexion</li>
                    <li>Utiliser des mots de passe robustes et les changer régulièrement</li>
                    <li>Signaler immédiatement toute activité suspecte</li>
                    <li>Ne pas partager vos accès avec des tiers non autorisés</li>
                    <li>Respecter les politiques de sécurité de votre organisation</li>
                  </ul>
                </div>
              </div>

              <Separator />

              {/* Section 4: Mentions Légales Complémentaires */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">4. Mentions Légales Complémentaires</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                  <p>
                    <strong>4.1 Limitation de responsabilité :</strong> L'IA est un outil d'assistance. Les décisions finales et la responsabilité des actions entreprises restent du ressort de l'utilisateur humain.
                  </p>
                  <p>
                    <strong>4.2 Disponibilité :</strong> Nous nous efforçons de maintenir une disponibilité de 99.9% mais ne pouvons garantir un service ininterrompu.
                  </p>
                  <p>
                    <strong>4.3 Modification des conditions :</strong> Ces conditions peuvent être modifiées. Les utilisateurs seront notifiés des changements majeurs.
                  </p>
                  <p>
                    <strong>4.4 Droit applicable :</strong> Ces conditions sont régies par le droit français. Tout litige sera soumis aux tribunaux compétents.
                  </p>
                  <p className="text-xs text-gray-500 mt-4">
                    Dernière mise à jour : 3 novembre 2024
                  </p>
                </div>
              </div>

              {!hasReadAll && (
                <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-8 pb-4 text-center">
                  <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Veuillez faire défiler pour lire l'intégralité du document
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Scroll Indicator */}
          {!hasReadAll && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <AlertCircle className="w-4 h-4" />
              <span>Il est recommandé de lire l'intégralité du document</span>
            </div>
          )}

          {/* Checkboxes */}
          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Checkbox 
                id="terms" 
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                className="mt-1"
              />
              <label 
                htmlFor="terms" 
                className="text-sm leading-relaxed text-gray-700 cursor-pointer"
              >
                <strong>J'ai lu et j'accepte les conditions d'éthique et d'usage responsable de l'IA</strong> et je m'engage à utiliser HEXAGONE.AI de manière conforme aux principes énoncés.
              </label>
            </div>

            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <Checkbox 
                id="privacy" 
                checked={acceptedPrivacy}
                onCheckedChange={(checked) => setAcceptedPrivacy(checked as boolean)}
                className="mt-1"
              />
              <label 
                htmlFor="privacy" 
                className="text-sm leading-relaxed text-gray-700 cursor-pointer"
              >
                <strong>J'ai pris connaissance des conditions de propriété intellectuelle</strong> et je comprends que mes données restent ma propriété exclusive.
              </label>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <Checkbox 
                id="security" 
                checked={acceptedSecurity}
                onCheckedChange={(checked) => setAcceptedSecurity(checked as boolean)}
                className="mt-1"
              />
              <label 
                htmlFor="security" 
                className="text-sm leading-relaxed text-gray-700 cursor-pointer"
              >
                <strong>J'ai pris connaissance des mesures de sécurité</strong> et je m'engage à respecter les bonnes pratiques de sécurité énoncées.
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <Button
              onClick={onAccept}
              disabled={!canProceed}
              className="flex-1 bg-blue-600 hover:bg-blue-700 h-12"
            >
              {canProceed ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Accepter et accéder à la plateforme
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Veuillez accepter toutes les conditions
                </>
              )}
            </Button>
          </div>

          {/* Footer Note */}
          <div className="text-center text-xs text-gray-500 pt-2">
            En continuant, vous confirmez avoir lu, compris et accepté l'ensemble des conditions ci-dessus.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
