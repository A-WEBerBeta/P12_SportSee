import userActivityMock from "../mocks/userActivityMock";

/**
 * Service : activité quotidienne d'un utilisateur
 *
 * Rôle :
 * - Bascule automatiquement entre les **mocks** et l'**API** selon 'VITE_IS_PROD'.
 * - Récupère les sessions d'activité (poids, calories) pour un 'userId' donné.
 * - Normalise le champ 'day' côté **API** (index 1..N) pour coller au design.
 *
 * Notes de données :
 * - En **prod**, le backend renvoie un objet '{ data: { sessions: ActivitySession[] } }'.
 * - En **dev**, le mock est consulté puis renvoyé tel quel par 'formatter'.
 */

class UserActivityService {
  /**
   * @param {number} userId - Identifiant utilisateur (provenant de /user/:id).
   */

  constructor(userId) {
    /** @type {boolean} - true -> API ; false -> mocks */
    const raw = import.meta.env.VITE_IS_PROD;
    this.isProd = raw === true || raw === "true";
    /** @type {number} */
    this.userId = userId;
  }

  /**
   * Récupère les données d'activité (API ou mocks) puis les formate.
   * @returns {Promise<ActivitySession[]>} tableau des sessions formatées pour le chart.
   */

  async getData() {
    let data;

    if (this.isProd) {
      // API locale du projet OC (endpoint "activity")
      const response = await fetch(
        `http://localhost:3000/user/${this.userId}/activity`
      );
      data = await response.json();
    } else {
      // On cherche dans le mock la première entrée dont l'userId correspond à 'this.userId'.
      // .find(...) parcourt le tableau et retourne le premier élément qui vérifie la condition.
      // S'il ne trouve rien, il retourne 'undefined'.
      data = userActivityMock.find((user) => user.userId == this.userId);
    }
    return this.formatter(data);
  }

  /**
   * Formatte les données pour le BarChart.
   * - En **prod** : on normalise 'day' en index 1..N (au lieu d'une date string).
   * - En **dev** : on renvoie la structure telle quelle (mocks déjà prêts pour le chart).
   *
   * @param {any} data - Payload brut (API ou mocks)
   * @returns {ActivitySession[]} Sessions prêtes pour Recharts.
   */

  formatter(data) {
    // On récupère le bon tableau de sessions selon la source (mocks ou API)
    const sessions = this.isProd ? data?.data?.sessions : data?.sessions;

    // On normalise : day = index 1..N quelle que soit la source
    return (sessions ?? []).map((session, index) => ({
      ...session,
      day: index + 1,
    }));
  }
}

export default UserActivityService;
