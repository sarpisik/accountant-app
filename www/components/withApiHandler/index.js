import React, { PureComponent } from 'react';
import axios from 'axios';

const withApiHandler = Component =>
  class WithApiHandler extends PureComponent {
    handleRequest = request => {
      request.url =
        process.env.NODE_ENV === 'production'
          ? request.url
          : `http://localhost:9999${request.url}`;
      return new Promise((resolve, reject) =>
        axios(request)
          .then(response => resolve(response.data))
          .catch(error => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              reject(error.response.data);
              console.error('error.response ,', error.response);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              reject(error.request);
              console.error('error.request ,', error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              reject('Error', error.message);
              console.error('Error', error.message);
            }
          })
      );
    };

    render() {
      return <Component handleRequest={this.handleRequest} {...this.props} />;
    }
  };

export default withApiHandler;
