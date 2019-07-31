import React from 'react';
import { object, string } from 'prop-types';
import { NewAccountForm } from '../../../../components';
import { withAuthSync } from '../../../../util/auth';

const NewSellerAccount = props => <NewAccountForm type="seller" {...props} />;

export default withAuthSync(NewSellerAccount)(null);

NewSellerAccount.propTypes = {
  error: object,
  token: string.isRequired
};
