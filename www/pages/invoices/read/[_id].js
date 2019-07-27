import React from 'react';
import { array, object } from 'prop-types';
import apiHandler from '../../../util/apiHandler';
import { GET_INVOICE } from '../../../constants/apiUrls';
import { EditInvoiceForm } from '../../../components';

const EditInvoice = props => <EditInvoiceForm {...props} />;
EditInvoice.getInitialProps = async ({ req, query: { _id } }) => {
  try {
    const {
      data: { invoice }
    } = await apiHandler(
      {
        method: 'post',
        url: GET_INVOICE,
        data: {
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
};
EditInvoice.propTypes = {
  invoices: array,
  error: object
};

export default EditInvoice;
