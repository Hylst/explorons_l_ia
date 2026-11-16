// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import Hero from '@/components/Hero';
import SectionHeading from '@/components/SectionHeading';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RelatedLinks from '@/components/courses/RelatedLinks';
import {
  Lightbulb,
  Star,
  BookOpen,
  Cpu,
  Network,
  ArrowRight,
  ShieldCheck,
  Search,
  Users,
  Lock,
  Image as ImageIcon,
} from 'lucide-react';

/** Les bons réflexes pour utiliser une IA quand on est jeune (onglet "Bons réflexes"). */
const reflexes = [
  {
    icon: ShieldCheck,
    title: "Ne donne jamais d'informations personnelles",
    text: "Ton nom complet, ton adresse, ton école, ton numéro de téléphone, des photos de toi ou de ta famille\u00A0: ce que tu écris peut être conservé par le service. Si tu hésites, ne l'écris pas.",
  },
  {
    icon: Search,
    title: 'Vérifie ce que l\'IA te dit',
    text: "Une IA peut se tromper ou inventer une réponse, et le faire avec beaucoup d'assurance. Compare avec un livre, un site fiable ou un adulte avant de retenir une information importante.",
  },
  {
    icon: Users,
    title: "Une IA n'est pas une personne",
    text: "Elle n'a ni sentiments ni conscience, même si ses réponses peuvent en donner l'impression. Elle ne remplace ni tes amis ni ta famille. Si un sujet te met mal à l'aise ou t'inquiète, parles-en à un adulte de confiance. En cas de harcèlement ou de contenu choquant en ligne, le 3018 est gratuit, anonyme et confidentiel ; le 119 est le numéro de l'enfance en danger.",
  },
  {
    icon: Lock,
    title: 'Respecte les âges minimum',
    text: "Beaucoup de services d'IA sont réservés aux plus de 13 ans, et demandent l'accord d'un parent jusqu'à 18 ans, selon les cas. En France, avant 15 ans, un service en ligne qui s'appuie sur ton consentement pour utiliser tes données doit aussi obtenir l'accord d'un parent. Lis les conditions d'utilisation avec un adulte avant de créer un compte.",
  },
  {
    icon: BookOpen,
    title: 'Fais tes devoirs toi-même',
    text: "Une IA peut t'expliquer une leçon ou te poser des questions pour t'entraîner. Recopier sa réponse ne t'apprend rien et peut être considéré comme de la triche\u00A0: reformule avec tes propres mots.",
  },
  {
    icon: ImageIcon,
    title: "Une image réaliste n'est pas forcément vraie",
    text: "Les IA savent fabriquer de fausses photos, de fausses vidéos et de fausses voix qui paraissent authentiques. Avant de partager une image surprenante, demande-toi d'où elle vient.",
  },
];

const IAExpliqueeAuxEnfants = () => {
  return (
    <>
      <Hero
        title="L'IA expliquée aux enfants"
        subtitle="Une approche progressive et pédagogique pour comprendre l'intelligence artificielle à partir de 12 ans"
      />

      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div>
              <h2 className="text-2xl font-bold mb-4">Salut les explorateurs du futur !</h2>
              
              <p>
                Imagine que tu puisses créer un assistant invisible très doué qui peut t'aider à faire tes devoirs,
                composer de la musique, dessiner des images incroyables ou même inventer des histoires. 
                C'est ce qu'on appelle l'intelligence artificielle, ou IA pour faire plus court !
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Mais au fait, qu'est-ce que l'IA exactement ?</h3>
              
              <p>
                L'intelligence artificielle, c'est un peu comme si on avait appris à un ordinateur à « penser » 
                et à résoudre des problèmes, un peu comme le fait un humain. Sauf que l'ordinateur ne pense pas vraiment
                comme nous - il utilise des mathématiques et des statistiques pour faire semblant d'être intelligent !
              </p>
              
              <div className="bg-primary/10 p-4 rounded-lg my-6">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <Lightbulb className="text-primary" size={20} />
                  Le savais-tu ?
                </h4>
                <p className="m-0">
                  Les IA qui créent du texte comme ChatGPT n'ont pas vraiment de « cerveau ». 
                  Elles prédisent quel mot devrait venir ensuite, 
                  un peu comme si tu jouais à deviner la suite d'une phrase, mais en beaucoup plus perfectionné !
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <Card className="shadow-md">
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <Star className="text-primary" size={20} />
                  Dans cette section
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-primary shrink-0" />
                    <span>Comment fonctionne l'IA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-primary shrink-0" />
                    <span>La magie des données et de l'apprentissage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-primary shrink-0" />
                    <span>Les tokens et la fenêtre de contexte</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-primary shrink-0" />
                    <span>À quoi sert l'IA et ses limites</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-primary shrink-0" />
                    <span>Les bons réflexes pour utiliser une IA</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5 shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <BookOpen className="text-primary" size={20} />
                    Envie d'en savoir plus ?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Ces pages expliquent les mêmes idées plus en détail. Lis-les avec un adulte si tu as des questions.
                  </p>
                  <Button asChild variant="outline" className="mt-2 w-full justify-start">
                    <Link to="/glossaire">Le glossaire de l'IA</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/les-bases">Les bases de l'IA</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/ethique">L'éthique de l'IA</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-16">
          <SectionHeading 
            pretitle="Explore par thème"
            title="Les concepts clés de l'IA"
            description="Découvre les concepts importants de l'intelligence artificielle expliqués simplement"
            center
          />
          
          <Tabs defaultValue="fonctionnement" className="mt-8">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 h-auto max-w-3xl mx-auto gap-1">
              <TabsTrigger value="fonctionnement">Comment ça marche</TabsTrigger>
              <TabsTrigger value="concepts">Concepts importants</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="reflexes">Bons réflexes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="fonctionnement" className="mt-6 animate-fade-in">
              <div>
                <h3 className="text-2xl font-bold mb-4">Comment fonctionne l'intelligence artificielle ?</h3>
                
                <p>
                  Pour comprendre comment fonctionne une IA, imagine que tu essaies d'apprendre à reconnaître des chats et des chiens. 
                  Comment ferais-tu ? Tu regarderais plein de photos d'animaux, et avec le temps, tu apprendrais à repérer les 
                  différences entre un chat et un chien.
                </p>
                
                <p>
                  L'IA fait exactement ça ! On lui montre des millions d'exemples et elle apprend à reconnaître des motifs. 
                  C'est ce qu'on appelle l'apprentissage automatique ou « machine learning » en anglais.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <div className="bg-secondary/20 p-5 rounded-lg">
                    <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                      <Network className="text-primary" size={20} />
                      Les réseaux de neurones
                    </h4>
                    <p className="text-sm">
                      Les IA modernes utilisent ce qu'on appelle des « réseaux de neurones », qui sont inspirés
                      du fonctionnement de notre cerveau ! Ces réseaux sont composés de milliers ou même de millions
                      de « neurones » artificiels connectés entre eux.
                    </p>
                  </div>
                  
                  <div className="bg-secondary/20 p-5 rounded-lg">
                    <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                      <BookOpen className="text-primary" size={20} />
                      L'apprentissage
                    </h4>
                    <p className="text-sm">
                      Pour qu'une IA devienne « intelligente », elle doit apprendre ! On lui montre des millions d'exemples
                      et on lui dit si ses réponses sont bonnes ou mauvaises. Petit à petit, elle s'améliore,
                      comme quand tu t'entraînes à un jeu vidéo et que tu deviens meilleur avec le temps.
                    </p>
                  </div>
                </div>
                
                <h4 className="text-xl font-bold mt-6 mb-3">La magie des données</h4>
                
                <p>
                  L'IA a besoin d'énormément de données pour apprendre. Par exemple, pour créer ChatGPT, 
                  on a utilisé d'énormes quantités de textes provenant d'Internet : des articles, des livres, 
                  des conversations... C'est comme si tu avais lu toute une bibliothèque pour apprendre à écrire !
                </p>
                
                <div className="bg-primary/10 p-4 rounded-lg my-6">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <Cpu className="text-primary" size={20} />
                    La fenêtre de contexte, c'est quoi ?
                  </h4>
                  <p className="m-0">
                    Quand tu discutes avec une IA comme ChatGPT, elle ne se souvient que d'un nombre limité de mots
                    dans votre conversation. C'est ce qu'on appelle la « fenêtre de contexte ». Si la conversation 
                    devient trop longue, l'IA peut oublier les choses que tu as dites au début, un peu comme si 
                    elle avait une mémoire à court terme limitée !
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="concepts" className="mt-6 animate-fade-in">
              <div>
                <h3 className="text-2xl font-bold mb-4">10 concepts clés à comprendre</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <div className="border rounded-lg p-4 hover:bg-secondary/10 transition-colors">
                    <h4 className="text-lg font-bold mb-2">1. Les tokens</h4>
                    <p>
                      Les tokens sont les petits morceaux de texte que l'IA analyse. Un token peut être un mot entier,
                      une partie d'un mot ou même un simple caractère. C'est comme les briques d'un Lego : l'IA assemble 
                      ces briques pour former des phrases complètes.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-secondary/10 transition-colors">
                    <h4 className="text-lg font-bold mb-2">2. La fenêtre de contexte</h4>
                    <p>
                      C'est le nombre maximum de tokens que l'IA peut garder en mémoire pendant une conversation.
                      C'est comme si tu ne pouvais te rappeler que des dernières pages d'une très longue conversation avec ton ami.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-secondary/10 transition-colors">
                    <h4 className="text-lg font-bold mb-2">3. L'apprentissage supervisé</h4>
                    <p>
                      C'est comme apprendre avec un professeur ! On montre à l'IA des exemples et on lui dit
                      quelle est la bonne réponse. Avec le temps, elle apprend à donner les bonnes réponses toute seule.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-secondary/10 transition-colors">
                    <h4 className="text-lg font-bold mb-2">4. Le deep learning</h4>
                    <p>
                      C'est une technique d'apprentissage très puissante qui utilise des réseaux de neurones avec plusieurs
                      couches. Plus il y a de couches, plus l'IA peut comprendre des choses complexes, comme reconnaître un visage 
                      ou comprendre une phrase.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-secondary/10 transition-colors">
                    <h4 className="text-lg font-bold mb-2">5. Les grands modèles de langage (LLM)</h4>
                    <p>
                      Ce sont des IA spécialisées dans la compréhension et la génération de texte, comme ChatGPT.
                      Elles ont appris à partir d'énormes quantités de textes et peuvent ainsi écrire presque comme un humain !
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-secondary/10 transition-colors">
                    <h4 className="text-lg font-bold mb-2">6. Le biais des algorithmes</h4>
                    <p>
                      Les IA apprennent à partir de données créées par des humains, qui peuvent contenir des erreurs ou des préjugés.
                      L'IA peut donc reproduire ces préjugés si on n'y fait pas attention.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-secondary/10 transition-colors">
                    <h4 className="text-lg font-bold mb-2">7. L'IA générative</h4>
                    <p>
                      C'est une IA qui peut créer du contenu original : textes, images, musique, vidéos... 
                      Elle a appris le style et les règles à partir d'exemples, et peut ensuite créer de nouvelles choses.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-secondary/10 transition-colors">
                    <h4 className="text-lg font-bold mb-2">8. Le prompt</h4>
                    <p>
                      C'est la demande ou la question que tu poses à une IA. L'art de bien formuler tes prompts
                      est super important pour obtenir exactement ce que tu veux de l'IA !
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-secondary/10 transition-colors">
                    <h4 className="text-lg font-bold mb-2">9. L'hallucination de l'IA</h4>
                    <p>
                      Parfois, l'IA invente des informations qui semblent vraies mais qui ne le sont pas.
                      C'est comme si elle « hallucine » et voit des choses qui n'existent pas. C'est pourquoi il faut toujours
                      vérifier les informations qu'elle donne !
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-secondary/10 transition-colors">
                    <h4 className="text-lg font-bold mb-2">10. L'IA multimodale</h4>
                    <p>
                      C'est une IA qui peut comprendre et traiter différents types d'informations en même temps :
                      du texte, des images, du son... Elle peut voir une image et la décrire, ou créer une image à partir
                      d'une description textuelle.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="applications" className="mt-6 animate-fade-in">
              <div>
                <h3 className="text-2xl font-bold mb-4">À quoi sert l'IA et quelles sont ses limites ?</h3>
                
                <p>
                  L'intelligence artificielle peut faire plein de choses géniales, mais elle a aussi des limites.
                  Découvrons ensemble ce qu'elle peut faire et ce qu'elle ne peut pas (encore) faire !
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                  <div>
                    <h4 className="text-xl font-bold mb-4 text-primary">Ce que l'IA peut faire</h4>
                    <ul className="space-y-3 list-none pl-0">
                      <li className="flex items-start gap-2">
                        <Cpu className="text-green-500 mt-1 shrink-0" size={18} />
                        <span>Répondre à tes questions et t'aider pour tes devoirs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Cpu className="text-green-500 mt-1 shrink-0" size={18} />
                        <span>Créer des dessins, des textes et même de la musique</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Cpu className="text-green-500 mt-1 shrink-0" size={18} />
                        <span>Traduire des textes dans différentes langues</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Cpu className="text-green-500 mt-1 shrink-0" size={18} />
                        <span>Reconnaître des objets, des animaux ou des lieux dans des photos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Cpu className="text-green-500 mt-1 shrink-0" size={18} />
                        <span>Jouer à des jeux comme les échecs ou les jeux vidéo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Cpu className="text-green-500 mt-1 shrink-0" size={18} />
                        <span>Aider les médecins à diagnostiquer des maladies</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold mb-4 text-primary">Ce que l'IA ne peut pas (encore) faire</h4>
                    <ul className="space-y-3 list-none pl-0">
                      <li className="flex items-start gap-2">
                        <Cpu className="text-red-500 mt-1 shrink-0" size={18} />
                        <span>Comprendre le sens de ce qu'elle dit comme un humain le fait (elle repose sur des statistiques, et les spécialistes débattent de ce que « comprendre » veut dire)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Cpu className="text-red-500 mt-1 shrink-0" size={18} />
                        <span>Ressentir des émotions comme les humains</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Cpu className="text-red-500 mt-1 shrink-0" size={18} />
                        <span>Avoir une conscience d'elle-même</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Cpu className="text-red-500 mt-1 shrink-0" size={18} />
                        <span>Prendre des décisions éthiques complexes sans aide humaine</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Cpu className="text-red-500 mt-1 shrink-0" size={18} />
                        <span>Être créative comme un humain : elle recombine ce qu'elle a appris, et les spécialistes en débattent encore</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Cpu className="text-red-500 mt-1 shrink-0" size={18} />
                        <span>Avoir du sens commun ou de l'intuition comme nous</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-primary/10 p-6 rounded-lg my-8">
                  <h4 className="text-xl font-bold mb-3">L'IA du futur</h4>
                  <p>
                    Les scientifiques travaillent constamment à améliorer l'intelligence artificielle. Dans le futur,
                    les IA pourraient devenir encore plus puissantes et capables de faire des choses qu'on ne peut 
                    même pas imaginer aujourd'hui !
                  </p>
                  <p className="mb-0">
                    Certains rêvent même de créer une « intelligence artificielle générale » (AGI, en anglais) qui serait aussi
                    intelligente qu'un humain dans tous les domaines. Elle n'existe pas aujourd'hui, et les
                    spécialistes ne sont pas d'accord sur la possibilité de la créer, ni sur le temps que cela
                    prendrait.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reflexes" className="mt-6 animate-fade-in">
              <div>
                <h3 className="text-2xl font-bold mb-4">Utiliser une IA en sécurité : les bons réflexes</h3>
                <p>
                  Les IA sont pratiques, mais elles ne connaissent pas les règles de la vie privée et elles peuvent se
                  tromper. Voici six réflexes à adopter, seul ou avec un adulte.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                {reflexes.map((reflexe) => (
                  <div key={reflexe.title} className="border rounded-lg p-4">
                    <h4 className="text-lg font-bold mb-2 flex items-start gap-2">
                      <reflexe.icon className="text-primary mt-1 shrink-0" size={20} aria-hidden="true" />
                      {reflexe.title}
                    </h4>
                    <p className="text-sm">{reflexe.text}</p>
                  </div>
                ))}
              </div>

              <div className="bg-secondary/20 p-5 rounded-lg">
                <h4 className="text-lg font-bold mb-2">Pour les parents et les enseignants</h4>
                <p className="text-sm">
                  Essayez les outils ensemble, parlez de leurs limites, lisez les conditions d'utilisation et les
                  réglages de confidentialité avant de créer un compte. Ce site ne demande aucun compte et ne dépose
                  ni cookie ni traceur.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <RelatedLinks
            links={[
              {
                to: '/les-bases',
                title: "Les bases de l'IA",
                description: 'Les mêmes notions, en plus détaillé.',
              },
              {
                to: '/glossaire',
                title: 'Glossaire',
                description: "Les mots de l'IA expliqués simplement.",
              },
              {
                to: '/cours/utiliser-ia-quotidien',
                title: "Utiliser l'IA au quotidien",
                description: 'Un guide pratique pour les adultes, avec les bons usages et les précautions.',
              },
              {
                to: '/ethique',
                title: "L'éthique de l'IA",
                description: 'Biais, vie privée, responsabilité\u00A0: les questions que pose l’IA.',
              },
            ]}
          />
        </div>
      </section>
    </>
  );
};

export default IAExpliqueeAuxEnfants;
