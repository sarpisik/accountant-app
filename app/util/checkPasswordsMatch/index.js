module.exports = (value, { req }) => {
  // If passwords do not match, throw error.
  // Else, return matched password
  if (value !== req.body.password2) {
    throw new Error("Passwords don't match");
  } else {
    return value;
  }
};
