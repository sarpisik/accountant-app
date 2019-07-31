import React, { Fragment } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';
import { profileDateFormat } from '../../util/formatTime';
import { Button } from '../Buttons';
import Spinner from '../Spinner';

const UserInfo = ({ userName, email, lastLogin }) => (
  <Fragment>
    <img
      src="https://bootdey.com/img/Content/avatar/avatar1.png"
      className="rounded-circle"
      width="150"
    />
    <h4 className="card-title m-t-10 text-capitalize">{userName}</h4>
    <hr />
    <small className="text-muted">Email address </small>
    <h6>{email}</h6>
    <small className="text-muted p-t-30 db">Last login </small>
    <h6>{profileDateFormat(lastLogin)}</h6>
  </Fragment>
);

const ChangePassword = () => (
  <Button
    href="/change-password"
    className="btn-block mt-3"
    gradient="blue"
    text="Change Password"
    color="white"
    rounded
  />
);

const SignOut = props => (
  <Button
    gradient="purple"
    className="btn-block mt-3"
    text="Sign Out"
    color="white"
    rounded
    {...props}
  />
);

const DeleteUser = props => (
  <Button
    gradient="peach"
    className="btn-block mt-3"
    text="Remove Account"
    color="white"
    rounded
    {...props}
  />
);

const ErrorFeedBack = ({ text }) => (
  <h4>{text ? text : 'Can not get profile data. Please re-login.'}</h4>
);

const Layout = ({ user, isLoading, onSignOut, onDelete, errText }) => (
  <MDBRow>
    <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-3">
      <MDBCard>
        <MDBCardBody className="mx-4 text-center">
          {isLoading ? (
            <Spinner color="deep-purple" />
          ) : user ? (
            <Fragment>
              <UserInfo {...user} />
              <ChangePassword />
              <SignOut onClick={onSignOut} />
              <DeleteUser onClick={onDelete} />
            </Fragment>
          ) : errText ? (
            <ErrorFeedBack text={errText} />
          ) : (
            <ErrorFeedBack />
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>
);

export default Layout;
