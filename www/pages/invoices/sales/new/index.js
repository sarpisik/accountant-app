import { object, string } from 'prop-types';
import { NewInvoiceForm } from '../../../../components';
import { withAuthSync } from '../../../../util/auth';

const NewSaleInvoice = props => <NewInvoiceForm type="sale" {...props} />;

export default withAuthSync(NewSaleInvoice)(null);

NewSaleInvoice.propTypes = {
  error: object,
  token: string.isRequired
};
