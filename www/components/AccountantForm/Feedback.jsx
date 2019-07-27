import { MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';
export default ({ text }) => (
  <MDBRow>
    <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-3">
      <MDBCard>
        <MDBCardBody className="mx-4 text-center">
          <p className="deep-purple-text">{text}</p>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>
);
