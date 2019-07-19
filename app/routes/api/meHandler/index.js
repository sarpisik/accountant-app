module.exports = (req, res) => {
  res.json({
    user: {
      firstname: 'Neo',
      lastname: 'Anderson'
    }
  });
};
