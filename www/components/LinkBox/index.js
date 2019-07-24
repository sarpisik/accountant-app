import Link from 'next/link';
import React from 'react';
import { MDBCol } from 'mdbreact';

const LinkBox = ({ link, text, ...props }) => (
  <MDBCol
    {...props}
    className="d-flex justify-content-center align-items-center">
    <Link href={`/${link}`}>
      <a>{text}</a>
    </Link>
  </MDBCol>
);

export default LinkBox;
