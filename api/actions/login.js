import passport from 'passport';

export default function login(req) {

  return new Promise((resolve, reject) => {

    passport.authenticate('local', (err, user, info) => {

      if (err) {
        return reject(err);
      }

      if (!user) {
        // couldn't authenticate, send back the reason
        return reject(info.message);
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
