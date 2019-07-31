import { object, string } from 'prop-types';
import { VALIDATE_USER } from '../../constants/apiUrls';
import apiHandler from '../../util/apiHandler';
import { UserValidationFeedback } from '../../components';
import { setCookie } from '../../util/auth';

UserValidationFeedback.getInitialProps = async ({ req, query: { id } }) => {
  try {
    const {
      data: { userName, token }
    } = await apiHandler(
      {
        method: 'post',
        url: VALIDATE_USER + id,
        data: {}
      },
      req
    );
    await setCookie(token);
    return { userName };
  } catch (error) {
    console.error(error);

    return { error };
  }
};
UserValidationFeedback.propTypes = {
  userName: string,
  error: object
};

export default UserValidationFeedback;
