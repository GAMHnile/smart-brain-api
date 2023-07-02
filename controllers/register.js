const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json("incorrect registration details");
  }

  const hash = bcrypt.hashSync(password);

  db.transaction((trx) => {
    trx
      .insert({
        email: email,
        hash: hash,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            name: name,
            email: loginEmail[0],
            joined: new Date(),
          })
          .then((newUser) => {
            res.json(newUser[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => {
    console.log(err);
    return res.status(400).json("unable to register");
  });
};

module.exports = {
  handleRegister: handleRegister,
};
