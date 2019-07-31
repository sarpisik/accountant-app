import React, { PureComponent } from 'react';
import Layout from './Layout';
import withApiHandler from '../withApiHandler';
import { DELETE_USER } from '../../constants/apiUrls';
import { signOut, getTokenFromCookie } from '../../util/auth';

class Container extends PureComponent {
  state = {
    isLoading: false,
    errText: null
  };

  toggleLoading = () =>
    this.setState(state => ({ isLoading: !state.isLoading }));

  toggleError = () =>
    this.setState(state => ({
      isLoading: !state.isLoading,
      errText: 'Can not delete user. Please try again later.'
    }));

  onSignOut = () => signOut();

  onDelete = async () => {
    await this.toggleLoading();
    try {
      const {
        user: { _id },
        handleRequest
      } = this.props;

      await handleRequest({
        method: 'delete',
        url: DELETE_USER,
        headers: getTokenFromCookie(),
        data: { _id }
      });

      this.onSignOut();
    } catch (error) {
      console.error(error);
      await this.toggleError();
    }
  };

  render() {
    this.props.error && console.error(this.props.error);

    return (
      <Layout
        onSignOut={this.onSignOut}
        onDelete={this.onDelete}
        {...this.state}
        {...this.props}
      />
    );
  }
}

export default withApiHandler(Container);
