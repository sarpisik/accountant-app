import React from 'react';
import { array, object } from 'prop-types';
import apiHandler from '../../../util/apiHandler';
import { Invoices } from '../../../components';
import { GET_INVOICES } from '../../../constants/apiUrls';

const Purchases = props => (
  <Invoices link="invoices/purchases/new" {...props} />
);
Purchases.getInitialProps = async ({ req }) => {
  try {
    const {
      data: { invoices }
    } = await apiHandler(
      {
        method: 'post',
        url: GET_INVOICES,
        data: {
          type: 'purchase',
          keys: 'date no account title taxRate amount _id'
        }
      },
      req
    );
    return { invoices };
  } catch (error) {
    console.error('POST invoices list error: ', error);
    if (error.response.data.type === 'database')
      return { error: error.response.data };
    return { error };
  }
};
Purchases.propTypes = {
  invoices: array,
  error: object
};

export default Purchases;
