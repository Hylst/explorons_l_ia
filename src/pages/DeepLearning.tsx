// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import Hero from '@/components/Hero';
import { Link } from 'react-router';
import { Brain, Network, Target } from 'lucide-react';
import LessonSection from '@/components/courses/LessonSection';
import CodeExample from '@/components/courses/CodeExample';
import ZoomOn from '@/components/courses/ZoomOn';
import Illustration from '@/components/courses/Illustration';
import CourseQuiz, { QuizQuestion } from '@/components/courses/CourseQuiz';
import BackToResourcesButton from '@/components/courses/BackToResourcesButton';
import DidYouKnow from '@/components/courses/DidYouKnow';
import AnalogyBox from '@/components/courses/AnalogyBox';
import TechnicalTooltip from '@/components/courses/TechnicalTooltip';
import StatsGrid from '@/components/courses/StatsGrid';
import CourseHeader from '@/components/courses/CourseHeader';
import CourseModule from '@/components/courses/CourseModule';
import CourseConclusion from '@/components/courses/CourseConclusion';
import { asset } from '@/lib/paths';
import { AUTHOR_TITLE } from '@/config/site';

/**
 * Page du cours sur le Deep Learning pratique
 * @returns {JSX.Element} Le composant de la page
 */
const DeepLearning = () => {
  const quizQuestions: QuizQuestion[] = [
    {
      question: "Quelle est l'une des différences historiques entre TensorFlow 1.x et PyTorch\u00A0?",
      options: [
        "TensorFlow est uniquement pour le deep learning, PyTorch pour le machine learning classique",
        "TensorFlow 1.x construisait un graphe de calcul statique avant l'exécution, PyTorch construit le graphe dynamiquement pendant l'exécution",
        "TensorFlow est open source, PyTorch est propriétaire",
        "TensorFlow ne peut pas être utilisé pour la vision par ordinateur"
      ],
      correctAnswer: 1,
      explanation: "TensorFlow 1.x reposait sur un graphe statique, tandis que PyTorch a popularisé l'exécution immédiate (graphe dynamique), plus simple à déboguer. TensorFlow 2 a depuis adopté l'exécution immédiate par défaut, et les deux bibliothèques savent compiler des graphes pour accélérer l'exécution. Les deux sont open source."
    },
    {
      question: "Quel est le rôle des fonctions d'activation dans un réseau de neurones ?",
      options: [
        "Elles déterminent la vitesse d'apprentissage du modèle",
        "Elles introduisent des non-linéarités dans le modèle",
        "Elles servent uniquement à normaliser les données",
        "Elles contrôlent le nombre de couches du réseau"
      ],
      correctAnswer: 1,
      explanation: "Les fonctions d'activation introduisent des non-linéarités dans le modèle, permettant au réseau d'apprendre des relations complexes et non linéaires dans les données."
    },
    {
      question: "Qu'est-ce que le problème de disparition du gradient (vanishing gradient) dans les réseaux de neurones profonds ?",
      options: [
        "Les gradients deviennent trop grands et causent une explosion de l'apprentissage",
        "Les gradients deviennent très petits et l'apprentissage ralentit ou s'arrête",
        "Les couches cachées disparaissent pendant l'entraînement",
        "Le réseau ne peut pas apprendre de motifs locaux"
      ],
      correctAnswer: 1,
      explanation: "Le problème de disparition du gradient survient lorsque les gradients deviennent extrêmement petits lors de la rétropropagation, ce qui rend l'apprentissage très lent ou impossible dans les couches profondes du réseau."
    },
    {
      question: "Quelle architecture est spécifiquement conçue pour la vision par ordinateur ?",
      options: [
        "RNN (Recurrent Neural Network)",
        "Transformer",
        "CNN (Convolutional Neural Network)",
        "AE (Autoencoder)"
      ],
      correctAnswer: 2,
      explanation: "Les réseaux de neurones convolutifs (CNN) sont spécialement conçus pour traiter des données avec une topologie en grille comme les images, grâce à leurs opérations de convolution qui captent les motifs locaux et la hiérarchie de caractéristiques."
    },
    {
      question: "Qu'est-ce que le transfer learning (apprentissage par transfert) ?",
      options: [
        "Transférer un modèle d'un framework à un autre (TensorFlow à PyTorch)",
        "Utiliser un modèle préentraîné et le réajuster sur une nouvelle tâche",
        "Transférer l'apprentissage d'un utilisateur à un autre",
        "L'apprentissage de plusieurs tâches simultanément"
      ],
      correctAnswer: 1,
      explanation: "L'apprentissage par transfert est une technique où un modèle développé pour une tâche est réutilisé comme point de départ pour un modèle sur une seconde tâche, permettant d'exploiter les connaissances acquises précédemment."
    }
  ];

  const didYouKnowItems = [
    {
      title: "Inspiration biologique",
      content: "Les réseaux de neurones artificiels s'inspirent du cerveau, mais de manière très lointaine\u00A0: un neurone artificiel est une fonction mathématique simple, alors qu'un neurone biologique peut former des milliers de connexions synaptiques."
    },
    {
      title: "Échelle de calcul",
      content: "L'entraînement de GPT-3 a nécessité environ 3,14×10²³ opérations (FLOPs) et, selon l'estimation de Patterson et al. (2021), environ 1 300 MWh d'électricité."
    },
    {
      title: "Données d'entraînement",
      content: "ImageNet, l'un des jeux de données les plus influents en vision par ordinateur, contient plus de 14 millions d'images étiquetées, réparties en plus de 20 000 catégories."
    }
  ];

  const statsData = [
    {
      value: "1986",
      description: "Rétropropagation popularisée (Rumelhart, Hinton, Williams)",
      bgGradient: "from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50"
    },
    {
      value: "2012",
      description: "AlexNet remporte ImageNet\u00A0: le deep learning s'impose en vision",
      bgGradient: "from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50"
    },
    {
      value: "175 Md",
      description: "Paramètres de GPT-3 (2020)",
      bgGradient: "from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50"
    }
  ];

  const learningModules = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Module 1\u00A0: fondamentaux",
      items: [
        "Le neurone artificiel",
        "Somme pondérée et biais",
        "Fonctions d'activation (sigmoid, ReLU)"
      ]
    },
    {
      icon: <Network className="h-6 w-6" />,
      title: "Module 2\u00A0: architectures",
      items: [
        "Réseau feedforward et couches cachées",
        "Rétropropagation (principe)",
        "Un réseau dense avec Keras, Dropout"
      ]
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Module 3\u00A0: applications",
      items: [
        "Réseaux convolutifs (CNN)",
        "Convolution et pooling",
        "Classification d'images (CIFAR-10)"
      ]
    }
  ];

  return (
    <>
      <BackToResourcesButton />
      
      <Hero
        title="Deep Learning : comprendre les réseaux de neurones profonds"
        subtitle="Du neurone artificiel au réseau convolutif, avec des exemples de code commentés. Un cours d'introduction, à prolonger avec le cours pratique d'entraînement."
      />

      <section className="section-container mb-10">
        <CourseHeader
          title="Deep Learning : les bases"
          subtitle="Du neurone artificiel aux réseaux convolutifs"
          author="Geoffroy Streit"
          authorDescription={AUTHOR_TITLE}
          duration="2 à 3 heures"
          level="Intermédiaire"
          audience="Développeurs et personnes à l'aise avec Python"
          tags={["Deep Learning", "Réseaux de neurones", "Keras", "CNN"]}
        />

        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-primary">Avant de commencer</h3>
            <p className="text-lg mb-4 text-foreground">
              Le deep learning regroupe les méthodes d'apprentissage qui empilent de nombreuses couches de neurones
              artificiels. Ce cours en présente les briques de base : le neurone, le réseau dense, puis le réseau
              convolutif pour les images, avec du code Python commenté.
            </p>
            <p className="mb-4 text-foreground">
              Ces méthodes sont à l'origine de progrès importants en vision, en traitement du langage et en génération
              de contenus. Elles ont aussi des limites (besoin de données et de calcul, difficulté à expliquer les
              décisions, erreurs possibles) que d'autres cours du site abordent.
            </p>
            <p className="font-medium text-primary">
              Pour entraîner, évaluer et sauvegarder un modèle pas à pas, poursuivez avec le{' '}
              <Link to="/cours/deep-learning-pratique" className="underline underline-offset-4">
                cours Deep Learning pratique
              </Link>
              .
            </p>
          </div>

          <AnalogyBox
            title="Le Deep Learning, c'est comme apprendre à conduire"
            content="Au début, vous devez consciemment penser à chaque action : vérifier les rétroviseurs, actionner le clignotant, évaluer les distances. Avec la pratique, ces actions deviennent automatiques. De même, un réseau de neurones 'apprend' en ajustant progressivement ses connexions jusqu'à reconnaître automatiquement des motifs complexes dans les données."
            variant="info"
          />
        </div>

        <DidYouKnow items={didYouKnowItems} />

        <StatsGrid stats={statsData} />

        <CourseModule
          title="Programme du cours"
          description="Trois modules, chacun s'appuyant sur le précédent"
          modules={learningModules}
        />

        <div className="max-w-4xl mx-auto">
          {/* Module 1: Introduction et Fondamentaux */}
          <LessonSection title="Module 1 : introduction et fondamentaux du deep learning" icon={<Brain size={24} />} delay={1}>
            <p className="text-lg mb-4">
              Avant de plonger dans le code, prenons le temps de comprendre ce qui distingue le deep learning 
              des approches classiques.
            </p>
            
            <ZoomOn title="Qu'est-ce qui distingue le Deep Learning ?">
              <p className="mb-3">
                Contrairement aux approches traditionnelles de programmation où nous écrivons des règles explicites, 
                le Deep Learning permet aux machines d'apprendre ces règles automatiquement à partir d'exemples.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Apprentissage des caractéristiques :</strong> moins besoin d'extraire à la main les caractéristiques importantes des données</li>
                <li><strong>Capacité de généralisation :</strong> Un modèle bien entraîné peut traiter des données qu'il n'a jamais vues</li>
                <li><strong>Évolutivité :</strong> les performances continuent en général de progresser avec davantage de données et de calcul, là où beaucoup d'algorithmes classiques plafonnent plus tôt</li>
              </ul>
            </ZoomOn>

            <Illustration 
              src={asset("pics/cerveau-reseau.jpg")}
              alt="Illustration générée par IA : une tête translucide vue de profil, dont le cerveau lumineux est parsemé de points reliés"
              caption="Illustration générée par IA. L'inspiration biologique des réseaux de neurones artificiels reste lointaine"
              width="2/3"
            />

            <h4 className="text-xl font-semibold mt-6 mb-3">Le neurone artificiel : brique de base</h4>
            <p className="mb-4">
              Tout commence par un <TechnicalTooltip term="Neurone artificiel" definition="Unité de calcul élémentaire qui reçoit des entrées, les pondère, et produit une sortie via une fonction d'activation">neurone artificiel</TechnicalTooltip>, 
              une version simplifiée d'un neurone biologique.
            </p>

            <CodeExample 
              title="Implémentation d'un neurone simple"
              language="python"
              code={`import numpy as np
import matplotlib.pyplot as plt

class Neurone:
    def __init__(self, nb_entrees):
        # Initialisation aléatoire des poids (distribution normale)
        self.poids = np.random.normal(0, 0.1, nb_entrees)
        self.biais = np.random.normal(0, 0.1)
        
    def sigmoid(self, x):
        """Fonction d'activation sigmoid : sortie entre 0 et 1"""
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))  # clip pour éviter overflow
    
    def relu(self, x):
        """Fonction d'activation ReLU : max(0, x)"""
        return np.maximum(0, x)
    
    def forward(self, entrees, activation='sigmoid'):
        """Propagation avant : calcul de la sortie"""
        # Étape 1: Somme pondérée
        somme_ponderee = np.dot(entrees, self.poids) + self.biais
        
        # Étape 2: Application de la fonction d'activation
        if activation == 'sigmoid':
            sortie = self.sigmoid(somme_ponderee)
        elif activation == 'relu':
            sortie = self.relu(somme_ponderee)
        else:
            raise ValueError("Activation non supportée")
            
        return sortie`}
              explanation="Ce code illustre le fonctionnement d'un neurone artificiel avec deux fonctions d'activation populaires. Remarquez comment les poids et le biais influencent la décision finale."
            />

            <AnalogyBox
              title="Analogie : Le neurone comme un portier de boîte de nuit"
              content="Imaginez un portier qui doit décider qui peut entrer. Il regarde plusieurs critères (âge, tenue, etc.), donne un poids à chacun selon leur importance, fait la somme, et si le total dépasse son seuil, il laisse entrer la personne. C'est exactement ce que fait un neurone artificiel !"
            />
          </LessonSection>

          {/* Module 2: Architectures de réseaux */}
          <LessonSection title="Module 2 : architectures et propagation" icon={<Network size={24} />} delay={2}>
            <p className="text-lg mb-4">
              Maintenant que vous comprenez le neurone individuel, découvrons comment les assembler pour créer des{' '} 
              <TechnicalTooltip term="Réseau de neurones multicouches" definition="Architecture composée de plusieurs couches de neurones où chaque couche reçoit les sorties de la couche précédente">réseaux de neurones multicouches</TechnicalTooltip> 
              {' '}capables de résoudre des problèmes complexes.
            </p>

            <ZoomOn title="L'architecture feedforward : le modèle de base">
              <p className="mb-3">
                Dans un réseau feedforward, l'information circule dans une seule direction, de l'entrée vers la sortie :
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Couche d'entrée :</strong> Reçoit les données brutes (pixels d'image, mots, etc.)</li>
                <li><strong>Couches cachées :</strong> Extraient progressivement des caractéristiques de plus en plus abstraites</li>
                <li><strong>Couche de sortie :</strong> Produit la prédiction finale</li>
              </ol>
            </ZoomOn>

            <CodeExample 
              title="Réseau de neurones complet avec TensorFlow"
              language="python"
              code={`import tensorflow as tf
from tensorflow import keras
import numpy as np

# Configuration simple d'un réseau dense
def creer_modele_simple(input_dim, output_dim):
    model = keras.Sequential([
        keras.layers.Input(shape=(input_dim,)),
        keras.layers.Dense(128, activation='relu'),
        keras.layers.Dropout(0.2),  # Régularisation
        keras.layers.Dense(64, activation='relu'),
        keras.layers.Dropout(0.2),
        keras.layers.Dense(output_dim, activation='softmax')
    ])
    
    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    return model

# Exemple d'utilisation
model = creer_modele_simple(784, 10)  # MNIST: 28x28 pixels -> 10 classes
model.summary()`}
              explanation="Cette implémentation montre comment créer un réseau simple avec TensorFlow/Keras. Notez l'utilisation du dropout pour éviter le surapprentissage."
            />

            <AnalogyBox
              title="La rétropropagation : apprendre de ses erreurs"
              content="Imaginez un chef cuisinier qui goûte son plat et réalise qu'il est trop salé. Il va 'remonter' sa recette : peut-être a-t-il mis trop de sel à l'étape 3, ou utilisé un bouillon trop salé à l'étape 1. La rétropropagation fonctionne de même : elle part de l'erreur finale et remonte pour identifier quels 'ingrédients' (poids) ajuster."
              variant="tip"
            />
          </LessonSection>

          {/* Module 3: Applications pratiques */}
          <LessonSection title="Module 3 : applications concrètes" icon={<Target size={24} />} delay={3}>
            <p className="text-lg mb-4">
              Passons maintenant aux applications concrètes ! Nous allons voir comment appliquer le Deep Learning 
              à des problèmes réels avec des exemples pratiques.
            </p>

            <ZoomOn title="Classification d'images avec CNN">
              <p className="mb-3">
                Les réseaux de neurones convolutifs (CNN) sont particulièrement efficaces pour l'analyse d'images 
                car ils exploitent la structure spatiale des données.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Convolution :</strong> Détecte les motifs locaux (contours, textures)</li>
                <li><strong>Pooling :</strong> Réduit la dimensionnalité tout en gardant l'information importante</li>
                <li><strong>Couches denses :</strong> Combine les caractéristiques pour la classification finale</li>
              </ul>
            </ZoomOn>

            <CodeExample 
              title="CNN pour classification d'images"
              language="python"
              code={`import tensorflow as tf
from tensorflow.keras import layers

def creer_cnn(input_shape, num_classes):
    model = tf.keras.Sequential([
        # Premier bloc convolutionnel
        layers.Input(shape=input_shape),
        layers.Conv2D(32, (3, 3), activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        
        # Deuxième bloc
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        
        # Troisième bloc
        layers.Conv2D(128, (3, 3), activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        
        # Classification
        layers.GlobalAveragePooling2D(),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation='softmax')
    ])
    
    return model

# Exemple pour CIFAR-10
model = creer_cnn((32, 32, 3), 10)
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)`}
              explanation="Ce CNN utilise des techniques modernes comme la BatchNormalization et le GlobalAveragePooling pour améliorer les performances et réduire le surapprentissage."
            />
          </LessonSection>

          {/* Quiz */}
          <div className="mt-16">
            <CourseQuiz 
              questions={quizQuestions}
              title="Quiz : Testez vos connaissances"
            />
          </div>

          {/* Conclusion */}
          <div className="mt-16">
            <CourseConclusion
              title="Bilan du cours"
              description="Vous avez parcouru les briques de base du deep learning. Voici ce que vous pouvez retenir et comment poursuivre."
              learningPoints={[
                "Ce qu'est un neurone artificiel et comment un réseau en empile plusieurs",
                "Le rôle des fonctions d'activation et le principe de la rétropropagation",
                "Le principe des réseaux convolutifs pour les images",
                "Comment écrire un réseau dense et un CNN avec Keras"
              ]}
              nextSteps={[
                "Entraînez et évaluez un modèle pas à pas avec le cours Deep Learning pratique",
                "Explorez les architectures plus récentes, comme les Transformers (cours sur le NLP et sur les paramètres des LLM)",
                "Reproduisez un petit projet de classification d'images sur un jeu de données public",
                "Échangez avec des communautés de deep learning (forums, dépôts open source)"
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default DeepLearning;
