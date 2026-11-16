// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Sparkles, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap, 
  Bot,
  Search,
  DollarSign,
  BarChart3,
  FileText,
  ShoppingCart,
  Mail,
  Globe,
  MessageSquare,
  Camera,
  Mic,
  Video,
  Database,
  Code,
  Target,
  Brain,
  Cpu,
  Eye,
  Settings,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Filter,
  Share,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router';
import type { Edge, Node } from '@xyflow/react';
import { templateGraphs } from './templateGraphs';

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  complexity: 'débutant' | 'intermédiaire' | 'avancé';
  useCase: string;
  icon: React.ReactNode;
  tags: string[];
  nodes: Node[];
  edges: Edge[];
}

export const workflowTemplates: WorkflowTemplate[] = [
  // Templates E-commerce & Marketing
  {
    id: 'ecommerce-product-content',
    name: 'Génération de contenu produit e-commerce',
    description: "Brouillons de descriptions produit et d'images à partir d'un sujet et d'une recherche de mots-clés, à relire avant publication",
    category: 'ecommerce',
    complexity: 'intermédiaire',
    useCase: 'Boutiques en ligne, marketplaces',
    icon: <ShoppingCart className="h-5 w-5" />,
    tags: ['E-commerce', 'Marketing', 'Contenu', 'SEO'],
    nodes: templateGraphs['ecommerce-product-content'].nodes,
    edges: templateGraphs['ecommerce-product-content'].edges
  },
  {
    id: 'social-media-automation',
    name: 'Automatisation des réseaux sociaux',
    description: "Brouillons de publications à partir d'un calendrier éditorial, adaptés à chaque plateforme puis programmés, à relire avant mise en ligne",
    category: 'marketing',
    complexity: 'intermédiaire',
    useCase: 'Community managers, PME',
    icon: <Share className="h-5 w-5" />,
    tags: ['Social Media', 'Automatisation', 'Contenu'],
    nodes: templateGraphs['social-media-automation'].nodes,
    edges: templateGraphs['social-media-automation'].edges
  },
  {
    id: 'email-marketing-personalized',
    name: 'Email marketing personnalisé',
    description: "Campagne d'e-mails segmentée et personnalisée avec test A/B (prévoir le consentement des destinataires et un lien de désinscription)",
    category: 'marketing',
    complexity: 'avancé',
    useCase: 'E-commerce, SaaS, services',
    icon: <Mail className="h-5 w-5" />,
    tags: ['Email', 'Personnalisation', 'CRM'],
    nodes: templateGraphs['email-marketing-personalized'].nodes,
    edges: templateGraphs['email-marketing-personalized'].edges
  },

  // Templates Service Client & Support
  {
    id: 'customer-support-ai',
    name: 'Support client multicanal',
    description: "Un modèle de langage répond aux sujets couverts par la base d'aide, les autres demandes sont transférées à un conseiller humain",
    category: 'service-client',
    complexity: 'avancé',
    useCase: 'Toutes entreprises avec support',
    icon: <MessageSquare className="h-5 w-5" />,
    tags: ['Support', 'Chatbot', 'Multicanal'],
    nodes: templateGraphs['customer-support-ai'].nodes,
    edges: templateGraphs['customer-support-ai'].edges
  },
  {
    id: 'ticket-classification',
    name: 'Classification de tickets',
    description: "Classement des demandes support par un modèle de langage et orientation vers l'équipe concernée, avec relecture humaine des classements incertains",
    category: 'service-client',
    complexity: 'intermédiaire',
    useCase: 'Centres d\'appels, helpdesk',
    icon: <Filter className="h-5 w-5" />,
    tags: ['Classification', 'Routing', 'Efficacité'],
    nodes: templateGraphs['ticket-classification'].nodes,
    edges: templateGraphs['ticket-classification'].edges
  },
  {
    id: 'sentiment-monitoring',
    name: 'Suivi de la satisfaction client',
    description: "Analyse du sentiment d'avis et de messages clients, avec une alerte lorsqu'un seuil que vous définissez est atteint",
    category: 'analyse',
    complexity: 'intermédiaire',
    useCase: 'E-commerce, services, hôtellerie',
    icon: <BarChart3 className="h-5 w-5" />,
    tags: ['Sentiment', 'Monitoring', 'Alertes'],
    nodes: templateGraphs['sentiment-monitoring'].nodes,
    edges: templateGraphs['sentiment-monitoring'].edges
  },

  // Templates Création de Contenu
  {
    id: 'blog-content-pipeline',
    name: 'Chaîne de création d\'articles de blog',
    description: "Recherche de sujets, brouillon rédigé par un modèle de langage, titres et balises SEO, puis relecture humaine avant programmation",
    category: 'contenu',
    complexity: 'intermédiaire',
    useCase: 'Blogs, sites corporate, agences',
    icon: <FileText className="h-5 w-5" />,
    tags: ['Blog', 'SEO', 'Contenu', 'Automatisation'],
    nodes: templateGraphs['blog-content-pipeline'].nodes,
    edges: templateGraphs['blog-content-pipeline'].edges
  },
  {
    id: 'video-content-creation',
    name: 'Création de vidéos assistée',
    description: "Aide à la production de vidéos\u00A0: script, voix-off, images, montage et sous-titres, avec validation humaine avant publication",
    category: 'contenu',
    complexity: 'avancé',
    useCase: 'YouTube, formation, marketing',
    icon: <Video className="h-5 w-5" />,
    tags: ['Vidéo', 'Script', 'Voix-off', 'Montage'],
    nodes: templateGraphs['video-content-creation'].nodes,
    edges: templateGraphs['video-content-creation'].edges
  },
  {
    id: 'podcast-production',
    name: 'Production de podcast assistée',
    description: "Script rédigé par un modèle de langage à partir d'un thème et de sources, voix de synthèse, montage audio et validation humaine avant publication",
    category: 'contenu',
    complexity: 'avancé',
    useCase: 'Podcasters, entreprises, médias',
    icon: <Mic className="h-5 w-5" />,
    tags: ['Podcast', 'Audio', 'Script', 'Automatisation'],
    nodes: templateGraphs['podcast-production'].nodes,
    edges: templateGraphs['podcast-production'].edges
  },

  // Templates Ressources Humaines
  {
    id: 'recruitment-screening',
    name: 'Aide au tri de CV sous contrôle humain',
    description: "Aide au tri de candidatures, sous contrôle d'un recruteur\u00A0: en Europe, ce type d'usage est classé à haut risque par le règlement sur l'IA, et le RGPD (article 22) encadre les décisions fondées uniquement sur un traitement automatisé",
    category: 'rh',
    complexity: 'intermédiaire',
    useCase: 'RH, recrutement, agences',
    icon: <Users className="h-5 w-5" />,
    tags: ['Recrutement', 'Haut risque', 'CV', 'RH'],
    nodes: templateGraphs['recruitment-screening'].nodes,
    edges: templateGraphs['recruitment-screening'].edges
  },
  {
    id: 'employee-onboarding',
    name: 'Accueil d\'un nouvel employé',
    description: "Parcours d'intégration adapté au poste, avec supports d'accueil, rendez-vous et rappels, validé par les RH et le manager",
    category: 'rh',
    complexity: 'intermédiaire',
    useCase: 'Grandes entreprises, scale-ups',
    icon: <CheckCircle className="h-5 w-5" />,
    tags: ['Onboarding', 'Formation', 'Suivi'],
    nodes: templateGraphs['employee-onboarding'].nodes,
    edges: templateGraphs['employee-onboarding'].edges
  },
  {
    id: 'performance-analysis',
    name: 'Analyse de performance RH',
    description: "Aide à l'analyse d'indicateurs de performance, avec revue humaine\u00A0; usage encadré en Europe (haut risque selon le règlement sur l'IA, inférence d'émotions interdite au travail)",
    category: 'rh',
    complexity: 'avancé',
    useCase: 'RH, management, coaching',
    icon: <TrendingUp className="h-5 w-5" />,
    tags: ['Performance', 'Haut risque', 'Évaluation', 'Développement'],
    nodes: templateGraphs['performance-analysis'].nodes,
    edges: templateGraphs['performance-analysis'].edges
  },

  // Templates Finances & Comptabilité
  {
    id: 'invoice-processing',
    name: 'Traitement des factures',
    description: "Lecture des factures (OCR), extraction des champs, contrôle des montants et validation humaine des cas douteux avant saisie en comptabilité",
    category: 'finance',
    complexity: 'intermédiaire',
    useCase: 'Comptabilité, PME, grands comptes',
    icon: <DollarSign className="h-5 w-5" />,
    tags: ['Factures', 'OCR', 'Comptabilité'],
    nodes: templateGraphs['invoice-processing'].nodes,
    edges: templateGraphs['invoice-processing'].edges
  },
  {
    id: 'expense-monitoring',
    name: 'Surveillance des dépenses',
    description: "Repérage de dépenses atypiques par règles et statistiques, signalées pour examen humain (un écart n'est pas une preuve d'erreur ou de fraude)",
    category: 'finance',
    complexity: 'intermédiaire',
    useCase: 'CFO, contrôle de gestion',
    icon: <AlertTriangle className="h-5 w-5" />,
    tags: ['Dépenses', 'Anomalies', 'Alertes'],
    nodes: templateGraphs['expense-monitoring'].nodes,
    edges: templateGraphs['expense-monitoring'].edges
  },
  {
    id: 'financial-reporting',
    name: 'Rapports financiers',
    description: "Rapport financier préparé à partir des données comptables\u00A0: indicateurs calculés, commentaire rédigé par un modèle de langage, projections fondées sur des hypothèses explicites, relecture par un responsable",
    category: 'finance',
    complexity: 'avancé',
    useCase: 'Direction financière, investisseurs',
    icon: <BarChart3 className="h-5 w-5" />,
    tags: ['Reporting', 'Prédictif', 'Finance'],
    nodes: templateGraphs['financial-reporting'].nodes,
    edges: templateGraphs['financial-reporting'].edges
  },

  // Templates Sécurité & Conformité
  {
    id: 'security-monitoring',
    name: 'Surveillance de sécurité multi-sources',
    description: "Surveillance de la sécurité à partir de journaux de plusieurs sources\u00A0: détection d'anomalies par règles, qualification par un analyste avant toute action",
    category: 'securite',
    complexity: 'avancé',
    useCase: 'IT, cybersécurité, RSSI',
    icon: <Shield className="h-5 w-5" />,
    tags: ['Sécurité', 'Monitoring', 'Anomalies'],
    nodes: templateGraphs['security-monitoring'].nodes,
    edges: templateGraphs['security-monitoring'].edges
  },
  {
    id: 'gdpr-compliance',
    name: "Préparation d'audit RGPD",
    description: "Aide à la préparation d'un audit RGPD\u00A0: recensement des traitements et des points à vérifier, à valider par le délégué à la protection des données ou un juriste",
    category: 'securite',
    complexity: 'avancé',
    useCase: 'DPO, juridique, compliance',
    icon: <Eye className="h-5 w-5" />,
    tags: ['RGPD', 'Compliance', 'Audit'],
    nodes: templateGraphs['gdpr-compliance'].nodes,
    edges: templateGraphs['gdpr-compliance'].edges
  },

  // Templates Développement & IT
  {
    id: 'code-review-ai',
    name: 'Revue de code',
    description: "Relecture assistée d'une modification de code\u00A0: analyse statique, tests existants et remarques d'un modèle de langage, à valider par un développeur avant fusion",
    category: 'developpement',
    complexity: 'avancé',
    useCase: 'Équipes dev, DevOps, CTO',
    icon: <Code className="h-5 w-5" />,
    tags: ['Code', 'Qualité', 'DevOps'],
    nodes: templateGraphs['code-review-ai'].nodes,
    edges: templateGraphs['code-review-ai'].edges
  },
  {
    id: 'automated-testing',
    name: 'Génération de tests',
    description: "Tests proposés par un modèle de langage à partir du code et des spécifications, exécutés puis relus par un développeur (une couverture plus élevée ne prouve pas que les tests soient pertinents)",
    category: 'developpement',
    complexity: 'avancé',
    useCase: 'QA, développeurs, CI/CD',
    icon: <CheckCircle className="h-5 w-5" />,
    tags: ['Tests', 'Automatisation', 'QA'],
    nodes: templateGraphs['automated-testing'].nodes,
    edges: templateGraphs['automated-testing'].edges
  },
  {
    id: 'documentation-generator',
    name: 'Génération de documentation',
    description: "Documentation technique rédigée par un modèle de langage à partir de la structure du code et des spécifications, relue par un développeur",
    category: 'developpement',
    complexity: 'intermédiaire',
    useCase: 'Équipes dev, product owners',
    icon: <FileText className="h-5 w-5" />,
    tags: ['Documentation', 'Code', 'Technique'],
    nodes: templateGraphs['documentation-generator'].nodes,
    edges: templateGraphs['documentation-generator'].edges
  },

  // Templates Business Intelligence
  {
    id: 'sales-forecasting',
    name: 'Prévision des ventes',
    description: "Prévisions de ventes à partir de l'historique et de facteurs externes, dont l'exactitude se mesure sur vos données",
    category: 'business-intelligence',
    complexity: 'avancé',
    useCase: 'Direction commerciale, CEO',
    icon: <TrendingUp className="h-5 w-5" />,
    tags: ['Prévisions', 'Ventes', 'Stratégie'],
    nodes: templateGraphs['sales-forecasting'].nodes,
    edges: templateGraphs['sales-forecasting'].edges
  },
  {
    id: 'customer-segmentation',
    name: 'Segmentation client',
    description: "Regroupement de clients en segments à partir de données d'achat minimisées, avec vérification du consentement et de la base légale avant toute personnalisation",
    category: 'business-intelligence',
    complexity: 'avancé',
    useCase: 'Marketing, CRM, e-commerce',
    icon: <Target className="h-5 w-5" />,
    tags: ['Segmentation', 'Comportement', 'CRM'],
    nodes: templateGraphs['customer-segmentation'].nodes,
    edges: templateGraphs['customer-segmentation'].edges
  }
];

const templateCategories = [
  { id: 'all', name: 'Tous les gabarits', count: workflowTemplates.length },
  { id: 'ecommerce', name: 'E-commerce', count: workflowTemplates.filter(t => t.category === 'ecommerce').length },
  { id: 'marketing', name: 'Marketing', count: workflowTemplates.filter(t => t.category === 'marketing').length },
  { id: 'service-client', name: 'Service client', count: workflowTemplates.filter(t => t.category === 'service-client').length },
  { id: 'contenu', name: 'Création de contenu', count: workflowTemplates.filter(t => t.category === 'contenu').length },
  { id: 'rh', name: 'Ressources humaines', count: workflowTemplates.filter(t => t.category === 'rh').length },
  { id: 'finance', name: 'Finance et comptabilité', count: workflowTemplates.filter(t => t.category === 'finance').length },
  { id: 'securite', name: 'Sécurité', count: workflowTemplates.filter(t => t.category === 'securite').length },
  { id: 'developpement', name: 'Développement', count: workflowTemplates.filter(t => t.category === 'developpement').length },
  { id: 'business-intelligence', name: 'Informatique décisionnelle', count: workflowTemplates.filter(t => t.category === 'business-intelligence').length },
  { id: 'analyse', name: 'Analyse', count: workflowTemplates.filter(t => t.category === 'analyse').length }
];

interface WorkflowTemplateLibraryProps {
  onLoadTemplate: (template: WorkflowTemplate) => void;
}

const WorkflowTemplateLibrary: React.FC<WorkflowTemplateLibraryProps> = ({ onLoadTemplate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'débutant':
        return 'bg-green-100 text-green-800 dark:text-green-200 dark:bg-green-900/40';
      case 'intermédiaire':
        return 'bg-yellow-100 text-yellow-800 dark:text-yellow-200 dark:bg-yellow-900/40';
      case 'avancé':
        return 'bg-red-100 text-red-800 dark:text-red-200 dark:bg-red-900/40';
      default:
        return 'bg-gray-100 text-gray-800 dark:text-gray-200 dark:bg-muted';
    }
  };

  const filteredTemplates = workflowTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Lien retour vers les ressources */}
      <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20 shrink-0">
        <div className="flex items-center gap-2 text-sm">
          <Globe className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Plus de gabarits dans</span>
          <Button variant="link" className="p-0 h-auto text-primary font-medium" asChild>
            <Link to="/ressources?tab=outils#resources" className="flex items-center gap-1">
              la section Ressources
              <ExternalLink className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="space-y-3 p-3 bg-background shrink-0">
        <Input
          placeholder="Rechercher un gabarit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        
        <div className="flex flex-wrap gap-1">
          {templateCategories.map(category => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'secondary'}
              className="cursor-pointer text-xs"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name} ({category.count})
            </Badge>
          ))}
        </div>
      </div>

      {/* Liste des templates */}
      <div tabIndex={0} role="region" aria-label="Liste des gabarits" className="flex-1 overflow-y-auto p-3">
        <div className="space-y-4">
          {filteredTemplates.map(template => (
            <Card key={template.id} className="border-l-4 border-l-primary/30">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-primary/10 text-primary">
                      {template.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-sm font-medium">{template.name}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        {template.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    <Badge 
                      className={`text-xs ${getComplexityColor(template.complexity)}`}
                      variant="secondary"
                    >
                      {template.complexity}
                    </Badge>
                    {template.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      <span>{template.useCase}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => onLoadTemplate(template)}
                    className="w-full"
                    size="sm"
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    Charger ce gabarit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredTemplates.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2" />
              <p>Aucun gabarit trouvé pour « {searchTerm} »</p>
            </div>
          )}
        </div>

        {/* Section créateur */}
        <div className="mt-6 p-3 bg-secondary/10 rounded border text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Geoffroy Streit</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Créateur de l'outil
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkflowTemplateLibrary;
