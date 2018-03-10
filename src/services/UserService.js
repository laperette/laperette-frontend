import http from './http';

export class UserService {
  _instance;
  static getInstance() {
    if (!this._instance) {
      this._instance = new UserService();
    }
    return this._instance;
  }
  get isLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }
  user = {
    isAuthenticated: this.isLoggedIn
  };

  async login(credentials) {
    return http.post('login', credentials).then(resp => {
      console.log('ok login', resp);
      this.user.isAuthenticated = true;
      localStorage.setItem('token', resp.token);
      const { email, name, role, id } = resp.user;
      Object.assign(this.user, { email, name, role, id });
      return this.user.isAuthenticated;
    });
  }
  logout() {
    localStorage.removeItem('token');
    this.user = { isAuthenticated: false };
  }
}
