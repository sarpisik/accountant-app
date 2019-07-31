import React, { useState } from 'react';
import Feedback from '../Feedback';
import { string, object } from 'prop-types';

const UserValidationFeedback = ({ userName, error }) => {
  const [isActive, setIsActive] = useState(true);
  setTimeout(() => setIsActive(false), 2000);
  return (
    <Feedback
      isActive={isActive}
      color={error ? 'danger' : 'success'}
      text={
        error
          ? 'There was an error. Please try again later.'
          : `Your account validated successfully ${userName}!`
      }
    />
  );
};
UserValidationFeedback.propTypes = {
  userName: string,
  error: object
};

export default UserValidationFeedback;
