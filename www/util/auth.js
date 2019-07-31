import React, { Component } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import apiHandler from './apiHandler';
import getComponentDisplayName from './getComponentDisplayName';

export const setCookie = token => cookie.set('token', token, { expires: 1 });

export const getTokenFromCookie = () => cookie.get('token');

export const authHeader = token => ({
  Authorization: 'bearer ' + token
});

export const signIn = token => {
  setCookie(token);
  Router.push('/profile');
};

export const signOut = () => {
  cookie.remove('token');
  // to support logging out from all windows
  window.localStorage.setItem('signout', Date.now());
  Router.push('/signin');
};

export const auth = ctx => {
  const { token } = nextCookie(ctx);

  // If token is invalid on the server side.
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/signin' });
    ctx.res.end();
    return;
  }
  // If token is invalid on the client side.
  if (!token) {
    Router.push('/signin');
  }

  // Token is valid.
  return token;
};

export const withAuthSync = WrappedComponent => (
  request,
  reqData,
  queryString
) =>
  class extends Component {
    static displayName = `withAuthSync(${getComponentDisplayName(
      WrappedComponent
    )})`;

    static async getInitialProps(ctx) {
      try {
        // Parse token from cookie.
        const token = auth(ctx);

        // If request options passed, fetch API and return result with token.
        // Else, return token only.
        if (request && reqData) {
          // Set token in request header.
          request.headers = authHeader(token);

          // Parse query from url if exist.
          if (queryString) {
            request.data.searchBy = {
              [queryString]: ctx.query[queryString]
            };
          }

          // Request data with token and return data on valid token.
          const { data } = await apiHandler(request, ctx.req);
          return { [reqData]: data[reqData], token };
        }

        // Return token only.
        return { token };
      } catch (error) {
        console.error(error);
        if (error.response.data.type === 'database')
          return { error: error.response.data };
        return { error };
      }
    }

    // New: Add event listener when a restricted Page Component mounts
    componentDidMount() {
      window.addEventListener('storage', this.syncLogout);
    }

    // New: Remove event listener when the Component unmount and
    // delete all data
    componentWillUnmount() {
      window.removeEventListener('storage', this.syncLogout);
      window.localStorage.removeItem('signout');
    }

    // New: Method to redirect the user when the event is called
    syncLogout = event =>
      event.key === 'signout' &&
      (console.log('logged out from storage!'), Router.push('/signin'));

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
