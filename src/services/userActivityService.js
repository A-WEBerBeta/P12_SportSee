import userActivityMock from "../mocks/userActivityMock";

class UserActivityService {
  constructor(userId) {
    this.isProd = import.meta.env.VITE_IS_PROD;
    this.userId = userId;
  }

  async getData() {
    let data;

    if (this.isProd) {
      const response = await fetch(
        `http://localhost:3000/user/${this.userId}/activity`
      );
      data = await response.json();
    } else {
      data = userActivityMock.find((user) => user.userId == this.userId);
    }
    return this.formatter(data);
  }

  formatter(data) {
    if (this.isProd) {
      return data.data.sessions.map((session, index) => ({
        ...session,
        day: index + 1,
      }));
    } else {
      return data;
    }
  }
}

export default UserActivityService;
