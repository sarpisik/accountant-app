import React, { PureComponent } from 'react';
import { oneOf } from 'prop-types';
import { CREATE_ACCOUNT } from '../../../../constants/apiUrls';
import RegisterForm from '../../Register';
import { authHeader } from '../../../../util/auth';

export default class NewInvoice extends PureComponent {
  static propTypes = {
    type: oneOf(['seller', 'buyer'])
  };
  registerFormData = {
    inputs: [{ label: 'no' }, { label: 'title' }],
    request: {
      method: 'post',
      headers: authHeader(this.props.token),
      url: '/' + CREATE_ACCOUNT,
      data: { type: this.props.type }
    },
    title: 'Register A New Account',
    feedback: {
      onRegister: 'Account registered successfully.',
      onDelete: 'Account deleted successfully.'
    }
  };

  render() {
    return <RegisterForm {...this.registerFormData} />;
  }
}
