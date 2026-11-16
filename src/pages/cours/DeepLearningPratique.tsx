// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Link } from 'react-router';
import { Settings, Repeat, Image as ImageIcon, LineChart, Save, ClipboardCheck, Shield } from 'lucide-react';
import CourseGuideLayout, { CoursePlanItem } from '@/components/courses/CourseGuideLayout';
import LessonSection from '@/components/courses/LessonSection';
import CodeExample from '@/components/courses/CodeExample';
import ZoomOn from '@/components/courses/ZoomOn';
import DoDontCard from '@/components/courses/DoDontCard';
import CourseQuiz, { QuizQuestion } from '@/components/courses/CourseQuiz';
import CourseSources from '@/components/courses/CourseSources';

const deepLearningSources = [
  { label: 'PyTorch\u00A0: documentation officielle', href: 'https://docs.pytorch.org/docs/stable/index.html' },
  { label: 'PyTorch\u00A0: sauvegarde et chargement de modèles (sécurité)', href: 'https://docs.pytorch.org/docs/stable/notes/serialization.html' },
  { label: 'PyTorch\u00A0: reproductibilité', href: 'https://docs.pytorch.org/docs/stable/notes/randomness.html' },
  { label: 'PyTorch\u00A0: notes sur CUDA', href: 'https://docs.pytorch.org/docs/stable/notes/cuda.html' },
  { label: 'PyTorch\u00A0: notes sur MPS', href: 'https://docs.pytorch.org/docs/stable/notes/mps.html' },
  { label: 'PyTorch 2.6\u00A0: weights_only et valeurs par défaut', href: 'https://pytorch.org/blog/pytorch-2-6/' },
  { label: 'torchvision\u00A0: jeu de données Fashion-MNIST', href: 'https://docs.pytorch.org/vision/stable/generated/torchvision.datasets.FashionMNIST.html' },
  { label: 'torchvision\u00A0: modèle ResNet-18 et poids préentraînés', href: 'https://docs.pytorch.org/vision/stable/models/generated/torchvision.models.resnet18.html' },
  { label: 'FastAPI\u00A0: documentation officielle', href: 'https://fastapi.tiangolo.com/' },
  { label: 'Fashion-MNIST (Xiao et al., 2017)', href: 'https://arxiv.org/abs/1708.07747' },
];

const quizQuestions: QuizQuestion[] = [
  {
    question: "Dans quel ordre s'enchaînent les opérations d'une itération d'entraînement avec PyTorch\u00A0?",
    options: [
      "Mise à zéro des gradients, calcul de la sortie (forward), calcul de la perte, rétropropagation (backward), mise à jour des poids",
      "Calcul de la sortie, mise à jour des poids, calcul de la perte, rétropropagation",
      "Rétropropagation, calcul de la perte, calcul de la sortie, mise à jour des poids",
      "Mise à jour des poids, mise à zéro des gradients, calcul de la sortie, calcul de la perte"
    ],
    correctAnswer: 0,
    explanation: "On remet d'abord les gradients à zéro (sinon ils s'additionnent d'un lot à l'autre), on calcule la sortie puis la perte, on rétropropage pour obtenir les gradients, et seulement ensuite l'optimiseur met à jour les poids."
  },
  {
    question: "Pourquoi appelle-t-on model.eval() et torch.no_grad() avant d'évaluer un modèle\u00A0?",
    options: [
      "Pour que l'entraînement soit plus rapide à l'époque suivante",
      "Pour désactiver les comportements propres à l'entraînement (Dropout, normalisation par lot) et éviter de calculer des gradients inutiles",
      "Pour sauvegarder automatiquement le modèle",
      "Pour que les poids soient arrondis"
    ],
    correctAnswer: 1,
    explanation: "model.eval() met les couches comme Dropout et BatchNorm en mode inférence, et torch.no_grad() évite de construire le graphe de calcul\u00A0: les résultats sont corrects et la mémoire est économisée."
  },
  {
    question: "Sur les courbes d'apprentissage, que signale une perte d'entraînement qui continue de baisser pendant que la perte de validation remonte\u00A0?",
    options: [
      "Un sous-apprentissage\u00A0: le modèle est trop simple",
      "Un surapprentissage\u00A0: le modèle mémorise les données d'entraînement au lieu de généraliser",
      "Un taux d'apprentissage trop faible",
      "Que le jeu de test est trop petit"
    ],
    correctAnswer: 1,
    explanation: "Quand l'écart se creuse entre l'entraînement et la validation, le modèle s'ajuste aux particularités des données vues. Les remèdes courants\u00A0: davantage de données ou d'augmentation, régularisation (Dropout, weight decay), modèle plus petit, arrêt anticipé."
  },
  {
    question: "À quoi servent respectivement le jeu de validation et le jeu de test\u00A0?",
    options: [
      "Les deux servent à choisir les hyperparamètres",
      "La validation sert à faire des choix (architecture, arrêt, réglages)\u00A0; le test sert une seule fois à la fin, pour estimer la performance finale",
      "La validation sert à entraîner, le test à régler",
      "Ils sont équivalents\u00A0: on peut les mélanger"
    ],
    correctAnswer: 1,
    explanation: "Si l'on utilise le jeu de test pour faire des choix, il n'est plus indépendant et l'estimation devient trop optimiste. On garde le test intact jusqu'à l'évaluation finale."
  },
  {
    question: "Qu'est-ce que l'arrêt anticipé (early stopping)\u00A0?",
    options: [
      "Arrêter l'entraînement quand la perte de validation ne s'améliore plus pendant plusieurs époques, en conservant le meilleur modèle",
      "Interrompre l'entraînement dès la première époque",
      "Supprimer les couches du réseau",
      "Réduire le nombre d'images du jeu de test"
    ],
    correctAnswer: 0,
    explanation: "On surveille la perte de validation\u00A0: si elle ne s'améliore plus pendant un nombre d'époques donné (la «\u00A0patience\u00A0»), on arrête et on garde les poids de la meilleure époque. C'est une forme simple de régularisation."
  },
  {
    question: "Pourquoi ne faut-il pas charger un fichier de modèle (.pt, .pkl) d'origine inconnue\u00A0?",
    options: [
      "Parce que ces fichiers sont toujours trop volumineux",
      "Parce que le format pickle peut exécuter du code arbitraire au chargement",
      "Parce que le modèle serait moins précis",
      "Parce qu'il faut un GPU pour les ouvrir"
    ],
    correctAnswer: 1,
    explanation: "Le chargement d'un fichier pickle peut lancer du code malveillant. On ne charge que des fichiers de sources fiables, avec weights_only=True (le comportement par défaut depuis PyTorch 2.6) ou un format sûr comme safetensors."
  }
];

const plan: CoursePlanItem[] = [
  {
    icon: <Settings className="h-5 w-5 text-primary" />,
    title: 'Environnement et matériel',
    description: "Environnement virtuel, versions, vérifier le GPU, et choisir entre CPU, GPU local et notebook en ligne.",
  },
  {
    icon: <Repeat className="h-5 w-5 text-primary" />,
    title: "Données et boucle d'entraînement",
    description: "Dataset et DataLoader, jeu de validation, fonction de perte, optimiseur\u00A0: la boucle d'entraînement écrite à la main.",
  },
  {
    icon: <ImageIcon className="h-5 w-5 text-primary" />,
    title: 'Réseau convolutif',
    description: "Définir un petit CNN, comprendre convolution et pooling, et comparer avec le réseau dense.",
  },
  {
    icon: <LineChart className="h-5 w-5 text-primary" />,
    title: 'Évaluer et diagnostiquer',
    description: "Lire les courbes d'apprentissage, repérer surapprentissage et sous-apprentissage, arrêt anticipé, transfert d'apprentissage.",
  },
  {
    icon: <Save className="h-5 w-5 text-primary" />,
    title: 'Sauvegarder et servir un modèle',
    description: "Sauvegarde et rechargement sûrs, inférence, petite API avec validation des entrées, précautions avant la production.",
  },
  {
    icon: <ClipboardCheck className="h-5 w-5 text-primary" />,
    title: 'Reproductibilité et sobriété',
    description: "Graines, versions, suivi des expériences, dérive des données, et réflexe de sobriété avant de lancer un gros entraînement.",
  },
];

/**
 * Cours pratique d'apprentissage profond avec PyTorch : les étapes d'un projet, du poste de travail
 * au modèle servi, avec des exemples à exécuter dans l'ordre des leçons. Aucun chiffre de performance
 * n'est annoncé : les résultats dépendent de la machine, des versions et des graines.
 */
const DeepLearningPratique = () => (
  <CourseGuideLayout
    title="Deep learning en pratique : entraîner un réseau de neurones avec PyTorch"
    subtitle="De l'environnement Python au modèle entraîné, évalué et sauvegardé : les étapes d'un projet, avec du code à exécuter"
    about={[
      "Ce cours pratique suit les étapes d'un petit projet d'apprentissage profond\u00A0: préparer son environnement, écrire la boucle d'entraînement, construire un réseau convolutif, diagnostiquer ce qui ne va pas, puis sauvegarder et servir le modèle.",
      "Les exemples utilisent PyTorch et le jeu d'images Fashion-MNIST (petit, téléchargé automatiquement)\u00A0: ils tournent sur un ordinateur ordinaire, un GPU accélère sans être nécessaire. TensorFlow et Keras suivent les mêmes étapes. Les scores obtenus dépendent de votre machine, des versions des bibliothèques et des graines aléatoires\u00A0: ils ne sont donc pas annoncés ici.",
    ]}
    learn={[
      "Mettre en place un environnement reproductible et savoir si l'on dispose d'un GPU",
      "Écrire la boucle d'entraînement (passe avant, perte, rétropropagation, mise à jour) et la comprendre ligne par ligne",
      "Définir et entraîner un réseau dense puis un réseau convolutif sur des images",
      "Lire des courbes d'apprentissage, reconnaître le surapprentissage et appliquer les remèdes usuels",
      "Sauvegarder, recharger et servir un modèle en évitant les erreurs de sécurité courantes",
      "Adopter des habitudes de reproductibilité, de suivi et de sobriété",
    ]}
    plan={plan}
    info={{
      level: 'Intermédiaire',
      duration: 'Environ 6 à 8 heures de lecture et de pratique',
      prerequisites:
        "Python (fonctions, classes), notions d'apprentissage automatique (jeux d'entraînement, de validation et de test) et un peu d'algèbre linéaire. Voir les cours «\u00A0Initiation à Python pour l'IA\u00A0» et «\u00A0Construire son premier modèle\u00A0».",
      contents: ['6 leçons', "Exemples PyTorch à exécuter dans l'ordre des leçons", 'Quiz de 6 questions'],
    }}
    related={[
      {
        to: '/cours/python-ia',
        title: "Initiation à Python pour l'IA",
        description: 'Les bases du langage, NumPy et pandas, si vous débutez.',
      },
      {
        to: '/cours/premier-modele-ml',
        title: 'Construire son premier modèle',
        description: 'Le même projet de bout en bout avec scikit-learn, sans réseau de neurones.',
      },
      {
        to: '/cours/bases-mathematiques-ia',
        title: "Les bases mathématiques de l'IA",
        description: "Gradient, dérivées, rétropropagation\u00A0: les mathématiques derrière l'entraînement.",
      },
      {
        to: '/cours/ia-environnement',
        title: "IA et environnement",
        description: "Mesurer et réduire l'empreinte d'un entraînement.",
      },
    ]}
  >
    <LessonSection title="Environnement et matériel" icon={<Settings size={24} />} delay={1}>
      <p>
        Un projet reproductible commence par un environnement isolé : un environnement virtuel par projet, avec les
        versions des bibliothèques consignées. Sous Windows, l'activation passe par <code>Scripts\Activate.ps1</code> en
        PowerShell ou <code>Scripts\activate.bat</code> dans l'invite de commandes ; sous macOS et Linux, par la commande
        <code>source</code>.
      </p>

      <CodeExample
        title="Créer l'environnement et vérifier la machine"
        language="bash puis python"
        code={`# Dans un terminal, à la racine du projet
python -m venv .venv
source .venv/bin/activate        # macOS et Linux
# Windows PowerShell : .venv\\Scripts\\Activate.ps1
# Windows (invite de commandes) : .venv\\Scripts\\activate.bat
pip install torch torchvision matplotlib
pip freeze > requirements.txt    # garde une trace des versions installées

# Puis dans Python :
import torch

print("PyTorch", torch.__version__)
print("GPU NVIDIA (CUDA) :", torch.cuda.is_available())
print("GPU Apple (MPS)   :", torch.backends.mps.is_available())

# Le périphérique de calcul utilisé dans tout le cours
if torch.cuda.is_available():
    device = "cuda"
elif torch.backends.mps.is_available():
    device = "mps"
else:
    device = "cpu"
print("Périphérique retenu :", device)`}
        explanation="La commande pip d'installation dépend de votre système et de votre GPU : le sélecteur de la documentation officielle de PyTorch donne la commande exacte. Un entraînement sur CPU suffit pour les exemples de ce cours."
      />

      <ZoomOn title="CPU, GPU ou notebook en ligne ?">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>CPU :</strong> suffisant pour de petits jeux de données et des réseaux modestes, comme ici. Plus lent,
            mais aucune configuration particulière.
          </li>
          <li>
            <strong>GPU local :</strong> utile pour des images plus grandes ou des réseaux plus profonds. Il faut un pilote
            et une version de PyTorch compatibles.
          </li>
          <li>
            <strong>Notebook en ligne :</strong> plusieurs services proposent des GPU, parfois gratuitement, avec des
            limites et des conditions qui changent. Vos données et votre code y transitent par un tiers : évitez d'y
            déposer des données personnelles ou confidentielles.
          </li>
        </ul>
      </ZoomOn>
    </LessonSection>

    <LessonSection title="Données et boucle d'entraînement" icon={<Repeat size={24} />} delay={2}>
      <p>
        Entraîner un réseau consiste à répéter quatre gestes : calculer la sortie du réseau, mesurer l'erreur (la perte),
        calculer comment chaque poids y a contribué (rétropropagation), puis corriger légèrement les poids. PyTorch
        automatise le calcul des gradients, mais la boucle reste écrite explicitement, ce qui aide à comprendre ce qui
        se passe.
      </p>

      <CodeExample
        title="Un réseau dense sur Fashion-MNIST : le script complet"
        language="python"
        code={`import torch
from torch import nn
from torch.utils.data import DataLoader, random_split
from torchvision import datasets, transforms

if torch.cuda.is_available():
    device = "cuda"
elif torch.backends.mps.is_available():
    device = "mps"
else:
    device = "cpu"
torch.manual_seed(0)                      # résultats plus reproductibles (sans garantie absolue sur GPU)

# 1. Données : 60 000 images d'entraînement, dont 5 000 mises de côté pour la validation
transform = transforms.ToTensor()         # image -> tenseur (1, 28, 28) de valeurs entre 0 et 1
full_train = datasets.FashionMNIST("data", train=True, download=True, transform=transform)
test_set = datasets.FashionMNIST("data", train=False, download=True, transform=transform)
train_set, val_set = random_split(
    full_train, [55_000, 5_000], generator=torch.Generator().manual_seed(0)
)
train_loader = DataLoader(train_set, batch_size=64, shuffle=True)
val_loader = DataLoader(val_set, batch_size=256)
test_loader = DataLoader(test_set, batch_size=256)

# 2. Modèle : un réseau dense à une couche cachée
model = nn.Sequential(
    nn.Flatten(),                         # (1, 28, 28) -> 784 valeurs
    nn.Linear(28 * 28, 128),
    nn.ReLU(),
    nn.Linear(128, 10),                   # 10 classes de vêtements
).to(device)

loss_fn = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)

# 3. Une époque d'entraînement : un passage sur toutes les images
def train_one_epoch():
    model.train()
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        optimizer.zero_grad()             # remet les gradients à zéro
        loss = loss_fn(model(images), labels)   # passe avant + perte
        loss.backward()                   # rétropropagation : calcule les gradients
        optimizer.step()                  # met à jour les poids

# 4. Évaluation : pas de gradients, modèle en mode inférence
def evaluate(loader):
    model.eval()
    total, correct, loss_sum = 0, 0, 0.0
    with torch.no_grad():
        for images, labels in loader:
            images, labels = images.to(device), labels.to(device)
            outputs = model(images)
            loss_sum += loss_fn(outputs, labels).item() * len(labels)
            correct += (outputs.argmax(dim=1) == labels).sum().item()
            total += len(labels)
    return loss_sum / total, correct / total

for epoch in range(5):
    train_one_epoch()
    val_loss, val_acc = evaluate(val_loader)
    print(f"époque {epoch + 1} : perte validation {val_loss:.3f}, exactitude validation {val_acc:.3f}")

# Le jeu de test n'est utilisé qu'une seule fois, à la toute fin
test_loss, test_acc = evaluate(test_loader)
print(f"Test final : perte {test_loss:.3f}, exactitude {test_acc:.3f}")`}
        explanation="Les choix (architecture, nombre d'époques, taux d'apprentissage) se font avec le jeu de validation. Le jeu de test, resté intact, ne sert qu'une fois à la fin pour une estimation honnête. La première exécution télécharge le jeu de données dans le dossier data."
      />

      <ZoomOn title="Le rôle de chaque composant">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>DataLoader :</strong> découpe les données en lots (batch) mélangés à chaque époque.
          </li>
          <li>
            <strong>Fonction de perte :</strong> mesure l'écart entre la sortie et la réponse attendue. Pour classer, on
            utilise l'entropie croisée, qui s'applique directement aux sorties brutes (pas besoin de softmax avant).
          </li>
          <li>
            <strong>Optimiseur :</strong> applique les mises à jour. Adam est un bon point de départ ; le taux
            d'apprentissage (lr) est souvent le réglage le plus sensible.
          </li>
          <li>
            <strong>Époque :</strong> un passage complet sur les données d'entraînement.
          </li>
        </ul>
      </ZoomOn>
    </LessonSection>

    <LessonSection title="Réseau convolutif" icon={<ImageIcon size={24} />} delay={3}>
      <p>
        Un réseau dense traite une image comme une longue liste de pixels et ignore leur voisinage. Une convolution
        applique au contraire un petit filtre (ici 3 par 3) qui parcourt toute l'image : elle détecte les mêmes motifs
        (un bord, un coin) où qu'ils se trouvent, avec très peu de paramètres. Le pooling réduit ensuite la taille de
        l'image en gardant l'essentiel.
      </p>

      <CodeExample
        title="Un petit CNN à remplacer dans le script précédent"
        language="python"
        code={`class SmallCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 16, kernel_size=3, padding=1),    # 28x28 -> 28x28, 16 cartes de caractéristiques
            nn.ReLU(),
            nn.MaxPool2d(2),                               # -> 14x14
            nn.Conv2d(16, 32, kernel_size=3, padding=1),   # -> 14x14, 32 cartes
            nn.ReLU(),
            nn.MaxPool2d(2),                               # -> 7x7
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),                                  # 32 x 7 x 7 = 1568 valeurs
            nn.Dropout(0.25),                              # régularisation : éteint 25 % des valeurs à l'entraînement
            nn.Linear(32 * 7 * 7, 10),
        )

    def forward(self, x):
        return self.classifier(self.features(x))

model = SmallCNN().to(device)
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)   # l'optimiseur doit viser le nouveau modèle

nb_parametres = sum(p.numel() for p in model.parameters())
print("Nombre de paramètres :", nb_parametres)`}
        explanation="Le reste du script (DataLoader, boucle d'entraînement, évaluation) ne change pas. Ce CNN compte environ 20 500 paramètres, contre environ 101 800 pour le réseau dense de la leçon précédente, soit cinq fois moins. En général il généralise mieux sur des images, avec un écart à vérifier sur votre propre exécution."
      />

      <ZoomOn title="Dimensions : vérifier plutôt que deviner">
        <p>
          La forme des tenseurs est la source d'erreurs la plus fréquente. Les réflexes utiles : afficher{' '}
          <code>images.shape</code> après chaque couche en cas de doute, se rappeler que le pooling divise la hauteur et
          la largeur (ici 28 puis 14 puis 7), et que la première couche linéaire doit recevoir exactement le nombre de
          valeurs aplaties (32 x 7 x 7). Un message d'erreur de type « mat1 and mat2 shapes cannot be multiplied »
          signale presque toujours cette dernière erreur.
        </p>
      </ZoomOn>
    </LessonSection>

    <LessonSection title="Évaluer et diagnostiquer" icon={<LineChart size={24} />} delay={4}>
      <p>
        Un score final seul ne dit pas si l'entraînement s'est bien passé. Les courbes de la perte, sur les données
        d'entraînement et sur la validation, époque après époque, sont l'outil de diagnostic de base.
      </p>

      <ZoomOn title="Lire les courbes d'apprentissage">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Les deux pertes restent élevées :</strong> sous-apprentissage. Le modèle est trop simple, trop peu
            entraîné ou son taux d'apprentissage est mal réglé.
          </li>
          <li>
            <strong>La perte d'entraînement baisse, celle de validation remonte :</strong> surapprentissage. Le modèle
            mémorise. Remèdes : plus de données ou d'augmentation, Dropout, weight decay, modèle plus petit, arrêt
            anticipé.
          </li>
          <li>
            <strong>La perte de validation est très irrégulière :</strong> taux d'apprentissage trop grand, lots trop
            petits ou jeu de validation trop réduit.
          </li>
          <li>
            <strong>Les deux baissent et restent proches :</strong> l'entraînement se passe bien.
          </li>
        </ul>
      </ZoomOn>

      <CodeExample
        title="Suivre les courbes et s'arrêter au bon moment (arrêt anticipé)"
        language="python"
        code={`history = {"train_loss": [], "val_loss": []}
best_val_loss = float("inf")
patience, epochs_without_progress = 3, 0

for epoch in range(30):
    model.train()
    running_loss = 0.0
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        optimizer.zero_grad()
        loss = loss_fn(model(images), labels)
        loss.backward()
        optimizer.step()
        running_loss += loss.item() * len(labels)

    train_loss = running_loss / len(train_set)
    val_loss, val_acc = evaluate(val_loader)
    history["train_loss"].append(train_loss)
    history["val_loss"].append(val_loss)
    print(f"époque {epoch + 1:2d} : entraînement {train_loss:.3f} | validation {val_loss:.3f} ({val_acc:.3f})")

    if val_loss < best_val_loss - 1e-4:           # amélioration nette : on garde ces poids
        best_val_loss, epochs_without_progress = val_loss, 0
        torch.save(model.state_dict(), "meilleur_modele.pt")
    else:
        epochs_without_progress += 1
        if epochs_without_progress >= patience:   # plus d'amélioration depuis 3 époques
            print(f"Arrêt anticipé après l'époque {epoch + 1}")
            break

# Tracer les deux courbes
import matplotlib.pyplot as plt
plt.plot(history["train_loss"], label="entraînement")
plt.plot(history["val_loss"], label="validation")
plt.xlabel("époque")
plt.ylabel("perte")
plt.legend()
plt.show()`}
        explanation="À chaque amélioration de la perte de validation, les poids sont sauvegardés : à la fin, on recharge « meilleur_modele.pt », qui correspond à la meilleure époque, pas forcément la dernière."
      />

      <ZoomOn title="Quand les données manquent : le transfert d'apprentissage">
        <p>
          Entraîner un gros réseau à partir de zéro demande beaucoup de données et de calcul. Le transfert
          d'apprentissage réutilise un réseau déjà entraîné sur une grande collection d'images, et n'entraîne que sa
          dernière couche sur vos propres classes.
        </p>
        <CodeExample
          title="Réutiliser un ResNet préentraîné"
          language="python"
          code={`from torchvision import models

weights = models.ResNet18_Weights.DEFAULT
model = models.resnet18(weights=weights)       # téléchargé au premier appel

for parameter in model.parameters():
    parameter.requires_grad = False            # on gèle le réseau préentraîné

model.fc = nn.Linear(model.fc.in_features, 5)  # nouvelle couche de sortie : 5 classes à vous (nn : « from torch import nn », comme dans le script précédent)
preprocess = weights.transforms()              # le prétraitement attendu par ce modèle

# Seuls les paramètres de la nouvelle couche sont entraînés
optimizer = torch.optim.Adam(model.fc.parameters(), lr=1e-3)`}
          explanation="Ce réseau a été entraîné sur des images du quotidien : pour des images très spécialisées (radiographies, imagerie satellite), le gain peut être plus faible et il faut dégeler davantage de couches. Vérifiez aussi la licence du modèle et celle de ses données d'origine."
        />
      </ZoomOn>
    </LessonSection>

    <LessonSection title="Sauvegarder et servir un modèle" icon={<Save size={24} />} delay={5}>
      <p>
        Une fois le modèle satisfaisant, on sauvegarde ses poids (le « state_dict »), puis on les recharge dans une
        instance de la même classe pour faire des prédictions. C'est aussi le moment de se poser les questions de
        sécurité : un fichier de modèle n'est pas un simple fichier de données.
      </p>

      <CodeExample
        title="Recharger les poids et prédire sur une image"
        language="python"
        code={`# La classe SmallCNN doit être définie avant le rechargement
model = SmallCNN()
state = torch.load("meilleur_modele.pt", map_location="cpu", weights_only=True)
model.load_state_dict(state)
model.eval()                                   # indispensable pour l'inférence (Dropout désactivé)

image, label = test_set[0]                     # tenseur de forme (1, 28, 28)
with torch.no_grad():
    probabilities = torch.softmax(model(image.unsqueeze(0)), dim=1)[0]   # unsqueeze : ajoute l'axe du lot
predicted = probabilities.argmax().item()

print("Prédit :", test_set.classes[predicted], f"({probabilities[predicted]:.2f})")
print("Réel   :", test_set.classes[label])`}
        explanation="Une probabilité élevée n'est pas une garantie : un réseau peut se tromper avec une forte confiance, en particulier sur des images très différentes de celles de l'entraînement."
      />

      <ZoomOn title="Sécurité : le piège du chargement">
        <p>
          <code>torch.load</code> s'appuie sur le format pickle, qui peut exécuter du code au chargement. Ne chargez
          jamais un fichier de modèle dont vous ne maîtrisez pas l'origine. Utilisez{' '}
          <code>weights_only=True</code> (la valeur par défaut depuis PyTorch 2.6) ou un format conçu pour ne contenir
          que des tenseurs, comme safetensors.
        </p>
      </ZoomOn>

      <CodeExample
        title="Une petite API d'inférence avec FastAPI (à lancer en local)"
        language="python"
        code={`import torch
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from modele import SmallCNN          # la classe définie dans la leçon sur le CNN

CLASSES = ["T-shirt", "Pantalon", "Pull", "Robe", "Manteau", "Sandale", "Chemise", "Basket", "Sac", "Bottine"]

model = SmallCNN()
model.load_state_dict(torch.load("meilleur_modele.pt", map_location="cpu", weights_only=True))
model.eval()                                   # le modèle est chargé une seule fois, au démarrage

app = FastAPI()

class ImageRequest(BaseModel):
    # Image 28 x 28 aplatie : exactement 784 valeurs
    pixels: list[float] = Field(min_length=784, max_length=784)

@app.post("/predict")
def predict(request: ImageRequest):
    if not all(0.0 <= value <= 1.0 for value in request.pixels):
        raise HTTPException(status_code=422, detail="Les pixels doivent être compris entre 0 et 1")
    tensor = torch.tensor(request.pixels).reshape(1, 1, 28, 28)
    with torch.no_grad():
        probabilities = torch.softmax(model(tensor), dim=1)[0]
    predicted = int(probabilities.argmax())
    return {"classe": CLASSES[predicted], "confiance": float(probabilities[predicted])}

# Ce code est à placer dans un fichier api.py, à côté de modele.py.
# Lancement en local, depuis le terminal :
#   pip install fastapi uvicorn
#   uvicorn api:app --host 127.0.0.1 --port 8000`}
        explanation="L'entrée est validée avant d'être utilisée (taille et plage des valeurs) et le service n'écoute que sur la machine locale. Avant une mise en ligne, il faut au minimum : un serveur adapté et du HTTPS, une limitation des requêtes, des journaux, et un plan de retour en arrière."
      />

      <ZoomOn title="De l'expérience à la production">
        <p>
          Faire tourner un modèle sur son ordinateur et le maintenir pour de vrais utilisateurs sont deux métiers
          différents. Il faut versionner les données, le code et le modèle, tester avant chaque mise à jour, surveiller
          la latence, les erreurs et la dérive des données (quand les données réelles s'éloignent de celles de
          l'entraînement), et pouvoir revenir à la version précédente. Avant d'industrialiser, demandez-vous aussi si un
          modèle plus simple, ou un service existant, ne suffirait pas.
        </p>
      </ZoomOn>
    </LessonSection>

    <LessonSection title="Reproductibilité et sobriété" icon={<ClipboardCheck size={24} />} delay={6}>
      <p>
        Un résultat qu'on ne sait pas reproduire n'est pas un résultat. Quelques habitudes simples évitent la plupart des
        mauvaises surprises, et un réflexe de sobriété évite de gaspiller du calcul.
      </p>

      <DoDontCard
        title="Bonnes pratiques d'entraînement"
        icon={<Shield className="h-5 w-5 text-primary" />}
        doTitle="À faire"
        dontTitle="À éviter"
        dos={[
          "Fixer les graines aléatoires et noter les versions (pip freeze)",
          'Séparer entraînement, validation et test avant toute chose',
          "Commencer par un petit sous-ensemble et un modèle simple, pour vérifier que la boucle fonctionne",
          "Sauvegarder régulièrement le meilleur modèle et consigner chaque essai (un simple fichier CSV suffit au début)",
          "Comparer toujours avec une base simple (modèle linéaire, règle métier) avant de conclure",
        ]}
        donts={[
          "Régler les hyperparamètres avec le jeu de test",
          "Lancer un long entraînement sans avoir vérifié la boucle sur quelques lots",
          "Présenter un score sans dire sur quelles données, avec quelles graines et quelles versions",
          "Charger des modèles ou des jeux de données de provenance inconnue",
          "Entraîner un très gros modèle alors qu'un modèle préentraîné réglé finement suffirait",
        ]}
      />

      <ZoomOn title="Suivre ses expériences">
        <p>
          Pour quelques essais, un fichier CSV où l'on note les réglages et les scores suffit. Quand les essais se
          multiplient, des outils dédiés (TensorBoard, MLflow, Weights and Biases, entre autres) enregistrent
          automatiquement réglages, courbes et fichiers. Les graines fixées rendent les résultats plus comparables
          mais, sur GPU, certaines opérations restent non déterministes : deux exécutions peuvent différer légèrement.
        </p>
      </ZoomOn>

      <ZoomOn title="Sobriété : mesurer avant de calculer">
        <p>
          Chaque entraînement consomme de l'énergie. Réutiliser un modèle préentraîné, réduire la taille des images,
          arrêter tôt les essais qui ne mènent nulle part et tester sur un sous-ensemble avant de lancer le calcul
          complet sont des gestes simples et efficaces. Le cours{' '}
          <Link to="/cours/ia-environnement" className="text-primary hover:underline">
            IA et environnement
          </Link>{' '}
          détaille les ordres de grandeur et les leviers d'action.
        </p>
      </ZoomOn>
    </LessonSection>

    <CourseSources sources={deepLearningSources} />

    <CourseQuiz title="Quiz : deep learning en pratique" questions={quizQuestions} />
  </CourseGuideLayout>
);

export default DeepLearningPratique;
