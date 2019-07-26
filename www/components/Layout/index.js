// import Head from 'next/head';
import Head from '../head';
import { MDBContainer } from 'mdbreact';

const Layout = ({ children }) => (
  <MDBContainer
    fluid
    className="d-flex flex-column"
    style={{ minHeight: '100vh' }}>
    <Head />
    {children}
    <style jsx global>{`
      .feedback {
        left: 0;
        right: 0;
        top: 0;
        z-index: 100;
      }
    `}</style>
  </MDBContainer>
);
export default Layout;
