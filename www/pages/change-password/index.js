import { object, string } from 'prop-types';
import { withAuthSync } from '../../util/auth';
import { GET_USER } from '../../constants/apiUrls';
import { ChangePasswordForm } from '../../components';

export default withAuthSync(ChangePasswordForm)(
  {
    method: 'post',
    url: GET_USER
  },
  'user'
);

ChangePasswordForm.propTypes = {
  user: object,
  error: object,
  token: string.isRequired
};
