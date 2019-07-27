import { MDBBtn } from 'mdbreact';
export default ({ text, isLoading, color, ...props }) => (
  <MDBBtn {...props}>{text}</MDBBtn>
);
