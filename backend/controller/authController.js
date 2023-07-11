
exports.login = async (req, res) => {
  const { username, name, email, password } = req.body;
  if(username === null || username.length < 5) return res.send({error: "username needs to have 5 letters"});
  if((name === null || name.length < 3)) return res.send({error: "name needs to be more than 3 letters"});
};