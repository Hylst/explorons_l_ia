// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import { ScientificPublication } from '../resourcesData';

export const scientificPublications: ScientificPublication[] = [
  {
    title: "Equality of Opportunity in Supervised Learning",
    authors: ["Moritz Hardt", "Eric Price", "Nathan Srebro"],
    journal: "Advances in Neural Information Processing Systems",
    year: 2016,
    description: "Définit l'égalité des chances (mêmes taux de vrais positifs entre groupes) et l'égalité des cotes, et montre comment ajuster les seuils d'un classifieur après coup pour s'en approcher",
    link: "https://arxiv.org/abs/1610.02413"
  },
  {
    title: "Inherent Trade-Offs in the Fair Determination of Risk Scores",
    authors: ["Jon Kleinberg", "Sendhil Mullainathan", "Manish Raghavan"],
    journal: "Innovations in Theoretical Computer Science (ITCS 2017), prépublication de 2016",
    year: 2016,
    description: "Démontre que, sauf cas particuliers (modèle parfait ou taux de base identiques), plusieurs critères d'équité naturels ne peuvent pas être satisfaits en même temps",
    link: "https://arxiv.org/abs/1609.05807"
  },
  {
    title: "Fair prediction with disparate impact: A study of bias in recidivism prediction instruments",
    authors: ["Alexandra Chouldechova"],
    journal: "Big Data",
    year: 2017,
    description: "À partir d'un outil de prédiction de récidive, montre qu'un outil dont la précision des prédictions positives est la même pour chaque groupe ne peut pas avoir aussi les mêmes taux de faux positifs et de faux négatifs quand les taux de base diffèrent",
    link: "https://arxiv.org/abs/1703.00056"
  },
  {
    title: "Attention Is All You Need",
    authors: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar", "Jakob Uszkoreit"],
    journal: "Advances in Neural Information Processing Systems",
    year: 2017,
    description: "Article fondateur sur l'architecture Transformer, base des LLMs modernes comme GPT et BERT",
    link: "https://arxiv.org/abs/1706.03762"
  },
  {
    title: "Language Models are Few-Shot Learners",
    authors: ["Tom B. Brown", "Benjamin Mann", "Nick Ryder", "Melanie Subbiah"],
    journal: "Advances in Neural Information Processing Systems",
    year: 2020,
    description: "Présentation de GPT-3 et démonstration des capacités few-shot des grands modèles de langage",
    link: "https://arxiv.org/abs/2005.14165"
  },
  {
    title: "Deep Residual Learning for Image Recognition",
    authors: ["Kaiming He", "Xiangyu Zhang", "Shaoqing Ren", "Jian Sun"],
    journal: "IEEE Conference on Computer Vision and Pattern Recognition",
    year: 2016,
    description: "Introduction des réseaux résiduels (ResNet), vainqueurs de la tâche de classification d'ILSVRC 2015, devenus une architecture de référence en vision par ordinateur",
    link: "https://arxiv.org/abs/1512.03385"
  },
  {
    title: "Generative Adversarial Nets",
    authors: ["Ian J. Goodfellow", "Jean Pouget-Abadie", "Mehdi Mirza", "Bing Xu"],
    journal: "Advances in Neural Information Processing Systems",
    year: 2014,
    description: "Article fondateur des réseaux antagonistes génératifs (GAN)\u00A0: un générateur et un discriminateur entraînés ensemble, l'un contre l'autre",
    link: "https://arxiv.org/abs/1406.2661"
  },
  {
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    authors: ["Jacob Devlin", "Ming-Wei Chang", "Kenton Lee", "Kristina Toutanova"],
    journal: "Proceedings of NAACL-HLT 2019",
    year: 2019,
    description: "Présentation de BERT, modèle bidirectionnel qui a marqué une étape majeure en NLP",
    link: "https://aclanthology.org/N19-1423/"
  },
  {
    title: "Mastering the game of Go with deep neural networks and tree search",
    authors: ["David Silver", "Aja Huang", "Chris J. Maddison", "Arthur Guez"],
    journal: "Nature, vol. 529, p. 484-489",
    year: 2016,
    description: "AlphaGo\u00A0: premier programme à battre un joueur professionnel de go (le champion d'Europe Fan Hui, 5 à 0) sur un plateau complet\u00A0; le match contre Lee Sedol a eu lieu en mars 2016, après cet article",
    link: "https://www.nature.com/articles/nature16961"
  },
  {
    title: "Training language models to follow instructions with human feedback",
    authors: ["Long Ouyang", "Jeff Wu", "Xu Jiang", "Diogo Almeida"],
    journal: "Advances in Neural Information Processing Systems",
    year: 2022,
    description: "InstructGPT\u00A0: un modèle de langage affiné avec des retours humains (RLHF) pour suivre des consignes\u00A0; méthode reprise ensuite pour ChatGPT",
    link: "https://arxiv.org/abs/2203.02155"
  },
  {
    title: "Constitutional AI: Harmlessness from AI Feedback",
    authors: ["Yuntao Bai", "Saurav Kadavath", "Sandipan Kundu", "Amanda Askell"],
    journal: "arXiv preprint",
    year: 2022,
    description: "Méthode Constitutional AI développée par Anthropic pour entraîner des assistants IA plus sûrs et alignés",
    link: "https://arxiv.org/abs/2212.08073"
  },
  {
    title: "PaLM: Scaling Language Modeling with Pathways",
    authors: ["Aakanksha Chowdhery", "Sharan Narang", "Jacob Devlin", "Maarten Bosma"],
    journal: "Journal of Machine Learning Research, vol. 24",
    year: 2023,
    description: "Présentation de PaLM, modèle de langage Transformer de 540 milliards de paramètres entraîné avec le système Pathways de Google",
    link: "https://jmlr.org/papers/v24/22-1144.html"
  },
  {
    title: "Flamingo: a Visual Language Model for Few-Shot Learning",
    authors: ["Jean-Baptiste Alayrac", "Jeff Donahue", "Pauline Luc", "Antoine Miech"],
    journal: "Advances in Neural Information Processing Systems",
    year: 2022,
    description: "Modèle multimodal pionnier pour l'apprentissage few-shot combinant vision et langage",
    link: "https://arxiv.org/abs/2204.14198"
  },
  {
    title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    authors: ["Jason Wei", "Xuezhi Wang", "Dale Schuurmans", "Maarten Bosma"],
    journal: "Advances in Neural Information Processing Systems",
    year: 2022,
    description: "Technique de prompting chain-of-thought pour améliorer le raisonnement des LLMs",
    link: "https://arxiv.org/abs/2201.11903"
  },
  {
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    authors: ["Patrick Lewis", "Ethan Perez", "Aleksandra Piktus", "Fabio Petroni"],
    journal: "Advances in Neural Information Processing Systems",
    year: 2020,
    description: "Introduction du RAG (Retrieval-Augmented Generation) pour combiner génération et récupération d'informations",
    link: "https://arxiv.org/abs/2005.11401"
  },
  {
    title: "Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks",
    authors: ["Chelsea Finn", "Pieter Abbeel", "Sergey Levine"],
    journal: "International Conference on Machine Learning",
    year: 2017,
    description: "MAML\u00A0: algorithme d'apprentissage méta pour l'adaptation rapide des réseaux de neurones à de nouvelles tâches",
    link: "https://arxiv.org/abs/1703.03400"
  },
  {
    title: "Diffusion Models Beat GANs on Image Synthesis",
    authors: ["Prafulla Dhariwal", "Alex Nichol"],
    journal: "Advances in Neural Information Processing Systems",
    year: 2021,
    description: "Montre que des modèles de diffusion obtiennent de meilleurs échantillons que les GAN de l'époque sur ImageNet",
    link: "https://arxiv.org/abs/2105.05233"
  }
];
