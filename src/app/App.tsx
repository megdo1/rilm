import React, { useState } from 'react';
import { 
  Building2, ChevronRight, Bell, UserCheck, ChevronDown, ShieldCheck, 
  Server, Globe, Database, Cpu, Activity, Lock, Cloud, LifeBuoy, Settings, 
  Layout, Users, FileKey, Plus, Trash2, CheckCircle2, XCircle, Clock, 
  Search, ArrowRight, Home, Briefcase, Zap, Share2, Copy, Edit, Layers,
  BarChart3, Box, Link as LinkIcon, FileText, CheckSquare, Eye, LogOut,
  Save, Send, Info, GitMerge, Bot, Sparkles, Loader2, Play, ThumbsUp, ThumbsDown,
  LayoutGrid, ListTree, StretchHorizontal, PenTool, Lightbulb, Filter, Hammer, AlertTriangle, PieChart,
  Scale, Languages, Download, Target, TrendingUp, BookOpen, Store
} from 'lucide-react';

// --- Types & Navigation ---

type Screen = 
  | '00_Authentification'
  | '01_Regles_IA'
  | '02_Organisation'
  | '03_Direction_RH'
  | '04_Processus_Recrutement'
  | '05_Activation_Capacite'
  | '06_Interaction_IA'
  | '07_Gouvernance'
  | '08_Marketplace'
  | '09_Connecteurs'
  | '10_Builder'
  | '11_Catalogue'
  | '12_Version_Partageable'
  | '13_Roles_Permissions'
  | '14_Parametres_Plateforme';

export default function RilmeApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('00_Authentification');
  const [userRole, setUserRole] = useState('Admin Plateforme');

  // Navigation Helper
  const nav = (screen: Screen) => setCurrentScreen(screen);

  // --- Shared Components ---

  const Header = () => (
    <header className="bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between shrink-0 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => currentScreen !== '00_Authentification' && nav('02_Organisation')}
        >
          <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center shadow-sm">
            <span className="text-white font-serif font-bold italic text-xl">R</span>
          </div>
          <span className="font-bold text-slate-900 text-lg tracking-tight">Rilme AI</span>
        </div>

        {currentScreen !== '00_Authentification' && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors cursor-pointer group">
            <Building2 className="w-4 h-4 text-slate-500 group-hover:text-slate-700" />
            <span className="text-sm font-bold text-slate-700">Groupe XYZ</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        )}
      </div>

      {currentScreen !== '00_Authentification' && (
        <div className="flex items-center gap-4">
          <button onClick={() => nav('08_Marketplace')} className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors" title="Marketplace">
            <Store className="w-5 h-5" />
          </button>
          <button onClick={() => nav('07_Gouvernance')} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors" title="Gouvernance IA">
            <ShieldCheck className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors relative" title="Notifications">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div className="h-6 w-px bg-slate-200 mx-1"></div>
          <button className="flex items-center gap-3 pl-2 py-1 rounded-full hover:bg-slate-50 transition-colors">
            <div className="text-right leading-tight hidden sm:block">
              <div className="text-sm font-bold text-slate-800">Thomas R.</div>
              <div className="text-[10px] text-slate-500 font-medium">{userRole}</div>
            </div>
            <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 text-slate-600 shadow-sm">
              <UserCheck className="w-5 h-5" />
            </div>
          </button>
        </div>
      )}
    </header>
  );

  const Breadcrumb = ({ items }: { items: string[] }) => (
    <div className="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center gap-2 text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] shrink-0 overflow-x-auto">
      <Building2 className="w-3.5 h-3.5 text-slate-400" />
      <span className="text-slate-500 font-medium">Organisation</span>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className={`font-medium whitespace-nowrap ${idx === items.length - 1 ? 'text-slate-900 font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-200' : 'text-slate-500 hover:text-slate-800 cursor-pointer'}`}>
            {item}
          </span>
        </div>
      ))}
    </div>
  );

  // --- Screens ---

  const Screen00_Auth = () => (
    <div className="h-full flex bg-white font-sans">
      {/* Left Panel - Context & Structure (Enterprise Side) */}
      <div className="hidden lg:flex w-5/12 bg-slate-50 border-r border-slate-200 flex-col justify-between p-12">
        <div>
           <div className="flex items-center gap-3 mb-16">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center shadow-md">
                 <span className="text-white font-serif font-bold italic text-2xl">R</span>
              </div>
              <span className="font-bold text-slate-900 text-xl tracking-tight">Rilme AI</span>
           </div>
           
           <div className="space-y-10">
              <div className="flex gap-5">
                 <div className="w-12 h-12 rounded-xl bg-blue-100/50 flex items-center justify-center shrink-0 border border-blue-100">
                    <Building2 className="w-6 h-6 text-blue-700" />
                 </div>
                 <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">Multi-organisation</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">Cloisonnement strict des tenants et environnements. Architecture conçue pour les grands groupes.</p>
                 </div>
              </div>
              <div className="flex gap-5">
                 <div className="w-12 h-12 rounded-xl bg-emerald-100/50 flex items-center justify-center shrink-0 border border-emerald-100">
                    <ShieldCheck className="w-6 h-6 text-emerald-700" />
                 </div>
                 <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">Gouvernance Active</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">Validation humaine, traçabilité des prompts et conformité RGPD/ISO intégrée par design.</p>
                 </div>
              </div>
              <div className="flex gap-5">
                 <div className="w-12 h-12 rounded-xl bg-purple-100/50 flex items-center justify-center shrink-0 border border-purple-100">
                    <Database className="w-6 h-6 text-purple-700" />
                 </div>
                 <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">Données Isolées</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">Garantie "No Training". Vos données ne servent jamais à l'entraînement des modèles publics.</p>
                 </div>
              </div>
           </div>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
           <span>© 2026 Rilme AI Enterprise</span>
           <span className="w-1 h-1 rounded-full bg-slate-300"></span>
           <span>v4.2.0 (Stable)</span>
        </div>
      </div>
  
      {/* Right Panel - Login Form (Interaction Side) */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white relative">
         <div className="w-full max-w-[440px] space-y-10">
            <div className="text-center">
               <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Bienvenue sur Rilme AI</h1>
               <p className="text-slate-500 text-lg font-medium">Plateforme IA gouvernée pour les organisations</p>
            </div>
  
            <div className="space-y-6">
               <div className="space-y-5">
                  <div>
                     <label className="block text-sm font-bold text-slate-900 mb-2">Email professionnel</label>
                     <div className="relative group">
                        <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input 
                           type="email" 
                           placeholder="nom@organisation.com" 
                           className="w-full pl-11 pr-4 py-3.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm font-medium" 
                        />
                     </div>
                  </div>
                  
                  <div>
                     <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-slate-900">Mot de passe</label>
                        <a href="#" className="text-xs font-bold text-blue-600 hover:underline">Oublié ?</a>
                     </div>
                     <div className="relative group">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input 
                           type="password" 
                           placeholder="••••••••" 
                           className="w-full pl-11 pr-4 py-3.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm font-medium" 
                        />
                     </div>
                  </div>
               </div>
  
               <button 
                 onClick={() => nav('01_Regles_IA')}
                 className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm"
               >
                 Se connecter
                 <ArrowRight className="w-4 h-4" />
               </button>
  
               <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink-0 mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-wider">Ou connexion sécurisée</span>
                  <div className="flex-grow border-t border-slate-200"></div>
               </div>
  
               <button className="w-full bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-slate-700 font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 text-sm">
                  <ShieldCheck className="w-4 h-4 text-slate-500" />
                  Connexion via SSO Organisation
               </button>
            </div>
  
            <div className="pt-6">
               <div className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 rounded-lg border border-slate-100 text-center">
                  <Activity className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-xs text-slate-500 font-medium">Chaque action est tracée et gouvernée.</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  const Screen01_Regles = () => {
    const [accepted, setAccepted] = useState(false);

    return (
      <div className="h-full flex flex-col bg-white">
        
         {/* 1. Header Institutionnel */}
         <div className="flex-none p-10 border-b border-slate-100">
             <div className="max-w-[1200px] mx-auto w-full">
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-white font-serif font-bold italic text-2xl">R</span>
                   </div>
                   <span className="font-bold text-slate-900 text-xl tracking-tight">Rilme AI</span>
                </div>
                <div>
                   <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">Règles d’usage & bonne conduite IA</h1>
                   <p className="text-lg text-slate-500 font-medium">Cadre responsable d’utilisation de l’IA en environnement d’entreprise</p>
                </div>
             </div>
         </div>

         {/* 2. Principes Fondamentaux (Full Width Grid) */}
         <div className="flex-1 overflow-auto bg-white p-10 flex flex-col justify-center">
             <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                 {/* Bloc 1 */}
                 <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                       <UserCheck className="w-7 h-7" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-slate-900 mb-2">Responsabilité humaine</h3>
                       <p className="text-slate-500 leading-relaxed text-base">
                         L’IA assiste. La décision finale reste humaine.
                       </p>
                    </div>
                 </div>

                 {/* Bloc 2 */}
                 <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                       <Lock className="w-7 h-7" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-slate-900 mb-2">Protection des données</h3>
                       <p className="text-slate-500 leading-relaxed text-base">
                         Les données sont utilisées dans un cadre strictement autorisé et sécurisé.
                       </p>
                    </div>
                 </div>

                 {/* Bloc 3 */}
                 <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                       <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-slate-900 mb-2">Contrôle & validation</h3>
                       <p className="text-slate-500 leading-relaxed text-base">
                         Les résultats IA doivent être contrôlés et validés avant action.
                       </p>
                    </div>
                 </div>

                 {/* Bloc 4 */}
                 <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                       <Activity className="w-7 h-7" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-slate-900 mb-2">Traçabilité</h3>
                       <p className="text-slate-500 leading-relaxed text-base">
                         Toutes les actions IA sont enregistrées et auditables.
                       </p>
                    </div>
                 </div>
             </div>
         </div>

         {/* 3. Bloc Engagement (Encadré Full Width) */}
         <div className="flex-none bg-slate-50 py-8 px-10 border-t border-b border-slate-100">
             <div className="max-w-[1200px] mx-auto w-full text-center">
                <p className="text-slate-600 font-medium text-lg leading-relaxed max-w-3xl mx-auto">
                   “En utilisant Rilme AI, vous vous engagez à respecter les règles d’usage de votre organisation et à exercer votre jugement professionnel avant toute décision.”
                </p>
             </div>
         </div>

         {/* 4. Zone Validation & CTA (Bottom) */}
         <div className="flex-none p-10 bg-white">
             <div className="max-w-[1200px] mx-auto w-full flex flex-col items-center gap-8">
                
                <label className="flex items-center gap-3 cursor-pointer group p-2 select-none">
                   <div className="relative flex items-center">
                     <input 
                       type="checkbox" 
                       className="peer sr-only"
                       checked={accepted}
                       onChange={(e) => setAccepted(e.target.checked)}
                     />
                     <div className="w-6 h-6 border-2 border-slate-300 rounded peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all flex items-center justify-center bg-white group-hover:border-slate-400">
                       <CheckCircle2 className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                     </div>
                   </div>
                   <span className="text-base font-bold text-slate-700 group-hover:text-slate-900">
                     J’ai lu et j’accepte les règles d’usage de Rilme AI
                   </span>
                </label>

                <div className="flex flex-col items-center gap-4 w-full">
                   <button 
                     disabled={!accepted}
                     onClick={() => nav('02_Organisation')}
                     className={`w-full max-w-md py-4 font-bold text-base rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 ${
                       accepted 
                         ? 'bg-slate-900 hover:bg-slate-800 text-white hover:shadow-xl hover:-translate-y-0.5' 
                         : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                     }`}
                   >
                     Accéder à la plateforme <ArrowRight className="w-5 h-5" />
                   </button>
                   
                   <button className="text-slate-400 hover:text-slate-600 text-sm font-medium hover:underline transition-colors">
                      Consulter ces règles ultérieurement
                   </button>
                </div>

             </div>
         </div>
      </div>
    );
  };

  const Screen02_Organisation = () => {
    const [view, setView] = useState<'matrix' | 'vertical' | 'process'>('matrix');

    // Data Definitions
    const directions = [
      { id: 'rh', name: 'Ressources Humaines', color: 'blue', icon: Users, stats: { coverage: 'High', agents: 12 } },
      { id: 'si', name: 'Systèmes d\'Information', color: 'slate', icon: Server, stats: { coverage: 'Medium', agents: 8 } },
      { id: 'fi', name: 'Direction Financière', color: 'emerald', icon: PieChart, stats: { coverage: 'Low', agents: 3 } },
      { id: 'ops', name: 'Opérations', color: 'amber', icon: Settings, stats: { coverage: 'Medium', agents: 5 } },
      { id: 'com', name: 'Commercial & Relation Client', color: 'rose', icon: Briefcase, stats: { coverage: 'Low', agents: 2 } },
    ];

    const processes = [
      { id: 'recrut', name: 'Recrutement & Intégration' },
      { id: 'incident', name: 'Gestion des Incidents' },
      { id: 'budget', name: 'Planification Budgétaire' },
      { id: 'vente', name: 'Cycle de Vente B2B' },
    ];

    // Helper for Matrix Cells
    const getMatrixCell = (dirId: string, procId: string) => {
       // Logic for demo
       if (dirId === 'rh' && procId === 'recrut') return { status: 'COUVERT', count: 3, type: 'active' };
       if (dirId === 'si' && procId === 'incident') return { status: 'COUVERT', count: 5, type: 'active' };
       if (dirId === 'fi' && procId === 'budget') return { status: 'PARTIEL', count: 1, type: 'warning' };
       if (dirId === 'si' && procId === 'recrut') return { status: 'PARTIEL', count: 1, type: 'warning' }; // IT onboarding
       if (dirId === 'rh' && procId === 'budget') return { status: 'NON COUVERT', count: 0, type: 'inactive' };
       
       return { status: 'NON COUVERT', count: 0, type: 'inactive' };
    };

    return (
      <div className="flex flex-col h-full bg-[#F8F9FA]">
        <Breadcrumb items={['Vue Globale', 'Cartographie Organisationnelle']} />
        
        {/* Header & Tabs */}
        <div className="px-8 py-6 bg-white border-b border-slate-200 shadow-sm z-20">
           <div className="max-w-full mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                 <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-slate-900">Organisation — Groupe XYZ</h1>
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded border border-blue-200">Enterprise</span>
                 </div>
                 <p className="text-slate-500 font-medium">Pilotage des déploiements IA : Vues Matrice, Hiérarchique et Processus</p>
              </div>
              
              <div className="bg-slate-100 p-1 rounded-lg flex shrink-0 border border-slate-200">
                 <button 
                   onClick={() => setView('matrix')} 
                   className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-bold transition-all ${view === 'matrix' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
                 >
                    <LayoutGrid className="w-4 h-4" /> Matrice
                 </button>
                 <button 
                   onClick={() => setView('vertical')} 
                   className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-bold transition-all ${view === 'vertical' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
                 >
                    <ListTree className="w-4 h-4" /> Verticale
                 </button>
                 <button 
                   onClick={() => setView('process')} 
                   className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-bold transition-all ${view === 'process' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
                 >
                    <GitMerge className="w-4 h-4" /> Processus
                 </button>
              </div>
           </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-[#F8F9FA] relative p-8">
           
           {/* 1️⃣ VUE MATRICE */}
           {view === 'matrix' && (
              <div className="min-w-[1200px] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                 {/* Matrix Header */}
                 <div className="grid grid-cols-[240px_repeat(5,1fr)] bg-slate-50 border-b border-slate-200 divide-x divide-slate-200">
                    <div className="p-4 flex items-end pb-2 font-bold text-slate-400 text-xs uppercase tracking-wider">
                       Processus \ Directions
                    </div>
                    {directions.map(dir => (
                       <div key={dir.id} onClick={() => dir.id === 'rh' && nav('03_Direction_RH')} className="p-4 flex flex-col items-center gap-2 hover:bg-white cursor-pointer transition-colors group py-6">
                          <div className={`w-10 h-10 rounded-lg bg-${dir.color}-100 flex items-center justify-center text-${dir.color}-700 group-hover:scale-110 transition-transform`}>
                             <dir.icon className="w-5 h-5" />
                          </div>
                          <span className="font-bold text-slate-800 text-sm text-center leading-tight">{dir.name}</span>
                       </div>
                    ))}
                 </div>

                 {/* Matrix Body */}
                 <div className="divide-y divide-slate-100">
                    {processes.map(proc => (
                       <div key={proc.id} className="grid grid-cols-[240px_repeat(5,1fr)] divide-x divide-slate-100 hover:bg-slate-50/50 transition-colors">
                          <div className="p-5 flex flex-col justify-center bg-white">
                             <span className="font-bold text-slate-800 text-sm mb-1">{proc.name}</span>
                             <span className="text-xs text-slate-400 font-medium">Processus Transverse</span>
                          </div>
                          {directions.map(dir => {
                             const cell = getMatrixCell(dir.id, proc.id);
                             return (
                                <div key={`${dir.id}-${proc.id}`} className="p-3 relative group flex flex-col items-center justify-center min-h-[110px]">
                                   {cell.type !== 'inactive' ? (
                                      <div className="w-full h-full bg-white border border-slate-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between" onClick={() => dir.id === 'rh' && nav('03_Direction_RH')}>
                                         <div className="flex justify-between items-start">
                                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                                               cell.type === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                                            }`}>
                                               {cell.status}
                                            </span>
                                            <Bot className={`w-4 h-4 ${cell.type === 'active' ? 'text-emerald-600' : 'text-amber-500'}`} />
                                         </div>
                                         <div className="text-center mt-2">
                                            <div className="font-bold text-slate-900 text-lg">{cell.count}</div>
                                            <div className="text-[10px] text-slate-500 uppercase font-bold">Agents Actifs</div>
                                         </div>
                                      </div>
                                   ) : (
                                      <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                         <button className="flex flex-col items-center gap-1 text-slate-300 hover:text-blue-600 transition-colors">
                                            <div className="w-8 h-8 rounded-full border border-dashed border-current flex items-center justify-center">
                                               <Plus className="w-4 h-4" />
                                            </div>
                                            <span className="text-[10px] font-bold">Explorer</span>
                                         </button>
                                      </div>
                                   )}
                                </div>
                             );
                          })}
                       </div>
                    ))}
                 </div>
              </div>
           )}

           {/* 2️⃣ VUE VERTICALE */}
           {view === 'vertical' && (
              <div className="flex flex-col gap-6 max-w-5xl mx-auto">
                 {/* Top Stats Panel */}
                 <div className="grid grid-cols-4 gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex flex-col gap-1 border-r border-slate-100 pr-4">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Couverture Globale</span>
                       <div className="flex items-end gap-2">
                          <span className="text-3xl font-bold text-slate-900">42%</span>
                          <span className="text-xs font-bold text-emerald-600 mb-1">+5% vs M-1</span>
                       </div>
                    </div>
                    <div className="flex flex-col gap-1 border-r border-slate-100 px-4">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Agents Déployés</span>
                       <div className="flex items-end gap-2">
                          <span className="text-3xl font-bold text-slate-900">34</span>
                          <span className="text-xs font-bold text-slate-500 mb-1">Actifs</span>
                       </div>
                    </div>
                    <div className="flex flex-col gap-1 border-r border-slate-100 px-4">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Workflows</span>
                       <div className="flex items-end gap-2">
                          <span className="text-3xl font-bold text-slate-900">128</span>
                          <span className="text-xs font-bold text-slate-500 mb-1">Exécutions / j</span>
                       </div>
                    </div>
                    <div className="flex flex-col gap-1 pl-4 justify-center">
                       <button className="flex items-center justify-between w-full bg-slate-50 hover:bg-slate-100 p-3 rounded-lg border border-slate-200 transition-colors group">
                          <span className="text-sm font-bold text-slate-700">Règles Gouvernance</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                       </button>
                    </div>
                 </div>

                 {/* Hierarchy Tree */}
                 <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 min-h-[600px]">
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                       <Building2 className="w-6 h-6 text-slate-900" />
                       <h2 className="text-xl font-bold text-slate-900">Organisation Hiérarchique</h2>
                    </div>

                    <div className="space-y-8 pl-4">
                       {/* RH Branch (Expanded) */}
                       <div className="relative">
                          <div className="absolute top-8 bottom-0 left-[19px] w-px bg-slate-200"></div>
                          
                          {/* Level 1: Direction */}
                          <div 
                             className="flex items-center gap-4 p-4 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-50 cursor-pointer transition-colors mb-4 relative z-10"
                             onClick={() => nav('03_Direction_RH')}
                          >
                             <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                <Users className="w-5 h-5" />
                             </div>
                             <div className="flex-1">
                                <h3 className="font-bold text-slate-900 text-lg">Direction des Ressources Humaines</h3>
                                <div className="flex gap-4 mt-1">
                                   <span className="text-xs font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> 12 Agents Actifs</span>
                                   <span className="text-xs font-medium text-slate-500">4 Départements</span>
                                </div>
                             </div>
                             <div className="px-3 py-1 rounded bg-white border border-blue-100 text-blue-700 text-xs font-bold shadow-sm">
                                COUVERTURE ÉLEVÉE
                             </div>
                          </div>

                          {/* Level 2: Departement */}
                          <div className="pl-12 space-y-6">
                             <div className="relative">
                                <div className="absolute top-1/2 -left-6 w-6 h-px bg-slate-200"></div>
                                <div className="bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                                   <div className="flex justify-between items-center mb-3">
                                      <div className="flex items-center gap-2">
                                         <div className="w-2 h-2 rounded-full bg-slate-900"></div>
                                         <h4 className="font-bold text-slate-800">Département Recrutement & Mobilité</h4>
                                      </div>
                                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100">COUVERT</span>
                                   </div>
                                   
                                   {/* Level 3: Service + Agents */}
                                   <div className="pl-6 border-l-2 border-slate-100 space-y-3 mt-3">
                                      <div className="flex items-start justify-between group">
                                         <div>
                                            <span className="text-sm font-medium text-slate-600 block mb-2">Service Sourcing & Talent Acquisition</span>
                                            <div className="flex gap-2">
                                               <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded px-2 py-1">
                                                  <Bot className="w-3 h-3 text-blue-500" />
                                                  <span className="text-xs font-bold text-slate-700">Sourcing AI Agent</span>
                                               </div>
                                               <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded px-2 py-1">
                                                  <Bot className="w-3 h-3 text-purple-500" />
                                                  <span className="text-xs font-bold text-slate-700">Interview Scheduler</span>
                                               </div>
                                            </div>
                                         </div>
                                         <button className="opacity-0 group-hover:opacity-100 text-xs font-bold text-blue-600 hover:underline">Gérer</button>
                                      </div>
                                   </div>
                                </div>
                             </div>

                             <div className="relative opacity-60 hover:opacity-100 transition-opacity">
                                <div className="absolute top-1/2 -left-6 w-6 h-px bg-slate-200"></div>
                                <div className="bg-white border border-slate-200 rounded-lg p-3 flex justify-between items-center">
                                   <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                      <h4 className="font-bold text-slate-600">Département Administration RH</h4>
                                   </div>
                                   <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-100">PARTIEL</span>
                                </div>
                             </div>
                          </div>
                       </div>

                       {/* Other Branches (Collapsed) */}
                       {directions.slice(1).map(dir => (
                          <div key={dir.id} className="relative pl-12">
                             <div className="absolute top-1/2 -left-[29px] w-8 h-px bg-slate-200"></div>
                             <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-white hover:bg-slate-50 cursor-pointer transition-colors opacity-70 hover:opacity-100">
                                <dir.icon className={`w-4 h-4 text-${dir.color}-500`} />
                                <span className="font-bold text-slate-700">{dir.name}</span>
                                <div className="ml-auto text-xs text-slate-400 font-medium">{dir.stats.agents} Agents</div>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           )}

           {/* 3️⃣ VUE PROCESSUS (Timeline) */}
           {view === 'process' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
                 <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <div>
                       <h2 className="text-xl font-bold text-slate-900 mb-1">Recrutement & Intégration des collaborateurs</h2>
                       <p className="text-sm text-slate-500">Workflow transverse inter-directions • <span className="font-bold text-emerald-600">85% Automatisé</span></p>
                    </div>
                    <div className="flex gap-2">
                       <button className="px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 hover:text-slate-900 shadow-sm">
                          Voir la documentation
                       </button>
                       <button className="px-3 py-1.5 bg-blue-600 border border-blue-600 rounded text-xs font-bold text-white hover:bg-blue-700 shadow-sm">
                          Éditer le workflow
                       </button>
                    </div>
                 </div>

                 <div className="flex-1 p-10 overflow-x-auto">
                    <div className="min-w-[1000px] relative pt-10">
                       
                       {/* Timeline Line */}
                       <div className="absolute top-24 left-0 right-0 h-1 bg-slate-100 z-0">
                          <div className="h-full w-3/4 bg-blue-100"></div>
                       </div>

                       <div className="grid grid-cols-4 gap-8 relative z-10">
                          
                          {/* Step 1 */}
                          <div className="flex flex-col gap-4 group">
                             <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center border-4 border-white shadow-sm z-10 mb-2">1</div>
                                <span className="font-bold text-slate-900 text-sm text-center">Expression du besoin</span>
                             </div>
                             
                             <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-blue-400 hover:shadow-md transition-all h-full">
                                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                                   <div className="bg-blue-100 p-1.5 rounded text-blue-600"><Users className="w-3 h-3"/></div>
                                   <span className="text-xs font-bold text-slate-600">RH • Managers</span>
                                </div>
                                <div className="space-y-3">
                                   <div className="bg-blue-50 border border-blue-100 p-2 rounded-lg flex items-center gap-3">
                                      <Bot className="w-8 h-8 text-blue-500 bg-white rounded p-1 border border-blue-100" />
                                      <div>
                                         <div className="font-bold text-xs text-blue-900">Job Desc Gen</div>
                                         <div className="text-[10px] text-blue-600">Génération auto</div>
                                      </div>
                                   </div>
                                </div>
                                <div className="mt-4 pt-2 border-t border-slate-50 flex justify-between items-center">
                                   <span className="text-[10px] font-bold text-slate-400">SLA: 24h</span>
                                   <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded">100% IA</span>
                                </div>
                             </div>
                          </div>

                          {/* Step 2 */}
                          <div className="flex flex-col gap-4 group">
                             <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center border-4 border-white shadow-sm z-10 mb-2">2</div>
                                <span className="font-bold text-slate-900 text-sm text-center">Validation Budgétaire</span>
                             </div>
                             
                             <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-blue-400 hover:shadow-md transition-all h-full">
                                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                                   <div className="bg-emerald-100 p-1.5 rounded text-emerald-600"><PieChart className="w-3 h-3"/></div>
                                   <span className="text-xs font-bold text-slate-600">Finance</span>
                                </div>
                                <div className="space-y-3">
                                   <div className="bg-emerald-50 border border-emerald-100 p-2 rounded-lg flex items-center gap-3">
                                      <Bot className="w-8 h-8 text-emerald-500 bg-white rounded p-1 border border-emerald-100" />
                                      <div>
                                         <div className="font-bold text-xs text-emerald-900">Budget Check</div>
                                         <div className="text-[10px] text-emerald-600">Contrôle auto</div>
                                      </div>
                                   </div>
                                </div>
                                <div className="mt-4 pt-2 border-t border-slate-50 flex justify-between items-center">
                                   <span className="text-[10px] font-bold text-slate-400">SLA: Instant</span>
                                   <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded">100% IA</span>
                                </div>
                             </div>
                          </div>

                          {/* Step 3 */}
                          <div className="flex flex-col gap-4 group">
                             <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center border-4 border-white shadow-sm z-10 mb-2">3</div>
                                <span className="font-bold text-slate-900 text-sm text-center">Recherche & Sélection</span>
                             </div>
                             
                             <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-blue-400 hover:shadow-md transition-all h-full">
                                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                                   <div className="bg-blue-100 p-1.5 rounded text-blue-600"><Users className="w-3 h-3"/></div>
                                   <span className="text-xs font-bold text-slate-600">RH • Recrutement</span>
                                </div>
                                <div className="space-y-3">
                                   <div className="bg-blue-50 border border-blue-100 p-2 rounded-lg flex items-center gap-3">
                                      <Bot className="w-8 h-8 text-blue-500 bg-white rounded p-1 border border-blue-100" />
                                      <div>
                                         <div className="font-bold text-xs text-blue-900">CV Screener</div>
                                         <div className="text-[10px] text-blue-600">Tri automatique</div>
                                      </div>
                                   </div>
                                   <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg flex items-center gap-3 opacity-60">
                                      <UserCheck className="w-8 h-8 text-slate-400 bg-white rounded p-1 border border-slate-200" />
                                      <div>
                                         <div className="font-bold text-xs text-slate-700">Entretien Humain</div>
                                         <div className="text-[10px] text-slate-500">Validation finale</div>
                                      </div>
                                   </div>
                                </div>
                                <div className="mt-4 pt-2 border-t border-slate-50 flex justify-between items-center">
                                   <span className="text-[10px] font-bold text-slate-400">SLA: 2 sem</span>
                                   <span className="text-[10px] font-bold bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded">Hybride</span>
                                </div>
                             </div>
                          </div>

                          {/* Step 4 */}
                          <div className="flex flex-col gap-4 group">
                             <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 font-bold flex items-center justify-center border-4 border-white shadow-sm z-10 mb-2">4</div>
                                <span className="font-bold text-slate-500 text-sm text-center">Onboarding & Accès</span>
                             </div>
                             
                             <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-blue-400 hover:shadow-md transition-all h-full opacity-75 hover:opacity-100">
                                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                                   <div className="bg-slate-100 p-1.5 rounded text-slate-600"><Server className="w-3 h-3"/></div>
                                   <span className="text-xs font-bold text-slate-600">DSI • IT</span>
                                </div>
                                <div className="space-y-3">
                                   <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg flex items-center gap-3">
                                      <Bot className="w-8 h-8 text-slate-500 bg-white rounded p-1 border border-slate-200" />
                                      <div>
                                         <div className="font-bold text-xs text-slate-900">Access Manager</div>
                                         <div className="text-[10px] text-slate-500">Provioning auto</div>
                                      </div>
                                   </div>
                                </div>
                                <div className="mt-4 pt-2 border-t border-slate-50 flex justify-between items-center">
                                   <span className="text-[10px] font-bold text-slate-400">SLA: 4h</span>
                                   <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">À déployer</span>
                                </div>
                             </div>
                          </div>

                       </div>
                    </div>
                 </div>
              </div>
           )}

        </div>

        {/* SOCLE GOUVERNANCE (Footer) */}
        <div className="bg-slate-900 text-slate-300 py-10 px-8 border-t border-slate-800 z-30">
           <div className="max-w-[1440px] mx-auto">
              <div className="flex items-center gap-3 mb-8">
                 <ShieldCheck className="w-6 h-6 text-emerald-400" />
                 <h2 className="text-xl font-bold text-white">Socle Technologique & Gouvernance Unifiée</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                 <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors">
                    <div className="mb-3 text-blue-400"><Bot className="w-5 h-5" /></div>
                    <h3 className="font-bold text-white text-sm mb-1">Multi-LLM Sécurisé</h3>
                    <p className="text-[11px] text-slate-400">Orchestration agnostique des modèles</p>
                 </div>
                 <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors">
                    <div className="mb-3 text-emerald-400"><Lock className="w-5 h-5" /></div>
                    <h3 className="font-bold text-white text-sm mb-1">Sécurité</h3>
                    <p className="text-[11px] text-slate-400">Chiffrement & Gestion des accès</p>
                 </div>
                 <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors">
                    <div className="mb-3 text-purple-400"><Database className="w-5 h-5" /></div>
                    <h3 className="font-bold text-white text-sm mb-1">Data Privacy</h3>
                    <p className="text-[11px] text-slate-400">Sanitization & PII Masking</p>
                 </div>
                 <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors">
                    <div className="mb-3 text-amber-400"><GitMerge className="w-5 h-5" /></div>
                    <h3 className="font-bold text-white text-sm mb-1">Processus</h3>
                    <p className="text-[11px] text-slate-400">Validation humaine & Workflows</p>
                 </div>
                 <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors">
                    <div className="mb-3 text-rose-400"><Cpu className="w-5 h-5" /></div>
                    <h3 className="font-bold text-white text-sm mb-1">Gouvernance LLM</h3>
                    <p className="text-[11px] text-slate-400">Suivi des coûts & Performance</p>
                 </div>
                 <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors">
                    <div className="mb-3 text-cyan-400"><Settings className="w-5 h-5" /></div>
                    <h3 className="font-bold text-white text-sm mb-1">Administration</h3>
                    <p className="text-[11px] text-slate-400">Gestion centralisée technique</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  };

  const Screen03_DirectionRH = () => (
    <div className="flex flex-col h-full bg-[#F8F9FA]">
      <Breadcrumb items={['Direction RH', 'Vue d\'ensemble']} />
      <div className="flex-1 overflow-auto p-8">
         <div className="max-w-[1440px] mx-auto w-full">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
               <div>
                  <div className="flex items-center gap-3 mb-2">
                     <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                        <Users className="w-6 h-6" />
                     </div>
                     <h1 className="text-2xl font-bold text-slate-900">Direction Ressources Humaines</h1>
                  </div>
                  <p className="text-slate-500 font-medium ml-13">Pilotage des processus et déploiement des capacités IA</p>
               </div>
               
               <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                     <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600" title="Marie Dupont (Lead IA)">MD</div>
                     <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600" title="Thomas R.">TR</div>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Pilotage IA actif</span>
               </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
               <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                     <Target className="w-16 h-16 text-blue-600" />
                  </div>
                  <span className="text-sm font-bold text-slate-500">Taux de couverture IA</span>
                  <div>
                     <span className="text-3xl font-bold text-slate-900">40%</span>
                     <span className="text-xs text-emerald-600 font-bold ml-2 flex items-center inline-flex gap-1">
                        <TrendingUp className="w-3 h-3" /> +12%
                     </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                     <div className="bg-blue-600 h-full w-[40%]"></div>
                  </div>
               </div>

               <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                     <Zap className="w-16 h-16 text-yellow-500" />
                  </div>
                  <span className="text-sm font-bold text-slate-500">Capacités actives</span>
                  <div>
                     <span className="text-3xl font-bold text-slate-900">8</span>
                     <span className="text-xs text-slate-400 ml-2">agents déployés</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                     <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 100% opérationnels
                  </div>
               </div>

               <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                     <BarChart3 className="w-16 h-16 text-purple-600" />
                  </div>
                  <span className="text-sm font-bold text-slate-500">Maturité IA</span>
                  <div>
                     <span className="text-3xl font-bold text-purple-600">Élevée</span>
                  </div>
                  <div className="flex gap-1">
                     <div className="h-1.5 w-8 rounded-full bg-purple-600"></div>
                     <div className="h-1.5 w-8 rounded-full bg-purple-600"></div>
                     <div className="h-1.5 w-8 rounded-full bg-purple-600"></div>
                     <div className="h-1.5 w-8 rounded-full bg-purple-200"></div>
                  </div>
               </div>

               <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group hover:border-blue-300 transition-colors cursor-pointer" onClick={() => nav('07_Gouvernance')}>
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                     <ShieldCheck className="w-16 h-16 text-slate-600" />
                  </div>
                  <span className="text-sm font-bold text-slate-500">Gouvernance</span>
                  <div>
                     <span className="text-3xl font-bold text-slate-900">98%</span>
                     <span className="text-xs text-slate-400 ml-2">conformité</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-blue-600 font-bold group-hover:underline">
                     Voir le rapport <ArrowRight className="w-3 h-3" />
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Main Section: Processus RH */}
               <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between mb-2">
                     <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-slate-400" /> Processus Métiers
                     </h2>
                     <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        <Plus className="w-3 h-3" /> Nouveau processus
                     </button>
                  </div>

                  <div className="space-y-4">
                     {/* Card 1: Recrutement */}
                     <div 
                        onClick={() => nav('04_Processus_Recrutement')}
                        className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
                     >
                        <div className="flex justify-between items-start mb-4">
                           <div className="flex items-center gap-4">
                              <div className="p-3 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                                 <Users className="w-6 h-6" />
                              </div>
                              <div>
                                 <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Recrutement</h3>
                                 <p className="text-slate-500 text-xs">Sourcing, Qualification, Entretiens</p>
                              </div>
                           </div>
                           <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> IA Active
                           </span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                           <div className="flex gap-4 text-xs font-medium text-slate-500">
                              <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-yellow-500" /> 3 capacités liées</span>
                              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> Validation requise (étape 3)</span>
                           </div>
                           <div className="text-blue-600 text-sm font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                              Voir le processus <ArrowRight className="w-4 h-4" />
                           </div>
                        </div>
                     </div>

                     {/* Card 2: Onboarding */}
                     <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group opacity-75 hover:opacity-100">
                        <div className="flex justify-between items-start mb-4">
                           <div className="flex items-center gap-4">
                              <div className="p-3 bg-slate-50 rounded-lg text-slate-600 group-hover:bg-slate-100 transition-colors">
                                 <UserCheck className="w-6 h-6" />
                              </div>
                              <div>
                                 <h3 className="text-lg font-bold text-slate-900">Onboarding</h3>
                                 <p className="text-slate-500 text-xs">Intégration, Matériel, Accès</p>
                              </div>
                           </div>
                           <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1.5">
                              <Clock className="w-3 h-3" /> En déploiement
                           </span>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                           <div className="flex gap-4 text-xs font-medium text-slate-500">
                              <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-slate-300" /> 1 capacité en config.</span>
                           </div>
                        </div>
                     </div>

                     {/* Card 3: Formation */}
                     <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                           <div className="flex items-center gap-4">
                              <div className="p-3 bg-slate-50 rounded-lg text-slate-600 group-hover:bg-slate-100 transition-colors">
                                 <BookOpen className="w-6 h-6" />
                              </div>
                              <div>
                                 <h3 className="text-lg font-bold text-slate-900">Formation & Développement</h3>
                                 <p className="text-slate-500 text-xs">Plans de carrière, E-learning</p>
                              </div>
                           </div>
                           <span className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
                              Non activé
                           </span>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                           <div className="flex gap-4 text-xs font-medium text-slate-500">
                              <span className="flex items-center gap-1.5 text-slate-400">Potentiel IA détecté</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Side Section: Transverse */}
               <div className="space-y-6">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                     <GitMerge className="w-5 h-5 text-indigo-500" /> Processus Transverses
                  </h2>
                  
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                     <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors cursor-pointer group">
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">Global</span>
                           <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                        </div>
                        <h4 className="font-bold text-slate-900 mb-1">Onboarding Collaborateur</h4>
                        <div className="flex -space-x-2 mt-3">
                           <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-700" title="RH">RH</div>
                           <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-emerald-700" title="IT">IT</div>
                           <div className="w-8 h-8 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-purple-700" title="Finance">FI</div>
                        </div>
                     </div>

                     <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors cursor-pointer group">
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">IT & RH</span>
                           <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                        </div>
                        <h4 className="font-bold text-slate-900 mb-1">Gestion des Départs (Offboarding)</h4>
                        <div className="flex -space-x-2 mt-3">
                           <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-700" title="RH">RH</div>
                           <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-emerald-700" title="IT">IT</div>
                        </div>
                     </div>
                  </div>

                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
                     <h3 className="text-sm font-bold text-blue-800 mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" /> Suggestion IA
                     </h3>
                     <p className="text-xs text-blue-700/80 leading-relaxed mb-3">
                        L'analyse de vos processus indique que l'automatisation des réponses aux candidats pourrait faire gagner 12h/semaine.
                     </p>
                     <button className="text-xs font-bold text-blue-600 hover:underline">Voir l'opportunité</button>
                  </div>
               </div>
            </div>

         </div>
      </div>
    </div>
  );

  const Screen04_Processus = () => {
    const [selectedStep, setSelectedStep] = useState<number | null>(null);

    const steps = [
      { id: 1, title: 'Définition du besoin', status: 'IA Active', capacity: 1, icon: FileText, color: 'emerald' },
      { id: 2, title: 'Publication de l\'offre', status: 'Non activé', capacity: 0, icon: Share2, color: 'slate' },
      { id: 3, title: 'Réception candidatures', status: 'IA Active', capacity: 2, icon: Layers, color: 'emerald' },
      { id: 4, title: 'Préqualification', status: 'IA Active', capacity: 1, icon: Filter, color: 'emerald' }, // Changed to Filter
      { id: 5, title: 'Entretiens', status: 'En validation', capacity: 1, icon: Users, color: 'amber' },
      { id: 6, title: 'Décision & Offre', status: 'Non activé', capacity: 0, icon: CheckSquare, color: 'slate' },
    ];

    const capacities = [
      { name: 'Générateur de fiche de poste', type: 'Génération', status: 'Active', step: 'Définition du besoin', updated: 'Il y a 2j' },
      { name: 'Agent de tri des CV (Parsing)', type: 'Analyse', status: 'Active', step: 'Réception candidatures', updated: 'Il y a 5h' },
      { name: 'Scoring automatique', type: 'Analyse', status: 'Active', step: 'Réception candidatures', updated: 'Il y a 1j' },
      { name: 'Qualification téléphonique', type: 'Conversation', status: 'Active', step: 'Préqualification', updated: 'Il y a 3j' },
      { name: 'Assistant d\'entretien', type: 'Assistance', status: 'En validation', step: 'Entretiens', updated: 'En attente' },
    ];

    return (
      <div className="flex flex-col h-full bg-[#F8F9FA]">
        <Breadcrumb items={['Direction RH', 'Processus Recrutement']} />
        
        <div className="flex-1 overflow-auto p-8">
           <div className="max-w-[1440px] mx-auto w-full">
              
              {/* Header Section */}
              <div className="flex justify-between items-end mb-10">
                 <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                       <Briefcase className="w-7 h-7 text-blue-600" />
                       Processus Recrutement
                    </h1>
                    <p className="text-slate-500 font-medium">Déploiement des capacités IA par étape</p>
                 </div>
                 
                 <div className="flex gap-6 text-sm font-medium">
                    <div className="flex flex-col items-center">
                       <span className="text-2xl font-bold text-slate-900">6</span>
                       <span className="text-xs text-slate-500 uppercase">Étapes</span>
                    </div>
                    <div className="w-px bg-slate-200 h-10"></div>
                    <div className="flex flex-col items-center">
                       <span className="text-2xl font-bold text-emerald-600">3</span>
                       <span className="text-xs text-emerald-600 uppercase font-bold">IA Active</span>
                    </div>
                    <div className="w-px bg-slate-200 h-10"></div>
                    <div className="flex flex-col items-center">
                       <span className="text-2xl font-bold text-amber-500">1</span>
                       <span className="text-xs text-amber-500 uppercase font-bold">En cours</span>
                    </div>
                 </div>
              </div>

              {/* Horizontal Process Flow */}
              <div className="relative mb-12">
                 {/* Connection Line */}
                 <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -z-0 -translate-y-1/2 rounded-full"></div>
                 
                 <div className="grid grid-cols-6 gap-4">
                    {steps.map((step, index) => (
                       <div 
                          key={step.id} 
                          onClick={() => setSelectedStep(step.id)}
                          className={`relative flex flex-col gap-3 bg-white p-4 rounded-xl border-2 cursor-pointer transition-all hover:-translate-y-1 shadow-sm group ${
                             selectedStep === step.id 
                                ? 'border-blue-500 ring-4 ring-blue-50/50 z-10' 
                                : 'border-slate-200 hover:border-blue-300 z-10'
                          }`}
                       >
                          {/* Step Badge */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 ${
                             step.status === 'IA Active' ? 'bg-emerald-100 text-emerald-700' :
                             step.status === 'En validation' ? 'bg-amber-100 text-amber-700' :
                             'bg-slate-100 text-slate-500'
                          }`}>
                             {index + 1}
                          </div>
                          
                          <div>
                             <h3 className={`font-bold text-sm mb-1 ${selectedStep === step.id ? 'text-blue-700' : 'text-slate-900'}`}>{step.title}</h3>
                             <div className="flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full ${
                                   step.status === 'IA Active' ? 'bg-emerald-500' :
                                   step.status === 'En validation' ? 'bg-amber-500' :
                                   'bg-slate-300'
                                }`}></span>
                                <span className="text-xs text-slate-500 font-medium">{step.status}</span>
                             </div>
                          </div>

                          {step.capacity > 0 && (
                             <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-50 px-2 py-1 rounded text-[10px] font-bold text-slate-600 border border-slate-100">
                                <Zap className="w-3 h-3 text-yellow-500" /> {step.capacity}
                             </div>
                          )}
                          
                          {/* Hover Action */}
                          <div className="mt-2 pt-3 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button 
                                onClick={(e) => {
                                   e.stopPropagation();
                                   nav('05_Activation_Capacite');
                                }}
                                className="w-full py-1.5 text-xs font-bold text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
                             >
                                <Plus className="w-3 h-3" /> Activer IA
                             </button>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Lower Section: Active Capacities List */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 {/* Left: Capacities List */}
                 <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                       <h2 className="text-lg font-bold text-slate-900">Capacités IA actives dans ce processus</h2>
                       <button 
                          onClick={() => nav('05_Activation_Capacite')}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-lg shadow-sm flex items-center gap-2 transition-all"
                       >
                          <Plus className="w-4 h-4" /> Nouvelle capacité
                       </button>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                       <table className="w-full text-left">
                          <thead className="bg-slate-50 border-b border-slate-200">
                             <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Capacité</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Étape</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                             {capacities.map((cap, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                                   <td className="px-6 py-4">
                                      <div className="flex items-center gap-3">
                                         <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                            <Bot className="w-5 h-5" />
                                         </div>
                                         <span className="font-bold text-slate-900 text-sm">{cap.name}</span>
                                      </div>
                                   </td>
                                   <td className="px-6 py-4 text-sm text-slate-600">{cap.step}</td>
                                   <td className="px-6 py-4">
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">
                                         {cap.type}
                                      </span>
                                   </td>
                                   <td className="px-6 py-4">
                                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                                         cap.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                         cap.status === 'En validation' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                         'bg-slate-100 text-slate-500 border-slate-200'
                                      }`}>
                                         {cap.status === 'Active' && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>}
                                         {cap.status === 'En validation' && <Clock className="w-3 h-3 mr-1.5" />}
                                         {cap.status}
                                      </span>
                                   </td>
                                   <td className="px-6 py-4 text-right">
                                      <button className="text-slate-400 hover:text-blue-600 font-bold text-xs">Configurer</button>
                                   </td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>

                 {/* Right: Sandbox / Context */}
                 <div className="space-y-6">
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 p-6 rounded-xl">
                       <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-white rounded-lg shadow-sm text-indigo-600">
                             <Box className="w-5 h-5" />
                          </div>
                          <h3 className="font-bold text-indigo-900">Sandbox Sécurisée</h3>
                       </div>
                       <p className="text-sm text-indigo-800/80 mb-6 leading-relaxed">
                          Testez de nouvelles capacités IA sur des données anonymisées avant de les déployer en production.
                       </p>
                       <button className="w-full bg-white text-indigo-700 font-bold py-2.5 rounded-lg border border-indigo-200 shadow-sm hover:shadow-md transition-all text-sm">
                          Accéder à la Sandbox
                       </button>
                    </div>

                    <div className="bg-white border border-slate-200 p-6 rounded-xl">
                       <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-slate-400" /> Gouvernance
                       </h3>
                       <div className="space-y-4">
                          <div className="flex items-start gap-3 text-sm">
                             <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                             <span className="text-slate-600">Validation RH requise pour tout agent contactant des candidats.</span>
                          </div>
                          <div className="flex items-start gap-3 text-sm">
                             <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                             <span className="text-slate-600">Analyse de biais obligatoire sur les agents de scoring.</span>
                          </div>
                       </div>
                       <button 
                          onClick={() => nav('07_Gouvernance')}
                          className="mt-6 w-full text-slate-500 hover:text-slate-700 text-xs font-bold border border-slate-200 hover:border-slate-300 py-2 rounded transition-colors"
                       >
                          Voir les règles complètes
                       </button>
                    </div>
                 </div>
              </div>

           </div>
        </div>
      </div>
    );
  };

  const Screen05_Activation = () => (
    <div className="flex flex-col h-full bg-[#F8F9FA]">
       <Breadcrumb items={['Direction RH', 'Processus Recrutement', 'Activation IA']} />
       <div className="flex-1 overflow-auto p-8">
         <div className="max-w-[1440px] mx-auto w-full">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
               <h1 className="text-3xl font-bold text-slate-900 mb-3">Activer une capacité IA</h1>
               <p className="text-slate-500 text-lg">Sélectionnez le mode d’intégration adapté à votre besoin pour l'étape <span className="font-bold text-slate-800">Préqualification</span>.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
               {/* Option 1: Activer telle quelle */}
               <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col relative group">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-500 rounded-t-2xl"></div>
                  <div className="absolute top-4 right-4 bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded border border-blue-100">
                     Marketplace Rilme
                  </div>
                  
                  <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                     <Zap className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Activer telle quelle</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed flex-grow">
                     Utiliser une capacité existante certifiée sans modification. Déploiement immédiat.
                  </p>
                  
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-6">
                     <div className="text-xs font-bold text-slate-400 uppercase mb-2">Capacité suggérée</div>
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-700 font-bold shadow-sm">Q</div>
                        <div>
                           <div className="font-bold text-slate-900 text-sm">Qualif. Candidat v2</div>
                           <div className="text-[10px] text-slate-500">Par Rilme Corp.</div>
                        </div>
                     </div>
                  </div>

                  <button 
                     onClick={() => nav('06_Interaction_IA')}
                     className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                  >
                     Activer maintenant <ArrowRight className="w-4 h-4" />
                  </button>
               </div>

               {/* Option 2: Cloner & Adapter */}
               <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col relative group">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-purple-500 rounded-t-2xl"></div>
                  
                  <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                     <Copy className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Cloner & Adapter</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed flex-grow">
                     Créer une copie modifiable à partir d’une capacité existante pour l'ajuster à vos spécificités.
                  </p>
                  
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-6">
                     <div className="text-xs font-bold text-slate-400 uppercase mb-2">Base de départ</div>
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-700 font-bold shadow-sm">Q</div>
                        <div>
                           <div className="font-bold text-slate-900 text-sm">Qualif. Candidat v2</div>
                           <div className="text-[10px] text-slate-500">Version éditable</div>
                        </div>
                     </div>
                  </div>

                  <button 
                     onClick={() => nav('10_Builder')}
                     className="w-full py-3 bg-white border border-slate-300 hover:border-purple-300 hover:bg-purple-50 text-slate-700 hover:text-purple-700 font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                     <Settings className="w-4 h-4" /> Cloner & personnaliser
                  </button>
               </div>

               {/* Option 3: Créer sur mesure */}
               <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col relative group">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-800 rounded-t-2xl"></div>
                  
                  <div className="w-14 h-14 bg-slate-100 text-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                     <Plus className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Créer sur mesure</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed flex-grow">
                     Concevoir une nouvelle capacité IA adaptée à votre contexte unique, de zéro.
                  </p>
                  
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-6">
                     <div className="text-xs font-bold text-slate-400 uppercase mb-2">Modes disponibles</div>
                     <div className="flex gap-2">
                        <span className="bg-white px-2 py-1 rounded border border-slate-200 text-xs font-bold text-slate-600">No-code</span>
                        <span className="bg-white px-2 py-1 rounded border border-slate-200 text-xs font-bold text-slate-600">Low-code</span>
                        <span className="bg-white px-2 py-1 rounded border border-slate-200 text-xs font-bold text-slate-600">Code</span>
                     </div>
                  </div>

                  <button 
                     onClick={() => nav('10_Builder')}
                     className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                  >
                     <Hammer className="w-4 h-4" /> Créer une capacité
                  </button>
               </div>
            </div>

            {/* Bottom Explanation */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-8 flex items-start gap-6">
               <div className="p-3 bg-blue-100 rounded-full text-blue-600 shrink-0">
                  <Info className="w-6 h-6" />
               </div>
               <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Pourquoi plusieurs options ?</h3>
                  <p className="text-slate-600 leading-relaxed max-w-3xl">
                     Rilme AI vous permet de choisir entre rapidité, adaptation et création complète. 
                     Chaque option respecte les règles de gouvernance établies par votre organisation. 
                     Quel que soit votre choix, la capacité passera par le cycle de validation approprié avant déploiement.
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                     <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                        <ShieldCheck className="w-3 h-3" /> Gouvernance Active
                     </span>
                     <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100">
                        <Box className="w-3 h-3" /> Sandbox disponible
                     </span>
                  </div>
               </div>
            </div>

         </div>
       </div>
    </div>
  );

  const Screen06_Interaction = () => (
    <div className="flex flex-col h-full bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-5 flex flex-col gap-4 shrink-0 shadow-sm z-10">
         <Breadcrumb items={['Direction RH', 'Processus Recrutement', 'Interaction IA']} />
         <div className="flex justify-between items-start">
            <div>
               <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-slate-900">Agent de préqualification des candidatures</h1>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 flex items-center gap-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> IA Active
                  </span>
               </div>
               <p className="text-slate-500 text-sm flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Étape : Préqualification
                  <span className="text-slate-300">|</span>
                  <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600 border border-slate-200 cursor-pointer hover:bg-slate-200" onClick={() => nav('11_Catalogue')}>v1.2</span>
                  <span className="text-slate-300">|</span>
                  <span className="flex items-center gap-1 text-xs text-slate-500"><Globe className="w-3 h-3" /> Source : Interne</span>
               </p>
            </div>
            
            {/* Sandbox Indicator if applicable (simulated here for demo) */}
            {/* <div className="px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-lg text-xs font-bold flex items-center gap-2">
               <Box className="w-3 h-3" /> Mode Sandbox
            </div> */}
         </div>
      </div>

      <div className="flex-1 overflow-hidden p-6">
         <div className="max-w-[1600px] mx-auto h-full grid grid-cols-12 gap-6">
            
            {/* LEFT ZONE: CONTEXT & INPUT (3 cols) */}
            <div className="col-span-3 flex flex-col gap-6 overflow-y-auto pr-2">
               <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 font-bold text-slate-700 text-sm flex items-center gap-2">
                     <FileText className="w-4 h-4" /> Données Analysées
                  </div>
                  <div className="p-5 space-y-6">
                     <div>
                        <div className="text-xs font-bold text-slate-400 uppercase mb-2">Candidat</div>
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg border border-blue-200">
                              MD
                           </div>
                           <div>
                              <div className="font-bold text-slate-900">Martin Dupont</div>
                              <div className="text-xs text-slate-500">martin.dupont@email.com</div>
                           </div>
                        </div>
                     </div>

                     <div>
                        <div className="text-xs font-bold text-slate-400 uppercase mb-2">Poste Ciblé</div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                           <div className="font-bold text-slate-900 text-sm mb-1">Senior React Developer</div>
                           <div className="flex flex-wrap gap-1">
                              <span className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-600">React</span>
                              <span className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-600">Node.js</span>
                              <span className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-600">AWS</span>
                           </div>
                        </div>
                     </div>

                     <div>
                        <div className="text-xs font-bold text-slate-400 uppercase mb-2">Documents</div>
                        <div className="space-y-2">
                           <div className="flex items-center gap-2 text-sm text-blue-600 hover:underline cursor-pointer">
                              <LinkIcon className="w-3.5 h-3.5" /> CV_Martin_Dupont_2026.pdf
                           </div>
                           <div className="flex items-center gap-2 text-sm text-blue-600 hover:underline cursor-pointer">
                              <LinkIcon className="w-3.5 h-3.5" /> Lettre_Motivation.pdf
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-blue-50/50 rounded-xl border border-blue-100 p-4">
                  <div className="flex items-start gap-3">
                     <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                     <div className="text-xs text-blue-800 leading-relaxed">
                        <span className="font-bold">Info :</span> Ce candidat a déjà postulé il y a 2 ans pour un poste similaire. Voir l'historique dans le SIRH.
                     </div>
                  </div>
               </div>
            </div>

            {/* CENTRAL ZONE: AI RESULT (6 cols) */}
            <div className="col-span-6 flex flex-col gap-6 overflow-y-auto px-2">
               {/* Recommendation Banner */}
               <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100 px-6 py-4 flex justify-between items-center">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                           <Bot className="w-6 h-6" />
                        </div>
                        <div>
                           <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Recommandation IA</div>
                           <div className="text-lg font-bold text-slate-900">Entretien Prioritaire</div>
                        </div>
                     </div>
                     <div className="flex flex-col items-end">
                        <div className="text-3xl font-bold text-emerald-600">92<span className="text-lg text-emerald-400">/100</span></div>
                        <div className="text-xs font-bold text-slate-400">Score d'adéquation</div>
                     </div>
                  </div>
                  <div className="p-6">
                     <p className="text-slate-700 leading-relaxed mb-0">
                        Le profil correspond fortement aux attentes techniques (React, Node.js). L'expérience de 8 ans est supérieure au minimum requis (5 ans). Les projets précédents montrent une capacité à gérer des architectures complexes sur AWS.
                     </p>
                  </div>
               </div>

               {/* Detailed Analysis Blocks */}
               <div className="grid grid-cols-2 gap-6">
                  {/* Points Forts */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                     <div className="flex items-center gap-2 mb-4 text-emerald-700 font-bold">
                        <CheckCircle2 className="w-5 h-5" /> Points Forts
                     </div>
                     <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-sm text-slate-700">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                           Expertise React confirmée (Senior)
                        </li>
                        <li className="flex items-start gap-2 text-sm text-slate-700">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                           Certification AWS Solutions Architect
                        </li>
                        <li className="flex items-start gap-2 text-sm text-slate-700">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                           Expérience en leadership technique
                        </li>
                     </ul>
                  </div>

                  {/* Points de Vigilance */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                     <div className="flex items-center gap-2 mb-4 text-amber-600 font-bold">
                        <Eye className="w-5 h-5" /> Points de Vigilance
                     </div>
                     <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-sm text-slate-700">
                           <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                           Anglais mentionné "Intermédiaire"
                        </li>
                        <li className="flex items-start gap-2 text-sm text-slate-700">
                           <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                           Prétentions salariales non précisées
                        </li>
                     </ul>
                  </div>
               </div>

               {/* Summary */}
               <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                  <h3 className="font-bold text-slate-900 mb-3 text-sm flex items-center gap-2">
                     <Layout className="w-4 h-4 text-slate-400" /> Résumé Structuré
                  </h3>
                  <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600 space-y-2 font-mono leading-relaxed border border-slate-100">
                     <p>Expérience Totale : 8 ans</p>
                     <p>Formation : Master Informatique (2018)</p>
                     <p>Dernier Poste : Lead Dev chez TechCorp</p>
                     <p>Stack Principale : MERN (Mongo, Express, React, Node)</p>
                  </div>
               </div>
            </div>

            {/* RIGHT ZONE: HUMAN ACTIONS (3 cols) */}
            <div className="col-span-3 flex flex-col gap-6 overflow-y-auto pl-2">
               <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full max-h-[600px]">
                  <div className="bg-slate-900 text-white px-5 py-4 font-bold flex items-center gap-2">
                     <UserCheck className="w-5 h-5" /> Décision Humaine
                  </div>
                  
                  <div className="p-6 flex flex-col gap-4 flex-1">
                     <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-xs text-amber-800 font-medium mb-2 flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                        Validation requise par la Gouvernance (Score &gt; 90)
                     </div>

                     <button 
                        onClick={() => nav('04_Processus_Recrutement')}
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
                     >
                        <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" /> Valider la recommandation
                     </button>
                     
                     <div className="text-center text-xs text-slate-400 font-bold uppercase tracking-wider my-2">Ou</div>

                     <button className="w-full py-3 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                        <Edit className="w-4 h-4" /> Modifier la décision
                     </button>

                     <button className="w-full py-3 bg-white border-2 border-red-100 hover:border-red-200 text-red-600 hover:bg-red-50 font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                        <XCircle className="w-4 h-4" /> Rejeter
                     </button>

                     <button className="mt-auto w-full py-2 text-slate-500 hover:text-slate-800 text-xs font-bold underline flex items-center justify-center gap-1">
                        Escalader au manager <ArrowRight className="w-3 h-3" />
                     </button>
                  </div>
               </div>
            </div>

         </div>
      </div>

      {/* LOWER SECTION: TRACEABILITY */}
      <div className="bg-white border-t border-slate-200 px-8 py-3 shrink-0 flex items-center justify-between text-xs text-slate-500">
         <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
               <Clock className="w-3.5 h-3.5" /> Analysé le 16/02/2026 à 10:42
            </span>
            <span className="flex items-center gap-1.5">
               <UserCheck className="w-3.5 h-3.5" /> Déclencheur : Thomas R.
            </span>
            <span className="flex items-center gap-1.5 font-bold text-slate-700">
               <Activity className="w-3.5 h-3.5 text-blue-500" /> ID Transaction : #REQ-2026-8942
            </span>
         </div>
         <div className="flex items-center gap-2">
            <Lock className="w-3 h-3" /> Chaque interaction est enregistrée et auditable. 
            <button onClick={() => nav('07_Gouvernance')} className="text-blue-600 hover:underline ml-1">Voir les logs</button>
         </div>
      </div>
    </div>
  );

  const Screen07_Gouvernance = () => {
    const [activeTab, setActiveTab] = useState<'audit' | 'kpi' | 'validations'>('audit');

    // Mock Data for Audit
    const auditLogs = [
       { id: 1, date: '16/02/2026 10:42', user: 'Thomas R.', role: 'Admin RH', action: 'Activation Capacité', item: 'Agent Recrutement v3.2', status: 'Succès', context: 'Processus RH' },
       { id: 2, date: '16/02/2026 09:15', user: 'Julie W.', role: 'Manager IT', action: 'Modification Prompt', item: 'Assistant Code v1.0', status: 'En attente', context: 'Sandbox' },
       { id: 3, date: '15/02/2026 16:20', user: 'Système', role: 'Automatique', action: 'Scan Sécurité', item: 'Global', status: 'Alerte', context: 'Audit Hebdo' },
       { id: 4, date: '15/02/2026 14:05', user: 'Pierre L.', role: 'Admin', action: 'Export Données', item: 'Logs Janvier', status: 'Bloqué', context: 'Sécurité' },
       { id: 5, date: '15/02/2026 11:30', user: 'Sophie M.', role: 'RH', action: 'Utilisation Agent', item: 'Agent Recrutement v3.1', status: 'Succès', context: 'Prod' },
    ];

    // Mock Data for Validations
    const pendingValidations = [
       { id: 1, requester: 'Julie W.', role: 'Manager IT', type: 'Publication Version', item: 'Assistant Code v1.0', date: 'Il y a 2h', risk: 'Moyen' },
       { id: 2, requester: 'Marc D.', role: 'Marketing', type: 'Activation Agent', item: 'Générateur Contenu v2', date: 'Il y a 4h', risk: 'Faible' },
       { id: 3, requester: 'Sarah L.', role: 'Finance', type: 'Partage Externe', item: 'Analyseur Bilans', date: 'Hier', risk: 'Élevé' },
    ];

    return (
      <div className="flex flex-col h-full bg-[#F8F9FA]">
        <Breadcrumb items={['Gouvernance IA', 'Tableau de bord']} />
        
        <div className="flex-1 overflow-auto p-8">
           <div className="max-w-[1440px] mx-auto w-full">
              
              {/* Header & Global Stats */}
              <div className="mb-8">
                 <div className="flex justify-between items-start mb-6">
                    <div>
                       <h1 className="text-2xl font-bold text-slate-900 mb-1">Gouvernance & Pilotage IA</h1>
                       <p className="text-slate-500 font-medium">Supervision, audit et validation des usages de l'intelligence artificielle.</p>
                    </div>
                    <button 
                       onClick={() => nav('13_Roles_Permissions')}
                       className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 flex items-center gap-2 shadow-sm transition-all"
                    >
                       <Settings className="w-4 h-4" /> Configurer Rôles & Permissions
                    </button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden">
                       <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                       <div>
                          <div className="text-xs font-bold text-slate-400 uppercase mb-1">Niveau de Conformité</div>
                          <div className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                             98% <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          </div>
                          <div className="text-[10px] text-emerald-600 font-bold mt-1">Conforme ISO/RGPD</div>
                       </div>
                       <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                          <ShieldCheck className="w-6 h-6" />
                       </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                       <div>
                          <div className="text-xs font-bold text-slate-400 uppercase mb-1">Capacités Actives</div>
                          <div className="text-2xl font-bold text-slate-900">42</div>
                          <div className="text-[10px] text-slate-500 font-bold mt-1">Sur 6 processus</div>
                       </div>
                       <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                          <Zap className="w-6 h-6" />
                       </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden">
                       {pendingValidations.length > 0 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>}
                       <div>
                          <div className="text-xs font-bold text-slate-400 uppercase mb-1">En Attente Validation</div>
                          <div className="text-2xl font-bold text-slate-900">{pendingValidations.length}</div>
                          <div className="text-[10px] text-amber-600 font-bold mt-1">Action requise</div>
                       </div>
                       <div className="h-10 w-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                          <Clock className="w-6 h-6" />
                       </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                       <div>
                          <div className="text-xs font-bold text-slate-400 uppercase mb-1">Alertes Sécurité</div>
                          <div className="text-2xl font-bold text-slate-900">0</div>
                          <div className="text-[10px] text-slate-400 font-bold mt-1">Derniers 30 jours</div>
                       </div>
                       <div className="h-10 w-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                          <Bell className="w-6 h-6" />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
                 <div className="border-b border-slate-200 flex px-6">
                    <button 
                       onClick={() => setActiveTab('audit')}
                       className={`py-4 px-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'audit' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                       <ListTree className="w-4 h-4" /> Audit & Traçabilité
                    </button>
                    <button 
                       onClick={() => setActiveTab('kpi')}
                       className={`py-4 px-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'kpi' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                       <BarChart3 className="w-4 h-4" /> Indicateurs & KPI IA
                    </button>
                    <button 
                       onClick={() => setActiveTab('validations')}
                       className={`py-4 px-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'validations' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                       <CheckCircle2 className="w-4 h-4" /> Validations
                       {pendingValidations.length > 0 && <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px]">{pendingValidations.length}</span>}
                    </button>
                 </div>

                 <div className="p-6 flex-1 bg-slate-50/30">
                    
                    {/* TAB 1: AUDIT */}
                    {activeTab === 'audit' && (
                       <div className="space-y-4">
                          <div className="flex justify-between items-center mb-4">
                             <div className="flex gap-3">
                                <div className="relative">
                                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                   <input type="text" placeholder="Rechercher utilisateur, action..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <button className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 text-sm font-bold hover:bg-slate-50 flex items-center gap-2">
                                   <Filter className="w-4 h-4" /> Filtres
                                </button>
                             </div>
                             <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                <Lock className="w-3 h-3" /> Journal inaltérable certifié
                             </div>
                          </div>

                          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                             <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                   <tr>
                                      <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Horodatage</th>
                                      <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Utilisateur</th>
                                      <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Action</th>
                                      <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Cible</th>
                                      <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Contexte</th>
                                      <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase text-right">Statut</th>
                                   </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                   {auditLogs.map((log) => (
                                      <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                                         <td className="px-6 py-3 text-sm text-slate-500 font-mono">{log.date}</td>
                                         <td className="px-6 py-3">
                                            <div className="font-bold text-slate-900 text-sm">{log.user}</div>
                                            <div className="text-[10px] text-slate-400">{log.role}</div>
                                         </td>
                                         <td className="px-6 py-3 text-sm font-medium text-slate-700">{log.action}</td>
                                         <td className="px-6 py-3 text-sm text-slate-600">{log.item}</td>
                                         <td className="px-6 py-3">
                                            <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                               {log.context}
                                            </span>
                                         </td>
                                         <td className="px-6 py-3 text-right">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                                               log.status === 'Succès' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                               log.status === 'Alerte' ? 'bg-red-50 text-red-700 border-red-100' :
                                               log.status === 'Bloqué' ? 'bg-slate-100 text-slate-600 border-slate-200' :
                                               'bg-amber-50 text-amber-700 border-amber-100'
                                            }`}>
                                               {log.status === 'Succès' && <CheckCircle2 className="w-3 h-3" />}
                                               {log.status === 'Alerte' && <AlertTriangle className="w-3 h-3" />}
                                               {log.status}
                                            </span>
                                         </td>
                                      </tr>
                                   ))}
                                </tbody>
                             </table>
                          </div>
                       </div>
                    )}

                    {/* TAB 2: KPI */}
                    {activeTab === 'kpi' && (
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Usage Chart */}
                          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                             <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-blue-500" /> Volume d'interactions IA (30j)
                             </h3>
                             <div className="h-48 flex items-end gap-2 justify-between px-2">
                                {[35, 42, 28, 55, 60, 48, 75, 82, 65, 90, 85, 95].map((h, i) => (
                                   <div key={i} className="w-full bg-blue-100 rounded-t hover:bg-blue-600 transition-colors relative group">
                                      <div className="absolute bottom-0 w-full bg-blue-500 rounded-t" style={{ height: `${h}%` }}></div>
                                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none transition-opacity">
                                         {h * 12} req
                                      </div>
                                   </div>
                                ))}
                             </div>
                             <div className="flex justify-between mt-3 text-xs text-slate-400 font-medium">
                                <span>J-30</span>
                                <span>Aujourd'hui</span>
                             </div>
                          </div>

                          {/* Distribution Chart */}
                          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                             <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <PieChart className="w-4 h-4 text-purple-500" /> Répartition par Direction
                             </h3>
                             <div className="space-y-4">
                                <div>
                                   <div className="flex justify-between text-sm mb-1">
                                      <span className="font-medium text-slate-700">Direction IT</span>
                                      <span className="font-bold text-slate-900">45%</span>
                                   </div>
                                   <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                      <div className="h-full bg-indigo-500 w-[45%]"></div>
                                   </div>
                                </div>
                                <div>
                                   <div className="flex justify-between text-sm mb-1">
                                      <span className="font-medium text-slate-700">Direction RH</span>
                                      <span className="font-bold text-slate-900">30%</span>
                                   </div>
                                   <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                      <div className="h-full bg-blue-500 w-[30%]"></div>
                                   </div>
                                </div>
                                <div>
                                   <div className="flex justify-between text-sm mb-1">
                                      <span className="font-medium text-slate-700">Finance & Admin</span>
                                      <span className="font-bold text-slate-900">15%</span>
                                   </div>
                                   <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                      <div className="h-full bg-emerald-500 w-[15%]"></div>
                                   </div>
                                </div>
                                <div>
                                   <div className="flex justify-between text-sm mb-1">
                                      <span className="font-medium text-slate-700">Marketing</span>
                                      <span className="font-bold text-slate-900">10%</span>
                                   </div>
                                   <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                      <div className="h-full bg-amber-500 w-[10%]"></div>
                                   </div>
                                </div>
                             </div>
                          </div>

                          {/* Stat Cards */}
                          <div className="col-span-1 md:col-span-2 grid grid-cols-4 gap-4">
                             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <div className="text-slate-500 text-xs font-bold uppercase mb-1">Gain de temps (est.)</div>
                                <div className="text-2xl font-bold text-slate-900">128h</div>
                                <div className="text-emerald-600 text-xs font-bold mt-1">+12% vs M-1</div>
                             </div>
                             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <div className="text-slate-500 text-xs font-bold uppercase mb-1">Coût Token</div>
                                <div className="text-2xl font-bold text-slate-900">842€</div>
                                <div className="text-slate-400 text-xs font-bold mt-1">Stable</div>
                             </div>
                             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <div className="text-slate-500 text-xs font-bold uppercase mb-1">Utilisateurs</div>
                                <div className="text-2xl font-bold text-slate-900">86</div>
                                <div className="text-emerald-600 text-xs font-bold mt-1">+5 nouveaux</div>
                             </div>
                             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <div className="text-slate-500 text-xs font-bold uppercase mb-1">Brouillons</div>
                                <div className="text-2xl font-bold text-slate-900">12</div>
                                <div className="text-amber-600 text-xs font-bold mt-1">Non actifs</div>
                             </div>
                          </div>
                       </div>
                    )}

                    {/* TAB 3: VALIDATIONS */}
                    {activeTab === 'validations' && (
                       <div className="space-y-6">
                          {pendingValidations.map((item) => (
                             <div key={item.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-300 transition-all">
                                <div className="flex items-start gap-4">
                                   <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100 shrink-0">
                                      <AlertTriangle className="w-6 h-6" />
                                   </div>
                                   <div>
                                      <div className="flex items-center gap-2 mb-1">
                                         <h3 className="font-bold text-slate-900">{item.type}</h3>
                                         <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{item.item}</span>
                                      </div>
                                      <div className="text-sm text-slate-500 mb-3">
                                         Demandé par <span className="font-bold text-slate-700">{item.requester}</span> ({item.role}) • {item.date}
                                      </div>
                                      <div className="flex items-center gap-4">
                                          <div className="flex items-center gap-1.5 text-xs font-bold bg-red-50 text-red-700 px-2 py-1 rounded border border-red-100">
                                             <ShieldCheck className="w-3 h-3" /> Niveau de risque : {item.risk}
                                          </div>
                                          <div className="text-xs text-blue-600 hover:underline cursor-pointer font-bold">Voir le détail technique</div>
                                      </div>
                                   </div>
                                </div>
                                
                                <div className="flex flex-col gap-2 min-w-[140px]">
                                   <button className="px-4 py-2 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-lg shadow-sm transition-all text-sm flex items-center justify-center gap-2">
                                      <CheckCircle2 className="w-4 h-4" /> Valider
                                   </button>
                                   <button className="px-4 py-2 bg-white border border-slate-200 hover:border-red-300 hover:text-red-600 text-slate-700 font-bold rounded-lg transition-all text-sm flex items-center justify-center gap-2">
                                      <XCircle className="w-4 h-4" /> Refuser
                                   </button>
                                </div>
                             </div>
                          ))}

                          {pendingValidations.length === 0 && (
                             <div className="text-center py-12 text-slate-400">
                                <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                <p className="font-bold">Aucune validation en attente</p>
                                <p className="text-sm">Tout est à jour.</p>
                             </div>
                          )}
                       </div>
                    )}
                 </div>
              </div>

           </div>
        </div>
      </div>
    );
  };

  const Screen08_Marketplace = () => {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [activeFilter, setActiveFilter] = useState('all');

    const capabilities = [
      { 
         id: 1, 
         name: "Assistant Pré-Qualification", 
         type: "Agent", 
         domain: "RH", 
         source: "Rilme Certified", 
         maturity: "Production", 
         version: "v2.4", 
         adoption: 1540, 
         badge: "Certifié", 
         status: "published", 
         description: "Analyse automatique des CVs selon grille de compétences. Ne stocke aucune PII.",
         icon: UserCheck,
         color: "blue",
         details: {
            useCase: "Utilisé en amont des entretiens RH pour filtrer les candidatures volumiques.",
            steps: ["Extraction texte CV", "Anonymisation", "Scoring Compétences", "Rapport Synthétique"],
            params: ["Seuil de score", "Liste de mots-clés obligatoires", "Format de sortie"]
         }
      },
      { 
         id: 2, 
         name: "Générateur Rapport Trimestriel", 
         type: "Workflow", 
         domain: "Finance", 
         source: "Partner Ecosystem", 
         maturity: "Bêta", 
         version: "v1.1", 
         adoption: 320, 
         badge: "En validation", 
         status: "validation", 
         description: "Agrégation de données financières anonymisées pour reporting groupe.",
         icon: BarChart3,
         color: "purple",
         details: {
            useCase: "Génération automatique des slides de présentation des résultats Q1-Q4.",
            steps: ["Connexion Data Warehouse", "Agrégation KPI", "Génération Graphiques", "Export PPTX"],
            params: ["Période fiscale", "Devise de consolidation", "Template PPTX"]
         }
      },
      { 
         id: 3, 
         name: "Support IT N1 Automatisé", 
         type: "Agent", 
         domain: "IT", 
         source: "Rilme Certified", 
         maturity: "Production", 
         version: "v3.0", 
         adoption: 2890, 
         badge: "Certifié", 
         status: "published", 
         description: "Résolution automatique des tickets incidents fréquents (password reset, VPN).",
         icon: Server,
         color: "emerald",
         details: {
            useCase: "Réduction de la charge du Service Desk sur les tickets à faible valeur ajoutée.",
            steps: ["Classification Ticket", "Recherche KB", "Action Automatisée ou Escalade", "Clôture Ticket"],
            params: ["Seuil de confiance", "Liste blanche utilisateurs", "Mode simulation"]
         }
      },
      { 
         id: 4, 
         name: "Onboarding Collaborateur", 
         type: "Workflow", 
         domain: "RH", 
         source: "Partner Ecosystem", 
         maturity: "Pilote", 
         version: "v0.9", 
         adoption: 85, 
         badge: "Publié", 
         status: "published", 
         description: "Orchestration des tâches d'accueil : accès, matériel, formation.",
         icon: UserCheck,
         color: "orange",
         details: {
            useCase: "Coordination entre RH, IT et Services Généraux pour l'arrivée d'un nouveau collaborateur.",
            steps: ["Création compte AD", "Commande Matériel", "Inscription Formations", "Email Bienvenue"],
            params: ["Type de contrat", "Localisation bureau", "Package matériel"]
         }
      },
      {
         id: 5,
         name: "Synthèse Juridique Contrats",
         type: "Agent",
         domain: "Transverse",
         source: "Rilme Certified",
         maturity: "Production",
         version: "v1.5",
         adoption: 890,
         badge: "Certifié",
         status: "published",
         description: "Extraction des clauses à risque et résumé des obligations contractuelles.",
         icon: Scale, // Fallback if Scale not imported, let's use FileText
         color: "slate",
         details: {
            useCase: "Aide à la décision pour les juristes lors de la revue de contrats fournisseurs.",
            steps: ["OCR", "Extraction Clauses", "Comparaison Playbook", "Rapport Risque"],
            params: ["Type de contrat", "Juridiction", "Seuil de risque"]
         }
      },
      {
         id: 6,
         name: "Traducteur Technique Sécurisé",
         type: "Agent",
         domain: "Transverse",
         source: "Partner Ecosystem",
         maturity: "Production",
         version: "v2.1",
         adoption: 4500,
         badge: "Certifié",
         status: "published",
         description: "Traduction de documentation technique respectant le glossaire entreprise.",
         icon: Languages, // Fallback Globe
         color: "indigo",
         details: {
            useCase: "Traduction de manuels utilisateurs et specs techniques pour les filiales.",
            steps: ["Détection Langue", "Application Glossaire", "Traduction", "Review Format"],
            params: ["Langue source", "Langue cible", "Glossaire spécifique"]
         }
      }
    ];

    const filteredCapabilities = activeFilter === 'all' 
      ? capabilities 
      : capabilities.filter(c => c.domain.toLowerCase() === activeFilter);

    return (
      <div className="flex flex-col h-full bg-[#F8F9FA] relative">
        <Breadcrumb items={['Organisation', 'Marketplace']} />
        
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-8 py-6">
           <div className="max-w-[1440px] mx-auto w-full">
              <div className="flex justify-between items-start mb-4">
                 <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Marketplace Rilme AI</h1>
                    <p className="text-slate-500 font-medium">Explorez des capacités IA partagées en toute sécurité.</p>
                 </div>
                 <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-3 shadow-sm max-w-md">
                    <ShieldCheck className="w-5 h-5 shrink-0" />
                    <p>Les données des organisations ne sont jamais partagées. Seule la logique (le "cerveau") est dupliquée.</p>
                 </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
                 <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                    {[
                       { id: 'all', label: 'Tous' },
                       { id: 'rh', label: 'Ressources Humaines' },
                       { id: 'it', label: 'IT & Support' },
                       { id: 'finance', label: 'Finance' },
                       { id: 'transverse', label: 'Transverse' }
                    ].map(filter => (
                       <button 
                          key={filter.id}
                          onClick={() => setActiveFilter(filter.id)}
                          className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                             activeFilter === filter.id 
                             ? 'bg-slate-900 text-white shadow-md' 
                             : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                       >
                          {filter.label}
                       </button>
                    ))}
                 </div>

                 <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Rechercher une capacité..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" />
                 </div>
              </div>
           </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1 overflow-auto p-8">
           <div className="max-w-[1440px] mx-auto w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                 {filteredCapabilities.map((cap) => ( // Typo fix in variable name if needed, but assuming logic above works
                    <div key={cap.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col h-full group relative">
                       {cap.badge === 'Certifié' && (
                          <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 text-[10px] uppercase font-bold px-2 py-1 rounded border border-emerald-100 flex items-center gap-1">
                             <CheckCircle2 className="w-3 h-3" /> Certifié Rilme
                          </div>
                       )}
                       {cap.badge === 'En validation' && (
                          <div className="absolute top-4 right-4 bg-amber-50 text-amber-700 text-[10px] uppercase font-bold px-2 py-1 rounded border border-amber-100 flex items-center gap-1">
                             <Clock className="w-3 h-3" /> En validation
                          </div>
                       )}

                       <div className="mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${cap.color}-100 text-${cap.color}-600`}>
                             {cap.icon ? <cap.icon className="w-6 h-6" /> : <Box className="w-6 h-6" />}
                          </div>
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{cap.domain} • {cap.type}</div>
                          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{cap.name}</h3>
                          <p className="text-sm text-slate-600 line-clamp-2 mb-4">{cap.description}</p>
                       </div>

                       <div className="mt-auto space-y-4">
                          <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                             <div className="flex items-center gap-1">
                                <GitMerge className="w-3 h-3" /> {cap.version}
                             </div>
                             <div className="flex items-center gap-1">
                                <Download className="w-3 h-3" /> {cap.adoption} adoptions
                             </div>
                          </div>
                          
                          <div className="flex gap-2">
                             <button 
                                onClick={() => setSelectedItem(cap)}
                                className="flex-1 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 text-xs"
                             >
                                Voir détail
                             </button>
                             <button 
                                onClick={() => nav('11_Catalogue')}
                                className="flex-1 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 text-xs flex items-center justify-center gap-1"
                             >
                                <Plus className="w-3 h-3" /> Ajouter
                             </button>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Side Panel (Detail) */}
        {selectedItem && (
           <div className="absolute inset-0 z-50 flex justify-end bg-slate-900/20 backdrop-blur-sm">
              <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                 <div className="p-6 border-b border-slate-200 flex justify-between items-start bg-slate-50">
                    <div className="flex gap-4">
                       <div className={`w-16 h-16 rounded-xl flex items-center justify-center bg-${selectedItem.color}-100 text-${selectedItem.color}-600`}>
                          {selectedItem.icon ? <selectedItem.icon className="w-8 h-8" /> : <Box className="w-8 h-8" />}
                       </div>
                       <div>
                          <div className="flex items-center gap-2 mb-1">
                             <h2 className="text-xl font-bold text-slate-900">{selectedItem.name}</h2>
                             {selectedItem.badge === 'Certifié' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                          </div>
                          <div className="text-sm text-slate-500 font-medium">{selectedItem.domain} • {selectedItem.type} • {selectedItem.version}</div>
                       </div>
                    </div>
                    <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500">
                       <XCircle className="w-6 h-6" />
                    </button>
                 </div>

                 <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Warning Banner */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
                       <Lock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                       <div>
                          <h4 className="font-bold text-blue-900 text-sm mb-1">Snapshot Figé</h4>
                          <p className="text-xs text-blue-800 leading-relaxed">
                             En adoptant cette capacité, vous créez une copie indépendante dans votre environnement. 
                             Aucune donnée ne transite entre l'organisation source et la vôtre.
                          </p>
                       </div>
                    </div>

                    <div>
                       <h3 className="font-bold text-slate-900 mb-2">Description</h3>
                       <p className="text-slate-600 text-sm leading-relaxed">{selectedItem.description}</p>
                    </div>

                    <div>
                       <h3 className="font-bold text-slate-900 mb-2">Cas d'usage</h3>
                       <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
                          "{selectedItem.details.useCase}"
                       </p>
                    </div>

                    <div>
                       <h3 className="font-bold text-slate-900 mb-3">Étapes du processus</h3>
                       <div className="space-y-3">
                          {selectedItem.details.steps.map((step: string, i: number) => (
                             <div key={i} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center border border-slate-200">
                                   {i + 1}
                                </div>
                                <span className="text-sm font-medium text-slate-700">{step}</span>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div>
                       <h3 className="font-bold text-slate-900 mb-3">Paramètres configurables</h3>
                       <div className="flex flex-wrap gap-2">
                          {selectedItem.details.params.map((param: string, i: number) => (
                             <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold border border-slate-200">
                                {param}
                             </span>
                          ))}
                       </div>
                    </div>
                 </div>

                 <div className="p-6 border-t border-slate-200 bg-slate-50">
                    <div className="flex gap-4">
                       <button onClick={() => setSelectedItem(null)} className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-100">
                          Annuler
                       </button>
                       <button onClick={() => nav('10_Builder')} className="flex-[2] py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-md flex items-center justify-center gap-2">
                          <Copy className="w-4 h-4" /> Cloner & Adapter
                       </button>
                    </div>
                    <div className="text-center mt-4">
                       <button onClick={() => nav('07_Gouvernance')} className="text-xs text-slate-400 font-medium hover:text-blue-600 hover:underline flex items-center justify-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Voir les règles de gouvernance associées
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        )}
      </div>
    );
  };

  const Screen09_Connecteurs = () => {
    const [selectedConnector, setSelectedConnector] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'connectors' | 'logs'>('connectors');

    const connectors = [
       {
          id: 1,
          name: "Microsoft SharePoint",
          type: "Documentaire",
          icon: FileText, // Fallback
          logo: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Microsoft_Office_SharePoint_%282019-present%29.svg",
          status: "active",
          direction: "inbound",
          lastSync: "Il y a 2 min",
          owner: "DSI - Pôle Collab",
          protocol: "Graph API",
          security: "OAuth 2.0"
       },
       {
          id: 2,
          name: "Salesforce CRM",
          type: "Métier",
          icon: Cloud,
          logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
          status: "active",
          direction: "bidirectional",
          lastSync: "Il y a 15 min",
          owner: "DSI - Pôle Sales",
          protocol: "REST API",
          security: "OAuth 2.0 + IP Whitelist"
       },
       {
          id: 3,
          name: "Workday SIRH",
          type: "RH",
          icon: Users,
          logo: null,
          status: "warning",
          direction: "inbound",
          lastSync: "Échec (2h)",
          owner: "DRH - IT",
          protocol: "SOAP/WSDL",
          security: "Mutual TLS"
       },
       {
          id: 4,
          name: "SAP S/4HANA",
          type: "ERP",
          icon: Database,
          logo: null,
          status: "active",
          direction: "inbound",
          lastSync: "Il y a 4h",
          owner: "DSI - Core",
          protocol: "OData",
          security: "Basic Auth (Vault)"
       },
       {
          id: 5,
          name: "Legacy Data Warehouse",
          type: "Database",
          icon: Server,
          logo: null,
          status: "inactive",
          direction: "outbound",
          lastSync: "Jamais",
          owner: "Data Team",
          protocol: "JDBC",
          security: "VPN Tunnel"
       },
       {
          id: 6,
          name: "Webhook Alerting",
          type: "Event",
          icon: Activity,
          logo: null,
          status: "active",
          direction: "outbound",
          lastSync: "Temps réel",
          owner: "SecOps",
          protocol: "HTTPS POST",
          security: "Signature HMAC"
       }
    ];

    const logs = [
       { id: 1, time: "10:42:15", connector: "Salesforce CRM", event: "SYNC_CONTACT_UPDATE", status: 200, latency: "145ms", user: "System" },
       { id: 2, time: "10:41:03", connector: "Workday SIRH", event: "FETCH_EMPLOYEE_DELTA", status: 403, latency: "89ms", user: "System" },
       { id: 3, time: "10:35:22", connector: "Microsoft SharePoint", event: "INDEX_DOCUMENT_BATCH", status: 200, latency: "1250ms", user: "System" },
       { id: 4, time: "10:30:00", connector: "SAP S/4HANA", event: "READ_INVENTORY", status: 200, latency: "340ms", user: "u_jdoe" },
       { id: 5, time: "10:15:11", connector: "Webhook Alerting", event: "POST_INCIDENT", status: 201, latency: "45ms", user: "Agent_Security" },
    ];

    return (
      <div className="flex flex-col h-full bg-[#F8F9FA] relative">
        <Breadcrumb items={['Organisation', 'Direction IT', 'Connecteurs']} />
        
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-8 py-6">
           <div className="max-w-[1440px] mx-auto w-full">
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Connecteurs & Intégrations</h1>
                    <p className="text-slate-500 font-medium">Connexion sécurisée aux systèmes existants.</p>
                 </div>
                 <div className="flex flex-col items-end gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-sm transition-all">
                       <Plus className="w-4 h-4" /> Nouveau Connecteur
                    </button>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                       <ShieldCheck className="w-3 h-3" /> Toutes les connexions sont auditables.
                    </div>
                 </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-6 border-b border-slate-100">
                 <button 
                    onClick={() => setActiveTab('connectors')}
                    className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'connectors' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                 >
                    <LinkIcon className="w-4 h-4" /> Connecteurs Actifs
                 </button>
                 <button 
                    onClick={() => setActiveTab('logs')}
                    className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'logs' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                 >
                    <ListTree className="w-4 h-4" /> Journal & Sécurité
                 </button>
              </div>
           </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
           <div className="max-w-[1440px] mx-auto w-full">
              
              {activeTab === 'connectors' && (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {connectors.map((conn) => (
                       <div key={conn.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                          <div className="flex justify-between items-start mb-4">
                             <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                                   {conn.icon ? <conn.icon className="w-6 h-6 text-slate-600" /> : <LinkIcon className="w-6 h-6 text-slate-600" />}
                                </div>
                                <div>
                                   <h3 className="font-bold text-slate-900">{conn.name}</h3>
                                   <div className="text-xs text-slate-500 font-medium">{conn.protocol}</div>
                                </div>
                             </div>
                             <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                                conn.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                                conn.status === 'warning' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                'bg-slate-50 text-slate-500 border-slate-200'
                             }`}>
                                {conn.status === 'active' ? 'Actif' : conn.status === 'warning' ? 'Problème' : 'Inactif'}
                             </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-6">
                             <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                                <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">Direction</div>
                                <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                                   {conn.direction === 'inbound' && <ArrowRight className="w-3 h-3 text-emerald-500" />}
                                   {conn.direction === 'outbound' && <ArrowRight className="w-3 h-3 text-blue-500 rotate-180" />}
                                   {conn.direction === 'bidirectional' && <ArrowRight className="w-3 h-3 text-purple-500" />}
                                   {conn.direction === 'inbound' ? 'Entrant' : conn.direction === 'outbound' ? 'Sortant' : 'Bidirectionnel'}
                                </div>
                             </div>
                             <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                                <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">Dernière Sync</div>
                                <div className={`text-xs font-bold ${conn.status === 'warning' ? 'text-amber-600' : 'text-slate-700'}`}>
                                   {conn.lastSync}
                                </div>
                             </div>
                          </div>

                          <div className="space-y-2 mb-6 flex-1">
                             <div className="flex justify-between text-xs">
                                <span className="text-slate-500">Sécurité</span>
                                <span className="font-medium text-slate-900">{conn.security}</span>
                             </div>
                             <div className="flex justify-between text-xs">
                                <span className="text-slate-500">Responsable</span>
                                <span className="font-medium text-slate-900">{conn.owner}</span>
                             </div>
                          </div>

                          <button 
                             onClick={() => setSelectedConnector(conn)}
                             className="w-full py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all text-sm flex items-center justify-center gap-2"
                          >
                             <Settings className="w-4 h-4" /> Configurer
                          </button>
                       </div>
                    ))}
                 </div>
              )}

              {activeTab === 'logs' && (
                 <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                       <h3 className="font-bold text-slate-900 flex items-center gap-2">
                          <Activity className="w-4 h-4 text-slate-500" /> Journal d'audit des connexions
                       </h3>
                       <div className="flex gap-2">
                          <button className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 hover:bg-slate-50">Exporter CSV</button>
                          <button className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1"><Filter className="w-3 h-3"/> Filtrer</button>
                       </div>
                    </div>
                    <table className="w-full text-sm text-left">
                       <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                          <tr>
                             <th className="px-6 py-3">Horodatage</th>
                             <th className="px-6 py-3">Connecteur</th>
                             <th className="px-6 py-3">Événement</th>
                             <th className="px-6 py-3">Utilisateur / Système</th>
                             <th className="px-6 py-3">Latence</th>
                             <th className="px-6 py-3 text-right">Statut</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {logs.map((log) => (
                             <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-3 font-mono text-xs text-slate-500">{log.time}</td>
                                <td className="px-6 py-3 font-bold text-slate-900">{log.connector}</td>
                                <td className="px-6 py-3 text-slate-700">{log.event}</td>
                                <td className="px-6 py-3 text-slate-500 text-xs">{log.user}</td>
                                <td className="px-6 py-3 text-slate-500 text-xs font-mono">{log.latency}</td>
                                <td className="px-6 py-3 text-right">
                                   <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                                      log.status >= 200 && log.status < 300 ? 'bg-emerald-100 text-emerald-700' : 
                                      'bg-red-100 text-red-700'
                                   }`}>
                                      {log.status}
                                   </span>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              )}
           </div>
        </div>

        {/* Configuration Side Panel */}
        {selectedConnector && (
           <div className="absolute inset-0 z-50 flex justify-end bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                 <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
                          {selectedConnector.icon ? <selectedConnector.icon className="w-5 h-5 text-slate-600" /> : <LinkIcon className="w-5 h-5" />}
                       </div>
                       <div>
                          <h2 className="font-bold text-slate-900">{selectedConnector.name}</h2>
                          <div className="text-xs text-slate-500 flex items-center gap-1">
                             <span className={`w-2 h-2 rounded-full ${selectedConnector.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                             {selectedConnector.status === 'active' ? 'Connecté' : 'Erreur'}
                          </div>
                       </div>
                    </div>
                    <button onClick={() => setSelectedConnector(null)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500">
                       <XCircle className="w-5 h-5" />
                    </button>
                 </div>

                 <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    <div className="space-y-4">
                       <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                          <Settings className="w-4 h-4" /> Paramètres de connexion
                       </h3>
                       
                       <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">URL Endpoint</label>
                          <div className="flex gap-2">
                             <input type="text" value="https://api.salesforce.com/services/data/v58.0/" readOnly className="flex-1 bg-slate-50 border border-slate-200 rounded p-2 text-xs font-mono text-slate-600" />
                             <button className="p-2 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500"><Copy className="w-4 h-4" /></button>
                          </div>
                       </div>

                       <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">Client ID / API Key</label>
                          <div className="relative">
                             <input type="password" value="THIS_IS_A_FAKE_KEY_FOR_DEMO" readOnly className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs font-mono text-slate-600 pr-10" />
                             <Eye className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                             <Lock className="w-3 h-3" /> Clé chiffrée au repos (AES-256).
                          </p>
                       </div>

                       <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">Méthode d'Authentification</label>
                          <select className="w-full bg-white border border-slate-200 rounded p-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500">
                             <option>OAuth 2.0 (Client Credentials)</option>
                             <option>Basic Auth</option>
                             <option>API Key Header</option>
                          </select>
                       </div>
                    </div>

                    <div className="border-t border-slate-100 pt-6 space-y-4">
                       <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                          <GitMerge className="w-4 h-4" /> Règles de Synchronisation
                       </h3>
                       
                       <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                          <div>
                             <div className="text-sm font-bold text-slate-900">Fréquence</div>
                             <div className="text-xs text-slate-500">Intervalle de polling</div>
                          </div>
                          <select className="bg-slate-50 border border-slate-200 rounded p-1 text-xs font-bold text-slate-700">
                             <option>15 minutes</option>
                             <option>1 heure</option>
                             <option>Temps réel (Webhook)</option>
                          </select>
                       </div>

                       <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                          <div>
                             <div className="text-sm font-bold text-slate-900">Sens du flux</div>
                             <div className="text-xs text-slate-500">Direction autorisée des données</div>
                          </div>
                          <div className="flex items-center gap-2 bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-600">
                             {selectedConnector.direction === 'inbound' ? 'Entrant Uniquement' : 
                              selectedConnector.direction === 'outbound' ? 'Sortant Uniquement' : 'Bidirectionnel'}
                          </div>
                       </div>
                    </div>

                    <div className="border-t border-slate-100 pt-6">
                       <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                          <h4 className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
                             <AlertTriangle className="w-4 h-4" /> Zone de danger
                          </h4>
                          <div className="flex justify-between items-center">
                             <span className="text-xs text-amber-800">Désactiver temporairement ce connecteur</span>
                             <div className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked readOnly />
                                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                             </div>
                          </div>
                       </div>
                    </div>

                 </div>

                 <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
                    <button className="text-red-600 text-sm font-bold hover:underline">Supprimer</button>
                    <div className="flex gap-3">
                       <button onClick={() => setSelectedConnector(null)} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-100 text-sm">Annuler</button>
                       <button onClick={() => setSelectedConnector(null)} className="px-4 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 text-sm">Enregistrer</button>
                    </div>
                 </div>
              </div>
           </div>
        )}
      </div>
    );
  };

  const Screen10_Builder = () => {
    const [activeTab, setActiveTab] = useState<'config' | 'logic' | 'context'>('config');
    const [simulationInput, setSimulationInput] = useState('');
    const [simulationResult, setSimulationResult] = useState<null | { summary: string; recommendation: string; score: number }>(null);
    const [isSimulating, setIsSimulating] = useState(false);

    const handleSimulation = () => {
      setIsSimulating(true);
      // Fake API delay
      setTimeout(() => {
         setSimulationResult({
            summary: "Profil technique solide avec 8 ans d'expérience en architecture logicielle. Expertise confirmée sur React et Node.js. Manque d'expérience managériale explicite.",
            recommendation: "Entretien technique prioritaire",
            score: 88
         });
         setIsSimulating(false);
      }, 1500);
    };

    return (
      <div className="flex flex-col h-full bg-[#F8F9FA]">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center shrink-0 shadow-sm z-10">
           <div>
              <Breadcrumb items={['Direction RH', 'Processus Recrutement', 'Builder']} />
              <div className="flex items-center gap-3 mt-4">
                 <h1 className="text-2xl font-bold text-slate-900">Création d’une capacité IA</h1>
                 <span className="px-2.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full border border-yellow-200 uppercase tracking-wide">
                    v1.0 Brouillon
                 </span>
              </div>
              <p className="text-slate-500 text-sm mt-1">Concevez, testez et validez avant activation.</p>
           </div>
           
           <div className="flex gap-3">
              <button 
                 onClick={() => nav('11_Catalogue')}
                 className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 flex items-center gap-2 transition-all shadow-sm"
              >
                 <Save className="w-4 h-4" /> Enregistrer brouillon
              </button>
              <button 
                 disabled={!simulationResult}
                 className={`px-4 py-2 font-bold rounded-lg flex items-center gap-2 transition-all shadow-sm ${
                    simulationResult 
                       ? 'bg-slate-900 text-white hover:bg-slate-800' 
                       : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                 }`}
              >
                 <Send className="w-4 h-4" /> Soumettre à validation
              </button>
           </div>
        </div>
        
        <div className="flex-1 flex overflow-hidden">
           
           {/* LEFT COLUMN: CONFIGURATION (50%) */}
           <div className="w-1/2 flex flex-col border-r border-slate-200 bg-white">
              {/* Tabs */}
              <div className="flex border-b border-slate-200 px-8">
                 <button 
                    onClick={() => setActiveTab('config')}
                    className={`py-4 px-2 mr-6 text-sm font-bold border-b-2 transition-colors ${activeTab === 'config' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                 >
                    1. Informations
                 </button>
                 <button 
                    onClick={() => setActiveTab('logic')}
                    className={`py-4 px-2 mr-6 text-sm font-bold border-b-2 transition-colors ${activeTab === 'logic' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                 >
                    2. Logique & Prompt
                 </button>
                 <button 
                    onClick={() => setActiveTab('context')}
                    className={`py-4 px-2 mr-6 text-sm font-bold border-b-2 transition-colors ${activeTab === 'context' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                 >
                    3. Contexte
                 </button>
              </div>

              {/* Scrollable Form Area */}
              <div className="flex-1 overflow-y-auto p-8">
                 <div className="max-w-xl">
                    
                    {activeTab === 'config' && (
                       <div className="space-y-6">
                          <div>
                             <label className="block text-sm font-bold text-slate-900 mb-2">Nom de la capacité <span className="text-red-500">*</span></label>
                             <input type="text" defaultValue="Assistant Qualification Candidat" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-900" />
                          </div>
                          <div>
                             <label className="block text-sm font-bold text-slate-900 mb-2">Description</label>
                             <textarea rows={3} defaultValue="Analyse les CV entrants et propose un score de pertinence basé sur la fiche de poste." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 resize-none" />
                          </div>
                          <div>
                             <label className="block text-sm font-bold text-slate-900 mb-2">Type de capacité</label>
                             <div className="grid grid-cols-2 gap-4">
                                <label className="flex items-center gap-3 p-3 border-2 border-blue-600 bg-blue-50 rounded-lg cursor-pointer">
                                   <input type="radio" name="type" defaultChecked className="w-4 h-4 text-blue-600" />
                                   <div className="flex items-center gap-2 font-bold text-slate-900">
                                      <Bot className="w-5 h-5 text-blue-600" /> Agent IA
                                   </div>
                                </label>
                                <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                                   <input type="radio" name="type" className="w-4 h-4 text-blue-600" />
                                   <div className="flex items-center gap-2 font-bold text-slate-500">
                                      <GitMerge className="w-5 h-5" /> Workflow
                                   </div>
                                </label>
                             </div>
                          </div>
                       </div>
                    )}

                    {activeTab === 'logic' && (
                       <div className="space-y-6">
                          <div>
                             <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-bold text-slate-900">Prompt Système (Instructions) <span className="text-red-500">*</span></label>
                                <button className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"><Sparkles className="w-3 h-3" /> Améliorer avec l'IA</button>
                             </div>
                             <div className="relative">
                                <textarea 
                                   rows={12} 
                                   className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm leading-relaxed text-slate-800 bg-slate-50"
                                   defaultValue={`Tu es un expert en recrutement IT avec 15 ans d'expérience.

TA MISSION :
Analyser le CV fourni en entrée et le comparer aux exigences de la fiche de poste.

RÈGLES D'ANALYSE :
1. Identifie les compétences techniques (Hard Skills)
2. Détecte les signaux faibles de Soft Skills
3. Calcule un score de pertinence sur 100
4. Rédige une synthèse factuelle

FORMAT DE SORTIE (JSON) :
{
  "summary": "...",
  "recommendation": "...",
  "score": 0-100
}`}
                                />
                             </div>
                          </div>
                          <div>
                             <label className="block text-sm font-bold text-slate-900 mb-2">Modèle LLM</label>
                             <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-medium bg-white">
                                <option>GPT-4o (Azure France Central) - Recommandé</option>
                                <option>Claude 3.5 Sonnet (AWS Paris)</option>
                                <option>Mistral Large (La Plateforme)</option>
                             </select>
                          </div>
                       </div>
                    )}

                    {activeTab === 'context' && (
                       <div className="space-y-6">
                          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-3">
                             <Info className="w-5 h-5 text-blue-600 shrink-0" />
                             <p className="text-sm text-blue-800">
                                Lier cette capacité à un processus permet d'hériter automatiquement des règles de gouvernance et des données contextuelles.
                             </p>
                          </div>
                          <div>
                             <label className="block text-sm font-bold text-slate-900 mb-2">Processus rattaché</label>
                             <div className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg bg-slate-50">
                                <Briefcase className="w-5 h-5 text-slate-500" />
                                <span className="font-bold text-slate-700 flex-1">Processus Recrutement (Direction RH)</span>
                                <button className="text-xs font-bold text-blue-600 hover:underline">Modifier</button>
                             </div>
                          </div>
                          <div>
                             <label className="block text-sm font-bold text-slate-900 mb-2">Étape cible</label>
                             <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-medium bg-white">
                                <option>4. Préqualification</option>
                                <option>1. Définition du besoin</option>
                                <option>2. Publication</option>
                                <option>3. Réception candidatures</option>
                                <option>5. Entretiens</option>
                             </select>
                          </div>
                          <div className="pt-4 border-t border-slate-100">
                             <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                <span className="text-sm font-medium text-slate-700">Rendre cette capacité globale (sans contexte spécifique)</span>
                             </label>
                          </div>
                       </div>
                    )}
                 </div>
              </div>
           </div>

           {/* RIGHT COLUMN: PREVIEW & SANDBOX (50%) */}
           <div className="w-1/2 flex flex-col bg-[#F8F9FA] relative">
              
              {/* Sandbox Header */}
              <div className="bg-indigo-900 text-white px-6 py-3 flex justify-between items-center shrink-0 shadow-md">
                 <div className="flex items-center gap-2">
                    <Box className="w-5 h-5 text-indigo-300" />
                    <span className="font-bold text-sm tracking-wide">ENVIRONNEMENT SANDBOX</span>
                 </div>
                 <div className="flex items-center gap-2 text-xs font-medium bg-indigo-800 px-2 py-1 rounded border border-indigo-700">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" /> Données isolées
                 </div>
              </div>

              {/* Sandbox Content */}
              <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
                 
                 {/* Input Simulation Area */}
                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex justify-between items-center">
                       <span className="text-xs font-bold text-slate-500 uppercase">Entrée Simulateur</span>
                       <button 
                          className="text-xs text-blue-600 font-bold hover:underline"
                          onClick={() => setSimulationInput("Candidature de Martin Dupont - Senior React Developer\nExpérience : 8 ans\nStack : React, Node, AWS...")}
                       >
                          Remplir avec exemple
                       </button>
                    </div>
                    <div className="p-4">
                       <textarea 
                          value={simulationInput}
                          onChange={(e) => setSimulationInput(e.target.value)}
                          placeholder="Entrez ici les données pour tester votre prompt (ex: texte d'un CV, description de poste...)"
                          className="w-full h-32 resize-none outline-none text-sm text-slate-700 placeholder:text-slate-400"
                       />
                       <div className="flex justify-end mt-2">
                          <button 
                             onClick={handleSimulation}
                             disabled={!simulationInput || isSimulating}
                             className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${
                                !simulationInput || isSimulating
                                   ? 'bg-slate-100 text-slate-400'
                                   : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                             }`}
                          >
                             {isSimulating ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Traitement IA...</>
                             ) : (
                                <><Play className="w-4 h-4 fill-current" /> Tester en Sandbox</>
                             )}
                          </button>
                       </div>
                    </div>
                 </div>

                 {/* Result Area */}
                 {simulationResult && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                       <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-slate-500 uppercase">Résultat IA (Sortie brute)</span>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">Succès (245ms)</span>
                       </div>
                       
                       <div className="bg-white rounded-xl shadow-sm border border-indigo-100 overflow-hidden relative">
                          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                          <div className="p-6 space-y-6">
                             
                             <div className="flex items-start justify-between">
                                <div>
                                   <div className="text-xs font-bold text-slate-400 uppercase mb-1">Score de pertinence</div>
                                   <div className="flex items-baseline gap-2">
                                      <span className="text-3xl font-bold text-indigo-700">{simulationResult.score}/100</span>
                                      <span className="text-sm font-medium text-slate-500">Très pertinent</span>
                                   </div>
                                </div>
                                <div className="bg-indigo-50 p-2 rounded-lg">
                                   <Activity className="w-6 h-6 text-indigo-600" />
                                </div>
                             </div>

                             <div>
                                <div className="text-xs font-bold text-slate-400 uppercase mb-2">Synthèse</div>
                                <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                                   {simulationResult.summary}
                                </p>
                             </div>

                             <div>
                                <div className="text-xs font-bold text-slate-400 uppercase mb-2">Recommandation</div>
                                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                                   <CheckCircle2 className="w-4 h-4" />
                                   {simulationResult.recommendation}
                                </div>
                             </div>

                          </div>
                          
                          <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-between items-center">
                             <span className="text-[10px] text-slate-400 font-mono">token_usage: 142 in / 85 out</span>
                             <div className="flex gap-2">
                                <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><ThumbsUp className="w-4 h-4" /></button>
                                <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><ThumbsDown className="w-4 h-4" /></button>
                             </div>
                          </div>
                       </div>

                       <p className="text-center text-xs text-slate-400 mt-4">
                          Ce résultat est généré en mode Sandbox et n'impacte aucune donnée de production.
                       </p>
                    </div>
                 )}
                 
                 {!simulationResult && !isSimulating && (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 min-h-[200px] border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                       <Bot className="w-12 h-12 mb-3 opacity-20" />
                       <p className="text-sm font-medium">En attente de test...</p>
                       <p className="text-xs">Remplissez l'entrée simulateur ci-dessus pour voir le résultat.</p>
                    </div>
                 )}

              </div>
           </div>

        </div>
      </div>
    );
  };

  const Screen11_Catalogue = () => {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [filterStatus, setFilterStatus] = useState('All');

    // Mock Data
    const assets = [
       { id: 1, name: 'Agent de Préqualification', description: 'Analyse CV et matching automatique avec fiche de poste.', direction: 'Direction RH', process: 'Recrutement', version: 'v3.2', status: 'Active', source: 'Interne', owner: 'Thomas R.', date: '16/02/2026', usage: 'High' },
       { id: 2, name: 'Assistant Code Review', description: 'Vérification syntaxique et sécurité pour Python/JS.', direction: 'Direction IT', process: 'Dév. Logiciel', version: 'v1.0', status: 'Active', source: 'Clonée', owner: 'Julie W.', date: '15/02/2026', usage: 'Medium' },
       { id: 3, name: 'Générateur Posts LinkedIn', description: 'Création de contenu marketing viral B2B.', direction: 'Marketing', process: 'Communication', version: 'v0.9', status: 'Brouillon', source: 'Interne', owner: 'Marc D.', date: '14/02/2026', usage: 'None' },
       { id: 4, name: 'Analyseur Bilans Financiers', description: 'Extraction KPI depuis liasses fiscales PDF.', direction: 'Finance', process: 'Audit', version: 'v1.5', status: 'En validation', source: 'Marketplace', owner: 'Sarah L.', date: '12/02/2026', usage: 'Low' },
       { id: 5, name: 'Onboarding Assistant', description: 'Guichet unique pour les nouveaux arrivants.', direction: 'Transverse', process: 'Onboarding', version: 'v2.1', status: 'Partagée', source: 'Interne', owner: 'Sophie M.', date: '10/02/2026', usage: 'High', tags: ['RH', 'IT', 'Finance'] },
    ];

    return (
      <div className="flex flex-col h-full bg-[#F8F9FA]">
        <Breadcrumb items={['Organisation', 'Catalogue IA']} />
        
        <div className="flex-1 overflow-auto p-8">
           <div className="max-w-[1440px] mx-auto w-full">
              
              {/* Header */}
              <div className="mb-8">
                 <h1 className="text-2xl font-bold text-slate-900 mb-1">Catalogue des capacités IA</h1>
                 <p className="text-slate-500 font-medium">Gestion centralisée, versioning et cycle de vie des actifs IA de l'organisation.</p>
              </div>

              {/* KPI Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                 <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-24">
                    <div className="text-xs font-bold text-slate-400 uppercase">Total Actifs</div>
                    <div className="text-3xl font-bold text-slate-900">42</div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-2">
                       <div className="bg-slate-900 w-full h-full"></div>
                    </div>
                 </div>
                 <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-24">
                    <div className="text-xs font-bold text-slate-400 uppercase">Actives & Prod</div>
                    <div className="text-3xl font-bold text-emerald-600">28</div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-2">
                       <div className="bg-emerald-500 w-[66%] h-full"></div>
                    </div>
                 </div>
                 <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-24">
                    <div className="text-xs font-bold text-slate-400 uppercase">En Validation</div>
                    <div className="text-3xl font-bold text-amber-600">5</div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-2">
                       <div className="bg-amber-500 w-[12%] h-full"></div>
                    </div>
                 </div>
                 <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-24">
                    <div className="text-xs font-bold text-slate-400 uppercase">Brouillons</div>
                    <div className="text-3xl font-bold text-slate-500">7</div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-2">
                       <div className="bg-slate-400 w-[16%] h-full"></div>
                    </div>
                 </div>
                 <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-24">
                    <div className="text-xs font-bold text-slate-400 uppercase">Partagées</div>
                    <div className="text-3xl font-bold text-blue-600">2</div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-2">
                       <div className="bg-blue-500 w-[5%] h-full"></div>
                    </div>
                 </div>
              </div>

              {/* Toolbar */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                 <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-80">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                       <input type="text" placeholder="Rechercher par nom, tag, responsable..." className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" />
                    </div>
                    <button className="px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm">
                       <Filter className="w-4 h-4" />
                    </button>
                 </div>

                 <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm outline-none focus:border-blue-500">
                       <option>Toutes les directions</option>
                       <option>RH</option>
                       <option>IT</option>
                       <option>Marketing</option>
                    </select>
                    <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm outline-none focus:border-blue-500">
                       <option>Tous les statuts</option>
                       <option>Active</option>
                       <option>Brouillon</option>
                    </select>
                    <div className="h-6 w-px bg-slate-300 mx-1"></div>
                    <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                       <button 
                          onClick={() => setViewMode('list')}
                          className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                       >
                          <ListTree className="w-4 h-4" />
                       </button>
                       <button 
                          onClick={() => setViewMode('grid')}
                          className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                       >
                          <LayoutGrid className="w-4 h-4" />
                       </button>
                    </div>
                    <button onClick={() => nav('10_Builder')} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm flex items-center gap-2 text-sm whitespace-nowrap">
                       <Plus className="w-4 h-4" /> Nouvelle Capacité
                    </button>
                 </div>
              </div>

              {/* Content List */}
              <div className="space-y-4">
                 {assets.map((asset) => (
                    <div key={asset.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group p-5">
                       <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                          
                          {/* Icon & Identity */}
                          <div className="flex items-center gap-4 min-w-[300px]">
                             <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shrink-0 border ${
                                asset.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                asset.status === 'Brouillon' ? 'bg-slate-50 text-slate-400 border-slate-200' :
                                asset.status === 'En validation' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                'bg-blue-50 text-blue-600 border-blue-100'
                             }`}>
                                {asset.name.charAt(0)}
                             </div>
                             <div>
                                <div className="flex items-center gap-2">
                                   <h3 className="font-bold text-slate-900 text-lg">{asset.name}</h3>
                                   <span className="bg-slate-100 text-slate-500 border border-slate-200 text-[10px] font-mono px-1.5 py-0.5 rounded">{asset.version}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                   <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {asset.direction}</span>
                                   <span className="text-slate-300">|</span>
                                   <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> {asset.process}</span>
                                </div>
                             </div>
                          </div>

                          {/* Description */}
                          <div className="flex-1 md:pr-8">
                             <p className="text-sm text-slate-600 line-clamp-2">{asset.description}</p>
                             {asset.tags && (
                                <div className="flex gap-2 mt-2">
                                   {asset.tags.map(tag => (
                                      <span key={tag} className="text-[10px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-100 font-bold flex items-center gap-1">
                                         <Share2 className="w-2 h-2" /> {tag}
                                      </span>
                                   ))}
                                </div>
                             )}
                          </div>

                          {/* Meta Data */}
                          <div className="flex flex-wrap md:flex-nowrap items-center gap-6 md:gap-8 text-sm text-slate-500 w-full md:w-auto">
                             <div className="flex flex-col gap-1 min-w-[80px]">
                                <span className="text-[10px] font-bold uppercase text-slate-400">Statut</span>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border w-fit ${
                                   asset.status === 'Active' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                                   asset.status === 'Brouillon' ? 'bg-slate-100 text-slate-600 border-slate-200' :
                                   asset.status === 'En validation' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                                   'bg-blue-100 text-blue-700 border-blue-200'
                                }`}>
                                   {asset.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>}
                                   {asset.status}
                                </span>
                             </div>

                             <div className="flex flex-col gap-1 min-w-[80px]">
                                <span className="text-[10px] font-bold uppercase text-slate-400">Source</span>
                                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                                   {asset.source === 'Marketplace' ? <Globe className="w-3 h-3 text-blue-500" /> : <Box className="w-3 h-3 text-slate-500" />}
                                   {asset.source}
                                </span>
                             </div>

                             <div className="flex flex-col gap-1 min-w-[100px]">
                                <span className="text-[10px] font-bold uppercase text-slate-400">Responsable</span>
                                <div className="flex items-center gap-2">
                                   <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">{asset.owner.charAt(0)}</div>
                                   <span className="font-medium text-slate-700">{asset.owner}</span>
                                </div>
                             </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 md:ml-auto border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 w-full md:w-auto justify-end">
                             {asset.status === 'Brouillon' ? (
                                <button onClick={() => nav('10_Builder')} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip-trigger" title="Éditer">
                                   <Edit className="w-4 h-4" />
                                </button>
                             ) : (
                                <button onClick={() => nav('06_Interaction_IA')} className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors tooltip-trigger" title="Tester">
                                   <Play className="w-4 h-4" />
                                </button>
                             )}
                             
                             <button onClick={() => nav('12_Version_Partageable')} className="p-2 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors tooltip-trigger" title="Partager">
                                <Share2 className="w-4 h-4" />
                             </button>
                             
                             <div className="w-px h-4 bg-slate-200 mx-1"></div>
                             
                             <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                                <Settings className="w-4 h-4" />
                             </button>
                          </div>

                       </div>
                       
                       {/* Transverse indicator */}
                       {asset.direction === 'Transverse' && (
                          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-purple-600 font-medium">
                             <Globe className="w-3 h-3" />
                             Capacité transverse déployée sur 3 directions. Gouvernance partagée.
                          </div>
                       )}
                    </div>
                 ))}
              </div>

              {/* Transverse / Shared Section Footer */}
              <div className="mt-12 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-8 text-white flex justify-between items-center shadow-lg">
                 <div>
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                       <Globe className="w-5 h-5 text-blue-400" /> Capacités Transverses & Ecosystème
                    </h3>
                    <p className="text-slate-300 text-sm max-w-xl">
                       Certaines capacités sont critiques et utilisées par plusieurs directions (RH, Finance, IT).
                       Elles nécessitent une validation de gouvernance renforcée via l'écran dédié.
                    </p>
                 </div>
                 <button onClick={() => nav('07_Gouvernance')} className="px-6 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Voir la Gouvernance
                 </button>
              </div>

           </div>
        </div>
      </div>
    );
  };

  const Screen12_Partage = () => {
    const [scope, setScope] = useState<'direction' | 'org' | 'eco'>('direction');
    const [allowClone, setAllowClone] = useState(true);
    const [readOnly, setReadOnly] = useState(false);

    return (
    <div className="flex flex-col h-full bg-[#F8F9FA]">
       <Breadcrumb items={['Catalogue IA', 'Version partageable']} />
        <div className="flex-1 overflow-hidden flex flex-col">
           {/* Header */}
           <div className="bg-white border-b border-slate-200 px-8 py-6 shrink-0 shadow-sm z-10">
              <div className="max-w-[1440px] mx-auto w-full">
                 <div className="flex justify-between items-start">
                    <div>
                       <h1 className="text-2xl font-bold text-slate-900 mb-2">Créer une version partageable</h1>
                       <p className="text-slate-500 font-medium">Publiez une version figée de cette capacité pour en étendre l'usage.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200">
                       <div className="text-right">
                          <div className="text-xs font-bold text-slate-400 uppercase">Capacité Source</div>
                          <div className="text-sm font-bold text-slate-900">Agent de Préqualification</div>
                       </div>
                       <div className="w-px h-8 bg-slate-200"></div>
                       <div className="text-right">
                          <div className="text-xs font-bold text-slate-400 uppercase">Version Actuelle</div>
                          <div className="text-sm font-bold text-blue-600 font-mono">v3.2</div>
                       </div>
                       <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                          <GitMerge className="w-5 h-5" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Main 50/50 Layout */}
           <div className="flex-1 overflow-auto">
              <div className="max-w-[1440px] mx-auto w-full h-full grid grid-cols-1 lg:grid-cols-2">
                 
                 {/* LEFT COLUMN: UNDERSTAND (SOURCE) */}
                 <div className="p-8 lg:p-12 border-r border-slate-200 bg-white flex flex-col gap-8 overflow-y-auto">
                    <div>
                       <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                          <Database className="w-5 h-5 text-slate-400" /> Capacité Source
                       </h2>
             
                       <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-6">
                          <div>
                             <div className="text-xs font-bold text-slate-400 uppercase mb-2">Description & Objectif</div>
                             <p className="text-slate-700 leading-relaxed text-sm">
                                Analyse automatique des CVs entrants pour matcher avec les fiches de poste.
                                Utilise un modèle de scoring pondéré sur les compétences techniques.
                             </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                             <div>
                                <div className="text-xs font-bold text-slate-400 uppercase mb-1">Direction</div>
                                <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                   <Building2 className="w-4 h-4 text-slate-500" /> Direction RH
                                </div>
                             </div>
                             <div>
                                <div className="text-xs font-bold text-slate-400 uppercase mb-1">Processus</div>
                                <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                   <Layers className="w-4 h-4 text-slate-500" /> Recrutement
                                </div>
                             </div>
                             <div>
                                <div className="text-xs font-bold text-slate-400 uppercase mb-1">Dernière modif.</div>
                                <div className="text-sm font-bold text-slate-900">16/02/2026 par Thomas R.</div>
                             </div>
                             <div>
                                <div className="text-xs font-bold text-slate-400 uppercase mb-1">Statut Source</div>
                                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-700">
                                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 opacity-10">
                          <Copy className="w-24 h-24 text-blue-600" />
                       </div>
                       <h3 className="text-blue-900 font-bold mb-3 flex items-center gap-2">
                          <Info className="w-5 h-5" /> Qu’est-ce qu’une version partageable ?
                       </h3>
                       <p className="text-blue-800 text-sm leading-relaxed mb-4">
                          Une version partageable est un <span className="font-bold">snapshot figé</span> de la capacité actuelle.
                          Les modifications futures de la source n’impacteront pas cette version publiée.
                          C'est une copie de sécurité immuable.
                       </p>
                       <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-blue-200 text-blue-700 text-xs font-bold shadow-sm">
                          <Lock className="w-3 h-3" /> Snapshot figé : v3.2-pub1
                       </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-100">
                       <div className="flex items-center gap-3 text-slate-500 text-sm">
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          <span className="font-medium">Conforme RGPD & ISO 27001</span>
                       </div>
                       <p className="text-xs text-slate-400 mt-1 pl-7">
                          Les données traitées par cette capacité ne sont jamais incluses dans la version partageable. Seule la logique (prompt, paramètres) est dupliquée.
                       </p>
                    </div>
                 </div>

                 {/* RIGHT COLUMN: DECIDE (SETTINGS) */}
                 <div className="p-8 lg:p-12 bg-[#F8F9FA] flex flex-col gap-8 overflow-y-auto">
                    <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                       <Settings className="w-5 h-5 text-slate-400" /> Paramètres de publication
                    </h2>

                    <div className="space-y-8">
                       {/* Section 1: Visibility */}
                       <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                             <Eye className="w-4 h-4 text-blue-500" /> 1. Périmètre de Visibilité
                          </h3>
                          <div className="space-y-3">
                             <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${scope === 'direction' ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                                <input type="radio" name="scope" className="mt-1" checked={scope === 'direction'} onChange={() => setScope('direction')} />
                                <div>
                                   <div className="font-bold text-slate-900 text-sm">Limitée à ma Direction (RH)</div>
                                   <div className="text-xs text-slate-500 mt-1">Visible uniquement par les membres RH. Idéal pour tests internes.</div>
                                </div>
                             </label>

                             <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${scope === 'org' ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                                <input type="radio" name="scope" className="mt-1" checked={scope === 'org'} onChange={() => setScope('org')} />
                                <div>
                                   <div className="font-bold text-slate-900 text-sm">Toute mon organisation</div>
                                   <div className="text-xs text-slate-500 mt-1">Accessible par toutes les directions (IT, Finance...). Requiert validation.</div>
                                </div>
                             </label>

                             <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${scope === 'eco' ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                                <input type="radio" name="scope" className="mt-1" checked={scope === 'eco'} onChange={() => setScope('eco')} />
                                <div>
                                   <div className="font-bold text-slate-900 text-sm">Écosystème Rilme AI (Public/Privé)</div>
                                   <div className="text-xs text-slate-500 mt-1">Publié sur la Marketplace Groupe. Soumis à audit de sécurité strict.</div>
                                </div>
                             </label>
                          </div>
                       </div>

                       {/* Section 2: Conditions */}
                       <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                             <Hammer className="w-4 h-4 text-purple-500" /> 2. Droits d'usage
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                                <input 
                                   type="checkbox" 
                                   checked={allowClone} 
                                   onChange={(e) => setAllowClone(e.target.checked)}
                                   className="rounded text-blue-600 focus:ring-blue-500" 
                                />
                                <span className="text-sm font-medium text-slate-700">Autoriser le clonage</span>
                             </label>
                             
                             <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                                <input 
                                   type="checkbox" 
                                   checked={readOnly} 
                                   onChange={(e) => setReadOnly(e.target.checked)}
                                   className="rounded text-blue-600 focus:ring-blue-500" 
                                />
                                <span className="text-sm font-medium text-slate-700">Lecture seule (Blackbox)</span>
                             </label>
                          </div>
                       </div>

                       {/* Section 3: Governance */}
                       <div className="bg-slate-100 p-6 rounded-xl border border-slate-200">
                          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                             <ShieldCheck className="w-4 h-4 text-slate-600" /> 3. Gouvernance
                          </h3>
                          
                          <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200 mb-4">
                             <div>
                                <div className="text-sm font-bold text-slate-900">Validation Requise</div>
                                <div className="text-xs text-slate-500">Par Responsable IA Groupe</div>
                             </div>
                             <div className={`px-3 py-1 rounded text-xs font-bold ${scope === 'direction' ? 'bg-slate-100 text-slate-500' : 'bg-amber-100 text-amber-700'}`}>
                                {scope === 'direction' ? 'Non' : 'Oui'}
                             </div>
                          </div>
                          
                          <div className="text-xs text-slate-500 flex items-center gap-2">
                             <Activity className="w-3 h-3" /> Audit actif : Cette publication sera inscrite au registre immuable.
                          </div>
                       </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                       <button onClick={() => nav('11_Catalogue')} className="flex-1 py-4 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all">
                          Annuler
                       </button>
                       <button onClick={() => nav('11_Catalogue')} className="flex-[2] py-4 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group">
                          <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" /> Publier la version v3.2-pub1
                       </button>
                    </div>
                 </div>

              </div>
           </div>
        </div>
      </div>
    );
  };

  const Screen13_Roles = () => {
    const [activeTab, setActiveTab] = useState<'roles' | 'permissions' | 'users' | 'rules'>('roles');

    const roles = [
      { id: 'admin', name: 'Administrateur Plateforme', desc: 'Contrôle total technique et fonctionnel de l\'organisation.', scope: 'Organisation', level: 'Niveau 1 (Critique)', users: 2, icon: ShieldCheck, color: 'slate' },
      { id: 'resp_ia', name: 'Responsable IA', desc: 'Garant de la conformité et validateur final des mises en production.', scope: 'Transverse', level: 'Niveau 2 (Stratégique)', users: 4, icon: Building2, color: 'blue' },
      { id: 'resp_dir', name: 'Responsable Direction', desc: 'Pilotage des agents et des équipes au sein d\'une direction spécifique.', scope: 'Direction (RH, IT, etc.)', level: 'Niveau 3 (Opérationnel)', users: 12, icon: Briefcase, color: 'emerald' },
      { id: 'contrib', name: 'Contributeur', desc: 'Création et configuration d\'agents. Ne peut pas publier sans validation.', scope: 'Projet', level: 'Niveau 4 (Production)', users: 45, icon: PenTool, color: 'purple' },
      { id: 'obs', name: 'Observateur', desc: 'Accès en lecture seule aux tableaux de bord et catalogues.', scope: 'Organisation', level: 'Niveau 5 (Consultation)', users: 18, icon: Eye, color: 'gray' },
    ];

    const permissions = [
        { action: 'Activer une capacité (Prod)', admin: true, resp_ia: true, resp_dir: false, contrib: false },
        { action: 'Modifier une capacité', admin: true, resp_ia: true, resp_dir: true, contrib: true },
        { action: 'Publier version partageable', admin: true, resp_ia: true, resp_dir: false, contrib: false },
        { action: 'Valider activation (Gouvernance)', admin: true, resp_ia: true, resp_dir: false, contrib: false },
        { action: 'Supprimer capacité', admin: true, resp_ia: false, resp_dir: false, contrib: false },
        { action: 'Gérer les utilisateurs', admin: true, resp_ia: false, resp_dir: true, contrib: false },
    ];

    const users = [
        { name: 'Thomas R.', email: 'thomas.r@xyz.com', role: 'Responsable IA', direction: 'Transverse', status: 'Actif' },
        { name: 'Sarah L.', email: 'sarah.l@xyz.com', role: 'Responsable Direction', direction: 'Direction RH', status: 'Actif' },
        { name: 'Marc D.', email: 'marc.d@xyz.com', role: 'Contributeur', direction: 'Marketing', status: 'En attente' },
        { name: 'Julie W.', email: 'julie.w@xyz.com', role: 'Contributeur', direction: 'IT', status: 'Actif' },
        { name: 'Alex P.', email: 'alex.p@xyz.com', role: 'Observateur', direction: 'Finance', status: 'Actif' },
    ];

    return (
      <div className="flex flex-col h-full bg-[#F8F9FA]">
        <Breadcrumb items={['Organisation', 'Gouvernance IA', 'Rôles & Permissions']} />
        
        <div className="flex-1 overflow-auto p-8">
           <div className="max-w-[1440px] mx-auto w-full space-y-8">
              
              {/* Header */}
              <div className="flex justify-between items-start">
                  <div>
                      <h1 className="text-2xl font-bold text-slate-900 mb-1">Rôles & Permissions</h1>
                      <p className="text-slate-500 font-medium">Définition des responsabilités et des périmètres d’action.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 text-blue-700 px-4 py-3 rounded-lg text-sm font-medium flex items-start gap-3 max-w-lg">
                      <Info className="w-5 h-5 shrink-0" />
                      <p>Les permissions sont appliquées dynamiquement selon le contexte (Direction, Processus, Capacité). Le modèle IAM privilégie toujours la restriction la plus forte.</p>
                  </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-slate-200">
                  <nav className="-mb-px flex space-x-8">
                      {[
                          { id: 'roles', label: 'Rôles Stratégiques', icon: UserCheck },
                          { id: 'permissions', label: 'Matrice de Permissions', icon: LayoutGrid },
                          { id: 'users', label: 'Affectation Utilisateurs', icon: Users },
                          { id: 'rules', label: 'Règles de Validation', icon: ShieldCheck },
                      ].map((tab) => (
                          <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id as any)}
                              className={`
                                  whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm flex items-center gap-2 transition-colors
                                  ${activeTab === tab.id
                                      ? 'border-blue-600 text-blue-600'
                                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
                              `}
                          >
                              <tab.icon className="w-4 h-4" />
                              {tab.label}
                          </button>
                      ))}
                  </nav>
              </div>

              {/* Content */}
              <div className="min-h-[400px]">
                  
                  {/* TAB 1: ROLES */}
                  {activeTab === 'roles' && (
                      <div className="space-y-4">
                          {roles.map((role) => (
                              <div key={role.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-6">
                                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 bg-${role.color}-100 text-${role.color}-700`}>
                                      <role.icon className="w-8 h-8" />
                                  </div>
                                  <div className="flex-1">
                                      <div className="flex items-center gap-3 mb-1">
                                          <h3 className="text-lg font-bold text-slate-900">{role.name}</h3>
                                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-xs font-bold border border-slate-200">{role.scope}</span>
                                      </div>
                                      <p className="text-slate-600 text-sm mb-3">{role.desc}</p>
                                      <div className="flex items-center gap-6 text-xs font-medium text-slate-500">
                                          <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> {role.level}</span>
                                          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {role.users} utilisateurs actifs</span>
                                      </div>
                                  </div>
                                  <button className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 text-sm">
                                      Modifier le rôle
                                  </button>
                              </div>
                          ))}
                      </div>
                  )}

                  {/* TAB 2: PERMISSIONS */}
                  {activeTab === 'permissions' && (
                      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                          <table className="w-full text-sm text-left">
                              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs">
                                  <tr>
                                      <th className="px-6 py-4 font-bold">Action / Capacité</th>
                                      <th className="px-6 py-4 font-bold text-center w-32">Admin</th>
                                      <th className="px-6 py-4 font-bold text-center w-32">Resp. IA</th>
                                      <th className="px-6 py-4 font-bold text-center w-32">Resp. Dir</th>
                                      <th className="px-6 py-4 font-bold text-center w-32">Contrib.</th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                  {permissions.map((perm, idx) => (
                                      <tr key={idx} className="hover:bg-slate-50">
                                          <td className="px-6 py-4 font-medium text-slate-900">{perm.action}</td>
                                          <td className="px-6 py-4 text-center">
                                              {perm.admin ? <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /> : <XCircle className="w-5 h-5 text-slate-200 mx-auto" />}
                                          </td>
                                          <td className="px-6 py-4 text-center">
                                              {perm.resp_ia ? <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /> : <XCircle className="w-5 h-5 text-slate-200 mx-auto" />}
                                          </td>
                                          <td className="px-6 py-4 text-center">
                                              {perm.resp_dir ? <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /> : <XCircle className="w-5 h-5 text-slate-200 mx-auto" />}
                                          </td>
                                          <td className="px-6 py-4 text-center">
                                              {perm.contrib ? <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /> : <XCircle className="w-5 h-5 text-slate-200 mx-auto" />}
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                          <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-400">
                              Matrice IAM version 4.2 • Dernière mise à jour le 12/02/2026 par Admin
                          </div>
                      </div>
                  )}

                  {/* TAB 3: USERS */}
                  {activeTab === 'users' && (
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                            <div className="relative w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input type="text" placeholder="Rechercher un utilisateur..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                            </div>
                            <button className="px-4 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 text-sm flex items-center gap-2">
                                <Plus className="w-4 h-4" /> Ajouter un utilisateur
                            </button>
                        </div>
                        <table className="w-full text-sm text-left">
                              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs">
                                  <tr>
                                      <th className="px-6 py-4 font-bold">Utilisateur</th>
                                      <th className="px-6 py-4 font-bold">Direction</th>
                                      <th className="px-6 py-4 font-bold">Rôle Attribué</th>
                                      <th className="px-6 py-4 font-bold">Statut</th>
                                      <th className="px-6 py-4 font-bold text-right">Actions</th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                  {users.map((user, idx) => (
                                      <tr key={idx} className="hover:bg-slate-50">
                                          <td className="px-6 py-4">
                                              <div className="font-bold text-slate-900">{user.name}</div>
                                              <div className="text-xs text-slate-500">{user.email}</div>
                                          </td>
                                          <td className="px-6 py-4 text-slate-600">{user.direction}</td>
                                          <td className="px-6 py-4">
                                              <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                  user.role === 'Responsable IA' ? 'bg-blue-100 text-blue-700' :
                                                  user.role === 'Admin Plateforme' ? 'bg-slate-100 text-slate-700' :
                                                  user.role === 'Contributeur' ? 'bg-purple-100 text-purple-700' :
                                                  'bg-emerald-100 text-emerald-700'
                                              }`}>
                                                  {user.role}
                                              </span>
                                          </td>
                                          <td className="px-6 py-4">
                                              {user.status === 'Actif' 
                                                  ? <span className="text-emerald-600 font-bold text-xs flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Actif</span>
                                                  : <span className="text-amber-600 font-bold text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> En attente</span>
                                              }
                                          </td>
                                          <td className="px-6 py-4 text-right">
                                              <button className="text-slate-400 hover:text-blue-600"><Edit className="w-4 h-4" /></button>
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                        </table>
                    </div>
                  )}

                  {/* TAB 4: RULES */}
                  {activeTab === 'rules' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                  <Activity className="w-5 h-5 text-blue-600" />
                                  Déclencheurs de Validation
                              </h3>
                              <div className="space-y-4">
                                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                                      <div>
                                          <div className="font-bold text-slate-900 text-sm">Activation d'une capacité (Prod)</div>
                                          <div className="text-xs text-slate-500">Validation requise par Responsable IA</div>
                                      </div>
                                      <div className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" checked readOnly />
                                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                      </div>
                                  </div>
                                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                                      <div>
                                          <div className="font-bold text-slate-900 text-sm">Publication Version Partageable</div>
                                          <div className="text-xs text-slate-500">Double validation (Resp. IA + Security)</div>
                                      </div>
                                      <div className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" checked readOnly />
                                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                      </div>
                                  </div>
                                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                                      <div>
                                          <div className="font-bold text-slate-900 text-sm">Suppression de données</div>
                                          <div className="text-xs text-slate-500">Validation Admin uniquement</div>
                                      </div>
                                      <div className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" checked readOnly />
                                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                                  Responsables de Validation
                              </h3>
                              <div className="space-y-4">
                                  <div className="p-4 border border-slate-200 rounded-lg flex items-center gap-4">
                                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">TR</div>
                                      <div>
                                          <div className="font-bold text-slate-900 text-sm">Thomas R.</div>
                                          <div className="text-xs text-slate-500">Responsable IA • Validation Niveau 1</div>
                                      </div>
                                  </div>
                                  <div className="p-4 border border-slate-200 rounded-lg flex items-center gap-4">
                                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold">MK</div>
                                      <div>
                                          <div className="font-bold text-slate-900 text-sm">Marie K.</div>
                                          <div className="text-xs text-slate-500">CISO / RSSI • Validation Sécurité</div>
                                      </div>
                                  </div>
                              </div>
                              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                                  <h4 className="text-sm font-bold text-yellow-800 mb-1 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Mode Governance Active</h4>
                                  <p className="text-xs text-yellow-700">Toute modification des règles de validation est soumise à audit et notification immédiate au comité de direction.</p>
                              </div>
                          </div>
                      </div>
                  )}

              </div>

              {/* Footer Actions */}
              <div className="flex justify-end pt-8 border-t border-slate-200">
                  <button onClick={() => nav('14_Parametres_Plateforme')} className="flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors">
                      <Settings className="w-4 h-4" /> Accéder aux Paramètres Plateforme Avancés <ArrowRight className="w-4 h-4" />
                  </button>
              </div>

           </div>
        </div>
      </div>
    );
  };

  const Screen14_Params = () => {
    const [activeTab, setActiveTab] = useState<'deployment' | 'security' | 'data' | 'resources' | 'monitoring'>('deployment');

    return (
      <div className="flex flex-col h-full bg-[#F8F9FA]">
         <Breadcrumb items={['Organisation', 'Gouvernance IA', 'Paramètres plateforme']} />
         
         <div className="flex-1 overflow-auto p-8">
            <div className="max-w-[1440px] mx-auto w-full space-y-8">
               
               {/* Header */}
               <div className="flex justify-between items-start">
                  <div>
                     <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-2xl font-bold text-slate-900">Paramètres de la plateforme</h1>
                        <span className="bg-slate-100 text-slate-500 text-xs font-mono px-2 py-0.5 rounded border border-slate-200">v4.2.0-stable</span>
                     </div>
                     <p className="text-slate-500 font-medium">Configuration du déploiement, sécurité et ressources IA.</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                     <Clock className="w-3 h-3" />
                     <span>Dernière audit config : 16/02/2026 09:42</span>
                  </div>
               </div>
 
               {/* Tabs */}
               <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-1 flex overflow-x-auto">
                   {[
                       { id: 'deployment', label: 'Déploiement', icon: Server },
                       { id: 'security', label: 'Sécurité & Conformité', icon: ShieldCheck },
                       { id: 'data', label: 'Données & Isolation', icon: Database },
                       { id: 'resources', label: 'Ressources IA', icon: Cpu },
                       { id: 'monitoring', label: 'Supervision', icon: Activity },
                   ].map((tab) => (
                       <button
                           key={tab.id}
                           onClick={() => setActiveTab(tab.id as any)}
                           className={`
                               flex-1 min-w-[160px] py-3 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all
                               ${activeTab === tab.id
                                   ? 'bg-slate-900 text-white shadow-md'
                                   : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}
                           `}
                       >
                           <tab.icon className="w-4 h-4" />
                           {tab.label}
                       </button>
                   ))}
               </div>
 
               {/* Content Area */}
               <div className="min-h-[500px]">
                  
                  {/* TAB 1: DEPLOYMENT */}
                  {activeTab === 'deployment' && (
                     <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           <div className="bg-blue-50 border-2 border-blue-600 rounded-xl p-6 relative shadow-sm">
                              <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">Actif</div>
                              <Cloud className="w-8 h-8 text-blue-600 mb-4" />
                              <h3 className="text-lg font-bold text-slate-900 mb-1">SaaS Enterprise</h3>
                              <p className="text-sm text-slate-600 mb-4">Hébergement managé Rilme AI. Mises à jour automatiques.</p>
                              <div className="text-xs text-blue-800 font-bold flex items-center gap-1">
                                 <Globe className="w-3 h-3" /> Région : AWS eu-west-3 (Paris)
                              </div>
                           </div>
                           <div className="bg-white border border-slate-200 rounded-xl p-6 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                              <Server className="w-8 h-8 text-slate-400 mb-4" />
                              <h3 className="text-lg font-bold text-slate-900 mb-1">On-Premise</h3>
                              <p className="text-sm text-slate-500 mb-4">Déploiement sur infrastructure client (Air-gapped possible).</p>
                              <div className="text-xs text-slate-400 font-bold">Licence requise</div>
                           </div>
                           <div className="bg-white border border-slate-200 rounded-xl p-6 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                              <GitMerge className="w-8 h-8 text-slate-400 mb-4" />
                              <h3 className="text-lg font-bold text-slate-900 mb-1">Hybride</h3>
                              <p className="text-sm text-slate-500 mb-4">Données locales, inférence cloud sécurisée.</p>
                              <div className="text-xs text-slate-400 font-bold">Configuration avancée</div>
                           </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                           <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                              <Settings className="w-5 h-5 text-slate-400" /> Configuration de l'environnement
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-4">
                                 <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <div>
                                       <div className="font-bold text-sm text-slate-900">Environnement</div>
                                       <div className="text-xs text-slate-500">Production (isolée)</div>
                                    </div>
                                    <span className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                 </div>
                                 <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <div>
                                       <div className="font-bold text-sm text-slate-900">Canal de mise à jour</div>
                                       <div className="text-xs text-slate-500">Stable (LTS)</div>
                                    </div>
                                    <div className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">Modifier</div>
                                 </div>
                              </div>
                              <div className="space-y-4">
                                 <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <div>
                                       <div className="font-bold text-sm text-slate-900">Auto-scaling</div>
                                       <div className="text-xs text-slate-500">Min: 2 instances / Max: 10 instances</div>
                                    </div>
                                    <div className="text-xs font-bold text-slate-900">Activé</div>
                                 </div>
                                 <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <div>
                                       <div className="font-bold text-sm text-slate-900">Load Balancing</div>
                                       <div className="text-xs text-slate-500">Application Gateway (WAF activé)</div>
                                    </div>
                                    <div className="text-xs font-bold text-slate-900">Standard</div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}
 
                  {/* TAB 2: SECURITY */}
                  {activeTab === 'security' && (
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                           <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                              <Lock className="w-5 h-5 text-emerald-600" /> Authentification & Accès
                           </h3>
                           <div className="space-y-4">
                              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                                 <div>
                                    <div className="font-bold text-sm text-slate-900">SSO Organisation (SAML/OIDC)</div>
                                    <div className="text-xs text-slate-500">Connecté à Azure AD</div>
                                 </div>
                                 <div className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">Actif</div>
                              </div>
                              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                                 <div>
                                    <div className="font-bold text-sm text-slate-900">MFA (Multi-Factor Auth)</div>
                                    <div className="text-xs text-slate-500">Forcé pour tous les administrateurs</div>
                                 </div>
                                 <div className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">Actif</div>
                              </div>
                              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                                 <div>
                                    <div className="font-bold text-sm text-slate-900">Rotation des clés API</div>
                                    <div className="text-xs text-slate-500">Automatique tous les 90 jours</div>
                                 </div>
                                 <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">J-45</div>
                              </div>
                           </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                           <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                              <FileText className="w-5 h-5 text-blue-600" /> Conformité & Audit
                           </h3>
                           <div className="space-y-4">
                              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                                 <div>
                                    <div className="font-bold text-sm text-slate-900">Journalisation complète (Logs)</div>
                                    <div className="text-xs text-slate-500">Actions utilisateurs, appels API, erreurs</div>
                                 </div>
                                 <div className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">Actif</div>
                              </div>
                              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                                 <div>
                                    <div className="font-bold text-sm text-slate-900">Rétention des logs</div>
                                    <div className="text-xs text-slate-500">365 jours (Stockage froid archivé)</div>
                                 </div>
                                 <div className="text-xs font-bold text-slate-600">Standard</div>
                              </div>
                              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                                 <div>
                                    <div className="font-bold text-sm text-slate-900">Conformité RGPD</div>
                                    <div className="text-xs text-slate-500">Droit à l'oubli, Anonymisation</div>
                                 </div>
                                 <div className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">Conforme</div>
                              </div>
                           </div>
                           <div className="mt-6 pt-4 border-t border-slate-100">
                              <p className="text-xs text-slate-400 italic flex items-center gap-1">
                                 <Info className="w-3 h-3" /> Toutes les actions administratives sont tracées et inaltérables.
                              </p>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* TAB 3: DATA */}
                  {activeTab === 'data' && (
                     <div className="space-y-6">
                        <div className="bg-indigo-900 rounded-xl p-6 text-white shadow-lg flex items-center justify-between relative overflow-hidden">
                           <div className="relative z-10">
                              <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-emerald-400" /> Garantie No-Training</h3>
                              <p className="text-indigo-200 text-sm max-w-2xl">
                                 Rilme AI garantit contractuellement et techniquement qu'aucune donnée client n'est utilisée pour l'entraînement ou l'amélioration des modèles de fondation (LLM) publics ou partagés.
                              </p>
                           </div>
                           <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-800 to-transparent"></div>
                           <Database className="w-24 h-24 text-indigo-800 absolute -right-4 -bottom-4 opacity-50" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                              <h3 className="font-bold text-slate-900 mb-4">Chiffrement & Isolation</h3>
                              <ul className="space-y-4">
                                 <li className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                                       <Lock className="w-4 h-4 text-slate-600" />
                                    </div>
                                    <div>
                                       <div className="font-bold text-sm text-slate-900">Données au repos</div>
                                       <div className="text-xs text-slate-500">Chiffrement AES-256 avec clés gérées par le client (CMK) optionnel.</div>
                                    </div>
                                 </li>
                                 <li className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                                       <Share2 className="w-4 h-4 text-slate-600" />
                                    </div>
                                    <div>
                                       <div className="font-bold text-sm text-slate-900">Données en transit</div>
                                       <div className="text-xs text-slate-500">TLS 1.3 forcé sur tous les endpoints.</div>
                                    </div>
                                 </li>
                                 <li className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                                       <Box className="w-4 h-4 text-slate-600" />
                                    </div>
                                    <div>
                                       <div className="font-bold text-sm text-slate-900">Isolation Multi-Tenant</div>
                                       <div className="text-xs text-slate-500">Séparation logique stricte (Row Level Security) au niveau base de données.</div>
                                    </div>
                                 </li>
                              </ul>
                           </div>

                           <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                              <h3 className="font-bold text-slate-900 mb-4">Localisation & Souveraineté</h3>
                              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 mb-4">
                                 <div className="flex items-center gap-2 mb-2">
                                    <Globe className="w-4 h-4 text-blue-600" />
                                    <span className="font-bold text-sm text-slate-900">Zone de stockage principale</span>
                                 </div>
                                 <div className="text-lg font-bold text-slate-900 pl-6">France (Paris)</div>
                                 <div className="text-xs text-slate-500 pl-6">AWS eu-west-3</div>
                              </div>
                              <div className="flex gap-2">
                                 <div className="flex-1 bg-slate-50 rounded-lg p-3 border border-slate-100">
                                    <div className="text-xs font-bold text-slate-500 mb-1">Backup</div>
                                    <div className="text-sm font-bold text-slate-900">Allemagne (Francfort)</div>
                                 </div>
                                 <div className="flex-1 bg-slate-50 rounded-lg p-3 border border-slate-100">
                                    <div className="text-xs font-bold text-slate-500 mb-1">Failover</div>
                                    <div className="text-sm font-bold text-slate-900">Irlande (Dublin)</div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* TAB 4: RESOURCES */}
                  {activeTab === 'resources' && (
                     <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                              <div className="text-xs font-bold text-slate-400 uppercase mb-2">Consommation Mensuelle</div>
                              <div className="text-3xl font-bold text-slate-900 mb-1">4.2M <span className="text-sm font-medium text-slate-500">tokens</span></div>
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                                 <div className="bg-blue-600 h-full w-[42%]"></div>
                              </div>
                              <div className="text-xs text-slate-500">42% du quota (10M)</div>
                           </div>
                           <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                              <div className="text-xs font-bold text-slate-400 uppercase mb-2">Coût Estimé</div>
                              <div className="text-3xl font-bold text-slate-900 mb-1">1,250 €</div>
                              <div className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                                 <span className="bg-emerald-100 px-1.5 py-0.5 rounded">-12%</span> vs mois dernier
                              </div>
                           </div>
                           <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                              <div className="text-xs font-bold text-slate-400 uppercase mb-2">Modèles Actifs</div>
                              <div className="flex -space-x-2 overflow-hidden py-1">
                                 <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white">GPT</div>
                                 <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white">CL</div>
                                 <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white">MS</div>
                              </div>
                              <div className="text-xs text-slate-500 mt-2">3 modèles provisionnés</div>
                           </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                           <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                              <Cpu className="w-5 h-5 text-purple-600" /> Modèles de Fondation Configurés
                           </h3>
                           <div className="space-y-4">
                              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xs">GPT-4</div>
                                    <div>
                                       <div className="font-bold text-slate-900">GPT-4o (Azure OpenAI)</div>
                                       <div className="text-xs text-slate-500">Déployé sur France Central • 128k context</div>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-4">
                                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">Actif</span>
                                    <button className="text-slate-400 hover:text-slate-600"><Settings className="w-4 h-4" /></button>
                                 </div>
                              </div>
                              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center font-bold text-xs">C-3.5</div>
                                    <div>
                                       <div className="font-bold text-slate-900">Claude 3.5 Sonnet (AWS Bedrock)</div>
                                       <div className="text-xs text-slate-500">Déployé sur eu-west-3 • 200k context</div>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-4">
                                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">Actif</span>
                                    <button className="text-slate-400 hover:text-slate-600"><Settings className="w-4 h-4" /></button>
                                 </div>
                              </div>
                              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors opacity-60">
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center font-bold text-xs">M-7B</div>
                                    <div>
                                       <div className="font-bold text-slate-900">Mistral 7B (Self-Hosted)</div>
                                       <div className="text-xs text-slate-500">Instance GPU interne • 32k context</div>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-4">
                                    <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded">Inactif</span>
                                    <button className="text-slate-400 hover:text-slate-600"><Settings className="w-4 h-4" /></button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* TAB 5: MONITORING */}
                  {activeTab === 'monitoring' && (
                     <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                           <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-4">
                              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                              <div>
                                 <div className="font-bold text-emerald-900 text-sm">Système OK</div>
                                 <div className="text-xs text-emerald-700">Tous services opérationnels</div>
                              </div>
                           </div>
                           <div className="bg-white border border-slate-200 p-4 rounded-xl">
                              <div className="text-xs text-slate-500 font-bold uppercase mb-1">Disponibilité (30j)</div>
                              <div className="text-xl font-bold text-slate-900">99.99%</div>
                           </div>
                           <div className="bg-white border border-slate-200 p-4 rounded-xl">
                              <div className="text-xs text-slate-500 font-bold uppercase mb-1">Temps réponse</div>
                              <div className="text-xl font-bold text-slate-900">240ms</div>
                           </div>
                           <div className="bg-white border border-slate-200 p-4 rounded-xl">
                              <div className="text-xs text-slate-500 font-bold uppercase mb-1">Taux d'erreur</div>
                              <div className="text-xl font-bold text-slate-900">0.02%</div>
                           </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                           <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                              <Activity className="w-5 h-5 text-blue-600" /> Intégrations SIEM & Alerting
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="p-4 border border-slate-200 rounded-lg flex justify-between items-center">
                                 <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xs">SP</div>
                                    <div>
                                       <div className="font-bold text-slate-900">Splunk Forwarder</div>
                                       <div className="text-xs text-slate-500">Envoi des logs de sécurité</div>
                                    </div>
                                 </div>
                                 <div className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">Connecté</div>
                              </div>
                              <div className="p-4 border border-slate-200 rounded-lg flex justify-between items-center">
                                 <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">DD</div>
                                    <div>
                                       <div className="font-bold text-slate-900">Datadog APM</div>
                                       <div className="text-xs text-slate-500">Monitoring performance</div>
                                    </div>
                                 </div>
                                 <div className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">Connecté</div>
                              </div>
                              <div className="p-4 border border-slate-200 rounded-lg flex justify-between items-center opacity-60">
                                 <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">PD</div>
                                    <div>
                                       <div className="font-bold text-slate-900">PagerDuty</div>
                                       <div className="text-xs text-slate-500">Gestion d'incidents</div>
                                    </div>
                                 </div>
                                 <button className="text-xs font-bold text-blue-600 hover:underline">Connecter</button>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}

               </div>

            </div>
         </div>
      </div>
    );
  };

  // --- Router ---
  
  return (
    <div className="flex flex-col h-screen font-sans text-slate-900 bg-[#F8F9FA] overflow-hidden">
      {currentScreen !== '00_Authentification' && <Header />}
      
      <main className="flex-1 overflow-auto">
        {currentScreen === '00_Authentification' && <Screen00_Auth />}
        {currentScreen === '01_Regles_IA' && <Screen01_Regles />}
        {currentScreen === '02_Organisation' && <Screen02_Organisation />}
        {currentScreen === '03_Direction_RH' && <Screen03_DirectionRH />}
        {currentScreen === '04_Processus_Recrutement' && <Screen04_Processus />}
        {currentScreen === '05_Activation_Capacite' && <Screen05_Activation />}
        {currentScreen === '06_Interaction_IA' && <Screen06_Interaction />}
        {currentScreen === '07_Gouvernance' && <Screen07_Gouvernance />}
        {currentScreen === '08_Marketplace' && <Screen08_Marketplace />}
        {currentScreen === '09_Connecteurs' && <Screen09_Connecteurs />}
        {currentScreen === '10_Builder' && <Screen10_Builder />}
        {currentScreen === '11_Catalogue' && <Screen11_Catalogue />}
        {currentScreen === '12_Version_Partageable' && <Screen12_Partage />}
        {currentScreen === '13_Roles_Permissions' && <Screen13_Roles />}
        {currentScreen === '14_Parametres_Plateforme' && <Screen14_Params />}
      </main>

      {/* Debug Nav - remove in prod, helpful for manual jump if stuck */}
      {/* 
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-transparent hover:bg-slate-200 z-[100] group flex overflow-x-auto p-1 opacity-0 hover:opacity-100 transition-opacity">
         {Object.keys({ '00_Authentification':0, '01_Regles_IA':0, '02_Organisation':0 }).map(s => ( // truncated for brevity
           <button key={s} onClick={() => nav(s as Screen)} className="px-2 text-[10px] border-r border-slate-400">{s.split('_')[1]}</button>
         ))}
      </div> 
      */}
    </div>
  );
}
