import React, { PureComponent } from 'react';
import { oneOf } from 'prop-types';
import { CREATE_ACCOUNT } from '../../../../constants/apiUrls';
import RegisterForm from '../../Register';

export default class NewInvoice extends PureComponent {
  static propTypes = {
    type: oneOf(['seller', 'buyer'])
  };
  constructor(props) {
    super(props);

    this.registerFormData = {
      inputs: [{ label: 'no' }, { label: 'title' }],
      request: {
        method: 'post',
        url: '/' + CREATE_ACCOUNT,
        data: { type: props.type }
      },
      title: 'Register A New Account',
      feedback: {
        onRegister: 'Account registered successfully.',
        onDelete: 'Account deleted successfully.'
      }
    };
  }

  render() {
    return <RegisterForm {...this.registerFormData} />;
  }
}
