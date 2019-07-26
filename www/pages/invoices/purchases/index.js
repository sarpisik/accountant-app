import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import apiHandler from '../../../util/apiHandler';
import { Table } from '../../../components';
import { GET_INVOICES } from '../../../constants/apiUrls';

export default class Purchases extends PureComponent {
  static propTypes = {
    invoices: PropTypes.array,
    error: PropTypes.object
  };
  static async getInitialProps({ req }) {
    try {
      const {
        data: { invoices }
      } = await apiHandler(
        {
          method: 'post',
          url: GET_INVOICES,
          data: {
            type: 'purchase',
            keys: 'date no account title taxRate amount'
          }
        },
        req
      );
      return { invoices };
    } catch (error) {
      console.error(error);

      return { error };
    }
  }
  constructor(props) {
    super(props);
    this.data = {
      columns: [
        {
          label: 'Date',
          field: 'date',
          sort: 'asc'
        },
        {
          label: 'No',
          field: 'no',
          sort: 'asc'
        },
        {
          label: 'Account',
          field: 'account',
          sort: 'asc'
        },
        {
          label: 'Title',
          field: 'title',
          sort: 'asc'
        },
        {
          label: 'Tax Rate',
          field: 'taxRate',
          sort: 'asc'
        },
        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc'
        }
      ]
    };
  }

  sortInvoices = () =>
    this.props.invoices.map(invoice =>
      this.data.columns.reduce((prev, { field }) => {
        prev[field] = invoice[field];
        return prev;
      }, {})
    );

  render() {
    return this.props.invoices ? (
      <Table
        link="invoices/purchases/new"
        data={{ ...this.data, rows: this.sortInvoices() }}
      />
    ) : (
      this.props.error.message
    );
  }
}
