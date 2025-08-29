import userMainData from "../mocks/userMock.js";

class UserScoreService {
  constructor(userId) {
    this.isProd = import.meta.env.VITE_IS_PROD;
    this.userId = userId;
  }

  async getData() {
    let data;

    if (this.isProd) {
      const response = await fetch(`http://localhost:3000/user/${this.userId}`);
      data = await response.json();
    } else {
      data = userMainData.find((user) => user.id == this.userId);
    }
    return this.formatter(data);
  }
  formatter(data) {
    const base = this.isProd ? data.data : data;

    let score = base?.todayScore ?? base?.score ?? 0;

    score = Number(score);
    if (Number.isNaN(score)) score = 0;
    if (score < 0) score = 0;
    if (score > 1) score = 1;

    const percent = Math.round(score * 100);

    return [
      { name: "score", value: percent, fill: "#FF0000" },
      { name: "rest", value: 100 - percent, fill: "#FBFBFB" },
    ];
  }
}

export default UserScoreService;
