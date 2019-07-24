import App, { Container } from 'next/app';
import React from 'react';
import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Layout } from '../components';

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Layout>
          <Provider store={reduxStore}>
            <Component {...pageProps} />
          </Provider>
        </Layout>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
