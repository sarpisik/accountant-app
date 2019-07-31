import React, { PureComponent } from 'react';
import RegisterForm from '../../AccountantForm/Register';
import { SIGNIN_USER } from '../../../constants/apiUrls.js';
import { signIn } from '../../../util/auth';

export default class SignInContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.registerFormData = {
      inputs: [
        { label: 'email', icon: 'envelope', type: 'email' },
        {
          label: 'password',
          icon: 'lock',
          type: 'password',
          min: 4,
          max: 6
        }
      ],
      request: {
        method: 'post',
        url: '/' + SIGNIN_USER,
        data: {} // Will be filled by inputs.
      },
      title: 'Sign In',
      feedback: {
        onRegister: 'Sign In succeed'
      },
      onSignIn: ({ token }) => signIn(token)
    };
  }

  render() {
    return <RegisterForm {...this.registerFormData} />;
  }
}
