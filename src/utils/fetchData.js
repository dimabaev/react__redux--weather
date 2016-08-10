export default function fetchData(URL, callback) {
  fetch(URL)
  .then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response.json()
    } else {
      throw new Error(response.statusText);
    }
  })
  .then (json  => callback(null, json))
  .catch(error => callback(error));
}