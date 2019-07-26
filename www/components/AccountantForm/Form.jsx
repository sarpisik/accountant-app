import { MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import Input from './Input';
import ButtonLoader from '../ButtonLoader';

export default ({ title, inputs, values, onChange, onSubmit, ...props }) => (
  <MDBRow>
    <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-3">
      <MDBCard>
        <MDBCardBody className="mx-4">
          <div className="text-center">
            <h3 className="dark-grey-text mb-5">
              <strong>{title}</strong>
            </h3>
          </div>
          <form onSubmit={onSubmit}>
            {/* Inputs */}
            {inputs.map(({ ...input }) => (
              <Input
                key={input.label}
                onChange={onChange}
                value={values[input.label]}
                {...input}
              />
            ))}
            {/* Submit */}
            <div className="text-center pt-3 mb-3">
              <ButtonLoader
                type="submit"
                gradient="blue"
                rounded
                className="btn-block z-depth-1a"
                text="Submit"
                color="white"
                {...props}
              />
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>
);
