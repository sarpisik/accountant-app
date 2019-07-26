import React, { PureComponent } from 'react';
import Form from '../../../../components/AccountantForm';

export default class NewInvoice extends PureComponent {
  constructor(props) {
    super(props);

    this.data = {
      inputs: [{ label: 'no' }, { label: 'title' }],
      request: {
        method: 'post',
        url: '/api/account/new',
        data: { type: 'seller' }
      }
    };
  }

  render() {
    return <Form {...this.data} />;
  }
}
