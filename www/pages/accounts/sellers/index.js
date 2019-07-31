import { array, string, object } from 'prop-types';
import { Accounts } from '../../../components';
import { GET_ACCOUNTS } from '../../../constants/apiUrls';
import { withAuthSync } from '../../../util/auth';

const SellersList = props => (
  <Accounts link="accounts/sellers/new" {...props} />
);

export default withAuthSync(SellersList)(
  {
    method: 'post',
    url: GET_ACCOUNTS,
    data: {
      type: 'seller',
      keys: 'no title createdAt balance _id'
    }
  },
  'accounts'
);

SellersList.propTypes = {
  accounts: array,
  error: object,
  token: string
};
