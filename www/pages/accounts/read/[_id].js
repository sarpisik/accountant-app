import React from 'react';
import { object } from 'prop-types';
import apiHandler from '../../../util/apiHandler';
import { GET_ACCOUNT } from '../../../constants/apiUrls';
import { EditAccountForm } from '../../../components';

const EditAccount = props => <EditAccountForm {...props} />;
EditAccount.getInitialProps = async ({ req, query: { _id } }) => {
  try {
    const {
      data: { account }
    } = await apiHandler(
      {
        method: 'post',
        url: GET_ACCOUNT,
        data: {
          searchBy: { _id },
          keys: 'no title createdAt balance'
        }
      },
      req
    );
    return { account };
  } catch (error) {
    console.error(error);

    return { error };
  }
};
EditAccount.propTypes = {
  account: object,
  error: object
};

export default EditAccount;
