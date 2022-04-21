var bCrypt = require('bcrypt');




    module.exports = function (passport, auth) {
        var Auth = auth;
        
        var LocalStrategy = require('passport-local').Strategy;
    

    
    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy(
           
        {

            // by default, local strategy uses username and password, we will override with email

            usernameField: 'email',

            passwordField: 'password',

            passReqToCallback: true // allows us to pass back the entire request to the callback

        },


        function (req, email, password, done) {

            var Auth = auth;

            var isValidPassword = function (userpass, password) {

                return bCrypt.compareSync(password, userpass);

            }
            Auth.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                if (!user) {

                    return done(null, false);

                }

                if (!isValidPassword(user.hash, password)) {

                    return done(null, false);

                }


                var userinfo = user.get();
                return done(null, userinfo);


            }).catch(function (err) {

                console.log("Error:", err);

                return done(null, false);

            });


        }

    ));
    //serialize
    passport.serializeUser(function (auth, done) {
       done(null, auth.id)

    });

    // deserialize user 
    passport.deserializeUser(function (id, done) {
        Auth.findByPk(id).then(function (user) {

            if (user) {

                done(null, user.get());

            } else {

                done(user.errors, null);

            }

        });

    });


}
