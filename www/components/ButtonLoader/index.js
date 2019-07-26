import { MDBBtn } from 'mdbreact';
export default ({ text, isLoading, color, ...props }) => (
  <MDBBtn {...props}>
    {text}
    {isLoading && (
      <div
        className={`spinner-border spinner-border-sm ml-3 text-${color}`}
        role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )}
  </MDBBtn>
);
