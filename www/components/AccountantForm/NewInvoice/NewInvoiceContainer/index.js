import React, { PureComponent } from 'react';
import { oneOf } from 'prop-types';
import NewInvoiceLayout from '../NewInvoiceLayout/index.jsx';

export default class NewInvoiceContainer extends PureComponent {
  static propTypes = {
    type: oneOf(['purchase', 'sale'])
  };
  constructor(props) {
    super(props);

    this.validatorFormData = {
      inputs: [{ label: 'no' }],
      request: {
        method: 'post',
        url: '/api/account',
        data: { keys: '_id' }
      }
    };

    this.registerFormData = {
      inputs: [
        { label: 'date', type: 'date' },
        { label: 'no' },
        { label: 'title' },
        { label: 'tax Rate', type: 'number', max: 99 },
        { label: 'amount', type: 'number', max: 999999 }
      ],
      request: {
        method: 'post',
        url: '/api/invoice/new',
        data: { type: props.type }
      }
    };

    this.state = {
      activeItem: '1',
      account: null
    };
  }

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
