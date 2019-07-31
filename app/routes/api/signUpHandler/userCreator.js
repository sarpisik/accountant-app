const { withValidatorError } = require('../../../middleware'),
  { User } = require('../../../models'),
  { sendEmail, getUrl } = require('../../../util');

const userCreator = (req, res) => {
  const { email, userName, password } = req.body;
  // Create an user object with trimmed and escaped data.
  new User({
    email,
    userName,
    password
  }).save((err, createdAcc) => {
    if (err)
      // API error.
      return res.status(500).send({
        type: 'reject',
        message: err.errmsg ? err.errmsg : err.message
      });

    // Successful - Send validation email.
    const url = getUrl(req);
    const verifyLink = url + '/validate/' + createdAcc._id;
    sendEmail(
      'signUp', // Email template.
      email, // Receiver email.
      'Email Validation', // Email subject.
      userName,
      verifyLink,
      url // Base url for image src of email template
    )
      .then(() => {
        // Email sent success.
        res.status(200).send({
          type: 'success',
          message: `A confirmation email has been sent to ${email}. Please confirm your email before starting to use the application.`
        });
      })
      .catch(err => {
        // Email sent failed.
        console.error(err);

        res.status(500).send({
          type: 'reject',
          message: 'Failed on sending confirmation e-mail.'
        });
      });
  });
};

module.exports = withValidatorError(userCreator);
