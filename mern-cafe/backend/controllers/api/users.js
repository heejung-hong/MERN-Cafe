module.exports = {
  create
};

function create(req, res) {
  // Baby step...
  res.json({
    // sending object with user property of name and email
    user: {
      name: req.body.name,
      email: req.body.email
    }
  });
}