export default function loadAuth(req) {
  return new Promise((resolve) => {

    if (req.isAuthenticated()) {
      return resolve(req.session.user.email || null);
    }

    return resolve(null);

  });
}
