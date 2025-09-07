import userMainData from "../mocks/userMock.js";

/**
 * Service : Score utilisateur (pour le RadialBarChart).
 *
 * Rôle :
 * - Bascule entre **API** et **mocks** selon 'VITE_IS_PROD'.
 * - Récupère le score ('todayScore' ou 'score') pour un 'userId' donné.
 * - Normalise le score en pourcentage 0..100 et renvoie **un seul slice** pour Recharts.
 *
 * Sortie pour le chart : un tableau d'UN objet (un seul arc) ; la valeur "restante" est gérée par 'background' côté chart.
 */

class UserScoreService {
  /**
   * @param {number} userId - Identifiant utilisateur (depuis /user/:id).
   */

  constructor(userId) {
    /** @type {boolean} true => API ; false => mocks */
    this.isProd = import.meta.env.VITE_IS_PROD;
    /** @type {number} */
    this.userId = userId;
  }

  /**
   * Récupère le score (API ou mocks) puis le formate en slice pour le chart.
   * - Si 'shouldFormatData' est true (par défaut), renvoie les données formatées pour le chart.
   * - Sinon, renvoie la donnée "brute" de la source (API: 'data.data', mocks: l'objet mock).
   *
   * @param {boolean} [shouldFormatData=true] - Formater les données pour le chart ou non.
   * @returns {Promise<ScoreSlice[] | any>} Données formatées (par défaut) ou brutes si shouldFormatData=false.
   */

  async getData(shouldFormatData = true) {
    let data;

    if (this.isProd) {
      // API locale du projet OC (endpoint root /user/:id)
      const response = await fetch(`http://localhost:3000/user/${this.userId}`);
      data = await response.json();
    } else {
      data = userMainData.find((user) => user.id == this.userId);
    }

    // Selon le besoin, on renvoit le format chart (par défaut) ou la donnée brute normalisée.
    if (shouldFormatData) {
      return this.formatter(data);
    } else {
      // En API, la donnée utile est dans 'data.data' ; en mocks, c'est l'objet tel quel.
      return this.isProd ? data.data : data;
    }
  }

  /**
   * Extrait le score (0..1), le clamp dans [0..1], puis le convertit en pourcentage.
   * Renvoie un tableau d'un seul objet pour alimenter le RadialBarChart.
   *
   * @param {{ data?: any }|any} data - Payload brut (API ou mocks)
   * @returns {ScoreSlice[]} Tableau avec un seul slice {name, value (0..100), fill}
   */

  formatter(data) {
    // API -> data.data ; Mocks -> data
    const base = this.isProd ? data.data : data;

    // Certaines versions du backend exposent `todayScore`, d'autres `score`
    let score = base?.todayScore ?? base?.score ?? 0;

    // Sécurisation : number + clamp 0..1
    score = Number(score);
    if (Number.isNaN(score)) score = 0;
    if (score < 0) score = 0;
    if (score > 1) score = 1;

    // Pourcentage entier (arrondi) pour l'affichage (ex: 0.296 -> 30)
    const percent = Math.round(score * 100);

    // Un seul slice : l'arc rouge. Le “reste” du cercle est un background côté chart.
    return [{ name: "score", value: percent, fill: "#FF0000" }];
  }
}

export default UserScoreService;
