import React, { PureComponent } from 'react';
import { array, object } from 'prop-types';
import apiHandler from '../../../util/apiHandler';
import { Accounts } from '../../../components';
import { GET_ACCOUNTS } from '../../../constants/apiUrls';

const Sellers = props => <Accounts link="accounts/sellers/new" {...props} />;
Sellers.getInitialProps = async ({ req }) => {
  try {
    const {
      data: { accounts }
    } = await apiHandler(
      {
        method: 'post',
        url: GET_ACCOUNTS,
        data: {
          type: 'seller',
          keys: 'no title createdAt balance _id'
        }
      },
      req
    );
    return { accounts };
  } catch (error) {
    console.error('POST accounts list error: ', error);
    if (error.response.data.type === 'database')
      return { error: error.response.data };
    return { error };
  }
};
Sellers.propTypes = {
  accounts: array,
  error: object
};

export default Sellers;
