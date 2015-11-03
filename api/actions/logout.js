export default function logout(req) {
  return new Promise((resolve) => {
    req.logout();
    req.session.destroy(() => {
      req.session = null;
      return resolve(null);
    });
  });
}
