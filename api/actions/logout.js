export default function logout(req) {
  return new Promise((resolve) => {
    req.logout();
    return resolve(null);
  });
}
