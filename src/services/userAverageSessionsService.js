import userAverageSessionsMock from "../mocks/userAverageSessionsMock";

/**
 * Service : Durée moyenne des sessions (1..7 -> minutes)
 *
 * Rôle :
 * - Bascule automatiquement entre **API** et **mocks** selon 'VITE_IS_PROD'.
 * - Formatte les données et ajoute 2 "fausses" sessions en bord (jours 0 et 8) pour lisser la courbe au début/fin (évite l'effet "coupé net" sur le LineChart).
 */

class UserAverageSessionsService {
  /**
   *
   * @param {number} userId - Identifiant utilisateur (depuis /user/:id)
   */
  constructor(userId) {
    /** @type {boolean} true -> API ; false -> mocks */
    this.isProd = import.meta.env.VITE_IS_PROD;
    /** @type {number} */
    this.userId = userId;
  }
  /**
   * Récupère les sessions (API ou mocks) puis les formate pour le chart.
   * @returns {Promise<Array<AverageSession>>}
   */

  async getData() {
    let data;

    if (this.isProd) {
      // Endpoint "average-sessions" de l'API locale du projet OC
      const response = await fetch(
        `http://localhost:3000/user/${this.userId}/average-sessions`
      );
      data = await response.json();
    } else {
      data = userAverageSessionsMock.find((user) => user.userId == this.userId);
    }
    return this.formatter(data);
  }

  /**
   * Uniformise la structure et injecte des points fictifs en bord de courbe.
   * @param {{data?: {sessions: AverageSession[]}}|{sessions: AverageSession[]}} data
   * @returns {Array<AverageSession>}
   */

  formatter(data) {
    // API -> data.data.sessions ; Mocks -> data.sessions
    const sessions = this.isProd ? data.data.sessions : data.sessions;

    return this.formatSessionsWithFakeEdges(sessions);
  }

  /**
   * Insère 2 "fausses" sessions :
   * - une AVANT le jour 1 (day: 0) avec la même durée que la 1ère vraie session
   * - une APRÈS le jour 7 (day: 8) avec la même durée que la dernière vraie session
   *
   * Pourquoi ?
   * - Avec une courbe lissée (type="natural"/"monotone"), sans ces points, le tracé démarre/termine de façon tronquée au bord.
   * - Ces points d'ancrage donnent un rendu visuellement plus fluide, tout en restant non affichés sur l'axe (ne montrent pas les jours 0 et 8).
   *
   * @param {AverageSession[]} sessions
   * @returns {AverageSession[]}²
   */

  formatSessionsWithFakeEdges(sessions) {
    const first = sessions[0];
    const last = sessions[sessions.length - 1];

    const fakeStart = {
      day: 0, // avant L
      sessionLength: first.sessionLength,
    };

    const fakeEnd = {
      day: 8, // après D
      sessionLength: last.sessionLength,
    };

    // On renvoie : [0, 1..7, 8]
    return [fakeStart, ...sessions, fakeEnd];
  }
}

export default UserAverageSessionsService;
