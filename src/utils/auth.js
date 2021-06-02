import lockr from "lockr";

export default class Auth {
  static isLoggedIn() {
    return !!lockr.get("user");
  }

  static getUser() {
    return lockr.get("user");
  }

  static logIn(user) {
    lockr.set("user", user);
  }

  static logOut() {
    lockr.rm("user");
  }

  static getUnauthenticatedUser() {
    return lockr.get("unauthenticatedUser");
  }

  static setUnauthenticatedUser(user) {
    return lockr.set("unauthenticatedUser", user);
  }

  static setPlayer(lobbyCode, player) {
    return lockr.set(lobbyCode, player);
  }

  static getPlayer(lobbyCode) {
    return lockr.get(lobbyCode);
  }
}
