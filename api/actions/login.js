import passport from 'passport';

export default function login(req) {

  return new Promise((resolve, reject) => {

    passport.authenticate('local', (err, user, info) => {

      if (err) {
        return reject(err);
      }

      if (!user) {
        console.log(info);
        // couldn't authenticate, send back the reason
        return reject(info.message);
      }

      req.logIn(user, (loginErr) => {
        if (loginErr) {
          return reject(loginErr);
        }

        const sessionUser = {
          username: req.body.username
        };
        req.session.user = sessionUser;
        return resolve(user);

      });

    })(req);

  });
}
