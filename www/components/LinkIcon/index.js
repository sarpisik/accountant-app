import Link from 'next/link';
import { MDBIcon } from 'mdbreact';

export default ({ icon, ...props }) => (
  <Link {...props}>
    <MDBIcon icon={icon} />
  </Link>
);
