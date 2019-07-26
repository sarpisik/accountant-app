import { MDBInput } from 'mdbreact';
import capitalizeLetter from '../../util/capitalizeLetter';

const Feedback = ({ text }) => (
  <div className="invalid-feedback">{`Please provide a valid ${text}.`}</div>
);

export default ({ label, inValid, ...props }) => {
  const capitalizedLabel = capitalizeLetter(label);
  return (
    <MDBInput
      group
      validate
      required
      className={props.validated ? (inValid ? 'is-invalid' : 'is-valid') : null}
      name={label}
      label={capitalizedLabel}
      {...props}>
      <Feedback text={capitalizedLabel} />
    </MDBInput>
  );
};
