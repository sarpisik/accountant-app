import React, { PureComponent } from 'react';
import { array, object } from 'prop-types';
import Table from './Table';
import LinkIcon from '../LinkIcon';

export default class Invoices extends PureComponent {
  static propTypes = {
    accounts: array,
    error: object
  };
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
        },
        {
          label: 'Read',
          field: '_id',
          sort: 'asc'
        }
      ]
    };
  }
  sortRowByColumns = () =>
    (this.props.accounts || []).map(account =>
      this.data.columns.reduce((prev, { field }) => {
        prev[field] =
          field === '_id' ? (
            <LinkIcon
              href="read/[_id]"
              as={`read/${account[field]}`}
              icon="search"
            />
          ) : (
            account[field]
          );
        return prev;
      }, {})
    );
  render() {
    return (
      <Table
        link={this.props.link}
        error={this.props.error}
        data={{ ...this.data, rows: this.sortRowByColumns() }}
      />
    );
  }
}
