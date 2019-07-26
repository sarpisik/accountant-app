import { ADD_INVOICES, ADD_INVOICE } from '../../constants/actions';

export const addInvoices = payload => ({
  type: ADD_INVOICES,
  payload
});

export const addInvoice = payload => ({
  type: ADD_INVOICE,
  payload
});
