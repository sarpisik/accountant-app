import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import apiHandler from '../../../util/apiHandler';
import { addWhiteSpace } from '../../../util/whiteSpaceHandlers';
import formatTime from '../../../util/formatTime';
import {
  GET_INVOICE,
  EDIT_INVOICE,
  DELETE_INVOICE
} from '../../../constants/apiUrls';
import { RegisterForm } from '../../../components/AccountantForm';

export default class EditInvoice extends PureComponent {
  static propTypes = {
    invoice: PropTypes.object,
    error: PropTypes.object
  };
  static async getInitialProps({ req, query: { _id } }) {
    try {
      const {
        data: { invoice }
      } = await apiHandler(
        {
          method: 'post',
          url: GET_INVOICE,
          data: {
            type: 'purchase',
            searchBy: { _id },
            keys: 'date no account title taxRate amount _id'
          }
        },
        req
      );
      return { invoice };
    } catch (error) {
      console.error(error);

      return { error };
    }
  }
  constructor(props) {
    super(props);

    this.editFormData = {
      inputs: [
        { label: 'date', type: 'date' },
        { label: 'no' },
        { label: 'title' },
        { label: 'tax Rate', type: 'number', max: 99 },
        { label: 'amount', type: 'number', max: 999999 }
      ],
      values: formatInvoiceDate(props.invoice),
      button: {
        text: 'Delete',
        request: {
          method: 'delete',
          url: '/' + DELETE_INVOICE,
          data: props.invoice ? { _id: props.invoice._id } : null
        }
      },
      request: {
        method: 'put',
        url: '/' + EDIT_INVOICE,
        data: props.invoice ? { ...props.invoice, type: 'purchase' } : null
      }
    };
  }
  render() {
    return this.props.invoice ? (
      <RegisterForm
        feedback="Invoice updated successfully."
        {...this.editFormData}
      />
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
        whiteSpacedKey === 'date' ? formatTime(invoice[cur]) : invoice[cur];
      return prev;
    }, {});
  }
  return null;
}
