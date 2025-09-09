/**
 * Vérifie un tableau non vide + la présence de clés sur la 1ère ligne.
 * Renvoie "" si OK, sinon un message d'erreur prêt à afficher.
 */
export function checkArrayFirstRowKeys(data, needed, ctx) {
  if (!Array.isArray(data) || data.length === 0) {
    return `${ctx} : aucune donnée.`;
  }

  const first = data[0] ?? {};
  const missing = needed.filter((key) => first[key] == null);
  if (missing.length) {
    return `${ctx} : champ(s) manquant(s) -> ${missing.join(", ")}`;
  }
  return "";
}

/** Vérifie le format du score : [{ value: 0..100 }]. */
export function checkScore(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return "Score : aucune donnée.";
  }
  const v = Number(data[0]?.value);
  if (Number.isNaN(v) || v < 0 || v > 100) {
    return "Score : valeur invalide (attendu 0..100).";
  }
  return "";
}

/** Vérifie keyData (stat cards). */
export function checkKeyData(keyData) {
  if (!keyData || typeof keyData !== "object") {
    return "Données utilisateur : 'keyData' introuvable.";
  }
  const needed = [
    "calorieCount",
    "proteinCount",
    "carbohydrateCount",
    "lipidCount",
  ];
  const missing = needed.filter((k) => keyData[k] == null);
  if (missing.length) {
    return `keyData : champ(s) manquant(s) -> ${missing.join(", ")}`;
  }
  return "";
}
