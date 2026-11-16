// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Contrat d'accès aux données des outils.
 *
 * Le site est 100 % statique : la seule implémentation est locale (`localCollection.ts`, stockage du navigateur).
 * Les composants ne parlent qu'à ces interfaces, jamais à `localStorage` : un backend pourrait être branché plus
 * tard en écrivant une autre implémentation de `DataSource` (requêtes vers une API), sans toucher aux composants.
 * Les méthodes sont asynchrones pour cette raison, même si le stockage local répond tout de suite.
 */

export interface StoredItem {
  id: string;
}

export interface Collection<T extends StoredItem> {
  /** Nom stable de la collection (clé d'export, nom de ressource d'une future API). */
  readonly name: string;
  /** Éléments, du plus récent au plus ancien. Les éléments illisibles ou invalides sont ignorés. */
  list(): Promise<T[]>;
  /** Ajoute un élément en tête ; remplace l'élément de même identifiant s'il existe. */
  add(item: T): Promise<void>;
  remove(id: string): Promise<void>;
  clear(): Promise<void>;
  /** Remplace tout le contenu (restauration d'une sauvegarde). */
  replaceAll(items: T[]): Promise<void>;
  /** Valide un élément venu de l'extérieur (fichier importé) ; null s'il est invalide. */
  parse(value: unknown): T | null;
}

/** Erreur lisible par le visiteur (stockage plein, désactivé, fichier invalide...). */
export class DataError extends Error {}
