import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import apiHandler from '../../../util/apiHandler';
import { Table } from '../../../components';
import { GET_ACCOUNTS } from '../../../constants/apiUrls';

export default class Purchases extends PureComponent {
  static propTypes = {
    accounts: PropTypes.array,
    error: PropTypes.object
  };
  static async getInitialProps({ req }) {
    try {
      const {
        data: { accounts }
      } = await apiHandler(
        {
          method: 'post',
          url: GET_ACCOUNTS,
          data: {
            type: 'seller',
            keys: 'no title createdAt balance'
          }
        },
        req
      );
      return { accounts };
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
          label: 'No',
          field: 'no',
          sort: 'asc'
        },
        {
          label: 'Title',
          field: 'title',
          sort: 'asc'
        },
        {
          label: 'Created At',
          field: 'createdAt',
          sort: 'asc'
        },
        {
          label: 'Balance',
          field: 'balance',
          sort: 'asc'
        }
      ]
    };
  }

  sortInvoices = () =>
    this.props.accounts.map(account =>
      this.data.columns.reduce((prev, { field }) => {
        prev[field] = account[field];
        return prev;
      }, {})
    );

  render() {
    return this.props.accounts ? (
      <Table
        link="accounts/sellers/new"
        data={{ ...this.data, rows: this.sortInvoices() }}
      />
    ) : (
      this.props.error.message
    );
  }
}
