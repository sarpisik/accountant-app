import { object } from 'prop-types';
import { withAuthSync } from '../../util/auth';
import { GET_USER } from '../../constants/apiUrls';
import { Profile } from '../../components';

export default withAuthSync(Profile)(
  {
    method: 'post',
    url: GET_USER
  },
  'user'
);

Profile.propTypes = {
  user: object,
  error: object
};
