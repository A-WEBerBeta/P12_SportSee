import userPerformanceMock from "../mocks/userPerformanceMock.js";

class UserPerformanceService {
  constructor(userId) {
    this.isProd = import.meta.env.VITE_IS_PROD;
    this.userId = userId;
  }

  async getData() {
    let userInfo;

    if (this.isProd) {
      const response = await fetch(
        `http://localhost:3000/user/${this.userId}/performance`
      );
      userInfo = await response.json();
    } else {
      userInfo = userPerformanceMock.find((user) => user.userId == this.userId);
    }
    return this.formatter(userInfo);
  }

  formatter(userInfo) {
    const kind = this.isProd ? userInfo.data.kind : userInfo.kind;
    const sessions = this.isProd ? userInfo.data.data : userInfo.data;

    const order = [
      "Intensité",
      "Vitesse",
      "Force",
      "Endurance",
      "Énergie",
      "Cardio",
    ];

    const translation = {
      cardio: "Cardio",
      energy: "Énergie",
      endurance: "Endurance",
      strength: "Force",
      speed: "Vitesse",
      intensity: "Intensité",
    };

    const formatted = sessions.map((item) => ({
      subject: translation[kind[item.kind]],
      value: item.value,
    }));

    return order.map((label) =>
      formatted.find((session) => session.subject === label)
    );
  }
}

export default UserPerformanceService;
