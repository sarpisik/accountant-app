import { array, object, string } from 'prop-types';
import { Accounts } from '../../../components';
import { GET_ACCOUNTS } from '../../../constants/apiUrls';
import { withAuthSync } from '../../../util/auth';

const BuyersList = props => <Accounts link="accounts/buyers/new" {...props} />;

export default withAuthSync(BuyersList)(
  {
    method: 'post',
    url: GET_ACCOUNTS,
    data: {
      type: 'buyer',
      keys: 'no title createdAt balance _id'
    }
  },
  'accounts'
);

BuyersList.propTypes = {
  accounts: array,
  error: object,
  token: string
};
