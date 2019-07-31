import { object, string } from 'prop-types';
import { GET_INVOICE } from '../../../constants/apiUrls';
import { EditInvoiceForm } from '../../../components';
import { withAuthSync } from '../../../util/auth';

export default withAuthSync(EditInvoiceForm)(
  {
    method: 'post',
    url: GET_INVOICE,
    data: {
      keys: 'date no account title taxRate amount _id type'
    }
  },
  'invoice',
  '_id'
);

EditInvoiceForm.propTypes = {
  invoice: object,
  error: object,
  token: string.isRequired
};
