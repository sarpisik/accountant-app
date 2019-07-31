import { array, object, string } from 'prop-types';
import { Invoices } from '../../../components';
import { GET_INVOICES } from '../../../constants/apiUrls';
import { withAuthSync } from '../../../util/auth';

const Purchases = props => (
  <Invoices link="invoices/purchases/new" {...props} />
);

export default withAuthSync(Purchases)(
  {
    method: 'post',
    url: GET_INVOICES,
    data: {
      type: 'purchase',
      keys: 'date no account title taxRate amount _id'
    }
  },
  'invoices'
);

Purchases.propTypes = {
  invoices: array,
  error: object,
  token: string.isRequired
};
