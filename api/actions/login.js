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

        const tempUser = user;

        // clean up user
        delete tempUser._id;
        delete tempUser._rev;
        delete tempUser.password;
        delete tempUser.token;

        tempUser.username = req.body.username;

        const sessionUser = tempUser;

        req.session.user = sessionUser;
        return resolve(sessionUser);

      });

    })(req);

  });
}
