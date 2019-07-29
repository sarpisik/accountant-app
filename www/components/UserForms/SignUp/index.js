import React, { PureComponent } from 'react';
import RegisterForm from '../../AccountantForm/Register';
import { CREATE_USER } from '../../../constants/apiUrls.js';

export default class NewUserContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.registerFormData = {
      inputs: [
        { icon: 'user', label: 'your name' },
        { label: 'your email', icon: 'envelope', type: 'email' },
        {
          label: 'your password',
          icon: 'lock',
          type: 'password',
          min: 4,
          max: 6
        },
        {
          label: 'confirm your password',
          icon: 'exclamation-triangle',
          type: 'password',
          min: 4,
          max: 6
        }
      ],
      request: {
        method: 'post',
        url: '/' + CREATE_USER,
        data: {} // Will be filled by inputs.
      },
      title: 'Sign Up',
      feedback: {
        onRegister: 'A confirmation e-mail sent successfully.'
        // onDelete: 'Invoice deleted successfully.'
      }
    };
  }

  render() {
    return <RegisterForm {...this.registerFormData} />;
  }
}
