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
  </MDBContainer>
);
export default Layout;
