import React from 'react';
import { MDBAlert } from 'mdbreact';

export default ({ text, isActive, ...props }) =>
  isActive ? (
    <MDBAlert
      className="feedback text-capitalize text-center position-absolute w-100 z-depth-1"
      {...props}>
      {text}
    </MDBAlert>
  ) : null;
