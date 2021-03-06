const forgotPassword = require('validators/forgotPassword');

const { NoUserForEmail } = require('errors/user');

exports.validate = async function({ email, user }) {
  await forgotPassword.validate({ email });
  if (!user) {
    throw new NoUserForEmail();
  }
};
