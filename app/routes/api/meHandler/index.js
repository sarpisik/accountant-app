module.exports = (req, res) => {
  console.log(req.method);

  res.json({
    user: {
      firstname: 'Neo',
      lastname: 'Anderson'
    }
  });
};
