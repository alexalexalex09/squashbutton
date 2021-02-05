function findOrCreateUser(req, res, next) {
  if (req.user) {
    User.findOne({ profile_id: req.user.id }).exec((err, curUser) => {
      if (curUser) {
        if (typeof curUser.name == "undefined") {
          curUser.name = req.user.displayName;
          curUser.save().then(() => {
            res.locals.username = curUser.name;
            //console.log("Name is " + res.locals.username);
            next();
          });
        } else {
          res.locals.username = curUser.name;
        }
      } else {
        res.locals.username = "";
        newUser = {
          profile_id: req.user.id,
          name: req.user.displayName,
        };
        res.locals.username = req.user.displayName;
        curUser = new User(newUser);
        curUser.save().then(() => {
          next();
        });
      }
    });
  }
}
module.exports = findOrCreateUser;
