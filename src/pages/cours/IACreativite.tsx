// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Link } from 'react-router';
import { Sparkles, PenTool, Image as ImageIcon, Workflow, Scale, Shield } from 'lucide-react';
import CourseGuideLayout, { CoursePlanItem } from '@/components/courses/CourseGuideLayout';
import LessonSection from '@/components/courses/LessonSection';
import CodeExample from '@/components/courses/CodeExample';
import ZoomOn from '@/components/courses/ZoomOn';
import DoDontCard from '@/components/courses/DoDontCard';
import CourseQuiz, { QuizQuestion } from '@/components/courses/CourseQuiz';
import CourseSources from '@/components/courses/CourseSources';

const creativitySources = [
  { label: 'Code de la propriété intellectuelle\u00A0: article L111-1', href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042814694' },
  { label: 'Code de la propriété intellectuelle\u00A0: article L112-1', href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006278873' },
  { label: 'Code pénal\u00A0: article 226-8 (montages et contenus générés)', href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049571542' },
  { label: 'US Copyright Office\u00A0: Copyright Registration Guidance (2023)', href: 'https://www.copyright.gov/ai/ai_policy_guidance.pdf' },
  { label: "Directive (UE) 2019/790\u00A0: droit d'auteur et fouille de textes et de données", href: 'https://eur-lex.europa.eu/eli/dir/2019/790/oj' },
  { label: 'Règlement (UE) 2024/1689\u00A0: obligations de transparence (article 50)', href: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj' },
];

const quizQuestions: QuizQuestion[] = [
  {
    question: "Quel usage de l'IA générative est le plus solide en création\u00A0?",
    options: [
      "Remplacer entièrement le regard et le goût du créateur",
      "Explorer des pistes, décliner des variantes et produire des premières versions que l'on choisit et retouche soi-même",
      "Publier directement ce que produit l'outil, sans relecture",
      "Copier le style reconnaissable d'un artiste vivant"
    ],
    correctAnswer: 1,
    explanation: "L'IA est utile pour explorer et produire vite des matériaux de départ. Le choix, la direction artistique et la responsabilité du résultat restent humains."
  },
  {
    question: "Que doit contenir un bon brief avant de rédiger un prompt créatif\u00A0?",
    options: [
      "Uniquement le nom de l'outil",
      "Le contexte et l'objectif, le public, le ton, les contraintes et le format attendu",
      "Une très longue liste d'adjectifs",
      "Le plus de mots possible"
    ],
    correctAnswer: 1,
    explanation: "Un prompt précis vient d'un brief clair\u00A0: à qui s'adresse la création, dans quel but, avec quel ton, quelles contraintes et quel format de sortie."
  },
  {
    question: "Pourquoi ajoute-t-on souvent le texte d'une affiche dans un logiciel de mise en page plutôt que dans le générateur d'images\u00A0?",
    options: [
      "Parce que les générateurs d'images refusent le texte",
      "Parce que le texte produit dans une image n'est pas toujours fiable selon les outils (fautes, lettres déformées) et que la mise en page donne un contrôle exact",
      "Parce que c'est obligatoire légalement",
      "Parce que cela consomme moins d'énergie"
    ],
    correctAnswer: 1,
    explanation: "Les générateurs d'images progressent, mais les textes intégrés peuvent encore contenir des erreurs. Composer le texte à part permet d'obtenir une typographie exacte et modifiable."
  },
  {
    question: "Est-il acceptable de publier un montage utilisant la voix ou le visage d'une personne sans son accord\u00A0?",
    options: [
      "Oui, si le résultat est réaliste",
      "Non\u00A0: il faut son consentement et une mention claire qu'il s'agit d'un montage, faute de quoi la loi peut s'appliquer",
      "Oui, si l'outil est gratuit",
      "Oui, pour les personnalités publiques uniquement"
    ],
    correctAnswer: 1,
    explanation: "Le droit à l'image et à la voix s'applique, y compris aux contenus générés. En France, publier un montage réalisé avec l'image ou la voix d'une personne sans son consentement, sans mention claire, peut être sanctionné."
  },
  {
    question: "Un simple prompt suffit-il en général à faire de vous l'auteur protégé de l'image produite\u00A0?",
    options: [
      "Oui, toujours, dans tous les pays",
      "Non, en général\u00A0: la protection suppose un apport créatif humain (choix, composition, retouches), et les règles varient selon les pays",
      "Oui, si le prompt est long",
      "Non, parce que les images générées par IA sont interdites"
    ],
    correctAnswer: 1,
    explanation: "Aux États-Unis, l'Office du droit d'auteur considère qu'un prompt seul ne suffit pas à établir la paternité de la sortie\u00A0; en France, l'originalité suppose l'empreinte de la personnalité d'un auteur humain. Le sujet évolue\u00A0: vérifiez avant un usage commercial."
  },
  {
    question: "Pourquoi conserver ses prompts, ses versions et ses retouches\u00A0?",
    options: [
      "Pour alourdir le projet",
      "Pour pouvoir reproduire un résultat, expliquer sa démarche et attester de l'apport humain",
      "Parce que l'outil l'exige toujours",
      "Pour revendre ses prompts"
    ],
    correctAnswer: 1,
    explanation: "Ce journal de création permet de retrouver ce qui a fonctionné, de justifier la démarche auprès d'un client ou d'une plateforme, et de montrer la part de travail humain."
  }
];

const plan: CoursePlanItem[] = [
  {
    icon: <Sparkles className="h-5 w-5 text-primary" />,
    title: 'Ce que l\'IA fait, et ne fait pas, en création',
    description: "Un outil d'exploration et de variation\u00A0: ses forces, ses limites et le bon état d'esprit.",
  },
  {
    icon: <PenTool className="h-5 w-5 text-primary" />,
    title: 'Du brief au prompt\u00A0: le texte',
    description: "Transformer une intention en consigne précise, puis itérer pour affiner le résultat.",
  },
  {
    icon: <ImageIcon className="h-5 w-5 text-primary" />,
    title: "Décrire une image",
    description: "Sujet, cadre, lumière, style, contraintes\u00A0: structurer un prompt d'image, sans tomber dans les clichés.",
  },
  {
    icon: <Workflow className="h-5 w-5 text-primary" />,
    title: 'Un workflow simple et des critères',
    description: "Explorer, choisir, développer, retoucher, finaliser, et évaluer un résultat avec des critères clairs.",
  },
  {
    icon: <Scale className="h-5 w-5 text-primary" />,
    title: 'Droits, consentement et transparence',
    description: "Droit d'auteur, données d'entraînement, image et voix des personnes, mention de l'usage de l'IA.",
  },
];

/**
 * Cours sur la création assistée par IA. Aucun chiffre de productivité ni de marché n'est annoncé :
 * les gains dépendent du projet, de l'outil et de la personne. Les questions de droit sont présentées
 * comme des repères (les règles évoluent vite) et non comme un avis juridique.
 */
const IACreativite = () => (
  <CourseGuideLayout
    title="IA et créativité : co-créer avec l'intelligence artificielle"
    subtitle="Un guide pratique pour explorer des idées, produire des variantes et garder la main sur le résultat, en respectant les droits des créateurs"
    about={[
      "L'IA générative produit du texte, des images, du son ou de la vidéo à partir d'une description. Bien utilisée, elle sert à explorer des pistes, à décliner des variantes et à produire des premières versions. Elle ne remplace ni le regard, ni le goût, ni la responsabilité de celui qui crée.",
      "Ce cours couvre la démarche (du brief au résultat), l'écriture de prompts pour le texte et l'image, un workflow simple, puis les questions de droits et de transparence. Les outils évoluent très vite\u00A0: retenez les principes plutôt que les noms. Aucun gain de productivité n'est chiffré ici\u00A0: il dépend du projet et de la personne.",
    ]}
    learn={[
      "Formuler un brief créatif et le traduire en prompt pour le texte et pour l'image",
      "Itérer\u00A0: explorer, sélectionner, affiner, en gardant la direction artistique",
      "Enchaîner plusieurs outils (texte, image) dans un workflow simple",
      "Comprendre les enjeux de droit d'auteur, de consentement et de transparence",
      "Évaluer un résultat avec des critères clairs et des relecteurs humains",
    ]}
    plan={plan}
    info={{
      level: 'Débutant à intermédiaire',
      duration: "Environ 3 heures de lecture et d'essais",
      prerequisites:
        "Aucun. Avoir accès à un assistant conversationnel et, pour la partie image, à un générateur d'images de votre choix (gratuit ou non).",
      contents: ['5 leçons', 'Exemples de prompts à adapter', 'Quiz de 6 questions'],
    }}
    related={[
      {
        to: '/cours/prompt-engineering',
        title: 'Prompt engineering',
        description: "Les techniques générales pour formuler des demandes précises et les tester.",
      },
      {
        to: '/ia-multimodale',
        title: 'IA et création multimodale',
        description: "Texte, image, son et vidéo\u00A0: panorama et exemples de prompts.",
      },
      {
        to: '/ethique',
        title: "Éthique de l'IA",
        description: "Biais, transparence, responsabilité\u00A0: le cadre général.",
      },
      {
        to: '/cours/ia-environnement',
        title: 'IA et environnement',
        description: "Le coût énergétique de la génération, et comment le limiter.",
      },
    ]}
  >
    <LessonSection title="Ce que l'IA fait, et ne fait pas, en création" icon={<Sparkles size={24} />} delay={1}>
      <p>
        Un modèle génératif a appris des régularités dans une énorme quantité de textes, d'images ou de sons, et
        produit de nouveaux contenus qui leur ressemblent. C'est un partenaire utile pour explorer des pistes : il ne se fatigue
        pas, propose sans juger et décline une idée en dix versions en quelques secondes. Mais il n'a ni intention, ni
        goût, ni connaissance de votre public : c'est vous qui jugez.
      </p>

      <ZoomOn title="Forces et limites à connaître">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium mb-2 text-green-700 dark:text-green-400">Ce qu'elle fait bien</h5>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Proposer des angles et des variantes auxquels on n'avait pas pensé</li>
              <li>Reformuler, adapter un ton, traduire, résumer</li>
              <li>Produire rapidement des esquisses et des premières versions</li>
              <li>Aider à débloquer une page blanche</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2 text-red-700 dark:text-red-400">Ce qu'elle fait mal</h5>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Respecter à la lettre plusieurs contraintes à la fois</li>
              <li>Garder la cohérence d'un personnage ou d'un style sur la durée</li>
              <li>Donner des faits exacts : elle peut inventer avec aplomb (hallucinations)</li>
              <li>Éviter les clichés et les stéréotypes, qu'elle reflète depuis ses données d'entraînement</li>
              <li>Produire des détails fiables (mains, texte dans l'image) selon les outils</li>
            </ul>
          </div>
        </div>
      </ZoomOn>

      <DoDontCard
        title="Bon usage de l'IA en création"
        icon={<Shield className="h-5 w-5 text-primary" />}
        doTitle="À faire"
        dontTitle="À éviter"
        dos={[
          "Explorer avec l'IA, puis choisir et retoucher vous-même",
          "Garder une trace de vos prompts, de vos versions et de vos retouches",
          "Relire, vérifier les faits et corriger avant de publier",
          "Lire les conditions d'utilisation de l'outil, en particulier pour un usage commercial",
        ]}
        donts={[
          "Publier tel quel, sans relecture ni contrôle des faits",
          "Imiter le style reconnaissable d'un artiste vivant sans son accord",
          "Utiliser le visage ou la voix d'une personne sans son consentement",
          "Présenter comme fait main un travail entièrement généré quand une règle ou un client l'exige",
        ]}
      />
    </LessonSection>

    <LessonSection title="Du brief au prompt : le texte" icon={<PenTool size={24} />} delay={2}>
      <p>
        Un bon prompt découle d'un bon brief. Avant d'écrire, précisez le contexte, l'objectif, le public, le ton, les
        contraintes et le format attendu. Plus ces éléments sont explicites, moins le modèle doit deviner, et moins il
        invente.
      </p>

      <CodeExample
        title="Un brief transformé en prompt"
        language="Prompt"
        code={`Contexte : association de quartier, fête annuelle le 14 juin, public familial.
Tâche : propose trois accroches pour l'affiche, de 8 mots maximum chacune.
Ton : chaleureux, sans jargon, avec une pointe d'humour.
Contraintes : pas de promesse de météo, pas de mention de prix, français simple.
Format : une liste numérotée ; pour chaque accroche, une phrase qui explique l'angle choisi.
N'invente aucune information sur l'événement : s'il manque une précision, pose-moi la question.`}
        explanation="Le dernier point limite les inventions : sans lui, le modèle peut ajouter un lieu, un horaire ou un programme qui n'existent pas."
      />

      <CodeExample
        title="Itérer : affiner au lieu de recommencer"
        language="Prompt"
        code={`Reprends l'accroche n° 2.
Propose 5 variantes plus courtes, chacune avec un angle différent :
humour, émotion, esprit de quartier, curiosité, invitation directe.
Garde le même ton chaleureux. Indique pour chacune ce qu'elle gagne et ce qu'elle perd par rapport à l'originale.`}
        explanation="Travailler par itérations courtes (un seul paramètre qui change à la fois) donne plus de contrôle qu'une longue consigne unique. Gardez les versions qui vous plaisent pour les réutiliser."
      />

      <ZoomOn title="Demander une critique, pas seulement une production">
        <p>
          L'IA est aussi un relecteur utile : demandez-lui de repérer les passages confus, les répétitions ou les points
          faibles d'un texte, en précisant le public visé. Gardez un regard critique sur ses suggestions : un conseil
          plausible n'est pas forcément juste, et vous restez seul juge de ce qui convient à votre projet.
        </p>
      </ZoomOn>
    </LessonSection>

    <LessonSection title="Décrire une image" icon={<ImageIcon size={24} />} delay={3}>
      <p>
        Un prompt d'image décrit ce que l'on veut voir. Une structure simple aide : le sujet et son action, le cadre et
        la composition, la lumière, le style ou le médium, les couleurs et l'ambiance, puis les contraintes (format,
        éléments à éviter). La syntaxe exacte (paramètres, prompts négatifs) varie d'un outil à l'autre : consultez la
        documentation de celui que vous utilisez.
      </p>

      <CodeExample
        title="Un prompt d'image structuré"
        language="Prompt"
        code={`Sujet : une grande tablée en plein air, vue de dessus, des voisins et des familles qui partagent un repas.
Décor : guirlandes lumineuses, nappes à carreaux, plats colorés.
Style : illustration à l'aquarelle, traits souples.
Couleurs et lumière : palette chaude (orange, jaune, rose), lumière de fin de journée.
Composition : scène aérée, avec de la place libre en haut pour ajouter un titre.
Contraintes : sans texte dans l'image, sans logo, format vertical 3:4.`}
        explanation="La place laissée pour le titre permet d'ajouter le texte dans un logiciel de mise en page : le texte généré dans une image n'est pas toujours fiable selon les outils. Générez plusieurs versions et comparez-les avant de choisir."
      />

      <ZoomOn title="Références de style : repères éthiques">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Citer un mouvement, une époque ou une technique (Art nouveau, affiche des années 1950, gravure sur bois) est
            généralement sans difficulté.
          </li>
          <li>
            Imiter le style reconnaissable d'un artiste vivant pose des questions éthiques, et parfois juridiques :
            plusieurs artistes contestent que leurs œuvres aient servi à entraîner des modèles et que l'on puisse
            reproduire leur manière sur demande. Privilégiez des références collectives ou historiques.
          </li>
          <li>
            Méfiez-vous des stéréotypes : à description vague, les modèles reproduisent souvent les représentations les
            plus courantes (métiers, genres, origines). Précisez ce que vous voulez et relisez le résultat avec ce regard.
          </li>
        </ul>
      </ZoomOn>
    </LessonSection>

    <LessonSection title="Un workflow simple et des critères" icon={<Workflow size={24} />} delay={4}>
      <p>
        Une création assistée par IA suit en général cinq temps, que l'on parcourt plusieurs fois : explorer (beaucoup de
        pistes, sans juger), sélectionner (vous choisissez selon le brief), développer (vous précisez la piste retenue),
        retoucher (correction à la main ou dans un logiciel adapté) et finaliser (contrôle, mentions, export).
      </p>

      <ZoomOn title="Exemple : l'affiche d'une fête de quartier">
        <ol className="list-decimal pl-6 space-y-1">
          <li>Explorer : quinze accroches et dix compositions d'image générées en quelques minutes.</li>
          <li>Sélectionner : deux accroches et trois images retenues, selon le public visé.</li>
          <li>Développer : variantes de l'image retenue, reformulation de l'accroche choisie.</li>
          <li>Retoucher : corrections à la main, titre et informations pratiques ajoutés en mise en page.</li>
          <li>Finaliser : relecture des informations, vérification des droits, mention de l'usage de l'IA si nécessaire.</li>
        </ol>
      </ZoomOn>

      <ZoomOn title="Évaluer un résultat : des critères avant de générer">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Adéquation au brief :</strong> répond-il à l'objectif et au public visé ?
          </li>
          <li>
            <strong>Qualité et cohérence :</strong> défauts visuels, fautes, incohérences de style ou de ton.
          </li>
          <li>
            <strong>Originalité perçue :</strong> à faire juger par des relecteurs humains, pas par l'outil.
          </li>
          <li>
            <strong>Accessibilité :</strong> contrastes suffisants, texte alternatif pour les images.
          </li>
          <li>
            <strong>Stéréotypes et exactitude :</strong> représentations caricaturales, informations inventées.
          </li>
          <li>
            <strong>Coût réel :</strong> temps de relecture, abonnements et droits, à comparer avec votre méthode
            habituelle sur un même projet avant de conclure à un gain.
          </li>
        </ul>
      </ZoomOn>

      <p className="text-sm text-muted-foreground">
        Générer des images et des vidéos consomme de l'énergie : limitez le nombre d'essais inutiles et commencez en basse
        résolution. Le cours{' '}
        <Link to="/cours/ia-environnement" className="text-primary hover:underline">
          IA et environnement
        </Link>{' '}
        donne des repères.
      </p>
    </LessonSection>

    <LessonSection title="Droits, consentement et transparence" icon={<Scale size={24} />} delay={5}>
      <p>
        Les règles sur les contenus générés évoluent vite et varient selon les pays. Ce qui suit donne des repères, pas un
        avis juridique : pour un usage commercial ou sensible, renseignez-vous auprès d'un professionnel.
      </p>

      <ZoomOn title="Droit d'auteur : la sortie et l'entraînement">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Les contenus générés :</strong> en droit français, la protection suppose une œuvre originale,
            appréciée au cas par cas par le juge. Un contenu produit sans apport créatif humain significatif est
            difficile à protéger. Aux États-Unis, l'Office du droit d'auteur considère
            qu'un prompt seul ne suffit pas à établir la paternité de la sortie, tandis que le choix, l'agencement et les
            retouches humaines peuvent être protégés.
          </li>
          <li>
            <strong>L'entraînement des modèles :</strong> plusieurs procès opposent des artistes, des éditeurs et des
            médias à des entreprises d'IA au sujet de l'usage d'œuvres protégées pour entraîner des modèles. Le
            droit européen prévoit une exception de fouille de textes et de données, avec la possibilité pour les
            titulaires de s'y opposer, et le règlement sur l'IA impose des obligations de transparence aux fournisseurs
            de modèles généralistes. La situation reste mouvante.
          </li>
          <li>
            <strong>Les conditions d'utilisation des outils :</strong> les droits d'usage commercial des sorties
            dépendent de l'offre (gratuite ou payante) et changent. Lisez-les avant de publier.
          </li>
        </ul>
      </ZoomOn>

      <ZoomOn title="Visages, voix et hypertrucages (deepfakes)">
        <p>
          Utiliser le visage ou la voix d'une personne suppose son consentement. En France, publier un montage réalisé
          avec l'image ou la voix d'une personne sans son accord, sans mention claire qu'il s'agit d'un montage, peut
          être sanctionné. Méfiez-vous aussi de l'effet inverse : des contenus très réalistes peuvent être produits par
          n'importe qui, ce qui invite à vérifier la provenance d'une image ou d'un enregistrement avant de le partager.
        </p>
      </ZoomOn>

      <ZoomOn title="Transparence : dire quand l'IA est intervenue">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Le règlement européen sur l'IA prévoit des obligations de transparence pour certains contenus générés
            (marquage des contenus synthétiques, information lorsque l'on échange avec une IA). Son application est
            progressive : vérifiez le calendrier en vigueur.
          </li>
          <li>
            Beaucoup de plateformes, d'éditeurs, de concours et d'employeurs demandent déjà de déclarer l'usage de l'IA.
          </li>
          <li>
            Indiquer l'usage de l'IA quand c'est attendu protège votre crédibilité, et conserver vos prompts et versions
            permet de montrer la part de votre travail.
          </li>
        </ul>
      </ZoomOn>
    </LessonSection>

    <CourseSources sources={creativitySources} />

    <CourseQuiz title="Quiz : IA et créativité" questions={quizQuestions} />
  </CourseGuideLayout>
);

export default IACreativite;
