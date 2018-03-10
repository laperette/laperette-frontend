// FETCH WRAPPER
const http = function(method, url, data, headers = {}) {
  const ENDPOINT_URL = 'http://localhost:8080/api/';
  return fetch(ENDPOINT_URL + url, {
    method: method.toUpperCase(),
    body: JSON.stringify(data), // send it as stringified json
    credentials: http.credentials, // to keep the session on the request
    headers: Object.assign(http.headers, headers) // extend the headers
  }).then(res => (res.ok ? res.json() : Promise.reject(res)));
};
// Defaults that can be globally overwritten
http.headers = {
  'csrf-token': window.csrf || '', // only if globally set, otherwise ignored
  Accept: 'application/json', // receive json
  'Content-Type': 'application/json' // send json,
};
// Convenient methods
['get', 'post', 'put', 'delete'].forEach(method => {
  http[method] = http.bind(null, method);
});
export default http;
