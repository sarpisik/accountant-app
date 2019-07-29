import { MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import Input from './Input';
import { Button } from '../Buttons';
import Spinner from '../Spinner';

export default ({ title, inputs, values, onChange, onSubmit, ...props }) => (
  <MDBRow>
    <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-3">
      <MDBCard>
        <MDBCardBody className="mx-4">
          <div className="text-center">
            <h3 className="deep-purple-text mb-5">
              <strong>{title}</strong>
            </h3>
          </div>
          {props.isLoading ? (
            <Spinner color="deep-purple" />
          ) : (
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
                <Button
                  type="submit"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                  text="Submit"
                  color="white"
                />
                {props.delete && (
                  <Button
                    type="button"
                    gradient="peach"
                    rounded
                    className="btn-block z-depth-1a"
                    text={props.delete.text}
                    color="white"
                    onClick={props.delete.onDelete}
                  />
                )}
              </div>
            </form>
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>
);
