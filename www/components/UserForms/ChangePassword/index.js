import React, { PureComponent } from 'react';
import RegisterForm from '../../AccountantForm/Register';
import { EDIT_USER } from '../../../constants/apiUrls.js';
import { signOut, authHeader } from '../../../util/auth';

export default class NewUserContainer extends PureComponent {
  registerFormData = {
    inputs: [
      {
        label: 'password',
        icon: 'lock',
        type: 'password',
        min: 4,
        max: 6
      },
      {
        label: 'confirm Password',
        icon: 'exclamation-triangle',
        type: 'password',
        min: 4,
        max: 6
      }
    ],
    request: {
      method: 'put',
      url: '/' + EDIT_USER,
      headers: authHeader(this.props.token),
      data: {} // Will be filled by inputs.
    },
    title: 'Change Password',
    feedback: {
      onRegister:
        'The password has been changed successfully. You will be redirect to sign in page.'
    }
  };

  onChangePassword = () => setTimeout(() => signOut(), 2000);

  render() {
    return (
      <RegisterForm
        onChangePassword={this.onChangePassword}
        {...this.registerFormData}
      />
    );
  }
}
