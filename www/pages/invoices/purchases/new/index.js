import React, { PureComponent, Fragment } from 'react';
import {
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBBtnGroup,
  MDBBtn
} from 'mdbreact';
import {
  ValidatorForm,
  RegisterForm
} from '../../../../components/AccountantForm';

export default class NewInvoice extends PureComponent {
  constructor(props) {
    super(props);

    this.validatorFormData = {
      inputs: [{ label: 'no' }],
      request: {
        method: 'post',
        url: '/api/account',
        data: { keys: '_id' }
      }
    };

    this.registerFormData = {
      inputs: [
        { label: 'date', type: 'date' },
        { label: 'no' },
        { label: 'title' },
        { label: 'tax Rate', type: 'number', max: 99 },
        { label: 'amount', type: 'number', max: 999999 }
      ],
      request: {
        method: 'post',
        url: '/api/invoice/new',
        data: { type: 'purchase' }
      }
    };

    this.state = {
      activeItem: '1',
      account: null
    };
  }

  handleAccountRequest = async ({ account: { _id } }) => {
    await this.setState({ account: _id, activeItem: '2' });
    this.registerFormData.request.data.account = _id;
  };

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  render() {
    return (
      <Fragment>
        <MDBNav className="nav-tabs">
          <MDBBtnGroup>
            <MDBBtn
              className="mb-0"
              active={this.state.activeItem === '1'}
              onClick={this.toggle('1')}
              role="tab">
              Account
            </MDBBtn>
            <MDBBtn
              className="mb-0"
              active={this.state.activeItem === '2'}
              onClick={this.toggle('2')}
              disabled={!!!this.state.account}
              role="tab">
              Invoice
            </MDBBtn>
          </MDBBtnGroup>
        </MDBNav>
        <MDBTabContent activeItem={this.state.activeItem}>
          <MDBTabPane tabId="1" role="tabpanel">
            <ValidatorForm
              title="Account"
              {...this.validatorFormData}
              onSuccess={this.handleAccountRequest}
            />
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            <RegisterForm
              feedback="Invoice registered successfully."
              {...this.registerFormData}
            />
          </MDBTabPane>
        </MDBTabContent>
      </Fragment>
    );
  }
}
