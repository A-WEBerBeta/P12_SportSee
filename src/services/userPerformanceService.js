import userPerformanceMock from "../mocks/userPerformanceMock.js";

/**
 * Service: Performance utilisateur (données pour le RadarChart)
 *
 * Rôle :
 * - Bascule automatiquement entre **API** et **mocks** selon 'VITE_IS-PROD'.
 * - Récupère les mesures de performance par "kind" puis les **traduit** et **réordonne** pour correspondre aux libellés FR et à l'ordre visuel attendu dans le radar.
 */

class UserPerformanceService {
  /**
   * @param {number} userId - Identifiant utilisateur (depuis /user/:id)
   */
  constructor(userId) {
    /** @type {boolean} true => API ; false => mocks */
    this.isProd = import.meta.env.VITE_IS_PROD;
    /** @type {number} */
    this.userId = userId;
  }

  /**
   * Récupère les données "performance" (API ou mocks) puis les formate.
   * @returns {Promise<PerformancePoint[]>}
   */

  async getData() {
    let userInfo;

    if (this.isProd) {
      // Endpoint "performance" de l'API locale du projet OC
      const response = await fetch(
        `http://localhost:3000/user/${this.userId}/performance`
      );
      userInfo = await response.json();
    } else {
      userInfo = userPerformanceMock.find((user) => user.userId == this.userId);
    }
    return this.formatter(userInfo);
  }

  /**
   * Formatte les points pour le RadarChart :
   * - Mappe les "kinds" numériques -> clés texte via 'kind'.
   * - Traduit les clés EN -> libellés FR via 'translation'.
   * - Réordonne selon 'order' pour l'affichage.
   *
   * @param {{ data?: { kind: Record<number,string>, data: Array<{ value:number, kind:number }> }, kind?: Record<number,string>, data?: Array<{ value:number, kind:number }> }} userInfo
   * @returns {PerformancePoint[]}
   */

  formatter(userInfo) {
    // API -> userInfo.data.kind / userInfo.data.data
    // Mocks -> userInfo.kind / userInfo.data
    const kind = this.isProd ? userInfo.data.kind : userInfo.kind;
    const sessions = this.isProd ? userInfo.data.data : userInfo.data;

    // Ordre final des axes (sens horaire) pour coller à la maquette Figma
    const order = [
      "Intensité",
      "Vitesse",
      "Force",
      "Endurance",
      "Énergie",
      "Cardio",
    ];

    // Traduction depuis les clés EN de l'API vers les libellés FR utilisés par le chart
    const translation = {
      cardio: "Cardio",
      energy: "Énergie",
      endurance: "Endurance",
      strength: "Force",
      speed: "Vitesse",
      intensity: "Intensité",
    };

    // On convertit chaque point brut en { subject, value } :
    // - item.kind (numérique) -> kind[item.kind] (clé EN) -> translation[...] (libéllé FR)
    const formatted = sessions.map((item) => ({
      subject: translation[kind[item.kind]],
      value: item.value,
    }));

    // Puis on renvoie les points **réordonnés** selon 'order'.
    return order.map((label) =>
      formatted.find((session) => session.subject === label)
    );
  }
}

export default UserPerformanceService;
