import React, { Fragment } from 'react';
import { oneOf, func, any, shape, array, object } from 'prop-types';
import {
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBBtnGroup,
  MDBBtn
} from 'mdbreact';
import ValidatorForm from '../../Validator';
import RegisterForm from '../../Register';

const NewInvoiceLayout = ({
  activeItem,
  onToggle,
  account,
  validatorFormData,
  validatorFormOnSuccess,
  registerFormData
}) => (
  <Fragment>
    <MDBNav className="nav-tabs">
      <MDBBtnGroup>
        <MDBBtn
          className="mb-0"
          active={activeItem === '1'}
          onClick={onToggle('1')}
          role="tab">
          Account
        </MDBBtn>
        <MDBBtn
          className="mb-0"
          active={activeItem === '2'}
          onClick={onToggle('2')}
          disabled={!!!account}
          role="tab">
          Invoice
        </MDBBtn>
      </MDBBtnGroup>
    </MDBNav>
    <MDBTabContent activeItem={activeItem}>
      <MDBTabPane tabId="1" role="tabpanel">
        <ValidatorForm
          title="Account"
          {...validatorFormData}
          onSuccess={validatorFormOnSuccess}
        />
      </MDBTabPane>
      <MDBTabPane tabId="2" role="tabpanel">
        <RegisterForm {...registerFormData} />
      </MDBTabPane>
    </MDBTabContent>
  </Fragment>
);
NewInvoiceLayout.propTypes = {
  activeItem: oneOf(['1', '2']),
  onToggle: func,
  account: any,
  validatorFormData: shape({
    inputs: array,
    request: object
  }),
  validatorFormOnSuccess: func,
  registerFormData: shape({
    inputs: array,
    request: object
  })
};

export default NewInvoiceLayout;
