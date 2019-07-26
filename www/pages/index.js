import React from 'react';
import url from 'url';
import { MDBRow } from 'mdbreact';
import { connect } from 'react-redux';
import { startClock, serverRenderClock } from '../state/store';
import Examples from '../components/examples';
import { LinkBox, LinkRow } from '../components';

const absoluteUrl = (req, setLocalhost) => {
  let protocol = 'https';
  let host = req ? req.headers.host : window.location.hostname;
  if (host.indexOf('localhost') > -1) {
    if (setLocalhost) host = setLocalhost;
    protocol = 'http';
  }
  return url.format({
    protocol,
    host,
    pathname: '/' // req.url
  });
};

class Index extends React.Component {
  // static async getInitialProps({ reduxStore, req }) {
  //   const isServer = !!req;
  //   // DISPATCH ACTIONS HERE ONLY WITH `reduxStore.dispatch`
  //   reduxStore.dispatch(serverRenderClock(isServer));

  //   /* NOTE - relative url in this function runs will not work and
  //       will get ECONNRESET error since it runs on server context */
  //   const baseUrl = absoluteUrl(req, 'localhost:3000');
  //   const apiUrl =
  //     process.env.NODE_ENV === 'production'
  //       ? `${baseUrl}api/me`
  //       : 'http://localhost:9999/api/me';
  //   try {
  //     const { status, data } = await axios.get(apiUrl);
  //     return { user: data.user };
  //   } catch (ex) {
  //     console.log(`Error fetching data from ${apiUrl} - ${ex.message}`);
  //     return { user: null };
  //   }
  // }

  // componentDidMount() {
  //   // DISPATCH ACTIONS HERE FROM `mapDispatchToProps`
  //   // TO TICK THE CLOCK
  //   this.timer = setInterval(() => this.props.startClock(), 1000);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.timer);
  // }

  render() {
    return (
      <>
        {/* <Examples user={this.props.user} /> */}
        <LinkRow>
          <LinkBox sm="6" link="invoices" text="Invoices" />
          <LinkBox sm="6" link="accounts" text="Accounts" />
        </LinkRow>
        <LinkRow>
          <LinkBox sm="6" link="receivables" text="Receivables" />
          <LinkBox sm="6" link="debts" text="Debts" />
        </LinkRow>
      </>
    );
  }
}
// const mapDispatchToProps = { startClock };
// export default connect(
//   null,
//   mapDispatchToProps
// )(Index);
export default Index;
