import React, { PureComponent } from 'react';
import { oneOf } from 'prop-types';
import NewInvoiceLayout from '../NewInvoiceLayout/index.jsx';
import { CREATE_INVOICE } from '../../../../constants/apiUrls.js';
import { authHeader } from '../../../../util/auth.js';

export default class NewInvoiceContainer extends PureComponent {
  static propTypes = {
    type: oneOf(['purchase', 'sale'])
  };

  state = {
    activeItem: '1',
    account: null
  };

  validatorFormData = {
    inputs: [{ label: 'no' }],
    request: {
      method: 'post',
      headers: authHeader(this.props.token),
      url: '/api/account',
      data: { keys: '_id' }
    }
  };

  registerFormData = {
    inputs: [
      { label: 'date', type: 'date' },
      { label: 'no' },
      { label: 'title' },
      { label: 'tax Rate', type: 'number', max: 99 },
      { label: 'amount', type: 'number', max: 999999 }
    ],
    request: {
      method: 'post',
      headers: authHeader(this.props.token),
      url: '/' + CREATE_INVOICE,
      data: { type: this.props.type }
    },
    title: 'Register A New Invoice',
    feedback: {
      onRegister: 'Invoice registered successfully.',
      onDelete: 'Invoice deleted successfully.'
    }
  };

  handleAccountRequest = async ({ account: { _id } }) => {
    await this.setState({ account: _id, activeItem: '2' });
    this.registerFormData.request.data.account = _id;
  };

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  render() {
    return (
      <NewInvoiceLayout
        onToggle={this.toggle}
        validatorFormData={this.validatorFormData}
        validatorFormOnSuccess={this.handleAccountRequest}
        registerFormData={this.registerFormData}
        {...this.state}
      />
    );
  }
}
