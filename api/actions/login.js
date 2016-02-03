import passport from 'passport';

export default function login(req) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (err) {
        return reject(err);
      }

      if (!user) {
        // couldn't authenticate, send back the reason
        return reject('Either username or password is incorrect');
      }

      req.logIn(user, (loginErr) => {
        if (loginErr) {
          return reject(loginErr);
        }

        // clean up user
        delete user._rev;
        delete user.password;
        delete user.token;

        return resolve(user);
      });
    })(req);
  });
}
