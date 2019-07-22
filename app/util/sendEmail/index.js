const nodemailer = require('nodemailer'),
  Email = require('email-templates'),
  {
    EMAIL_HOST,
    EMAIL_AUTH_USER,
    EMAIL_AUTH_PASSWORD,
    EMAIL_SENDER
  } = process.env,
  transport = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_AUTH_USER,
      pass: EMAIL_AUTH_PASSWORD
    }
  }),
  cc = 'contact@sarpisik.com';

module.exports = (template, to, subject, name, verifyLink, url) => {
  const email = new Email({
    transport,
    send: true,
    preview: false
  });

  return email.send({
    template,
    message: {
      from: EMAIL_SENDER,
      to,
      cc,
      subject
    },
    locals: {
      name,
      verifyLink,
      imageBaseUrl: url + '/images'
    }
  });
};
