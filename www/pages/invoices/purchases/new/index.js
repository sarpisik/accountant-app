import { object, string } from 'prop-types';
import { NewInvoiceForm } from '../../../../components';
import { withAuthSync } from '../../../../util/auth';

const NewPurchaseInvoice = props => (
  <NewInvoiceForm type="purchase" {...props} />
);

export default withAuthSync(NewPurchaseInvoice)(null);

NewPurchaseInvoice.propTypes = {
  error: object,
  token: string.isRequired
};
