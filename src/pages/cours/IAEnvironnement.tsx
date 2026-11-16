// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Link } from 'react-router';
import { Gauge, Smartphone, Cpu, Recycle, Server, ExternalLink, Leaf } from 'lucide-react';
import CourseGuideLayout, { CoursePlanItem } from '@/components/courses/CourseGuideLayout';
import LessonSection from '@/components/courses/LessonSection';
import CodeExample from '@/components/courses/CodeExample';
import ZoomOn from '@/components/courses/ZoomOn';
import DoDontCard from '@/components/courses/DoDontCard';
import CourseQuiz, { QuizQuestion } from '@/components/courses/CourseQuiz';

const quizQuestions: QuizQuestion[] = [
  {
    question: "Sur l'ensemble de sa vie, quelle étape pèse le plus dans l'empreinte carbone d'un smartphone\u00A0?",
    options: [
      "L'usage quotidien (recharges)",
      "La fabrication, largement devant l'usage",
      "Le transport jusqu'au magasin",
      "Le recyclage en fin de vie"
    ],
    correctAnswer: 1,
    explanation: "Les analyses de cycle de vie convergent\u00A0: la fabrication (extraction des métaux, composants, assemblage) représente la très grande majorité de l'empreinte carbone d'un smartphone (la part exacte dépend de la méthode, du modèle et de la durée d'usage retenue). C'est pourquoi allonger sa durée de vie est le levier le plus efficace."
  },
  {
    question: "Le même entraînement est lancé dans deux régions\u00A0: l'une avec une électricité à environ 40 g de CO2e par kWh, l'autre à environ 460 g par kWh (valeurs d'illustration). Que change ce choix\u00A0?",
    options: [
      "Rien\u00A0: l'énergie consommée est la même, donc les émissions aussi",
      "Les émissions liées à l'électricité sont plus de dix fois plus élevées dans la seconde région",
      "Les émissions sont deux fois plus élevées",
      "Seule la fabrication des machines compte"
    ],
    correctAnswer: 1,
    explanation: "Les émissions sont égales à l'énergie consommée multipliée par l'intensité carbone de l'électricité. À énergie égale, passer de 40 à 460 g/kWh multiplie donc le résultat par plus de dix (hors fabrication des machines)."
  },
  {
    question: "Que sait-on de l'énergie consommée par une requête à un assistant conversationnel\u00A0?",
    options: [
      "Une valeur unique et précise, publiée par tous les fournisseurs",
      "Les estimations ont varié d'un facteur dix selon les années et les hypothèses, et dépendent beaucoup de la longueur de la requête et du type de modèle",
      "Elle est nulle, car tout se passe dans le cloud",
      "Elle est toujours supérieure à celle d'un ordinateur portable allumé toute une journée"
    ],
    correctAnswer: 1,
    explanation: "Une estimation de 2023 (A. de Vries, revue Joule) avançait environ 3 Wh par requête\u00A0; une analyse d'Epoch AI de 2025 aboutit à environ 0,3 Wh pour une requête courte avec un modèle récent. Les longs contextes, les modèles de raisonnement, les images et les vidéos consomment sensiblement plus."
  },
  {
    question: "Qu'appelle-t-on «\u00A0effet rebond\u00A0»\u00A0?",
    options: [
      "Un gain d'efficacité qui est annulé, en partie ou en totalité, par l'augmentation des usages",
      "Le rebond d'un signal dans un réseau",
      "La baisse du prix des puces",
      "Le recyclage d'un appareil"
    ],
    correctAnswer: 0,
    explanation: "Quand un service devient moins coûteux ou plus efficace, on l'utilise davantage\u00A0: le gain par usage peut être absorbé par la hausse du nombre d'usages. C'est pourquoi la sobriété d'usage compte autant que l'efficacité technique."
  },
  {
    question: "Parmi ces actions, laquelle réduit le plus l'empreinte d'un particulier\u00A0?",
    options: [
      "Vider régulièrement sa boîte de réception",
      "Garder ses appareils plus longtemps, les réparer ou acheter reconditionné",
      "Éteindre sa box pendant la nuit uniquement",
      "Utiliser un fond d'écran sombre"
    ],
    correctAnswer: 1,
    explanation: "La fabrication des équipements pèse lourd dans l'empreinte du numérique\u00A0: allonger leur durée de vie, réparer et acheter reconditionné agit sur le poste le plus lourd. Les autres gestes ont un effet réel mais faible en comparaison."
  },
  {
    question: "Quelle est la première question à se poser avant de lancer un projet d'IA sobre\u00A0?",
    options: [
      "Quel est le plus gros modèle disponible\u00A0?",
      "A-t-on vraiment besoin d'un modèle d'IA, et quel est le plus petit modèle qui répond au besoin\u00A0?",
      "Comment faire tourner le calcul le plus vite possible\u00A0?",
      "Comment cacher la consommation d'énergie\u00A0?"
    ],
    correctAnswer: 1,
    explanation: "Une règle simple, une recherche classique ou un petit modèle spécialisé suffisent souvent. Choisir le plus petit outil qui convient, réutiliser un modèle existant et mesurer sont les premiers leviers d'un projet sobre."
  }
];

const plan: CoursePlanItem[] = [
  {
    icon: <Gauge className="h-5 w-5 text-primary" />,
    title: 'Comprendre ce que l\'on mesure',
    description: "Émissions, électricité, eau et matières premières\u00A0: quatre grandeurs différentes, et un cycle de vie à regarder en entier.",
  },
  {
    icon: <Smartphone className="h-5 w-5 text-primary" />,
    title: 'Le numérique en ordres de grandeur',
    description: "Monde et France, équipements, centres de données, réseaux, déchets électroniques, avec des sources et des années.",
  },
  {
    icon: <Cpu className="h-5 w-5 text-primary" />,
    title: "L'IA\u00A0: entraînement et usage",
    description: "Ce que coûte l'entraînement d'un modèle, ce que coûte une requête, et pourquoi les chiffres divergent.",
  },
  {
    icon: <Recycle className="h-5 w-5 text-primary" />,
    title: 'Agir en tant qu\'utilisateur',
    description: "Les leviers qui comptent (durée de vie des appareils) et les gestes à faible effet.",
  },
  {
    icon: <Server className="h-5 w-5 text-primary" />,
    title: 'Agir sur un projet ou une organisation',
    description: "Écoconception, choix du modèle, quantification, mesure avec un outil, hébergement et cadre réglementaire.",
  },
];

const sources = [
  {
    label: 'The Shift Project\u00A0: études sur l\'impact environnemental du numérique (2019, 2021)',
    href: 'https://theshiftproject.org/',
  },
  { label: 'ADEME et Arcep\u00A0: évaluation de l\'impact environnemental du numérique en France (2022, actualisation de 2024)', href: 'https://ecoresponsable.numerique.gouv.fr/actualites/actualisation-ademe-impact/' },
  { label: 'Agence internationale de l\'énergie\u00A0: «\u00A0Energy and AI\u00A0» (2025)', href: 'https://www.iea.org/reports/energy-and-ai' },
  {
    label: 'ADEME (2026)\u00A0: avis «\u00A0L\'intelligence artificielle générative, des impacts environnementaux importants\u00A0»',
    href: 'https://librairie.ademe.fr/economie-circulaire-et-dechets/9495-11314-avis-de-l-ademe-l-intelligence-artificielle-generative-des-impacts-environnementaux-importants.html',
  },
  { label: 'Google (2025)\u00A0: Measuring the Environmental Impact of Delivering AI at Google Scale', href: 'https://arxiv.org/abs/2508.15734' },
  { label: 'Mistral AI (22 juillet 2025)\u00A0: analyse de cycle de vie de Mistral Large 2', href: 'https://mistral.ai/fr/news/our-contribution-to-a-global-environmental-standard-for-ai/' },
  { label: 'Global E-waste Monitor 2024 (ONU, UIT et UNITAR)', href: 'https://ewastemonitor.info/' },
  { label: 'Patterson et al. (2021)\u00A0: Carbon Emissions and Large Neural Network Training', href: 'https://arxiv.org/abs/2104.10350' },
  { label: 'Luccioni et al. (2022)\u00A0: Estimating the Carbon Footprint of BLOOM', href: 'https://arxiv.org/abs/2211.02001' },
  { label: 'de Vries (2023)\u00A0: The growing energy footprint of artificial intelligence (Joule)', href: 'https://research.vu.nl/en/publications/the-growing-energy-footprint-of-artificial-intelligence/' },
  { label: 'EIA (2022)\u00A0: Electricity use in homes', href: 'https://www.eia.gov/tools/faqs/faq.php?id=97&t=3' },
  { label: 'Sandvine (2024)\u00A0: Global Internet Phenomena Report', href: 'https://www.applogicnetworks.com/global-internet-phenomena-report-2024' },
  { label: 'Carbon Trust (2021)\u00A0: Carbon impact of video streaming', href: 'https://www.carbontrust.com/our-work-and-impact/guides-reports-and-tools/carbon-impact-of-video-streaming' },
  { label: 'USGS (2025)\u00A0: Mineral Commodity Summaries 2025, cobalt (données 2024)', href: 'https://pubs.usgs.gov/periodicals/mcs2025/mcs2025-cobalt.pdf' },
  { label: 'Uptime Institute (2024)\u00A0: Global Data Center Survey Results 2024', href: 'https://uptimeinstitute.com/resources/research-and-reports/uptime-institute-global-data-center-survey-results-2024' },
  { label: 'RTE\u00A0: bilan électrique 2025, émissions de gaz à effet de serre', href: 'https://analysesetdonnees.rte-france.com/bilan-electrique-2025/emissions' },
  { label: 'Ember\u00A0: Global Electricity Review 2026 (intensité carbone mondiale, 2025)', href: 'https://ember-energy.org/latest-insights/global-electricity-review-2026/electricity-demand-and-supply-trends/' },
  { label: 'Epoch AI (2025)\u00A0: How much energy does ChatGPT use?', href: 'https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use' },
  { label: 'Google (2025)\u00A0: rapport environnemental 2025 (données 2024)', href: 'https://sustainability.google/reports/google-2025-environmental-report/' },
  { label: 'Microsoft\u00A0: rapports de durabilité (eau et émissions)', href: 'https://www.microsoft.com/en-us/corporate-responsibility/sustainability' },
  {
    label: 'Référentiel général d\'écoconception de services numériques (RGESN)',
    href: 'https://ecoresponsable.numerique.gouv.fr/publications/referentiel-general-ecoconception/',
  },
  { label: 'GreenIT.fr\u00A0: ressources et guides d\'écoconception', href: 'https://greenit.fr/' },
];

/**
 * Cours sur l'empreinte environnementale du numérique et de l'IA. Règle éditoriale : des ordres de
 * grandeur, toujours attribués à une source et à une année, et signalés comme discutables quand les
 * études divergent. Aucune statistique sans source. À relire chaque année : ces chiffres vieillissent.
 */
const IAEnvironnement = () => (
  <CourseGuideLayout
    title="IA et environnement : comprendre l'empreinte du numérique et agir"
    subtitle="Des ordres de grandeur sourcés, les leviers qui comptent et les fausses bonnes idées, du poste de travail à l'entraînement d'un modèle"
    about={[
      "Le numérique pèse sur l'environnement par ses équipements (fabrication et fin de vie), par l'électricité qu'il consomme et par les ressources qu'il mobilise (métaux, eau). L'IA alourdit certains postes, en particulier les centres de données, mais en France, les terminaux représentent environ la moitié de l'empreinte carbone du numérique (ADEME, actualisation 2024 de l'étude ADEME-Arcep), devant les centres de données.",
      "Ce cours donne des ordres de grandeur, toujours attribués à une source et à une année\u00A0: les chiffres varient fortement selon les méthodes, les périmètres et les dates, et vieillissent vite. Quand les études divergent, le cours le signale. Les leviers d'action sont classés par efficacité.",
    ]}
    learn={[
      "Distinguer les émissions de gaz à effet de serre, l'électricité, l'eau et les matières premières",
      "Connaître les principaux ordres de grandeur du numérique et de l'IA, et leurs limites",
      "Situer l'empreinte\u00A0: équipements, centres de données, réseaux",
      "Reconnaître les leviers qui comptent et les gestes à faible effet",
      "Appliquer l'écoconception et la sobriété à un projet d'IA, et mesurer plutôt qu'estimer au hasard",
    ]}
    plan={plan}
    info={{
      level: 'Débutant à intermédiaire',
      duration: "Environ 3 heures de lecture et d'exercices",
      prerequisites:
        "Aucun. Pour les deux petits calculs en Python de la dernière leçon, des notions de base du langage suffisent.",
      contents: ['5 leçons', 'Ordres de grandeur sourcés', 'Deux exemples de calcul en Python', 'Quiz de 6 questions'],
    }}
    related={[
      {
        to: '/ethique',
        title: "Éthique de l'IA",
        description: "Transparence, équité, responsabilité\u00A0: l'impact environnemental fait partie du tableau.",
      },
      {
        to: '/cours/deep-learning-pratique',
        title: 'Deep learning en pratique',
        description: "Entraîner un réseau de neurones, et réflexes de sobriété pour le faire.",
      },
      {
        to: '/calculateur-couts-ia',
        title: "Calculateur de coûts d'API IA",
        description: "Calculer le coût d'un usage à partir de ses tokens\u00A0: un repère sur le volume d'usage, pas sur l'empreinte (qui demande d'autres données).",
      },
      {
        to: '/cours/ia-creativite',
        title: 'IA et créativité',
        description: "La génération d'images et de vidéos coûte plus cher en énergie que le texte.",
      },
    ]}
  >
    <LessonSection title="Comprendre ce que l'on mesure" icon={<Gauge size={24} />} delay={1}>
      <p>
        « L'empreinte environnementale » mélange des grandeurs très différentes. Avant de comparer deux chiffres, il faut
        vérifier qu'ils mesurent la même chose, sur le même périmètre et la même année.
      </p>

      <ZoomOn title="Quatre grandeurs à ne pas confondre">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Les émissions de gaz à effet de serre</strong> (en grammes ou tonnes d'équivalent CO2, noté CO2e). Pour
            l'usage, elles dépendent de l'électricité consommée et surtout de la façon dont elle est produite : à titre
            d'ordre de grandeur, Ember estime pour 2025 environ 40 g de CO2e par kWh produit en France, contre environ
            460 g en moyenne mondiale (en cycle de vie, c'est-à-dire en comptant aussi la construction des centrales). En
            ne comptant que les émissions directes de la production, RTE donne environ 20 g par kWh pour la France en
            2025. Ces valeurs varient selon les années et les méthodes : on ne compare que des chiffres calculés de la
            même façon.
          </li>
          <li>
            <strong>La consommation d'électricité</strong> (en kilowattheures). Elle ne dit rien des émissions tant que l'on
            ne connaît pas l'origine de l'électricité.
          </li>
          <li>
            <strong>La consommation d'eau</strong> (en litres) : refroidissement des centres de données, production
            d'électricité, fabrication des composants. L'impact dépend de la région (tension sur la ressource).
          </li>
          <li>
            <strong>Les matières premières et les déchets</strong> : métaux (cuivre, cobalt, lithium, terres rares...),
            et déchets électroniques en fin de vie.
          </li>
        </ul>
      </ZoomOn>

      <ZoomOn title="Regarder tout le cycle de vie">
        <p>
          Une analyse de cycle de vie (ACV) additionne quatre étapes : fabrication (extraction, composants, assemblage),
          transport, usage, fin de vie. Pour les équipements, la fabrication domine souvent : c'est le cas d'un smartphone,
          dont la fabrication représente la très grande majorité de l'empreinte carbone sur l'ensemble de sa vie
          (la part exacte dépend de la méthode, du modèle et de la durée d'usage retenue). Pour un service très utilisé, comme un assistant conversationnel, c'est au contraire l'usage
          cumulé qui peut devenir le poste principal.
        </p>
      </ZoomOn>

      <ZoomOn title="L'effet rebond">
        <p>
          Quand un service devient plus efficace ou moins cher, on l'utilise davantage : le gain obtenu par usage peut être
          absorbé, en partie ou en totalité, par la hausse du nombre d'usages (on parle aussi de paradoxe de Jevons). Des
          modèles plus économes en énergie ne réduisent donc pas mécaniquement l'empreinte totale : la sobriété d'usage
          compte autant que l'efficacité technique.
        </p>
      </ZoomOn>
    </LessonSection>

    <LessonSection title="Le numérique en ordres de grandeur" icon={<Smartphone size={24} />} delay={2}>
      <p>
        Les chiffres ci-dessous donnent des repères. Ils ne sont pas directement comparables entre eux : périmètres,
        années et méthodes diffèrent, et ils sont régulièrement révisés. Les sources sont listées à la fin du cours.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        {[
          {
            title: 'Monde\u00A0: émissions',
            text: "Les études divergent selon le périmètre. The Shift Project estime la part du numérique à environ 3,5\u00A0% des émissions mondiales de gaz à effet de serre en 2019 (étude de 2021), en croissance de plusieurs pour cent par an\u00A0; des travaux avec des périmètres plus restreints trouvent des valeurs plus basses.",
          },
          {
            title: 'France\u00A0: empreinte carbone',
            text: "Selon l'actualisation ADEME et Arcep de novembre 2024 (données 2022), le numérique représente environ 4,4\u00A0% de l'empreinte carbone de la France, soit 29,5 millions de tonnes de CO2e. La première étude (2022, données 2020) donnait 2,5\u00A0%, mais ne comptait que les centres de données situés en France. Les terminaux (ordinateurs, smartphones, téléviseurs) représentent environ la moitié de cette empreinte, les centres de données environ 46\u00A0%.",
          },
          {
            title: 'Monde\u00A0: centres de données',
            text: "Selon l'Agence internationale de l'énergie (2025), les centres de données ont consommé environ 415 TWh en 2024, soit environ 1,5\u00A0% de l'électricité mondiale. Son scénario de référence les situe autour de 945 TWh en 2030, l'IA étant l'un des moteurs de cette hausse.",
          },
          {
            title: 'Monde\u00A0: déchets électroniques',
            text: "Selon le Global E-waste Monitor 2024, 62 millions de tonnes de déchets électroniques ont été générées en 2022 (soit 82\u00A0% de plus qu'en 2010), et seulement 22,3\u00A0% ont été documentées comme collectées et recyclées dans les règles. Le volume pourrait atteindre 82 millions de tonnes en 2030.",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-lg border p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Leaf className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              {item.title}
            </h4>
            <p className="text-sm text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>

      <ZoomOn title="Les matières premières : un exemple, le cobalt">
        <p>
          La fabrication des batteries et des composants repose sur des métaux dont l'extraction est concentrée
          géographiquement. La République démocratique du Congo fournit environ 75 % de la production minière mondiale de
          cobalt en 2024 (USGS). Les conditions de travail dans une partie de la filière
          artisanale, dont le travail des enfants, ont été documentées et dénoncées par plusieurs organisations. Allonger la
          durée de vie des appareils et recycler les métaux réduit cette pression.
        </p>
      </ZoomOn>
    </LessonSection>

    <LessonSection title="L'IA : entraînement et usage" icon={<Cpu size={24} />} delay={3}>
      <p>
        L'IA consomme de l'énergie à deux moments : quand on entraîne un modèle (une fois, très intensivement) et quand on
        l'utilise (des millions de fois, chacune en petite quantité). Pour un modèle très utilisé, l'usage cumulé finit par
        dépasser l'entraînement.
      </p>

      <ZoomOn title="L'entraînement : des estimations publiées, pas des mesures officielles">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>GPT-3</strong> (175 milliards de paramètres) : environ 1 300 MWh et environ 550 tonnes de CO2e pour
            l'entraînement, selon l'estimation de Patterson et al. (2021). À 10 791 kWh par an pour un foyer américain (EIA, 2022),
            cela correspond à l'électricité d'environ 120 foyers pendant un an.
          </li>
          <li>
            <strong>BLOOM</strong> (176 milliards de paramètres, entraîné en France) : environ 25 tonnes de CO2e pour
            l'électricité de l'entraînement, et environ 50 tonnes en incluant la fabrication des équipements (Luccioni et
            al., 2022). L'écart avec GPT-3 s'explique en grande partie par l'électricité peu carbonée utilisée.
          </li>
          <li>
            Pour les modèles actuels, bien plus grands, les fournisseurs publient rarement des chiffres détaillés sur l'entraînement, mais certains documentent l'usage : Google a publié en août 2025 une valeur médiane d'environ 0,24 Wh par requête texte à Gemini, et Mistral AI a publié en juillet 2025 une analyse de cycle de vie de Mistral Large 2 réalisée avec l'ADEME et Carbone 4. Les méthodes diffèrent : ces chiffres ne sont pas directement comparables.
            
          </li>
        </ul>
      </ZoomOn>

      <ZoomOn title="L'usage : une requête, des estimations qui varient d'un facteur dix">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Une estimation de 2023, due à Alex de Vries (revue Joule), évoquait environ 3 Wh pour une requête à un assistant conversationnel. Une analyse
            d'Epoch AI de 2025 aboutit à environ 0,3 Wh pour une requête courte avec un modèle récent, soit dix fois moins,
            grâce à des modèles et des puces plus efficaces et à des hypothèses moins pessimistes.
          </li>
          <li>
            0,3 Wh équivaut à une ampoule LED de 10 W allumée environ deux minutes.
          </li>
          <li>
            Ces valeurs valent pour une requête courte. Un long document, une conversation très longue, un modèle de
            raisonnement qui « réfléchit » longtemps, et surtout la génération d'images ou de vidéos consomment
            sensiblement plus.
          </li>
          <li>
            Le total dépend du nombre de requêtes : une faible énergie par requête, multipliée par des centaines de
            millions d'usages quotidiens, reste un poste significatif (effet rebond).
          </li>
        </ul>
      </ZoomOn>

      <ZoomOn title="Centres de données, refroidissement et eau">
        <p>
          Une partie de l'électricité d'un centre de données sert au refroidissement, selon les techniques utilisées. On
          mesure cette part avec le PUE (Power Usage Effectiveness) : le rapport entre l'énergie totale du site et celle
          des seuls serveurs. Un PUE de 1,5 signifie que pour 1 kWh de calcul, 0,5 kWh sert au refroidissement et au reste
          de l'infrastructure. Les meilleurs sites atteignent 1,1 à 1,2 ; la moyenne du secteur se situe plutôt entre
          1,5 et 1,6 (enquête de l'Uptime Institute, 2024). Certains refroidissements consomment de l'eau : les plus grands
          opérateurs déclarent des milliards de litres par an dans leurs rapports environnementaux (Google, Microsoft), dont l'impact dépend
          fortement de la région.
        </p>
        <p>
          Dans son avis de juillet 2026 sur l'IA générative, l'ADEME relève que les impacts dépendent en grande partie de
          l'intensité carbone de l'électricité utilisée, et que la fabrication des équipements, notamment des puces, pèse
          aussi.
        </p>
      </ZoomOn>
    </LessonSection>

    <LessonSection title="Agir en tant qu'utilisateur" icon={<Recycle size={24} />} delay={4}>
      <p>
        Comme la fabrication des équipements pèse lourd dans l'empreinte du numérique, c'est sur leur durée de vie que l'on agit le
        plus. Les gestes du quotidien (mails, fonds d'écran) comptent peu en comparaison : utiles pour prendre de bonnes
        habitudes, mais à ne pas présenter comme l'essentiel.
      </p>

      <DoDontCard
        title="Leviers qui comptent et gestes à faible effet"
        icon={<Leaf className="h-5 w-5 text-primary" />}
        doTitle="Leviers qui comptent"
        dontTitle="Gestes à faible effet"
        dos={[
          "Garder ses appareils le plus longtemps possible, les réparer, changer la batterie plutôt que l'appareil",
          "Acheter reconditionné ou d'occasion quand c'est possible, et limiter le nombre d'appareils",
          "Choisir des appareils réparables, en s'aidant des indices de réparabilité et de durabilité",
          "Éviter les usages lourds inutiles\u00A0: vidéo en très haute définition sur un petit écran, génération d'images ou de vidéos en boucle",
          "Choisir l'outil adapté à la tâche\u00A0: un petit modèle ou une recherche classique pour une question simple",
        ]}
        donts={[
          "Vider sa boîte de réception\u00A0: effet négligeable comparé au renouvellement d'un appareil",
          "Supprimer quelques photos du cloud\u00A0: effet très faible, même cumulé",
          "Changer de fond d'écran\u00A0: effet minime, sauf sur certains écrans à diodes organiques",
          "Culpabiliser pour chaque requête\u00A0: l'enjeu est collectif et tient aux volumes et aux choix des fournisseurs",
        ]}
      />

      <ZoomOn title="La vidéo : ce qui compte vraiment">
        <p>
          La vidéo représente une part importante du trafic internet (Sandvine, 2024). Regarder une heure de vidéo émet entre quelques grammes et
          quelques dizaines de grammes de CO2e selon les hypothèses, l'électricité utilisée et l'appareil (AIE, 2020 et Carbon Trust, 2021) : les estimations
          ont été revues à la baisse ces dernières années. Un point fait consensus : le terminal pèse lourd (un téléviseur
          neuf, par exemple, a une fabrication coûteuse), et choisir une résolution adaptée à l'écran évite de solliciter
          inutilement le réseau et les serveurs.
        </p>
      </ZoomOn>
    </LessonSection>

    <LessonSection title="Agir sur un projet ou une organisation" icon={<Server size={24} />} delay={5}>
      <p>
        Pour un projet d'IA, la démarche tient en quelques réflexes : se demander si l'on a besoin d'un modèle, choisir le
        plus petit qui convient, réutiliser plutôt qu'entraîner de zéro, mesurer, et choisir un hébergement transparent.
      </p>

      <ZoomOn title="Les leviers, du plus efficace au plus fin">
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Questionner le besoin :</strong> une règle simple, une recherche classique ou une analyse statistique
            suffisent-elles ?
          </li>
          <li>
            <strong>Choisir le plus petit modèle qui convient :</strong> un petit modèle spécialisé consomme bien moins
            qu'un très grand modèle généraliste pour une tâche précise.
          </li>
          <li>
            <strong>Réutiliser :</strong> un modèle préentraîné, éventuellement ajusté légèrement, évite un entraînement
            complet.
          </li>
          <li>
            <strong>Alléger le modèle :</strong> la quantification (par exemple passer de 32 à 4 bits) divise par huit la
            mémoire des poids et réduit souvent la consommation, pour une perte de qualité généralement faible mais à
            vérifier sur votre tâche ; la distillation et l'élagage vont dans le même sens.
          </li>
          <li>
            <strong>Limiter les usages inutiles :</strong> mettre en cache des réponses, raccourcir les contextes, éviter
            d'appeler un modèle quand ce n'est pas nécessaire.
          </li>
          <li>
            <strong>Choisir où et quand calculer :</strong> une région à l'électricité peu carbonée change les émissions
            d'un facteur pouvant dépasser dix pour le même calcul.
          </li>
          <li>
            <strong>Mesurer :</strong> on n'améliore que ce que l'on mesure (voir les deux exemples ci-dessous).
          </li>
        </ol>
      </ZoomOn>

      <CodeExample
        title="Un ordre de grandeur en quelques lignes"
        language="python"
        code={`# Estimation grossière des émissions d'un entraînement (hors fabrication des machines)
puissance_gpu_kw = 0.3        # un GPU qui consomme environ 300 W
nombre_gpu = 4
duree_heures = 12
pue = 1.5                     # surcoût du centre de données (refroidissement, etc.)
# Intensités carbone d'illustration (g de CO2e par kWh, en cycle de vie, Ember 2025) :
# environ 40 pour la France, environ 460 pour la moyenne mondiale.

energie_kwh = puissance_gpu_kw * nombre_gpu * duree_heures * pue

for lieu, intensite_g_par_kwh in (("France", 40), ("moyenne mondiale", 460)):
    emissions_kg = energie_kwh * intensite_g_par_kwh / 1000
    print(f"{lieu} : {energie_kwh:.1f} kWh, soit environ {emissions_kg:.1f} kg de CO2e")`}
        explanation="Le résultat donne environ 21,6 kWh dans les deux cas, mais environ 0,9 kg de CO2e avec l'électricité française contre environ 9,9 kg avec la moyenne mondiale : le lieu du calcul change le résultat d'un facteur supérieur à dix. C'est un ordre de grandeur, pas une mesure. Les valeurs de puissance et d'intensité carbone sont à remplacer par celles de votre contexte."
      />

      <CodeExample
        title="Mesurer avec un outil : CodeCarbon"
        language="python"
        code={`# pip install codecarbon
from codecarbon import EmissionsTracker

tracker = EmissionsTracker(project_name="mon_entrainement")
tracker.start()
try:
    pass  # ... votre entraînement ou votre inférence ici ...
finally:
    emissions_kg = tracker.stop()     # estimation en kg de CO2 équivalent

print(f"Émissions estimées : {emissions_kg:.4f} kg de CO2e")`}
        explanation="CodeCarbon est un outil libre qui estime la consommation de la machine et l'intensité carbone de l'électricité de la région. Ses résultats restent des estimations : utilisez-les surtout pour comparer deux variantes de votre propre projet."
      />

      <ZoomOn title="Le cadre réglementaire et les référentiels">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            En France, le <strong>référentiel général d'écoconception de services numériques (RGESN)</strong> propose des
            critères concrets pour concevoir des services moins gourmands, et la loi REEN de 2021 vise à réduire l'empreinte
            environnementale du numérique.
          </li>
          <li>
            Le règlement européen sur l'IA prévoit que les fournisseurs de modèles à usage général documentent notamment
            la consommation d'énergie de leurs modèles. Son application est progressive : vérifiez le calendrier en
            vigueur.
          </li>
          <li>
            Pour l'évaluation d'un fournisseur, demandez son PUE, l'origine de son électricité et sa politique de gestion de
            l'eau, plutôt que de vous fier à une mention « vert » sans chiffre.
          </li>
        </ul>
      </ZoomOn>

      <div className="rounded-lg border p-4 my-4">
        <h4 className="font-semibold mb-3">Références</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Les chiffres de ce cours proviennent de ces sources. Consultez-les pour vérifier les versions les plus récentes,
          car les estimations sont régulièrement révisées.
        </p>
        <ul className="space-y-2 text-sm">
          {sources.map((source) => (
            <li key={source.href} className="flex items-start gap-2">
              <ExternalLink className="h-3 w-3 mt-1.5 text-primary shrink-0" aria-hidden="true" />
              <a href={source.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-muted-foreground">
        Pour aller plus loin sur l'éthique de l'IA dans son ensemble, voir le cours{' '}
        <Link to="/cours/ia-ethique" className="text-primary hover:underline">
          IA éthique et responsable
        </Link>
        .
      </p>
    </LessonSection>

    <CourseQuiz title="Quiz : IA et environnement" questions={quizQuestions} />
  </CourseGuideLayout>
);

export default IAEnvironnement;
