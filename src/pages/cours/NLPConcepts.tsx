// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Link } from 'react-router';
import { MessageSquare, FileText, BarChart, MessageCircle, Share2, Cpu, PenTool } from 'lucide-react';
import CourseGuideLayout, { CoursePlanItem } from '@/components/courses/CourseGuideLayout';
import LessonSection from '@/components/courses/LessonSection';
import CodeExample from '@/components/courses/CodeExample';
import ZoomOn from '@/components/courses/ZoomOn';
import CourseQuiz, { QuizQuestion } from '@/components/courses/CourseQuiz';
import CourseSources from '@/components/courses/CourseSources';

const nlpSources = [
  { label: 'Vaswani et al. (2017)\u00A0: Attention Is All You Need', href: 'https://arxiv.org/abs/1706.03762' },
  { label: 'Devlin et al. (2018)\u00A0: BERT', href: 'https://arxiv.org/abs/1810.04805' },
  { label: 'Brown et al. (2020)\u00A0: Language Models are Few-Shot Learners', href: 'https://arxiv.org/abs/2005.14165' },
  { label: 'Mikolov et al. (2013)\u00A0: Word2Vec', href: 'https://arxiv.org/abs/1301.3781' },
  { label: 'Hugging Face\u00A0: fiche du modèle GPT-2', href: 'https://huggingface.co/openai-community/gpt2' },
  { label: 'Hugging Face\u00A0: fiche du modèle roberta-base-squad2', href: 'https://huggingface.co/deepset/roberta-base-squad2' },
  { label: 'SQuAD 2.0\u00A0: jeu de données de questions-réponses', href: 'https://rajpurkar.github.io/SQuAD-explorer/' },
  { label: 'Hugging Face\u00A0: pipelines Transformers', href: 'https://huggingface.co/docs/transformers/main_classes/pipelines' },
  { label: 'Hugging Face\u00A0: tâche de questions-réponses', href: 'https://huggingface.co/docs/transformers/tasks/question_answering' },
  { label: 'Mitchell et al. (2018)\u00A0: Model Cards for Model Reporting', href: 'https://arxiv.org/abs/1810.03993' },
  { label: 'spaCy\u00A0: fonctions linguistiques', href: 'https://spacy.io/usage/linguistic-features' },
  { label: 'scikit-learn\u00A0: TfidfVectorizer', href: 'https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html' },
];

const quizQuestions: QuizQuestion[] = [
  {
    question: "Qu'est-ce que la tokenisation en NLP\u00A0?",
    options: [
      "L'extraction de mots-clés d'un texte",
      "La division du texte en unités significatives comme des mots ou sous-mots",
      "La classification des mots par catégories grammaticales",
      "L'encodage de texte en représentation binaire"
    ],
    correctAnswer: 1,
    explanation: "La tokenisation est le processus de découpage du texte en unités plus petites (tokens) comme des mots, des sous-mots ou des caractères, qui servent d'entrée aux algorithmes de traitement du langage."
  },
  {
    question: "Quelle est la principale différence entre Word2Vec et BERT ?",
    options: [
      "Word2Vec est supervisé, BERT est non supervisé",
      "Word2Vec produit des embeddings statiques, BERT produit des embeddings contextuels",
      "Word2Vec est pour l'anglais uniquement, BERT est multilingue",
      "Word2Vec est pour la traduction, BERT est pour la classification"
    ],
    correctAnswer: 1,
    explanation: "Word2Vec crée des embeddings statiques où chaque mot a une représentation unique, tandis que BERT génère des embeddings contextuels où la représentation d'un mot varie selon son contexte dans la phrase."
  },
  {
    question: "Quelle architecture est à la base des modèles comme GPT et BERT?",
    options: [
      "Convolutional Neural Network (CNN)",
      "Recurrent Neural Network (RNN)",
      "Transformer",
      "Generative Adversarial Network (GAN)"
    ],
    correctAnswer: 2,
    explanation: "L'architecture Transformer, introduite en 2017 dans l'article «\u00A0Attention Is All You Need\u00A0», est la base des modèles de langage modernes. BERT utilise uniquement l'encodeur (il lit le texte dans les deux sens, ce qui convient à la compréhension) et GPT uniquement le décodeur (il génère le texte mot après mot)."
  },
  {
    question: "Qu'est-ce que le fine-tuning dans le contexte des modèles de langage?",
    options: [
      "La réduction de la taille du modèle pour l'optimiser",
      "L'ajustement des hyperparamètres pour améliorer la performance",
      "L'adaptation d'un modèle préentraîné à une tâche spécifique",
      "Le nettoyage du texte pour améliorer les résultats"
    ],
    correctAnswer: 2,
    explanation: "Le fine-tuning est le processus d'adaptation d'un modèle préentraîné à une tâche spécifique en continuant l'entraînement sur un jeu de données plus petit et spécialisé."
  },
  {
    question: "Quel est l'objectif de l'attention dans les modèles Transformer?",
    options: [
      "Réduire le temps d'entraînement",
      "Permettre au modèle de se concentrer sur différentes parties de l'entrée lors du traitement",
      "Augmenter la taille du vocabulaire du modèle",
      "Convertir le texte en vecteurs numériques"
    ],
    correctAnswer: 1,
    explanation: "Le mécanisme d'attention permet au modèle de pondérer différemment l'importance des mots d'entrée lors du traitement, permettant ainsi de capturer les dépendances à longue distance et les relations contextuelles."
  },
  {
    question: "Que règle la température lors de la génération de texte\u00A0?",
    options: [
      "La vitesse de calcul du modèle",
      "Le caractère aléatoire du choix des mots\u00A0: plus elle est basse, plus la sortie est prévisible",
      "La longueur maximale du texte généré",
      "La langue dans laquelle le modèle répond"
    ],
    correctAnswer: 1,
    explanation: "La température modifie la distribution de probabilité utilisée pour choisir le mot suivant. Une valeur basse favorise les mots les plus probables (réponses stables), une valeur haute rend le choix plus varié, au prix de plus d'erreurs."
  },
  {
    question: "Qu'est-ce qu'un modèle de question-réponse «\u00A0extractif\u00A0»\u00A0?",
    options: [
      "Un modèle qui invente une réponse à partir de ses connaissances générales",
      "Un modèle qui renvoie l'extrait du texte fourni qui répond le mieux à la question",
      "Un modèle qui traduit la question avant d'y répondre",
      "Un modèle qui classe la question par thème"
    ],
    correctAnswer: 1,
    explanation: "Un modèle extractif ne génère pas de texte\u00A0: il désigne, dans le contexte que vous lui donnez, le passage qui répond le mieux. À l'inverse, un chatbot génératif rédige une réponse et peut donc «\u00A0halluciner\u00A0»."
  }
];

const plan: CoursePlanItem[] = [
  {
    icon: <MessageSquare className="h-5 w-5 text-primary" />,
    title: 'Introduction au NLP',
    description: "Pourquoi le langage est difficile pour une machine (ambiguïté, ironie, références implicites) et où le NLP est déjà présent.",
  },
  {
    icon: <FileText className="h-5 w-5 text-primary" />,
    title: 'Prétraitement et tokenisation du texte',
    description: 'Nettoyage, tokenisation par mots et par sous-mots, mots vides et lemmatisation avec spaCy.',
  },
  {
    icon: <Share2 className="h-5 w-5 text-primary" />,
    title: 'Représentation vectorielle du texte',
    description: 'One-hot, sac de mots et TF-IDF, embeddings statiques (Word2Vec) puis contextuels (BERT).',
  },
  {
    icon: <Cpu className="h-5 w-5 text-primary" />,
    title: "Transformers et mécanisme d'attention",
    description: "L'attention pas à pas avec NumPy, et les rôles de l'encodeur (BERT) et du décodeur (GPT).",
  },
  {
    icon: <BarChart className="h-5 w-5 text-primary" />,
    title: 'Classification de texte et analyse de sentiment',
    description: "Utiliser un modèle préentraîné, partir d'une base simple (TF-IDF) et savoir quand faire du fine-tuning.",
  },
  {
    icon: <PenTool className="h-5 w-5 text-primary" />,
    title: 'Génération de texte et résumé automatique',
    description: 'Paramètres de décodage (température, top-p), résumé extractif ou abstractif, et évaluation.',
  },
  {
    icon: <MessageCircle className="h-5 w-5 text-primary" />,
    title: 'Questions-réponses et dialogue',
    description: 'QA extractif, chatbots génératifs, hallucinations et principe du RAG.',
  },
];

/**
 * Cours pratique de traitement du langage naturel en Python (prétraitement, embeddings,
 * transformers, modèles préentraînés). Il complète le cours conceptuel /cours/nlp-comprehension.
 */
const NLPConcepts = () => (
  <CourseGuideLayout
    title="Traitement du langage naturel (NLP) : concepts et outils en Python"
    subtitle="Du texte brut aux transformers : comprendre les techniques et les essayer avec du code"
    about={[
      "Le traitement du langage naturel (NLP) est l'un des domaines les plus actifs de l'intelligence artificielle. Ce cours pratique présente les concepts fondamentaux et les outils Python qui permettent à une machine de traiter du texte\u00A0: prétraitement, représentations vectorielles, transformers, puis utilisation de modèles préentraînés.",
      "Il complète le cours conceptuel «\u00A0Comprendre le NLP et les LLM\u00A0»\u00A0: ici, on lit et on écrit du code. Les exemples sont volontairement courts et à adapter\u00A0; les résultats dépendent des versions des bibliothèques et des modèles.",
    ]}
    learn={[
      'Les difficultés propres au langage naturel et les applications courantes du NLP',
      'Le prétraitement du texte et la tokenisation, par mots puis par sous-mots',
      'Les représentations vectorielles\u00A0: TF-IDF, embeddings statiques et contextuels',
      "L'attention et l'architecture transformer, avec les rôles de BERT et de GPT",
      "L'utilisation de modèles préentraînés pour classer, générer, résumer et répondre à des questions",
    ]}
    plan={plan}
    info={{
      level: 'Intermédiaire',
      duration: "Environ 4 heures de lecture et d'expérimentation",
      prerequisites:
        "Bases de Python (fonctions, listes, dictionnaires) et notions d'apprentissage automatique. Les exemples s'exécutent sur votre machine, avec les bibliothèques citées dans chacun d'eux.",
      contents: ['7 leçons', 'Exemples de code Python à copier et adapter', 'Quiz de 7 questions'],
    }}
    related={[
      {
        to: '/cours/nlp-comprehension',
        title: 'Comprendre le NLP et les LLM',
        description: 'Le même domaine côté concepts, avec des visualisations interactives.',
      },
      {
        to: '/cours/parametres-llm',
        title: 'Paramètres des LLM',
        description: 'Température, top-p, longueur\u00A0: régler la génération de texte.',
      },
      {
        to: '/cours/prompt-engineering',
        title: 'Prompt engineering',
        description: 'Formuler ses demandes pour obtenir de meilleures réponses.',
      },
      {
        to: '/glossaire',
        title: 'Glossaire',
        description: "Les termes du NLP et de l'IA expliqués en quelques lignes.",
      },
    ]}
  >
    <LessonSection title="Introduction au traitement du langage naturel" icon={<MessageSquare size={24} />} delay={1}>
      <p>
        Le Traitement du Langage Naturel (NLP) est un domaine de l'intelligence artificielle qui se concentre sur l'interaction entre les ordinateurs et les langues humaines. L'objectif est de permettre aux machines de comprendre, interpréter et générer du langage humain de manière utile et significative.
      </p>
      
      <ZoomOn title="Les défis du langage naturel pour les machines">
        <p>
          Comprendre le langage humain représente un défi majeur pour les machines en raison de plusieurs facteurs :
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li><strong>Ambiguïté :</strong> Un même mot peut avoir plusieurs sens selon le contexte</li>
          <li><strong>Sarcasme et ironie :</strong> Détection difficile sans indices paralinguistiques</li>
          <li><strong>Référence implicite :</strong> Comprendre à quoi se réfèrent les pronoms</li>
          <li><strong>Connaissance du monde :</strong> De nombreux textes font référence à des connaissances externes</li>
          <li><strong>Évolution constante :</strong> Le langage change rapidement avec l'apparition de nouveaux termes</li>
        </ul>
      </ZoomOn>

      <p className="mt-4">
        Les applications du NLP sont omniprésentes dans notre vie quotidienne : moteurs de recherche, assistants vocaux, systèmes de traduction automatique, correcteurs orthographiques, analyse de sentiment sur les réseaux sociaux, et, depuis 2022, assistants génératifs comme ChatGPT.
      </p>
    </LessonSection>

    <LessonSection title="Prétraitement et tokenisation du texte" icon={<FileText size={24} />} delay={2}>
      <p>
        Le prétraitement est une étape cruciale en NLP qui consiste à nettoyer et préparer le texte brut pour qu'il puisse être analysé efficacement par les algorithmes. La tokenisation, quant à elle, divise le texte en unités élémentaires (tokens) que la machine pourra traiter.
      </p>

      <CodeExample 
        title="Prétraitement d'un texte français avec spaCy"
        language="python"
        code={`import spacy

# Installation du modèle français (à faire une seule fois) :
#   python -m spacy download fr_core_news_sm
nlp = spacy.load("fr_core_news_sm")

def pretraiter_texte(texte):
    doc = nlp(texte.lower())            # tokenisation et analyse grammaticale
    return [
        token.lemma_                    # lemme : forme de base du mot
        for token in doc
        if not token.is_stop            # on écarte les mots vides ("les", "pour", "sur"...)
        and not token.is_punct          # ... la ponctuation
        and not token.is_space          # ... et les espaces
    ]

texte = "Les voitures autonomes utilisent l'intelligence artificielle pour naviguer sur les routes."
print(pretraiter_texte(texte))`}
        explanation="Le pipeline enchaîne : mise en minuscules, tokenisation, suppression des mots vides et de la ponctuation, puis lemmatisation (« utilisent » devient « utiliser »). spaCy fournit des modèles pour le français. NLTK, autre bibliothèque très utilisée, propose des outils équivalents surtout pour l'anglais : son lemmatiseur WordNet ne fonctionne pas sur du texte français."
      />

      <ZoomOn title="Tokenisation par sous-mots">
        <p>
          La tokenisation par sous-mots (subword tokenization) est une approche moderne qui décompose les mots en unités plus petites, permettant de :
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Gérer efficacement les mots hors vocabulaire</li>
          <li>Capturer la morphologie des mots (préfixes, suffixes)</li>
          <li>Réduire la taille du vocabulaire tout en maintenant la couverture</li>
        </ul>
        <p className="mt-2">
          Les algorithmes BPE (Byte-Pair Encoding), WordPiece et Unigram (ce dernier proposé avec BPE par la bibliothèque SentencePiece) sont couramment utilisés : WordPiece dans BERT, BPE dans la famille GPT.
        </p>
      </ZoomOn>

      <CodeExample 
        title="Tokenisation avec un modèle BERT"
        language="python"
        code={`from transformers import BertTokenizer

# Charger le tokenizer BERT
tokenizer = BertTokenizer.from_pretrained('bert-base-multilingual-cased')

# Texte à tokeniser
texte = "Le transfert d'apprentissage en NLP est très efficace!"

# Tokenisation avec BERT (retourne les IDs et le texte divisé en tokens)
tokens_ids = tokenizer.encode(texte, add_special_tokens=True)
tokens = tokenizer.convert_ids_to_tokens(tokens_ids)

print("Tokens IDs:", tokens_ids)
print("Tokens:", tokens)

# Afficher comment BERT divise en sous-mots
for token in tokens:
    if token.startswith('##'):
        print(f"Sous-mot: {token[2:]}")
    else:
        print(f"Début de mot ou mot complet: {token}")`}
        explanation="Cet exemple montre comment fonctionne la tokenisation avec BERT, qui utilise WordPiece pour segmenter le texte en sous-mots. Les préfixes '##' indiquent la continuation d'un mot."
      />
    </LessonSection>

    <LessonSection title="Modèles d'embedding et représentation vectorielle" icon={<Share2 size={24} />} delay={3}>
      <p>
        Les embeddings sont des représentations vectorielles denses de mots ou de phrases qui capturent les relations sémantiques et syntaxiques. Ils constituent la pierre angulaire des approches modernes en NLP.
      </p>

      <ZoomOn title="Évolution des représentations de texte">
        <div className="space-y-2">
          <p>
            <strong>1. One-hot encoding :</strong> Représentation binaire et creuse où chaque mot est un vecteur de la taille du vocabulaire.
          </p>
          <p>
            <strong>2. Bag of Words / TF-IDF :</strong> Représentations basées sur la fréquence des mots, ignorant la sémantique et l'ordre.
          </p>
          <p>
            <strong>3. Word embeddings statiques :</strong> Word2Vec, GloVe, FastText - représentations denses capturant le sens mais fixes pour chaque mot.
          </p>
          <p>
            <strong>4. Embeddings contextuels :</strong> ELMo, BERT, GPT - représentations dynamiques qui changent selon le contexte du mot dans la phrase.
          </p>
        </div>
      </ZoomOn>

      <CodeExample 
        title="Word embeddings avec Gensim (Word2Vec)"
        language="python"
        code={`import gensim
from gensim.models import Word2Vec
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA

# Corpus d'exemple
corpus = [
    ["le", "chat", "mange", "une", "souris"],
    ["le", "chien", "aboie", "après", "un", "chat"],
    ["j'aime", "les", "chats", "et", "les", "chiens"],
    ["le", "renard", "chasse", "dans", "les", "bois"],
    ["le", "loup", "hurle", "à", "la", "lune"]
]

# Entraîner un modèle Word2Vec
model = Word2Vec(sentences=corpus, vector_size=100, window=5, min_count=1, workers=4)

# Tester la similarité entre des mots
print(f"Similarité entre 'chat' et 'chien': {model.wv.similarity('chat', 'chien')}")
print(f"Similarité entre 'chat' et 'souris': {model.wv.similarity('chat', 'souris')}")

# Trouver les mots les plus similaires à 'chat'
most_similar = model.wv.most_similar('chat', topn=3)
print(f"Mots les plus similaires à 'chat': {most_similar}")

# Visualiser les embeddings en 2D
def plot_embeddings(model, words):
    # Extraire les vecteurs
    word_vectors = [model.wv[w] for w in words]
    
    # Réduire à 2 dimensions avec PCA
    pca = PCA(n_components=2)
    result = pca.fit_transform(word_vectors)
    
    # Créer le graph
    plt.figure(figsize=(10, 8))
    plt.scatter(result[:, 0], result[:, 1], c='blue')
    
    # Ajouter les labels
    for i, word in enumerate(words):
        plt.annotate(word, xy=(result[i, 0], result[i, 1]))
        
    plt.title('Visualisation 2D des embeddings de mots')
    plt.show()

# Visualisation des mots sélectionnés
animal_words = ['chat', 'chien', 'souris', 'renard', 'loup']
plot_embeddings(model, animal_words)`}
        explanation="Cet exemple montre comment entraîner des embeddings de mots avec Word2Vec, calculer des similarités et projeter les vecteurs en deux dimensions. Attention : avec cinq phrases, les similarités obtenues n'ont aucune valeur statistique. Un vrai modèle s'entraîne sur des millions de phrases, ou s'utilise déjà préentraîné."
      />

      <p className="mt-4">
        Les embeddings contextuels, comme ceux produits par BERT, représentent une avancée majeure par rapport aux embeddings statiques car ils prennent en compte le contexte complet d'une phrase pour déterminer la signification d'un mot.
      </p>

      <CodeExample 
        title="Embeddings contextuels avec BERT"
        language="python"
        code={`from transformers import AutoModel, AutoTokenizer
import torch

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModel.from_pretrained("bert-base-uncased")

def embedding_du_mot(phrase, mot):
    """Renvoie le vecteur BERT d'un mot, calculé dans le contexte de sa phrase."""
    entrees = tokenizer(phrase, return_tensors="pt")
    with torch.no_grad():
        sortie = model(**entrees).last_hidden_state[0]      # un vecteur par token
    tokens = tokenizer.convert_ids_to_tokens(entrees["input_ids"][0])
    return sortie[tokens.index(mot)]

riviere = embedding_du_mot("The bank is on the river.", "bank")
argent_1 = embedding_du_mot("I need to go to the bank to get some money.", "bank")
argent_2 = embedding_du_mot("The bank raised its interest rates.", "bank")

similarite = torch.nn.functional.cosine_similarity
print("bank (rive) vs bank (argent)   :", similarite(riviere, argent_1, dim=0).item())
print("bank (argent) vs bank (argent) :", similarite(argent_1, argent_2, dim=0).item())`}
        explanation="Le mot « bank » a le même identifiant de token dans les trois phrases, mais BERT en produit trois vecteurs différents, car il tient compte des mots voisins. On s'attend à ce que les deux emplois financiers soient plus proches l'un de l'autre que de l'emploi « rive ». Avec un embedding statique comme Word2Vec, le vecteur de « bank » serait identique dans les trois phrases."
      />
    </LessonSection>

    <LessonSection title="Transformers et mécanisme d'attention" icon={<Cpu size={24} />} delay={4}>
      <p>
        Les transformers, présentés en 2017 dans l'article « Attention Is All You Need », ont remplacé les réseaux récurrents
        (RNN, LSTM) dans la plupart des tâches de langage. Leur idée centrale : au lieu de lire un texte mot après mot,
        chaque mot « regarde » tous les autres et détermine ceux qui comptent le plus pour comprendre son sens. C'est le
        mécanisme d'attention.
      </p>

      <ZoomOn title="Encodeur, décodeur : BERT et GPT">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Encodeur seul (BERT) :</strong> lit tout le texte dans les deux sens. Adapté à la compréhension :
            classification, extraction d'informations, recherche sémantique.
          </li>
          <li>
            <strong>Décodeur seul (famille GPT) :</strong> génère le texte mot après mot, en ne regardant que ce qui précède.
            C'est l'architecture des assistants conversationnels actuels.
          </li>
          <li>
            <strong>Encodeur-décodeur (T5, BART) :</strong> lit un texte puis en produit un autre. Adapté à la traduction et au
            résumé.
          </li>
        </ul>
      </ZoomOn>

      <CodeExample
        title="L'attention en quelques lignes de NumPy"
        language="python"
        code={`import numpy as np

def attention(Q, K, V):
    """Attention par produit scalaire normalisé (scaled dot-product attention)."""
    d_k = Q.shape[-1]
    scores = Q @ K.T / np.sqrt(d_k)                        # similarité de chaque mot avec chaque autre
    scores = scores - scores.max(axis=-1, keepdims=True)   # stabilité numérique
    poids = np.exp(scores)
    poids = poids / poids.sum(axis=-1, keepdims=True)      # softmax : chaque ligne somme à 1
    return poids @ V, poids

# 4 "mots", chacun représenté par un vecteur de dimension 3 (valeurs aléatoires)
rng = np.random.default_rng(0)
X = rng.normal(size=(4, 3))

# Dans un vrai transformer, Q, K et V sont obtenus avec trois matrices apprises.
# Ici, on utilise directement X pour montrer le calcul.
sortie, poids = attention(X, X, X)

print("Poids d'attention (une ligne par mot) :")
print(poids.round(2))
print("Somme de chaque ligne :", poids.sum(axis=1).round(2))`}
        explanation="Chaque ligne de la matrice de poids indique la part d'attention qu'un mot accorde aux quatre mots de la phrase. Dans un vrai transformer, plusieurs « têtes » d'attention travaillent en parallèle et les matrices Q, K et V sont apprises pendant l'entraînement."
      />
    </LessonSection>

    <LessonSection title="Classification de texte et analyse de sentiment" icon={<BarChart size={24} />} delay={5}>
      <p>
        La classification de texte attribue une étiquette à un texte : sentiment positif ou négatif, thème, message
        indésirable ou non. Avec un modèle préentraîné, un premier résultat s'obtient en quelques lignes, sans rien
        entraîner soi-même.
      </p>

      <CodeExample
        title="Analyse de sentiment avec un modèle préentraîné"
        language="python"
        code={`from transformers import pipeline

# Modèle multilingue qui attribue une note de 1 à 5 étoiles (téléchargé au premier appel)
analyse = pipeline(
    "sentiment-analysis",
    model="nlptown/bert-base-multilingual-uncased-sentiment",
)

avis = [
    "Livraison rapide et produit conforme, je recommande.",
    "Le produit est arrivé cassé et le service client ne répond pas.",
]

for texte, resultat in zip(avis, analyse(avis)):
    print(f"{resultat['label']} ({resultat['score']:.2f}) : {texte}")`}
        explanation="Le modèle renvoie une note (de « 1 star » à « 5 stars ») et un score. Ce score mesure la confiance du modèle, pas la probabilité qu'il ait raison : un modèle peut se tromper avec assurance, notamment sur l'ironie ou les tournures inhabituelles."
      />

      <CodeExample
        title="Un point de départ simple : TF-IDF et régression logistique"
        language="python"
        code={`from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline

# Jeu d'exemple minuscule : il ne sert qu'à montrer l'enchaînement des étapes
textes = [
    "j'adore ce produit", "quelle déception", "très bon rapport qualité prix",
    "ne fonctionne pas", "je recommande", "à éviter",
]
etiquettes = [1, 0, 1, 0, 1, 0]   # 1 = positif, 0 = négatif

modele = make_pipeline(TfidfVectorizer(), LogisticRegression())
modele.fit(textes, etiquettes)

print(modele.predict(["produit décevant", "je recommande vivement"]))`}
        explanation="Avec six phrases, le modèle se trompe facilement : il peut classer « produit décevant » comme positif, parce que le mot « décevant » n'apparaît dans aucun exemple et que « produit » vient d'une phrase positive. Sur un vrai problème, il faut des centaines d'exemples étiquetés au minimum, un jeu de test séparé et des métriques adaptées (précision, rappel, F1). Cette base simple sert aussi de point de comparaison : si un gros modèle ne fait pas nettement mieux, il n'est pas justifié."
      />

      <ZoomOn title="Quand faire du fine-tuning ?">
        <p>
          Le fine-tuning adapte un modèle préentraîné à vos données en poursuivant son entraînement sur vos exemples
          étiquetés. Il devient utile lorsque le modèle prêt à l'emploi se trompe systématiquement sur votre vocabulaire
          ou votre domaine. La démarche : rassembler des exemples, séparer entraînement, validation et test, entraîner
          (par exemple avec la classe <code>Trainer</code> de la bibliothèque Transformers), puis évaluer sur le jeu de
          test et examiner les erreurs et les biais.
        </p>
      </ZoomOn>
    </LessonSection>

    <LessonSection title="Génération de texte et résumé automatique" icon={<PenTool size={24} />} delay={6}>
      <p>
        Un modèle de langage génère du texte en choisissant, un token après l'autre, parmi les suites les plus
        probables. Les paramètres de décodage règlent le compromis entre réponses prévisibles et réponses variées.
      </p>

      <ZoomOn title="Les paramètres de décodage">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Température :</strong> basse, la sortie est stable et prévisible ; haute, elle est plus variée et plus
            risquée.
          </li>
          <li>
            <strong>Top-p (échantillonnage par noyau) :</strong> le modèle ne choisit que parmi les mots les plus
            probables dont la probabilité cumulée atteint p.
          </li>
          <li>
            <strong>Top-k :</strong> le modèle ne choisit que parmi les k mots les plus probables.
          </li>
          <li>
            <strong>Longueur maximale :</strong> nombre de nouveaux tokens autorisés.
          </li>
        </ul>
        <p className="mt-2">
          Ces réglages sont détaillés dans le cours{' '}
          <Link to="/cours/parametres-llm" className="text-primary hover:underline">
            Paramètres des LLM
          </Link>
          .
        </p>
      </ZoomOn>

      <CodeExample
        title="Générer du texte avec différentes températures"
        language="python"
        code={`from transformers import pipeline

# Petit modèle anglais, choisi pour la démonstration (plusieurs centaines de mégaoctets, selon la connexion)
generateur = pipeline("text-generation", model="gpt2")

prompt = "Artificial intelligence is"

for temperature in (0.3, 1.0):
    sortie = generateur(
        prompt,
        max_new_tokens=30,
        do_sample=True,
        temperature=temperature,
        top_p=0.9,
    )
    print(f"--- température {temperature}")
    print(sortie[0]["generated_text"])`}
        explanation="Relancez le script : avec une température de 1,0, les textes changent beaucoup d'une exécution à l'autre ; avec 0,3, ils varient peu. GPT-2 est un petit modèle ancien : la qualité n'a rien de comparable avec les assistants actuels, mais le principe est identique. Sa fiche de modèle signale aussi les biais hérités de ses données d'entraînement."
      />

      <ZoomOn title="Résumé extractif et résumé abstractif">
        <p>
          Un résumé <strong>extractif</strong> sélectionne des phrases du texte d'origine : il ne peut pas inventer, mais
          reste parfois décousu. Un résumé <strong>abstractif</strong> reformule avec ses propres mots (modèles
          encodeur-décodeur ou LLM) : il est plus fluide, mais peut introduire des erreurs ou des détails absents de la
          source. Les métriques automatiques comme ROUGE mesurent surtout le recouvrement de mots avec un résumé de
          référence ; une relecture humaine reste nécessaire.
        </p>
      </ZoomOn>
    </LessonSection>

    <LessonSection title="Questions-réponses et dialogue" icon={<MessageCircle size={24} />} delay={7}>
      <p>
        Deux familles de systèmes répondent à des questions. Les modèles <strong>extractifs</strong> cherchent la réponse
        dans un texte fourni. Les modèles <strong>génératifs</strong>, comme les chatbots, rédigent une réponse à partir de
        ce qu'ils ont appris et du contexte de la conversation.
      </p>

      <CodeExample
        title="Question-réponse extractive"
        language="python"
        code={`import torch
from transformers import AutoModelForQuestionAnswering, AutoTokenizer

nom = "deepset/roberta-base-squad2"
tokenizer = AutoTokenizer.from_pretrained(nom)
model = AutoModelForQuestionAnswering.from_pretrained(nom)

contexte = (
    "The Transformer architecture was introduced in 2017 in the paper "
    "'Attention Is All You Need'. It replaced recurrent networks in most language tasks."
)
question = "When was the Transformer introduced?"

entrees = tokenizer(question, contexte, return_tensors="pt")
with torch.no_grad():
    sortie = model(**entrees)

debut = sortie.start_logits.argmax().item()   # position du premier token de la réponse
fin = sortie.end_logits.argmax().item()       # position du dernier token de la réponse

# Pour SQuAD 2.0, une absence de réponse pointe vers le jeton [CLS] (index 0).
if debut == 0 and fin == 0:
    print("Pas de réponse trouvée dans le contexte.")
elif fin < debut:
    print("Réponse incohérente : à vérifier.")
else:
    print(tokenizer.decode(entrees["input_ids"][0][debut : fin + 1]))  # extrait prédit, à vérifier`}
        explanation="Le modèle ne rédige rien : il désigne dans le contexte l'extrait qui répond le mieux à la question. Ce modèle est entraîné en anglais ; pour le français, on utilise un modèle adapté à la langue. Le modèle choisi (SQuAD 2.0) a aussi appris à signaler qu'une question n'a pas de réponse dans le texte : le code vérifie ce cas, ainsi qu'une fin prédite avant le début. Transformers 5 a retiré le raccourci pipeline('question-answering') : on appelle donc le modèle directement."
      />

      <ZoomOn title="Hallucinations et RAG">
        <p>
          Un chatbot génératif peut produire une réponse fausse mais très plausible : c'est une hallucination. Le RAG
          (retrieval augmented generation) en réduit le risque : on recherche d'abord les passages pertinents dans une
          base de documents, puis on demande au modèle de répondre à partir d'eux, en citant ses sources. Le risque ne
          disparaît pas : il faut vérifier les sources citées et prévoir la possibilité de répondre « je ne sais pas ».
        </p>
      </ZoomOn>
    </LessonSection>

    <CourseSources sources={nlpSources} />

    <CourseQuiz title="Quiz : traitement du langage naturel" questions={quizQuestions} />
  </CourseGuideLayout>
);

export default NLPConcepts;
