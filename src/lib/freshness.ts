// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Fraîcheur d'une date de contrôle (AAAA-MM-JJ). Une fiche dont le lien n'a pas été revu depuis
 * plus de trois mois ne doit plus être présentée comme vérifiée sans réserve.
 */
export const STALE_AFTER_DAYS = 90;

const parseDay = (date: string): number => Date.parse(`${date}T12:00:00Z`);

/**
 * Affiche une date AAAA-MM-JJ en JJ/MM/AAAA sans passer par un fuseau horaire : `toLocaleDateString`
 * sur un instant à midi UTC bascule au lendemain chez les visiteurs en UTC+12 et au-delà.
 */
export const formatIsoDay = (date: string): string => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : date;
};

/** Jours entiers écoulés depuis la date (négatif si elle est dans le futur). */
export const daysSince = (date: string, today: Date = new Date()): number =>
  Math.round((today.getTime() - parseDay(date)) / 86_400_000);

/** Vrai quand le contrôle daté est trop ancien pour être affiché sans avertissement. */
export const isStale = (date: string | undefined, today: Date = new Date(), maxDays = STALE_AFTER_DAYS): boolean =>
  date !== undefined && daysSince(date, today) > maxDays;
