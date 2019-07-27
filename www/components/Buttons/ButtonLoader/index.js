import { MDBBtn } from 'mdbreact';
import Spinner from '../../Spinner';
export default ({ text, isLoading, color, ...props }) => (
  <MDBBtn {...props}>
    {text}
    {isLoading && <Spinner color={color} />}
  </MDBBtn>
);
