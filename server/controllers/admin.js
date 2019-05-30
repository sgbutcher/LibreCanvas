import User from '../models/User';

export function getAllUsers(req, res) {
  if (req.payload.role !== "admin") {
    res.status(401).json({
      "message" : "UnauthorizedError: admin only"
    });
  } else {
    User.find().exec(function(err, users) {
    res.status(200).json(users);
  });
  }
}

export function getUserById(req, res) {
  if (req.payload.role !== "admin") {
    res.status(401).json({
      "message" : "UnauthorizedError: admin only"
    });
  } else {
    User.findById(req.params.id, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
        }
    });
  }
}

export function editUser(req, res) {
  if (req.payload.role !== "admin") {
    res.status(401).json({
      "message" : "UnauthorizedError: admin only"
    });
  } else {
    User.findById(req.params.id, (err, user) => {
        if (!user)
            return next(new Error('Could not load Document'));
        else {
            user.name = req.body.name;
            user.email = req.body.email;
            user.role = req.body.role;

            user.save().then(user => {
                res.json('Edit done');
            }).catch(err => {
                res.status(400).send('Edit failed');
            });
        }
    });
  }
}

export function deleteUser(req, res) {
  if (req.payload.role !== "admin") {
    res.status(401).json({
      "message" : "UnauthorizedError: admin only"
    });
  } else {
    User.findByIdAndRemove({_id: req.params.id}, (err, user) => {
        if (err){
          res.json(err);
        } else {
            res.json('Removed successfully');
        }
    });
  }
}