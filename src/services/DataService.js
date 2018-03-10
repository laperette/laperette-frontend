import http from './http';

export class DataService {
  _instance;
  static getInstance() {
    if (!this._instance) {
      this._instance = new DataService();
    }
    return this._instance;
  }

  fetchBookings() {
    return http.get('bookings', undefined, {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
  }
}
