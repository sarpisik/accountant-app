import { ADD_INVOICES, ADD_INVOICE } from '../../../constants/actions';

const INITIAL_STATE = {
  invoices: null
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ADD_INVOICES:
      return addInvoices(state, payload);

    case ADD_INVOICE:
      return addInvoice(state, payload);

    default:
      return state;
  }
};

function addInvoices(state, invoices) {
  return { ...state, invoices };
}

function addInvoice(state, invoice) {
  return { ...state, invoices: [...state.invoices, invoice] };
}
