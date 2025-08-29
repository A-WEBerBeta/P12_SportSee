import userAverageSessionsMock from "../mocks/userAverageSessionsMock";

class UserAverageSessionsService {
  constructor(userId) {
    this.isProd = import.meta.env.VITE_IS_PROD;
    this.userId = userId;
  }

  async getData() {
    let data;

    if (this.isProd) {
      const response = await fetch(
        `http://localhost:3000/user/${this.userId}/average-sessions`
      );
      data = await response.json();
    } else {
      data = userAverageSessionsMock.find((user) => user.userId == this.userId);
    }
    return this.formatter(data);
  }

  formatter(data) {
    const sessions = this.isProd ? data.data.sessions : data.sessions;

    return this.formatSessionsWithFakeEdges(sessions);
  }

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

    return [fakeStart, ...sessions, fakeEnd];
  }
}

export default UserAverageSessionsService;
