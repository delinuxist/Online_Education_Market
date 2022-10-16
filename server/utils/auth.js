const bcrypt = require("bcrypt");

//hashing the password before saving

exports.hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

//comparing inputed password with hashed Password
exports.comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword); //boolean value
};
