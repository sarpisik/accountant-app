// import Head from 'next/head';
import Head from './head';
const Layout = props => (
  <div>
    <Head />
    <style jsx global>{`
      body {
        padding: 10px;
      }
    `}</style>
    {props.children}
  </div>
);
export default Layout;
