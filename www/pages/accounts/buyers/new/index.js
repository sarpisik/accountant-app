import React from 'react';
import { NewAccountForm } from '../../../../components';
import { withAuthSync } from '../../../../util/auth';
import { array, object, string } from 'prop-types';

const NewBuyerAccount = props => <NewAccountForm type="buyer" {...props} />;

export default withAuthSync(NewBuyerAccount)(null);

NewBuyerAccount.propTypes = {
  accounts: array,
  error: object,
  token: string
};
