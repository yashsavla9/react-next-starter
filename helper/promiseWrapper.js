export default function wrap(promise) {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [err]);
}
