import passport from 'passport';
import User from '../models/User';

/*var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};*/

export function register(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.role = req.body.role;
  user.setPassword(req.body.password);

  user.save(function(err) {
    if ( err && err.code === 11000 ) {
      res.status(409);
      res.json({
        "message" : "User already exists"
      });
      return;
    }
    
    if (err) {
      console.log(err);
      res.status(400);
      res.json({
        "message" : "Bad Request"
      });
      return;
    }
    
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
    
  });
}

export function login(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

}