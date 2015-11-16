export default function loadAuth(req) {
  return new Promise((resolve) => {

    if (req.isAuthenticated()) {
      return resolve(req.user);
    }

    return resolve(null);

  });
}
