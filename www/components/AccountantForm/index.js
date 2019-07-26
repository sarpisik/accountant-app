import Register from './Register';
import Validator from './Validator';
import withApiHandler from '../withApiHandler';

export const RegisterForm = withApiHandler(Register);
export const ValidatorForm = withApiHandler(Validator);
