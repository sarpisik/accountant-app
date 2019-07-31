import { object, string } from 'prop-types';
import { GET_ACCOUNT } from '../../../constants/apiUrls';
import { EditAccountForm } from '../../../components';
import { withAuthSync } from '../../../util/auth';

export default withAuthSync(EditAccountForm)(
  {
    method: 'post',
    url: GET_ACCOUNT,
    data: {
      keys: 'no title createdAt balance'
    }
  },
  'account',
  '_id'
);

EditAccountForm.propTypes = {
  account: object,
  error: object,
  token: string.isRequired
};
