import React, { PureComponent } from 'react';
import { string, object } from 'prop-types';
import { addWhiteSpace } from '../../../util/whiteSpaceHandlers';
import { inputDateFormat } from '../../../util/formatTime';
import { EDIT_INVOICE, DELETE_INVOICE } from '../../../constants/apiUrls';
import RegisterForm from '../Register';
import { authHeader } from '../../../util/auth';

export default class EditInvoiceForm extends PureComponent {
  static propTypes = {
    invoice: object,
    error: object,
    token: string.isRequired
  };

  editFormData = {
    inputs: [
      { label: 'date', type: 'date' },
      { label: 'no' },
      { label: 'title' },
      { label: 'tax Rate', type: 'number', max: 99 },
      { label: 'amount', type: 'number', max: 999999 }
    ],
    values: formatInvoiceDate(this.props.invoice),
    button: {
      text: 'Delete',
      request: {
        method: 'delete',
        url: '/' + DELETE_INVOICE,
        headers: authHeader(this.props.token),
        data: this.props.invoice ? { _id: this.props.invoice._id } : null
      }
    },
    request: {
      method: 'put',
      url: '/' + EDIT_INVOICE,
      headers: authHeader(this.props.token),
      data: this.props.invoice || null
    },
    title: 'Update Invoice',
    feedback: {
      onRegister: 'Invoice registered successfully.',
      onDelete: 'Invoice deleted successfully.'
    }
  };
  render() {
    return this.props.invoice ? (
      <RegisterForm {...this.editFormData} />
    ) : (
      this.props.error.message
    );
  }
}

function formatInvoiceDate(invoice) {
  if (invoice) {
    return Object.keys(invoice).reduce((prev, cur) => {
      let whiteSpacedKey = addWhiteSpace(cur);
      prev[whiteSpacedKey] =
        whiteSpacedKey === 'date'
          ? inputDateFormat(invoice[cur])
          : invoice[cur];
      return prev;
    }, {});
  }
  return null;
}
