import React, { Fragment } from 'react';
import Link from 'next/link';
import { MDBBtn, MDBIcon, MDBDataTable } from 'mdbreact';

const Table = ({ link, ...data }) => (
  <Fragment>
    <Link href={`/${link}`}>
      <MDBBtn className="rounded-pill" color="primary" outline>
        <MDBIcon icon="plus" />
      </MDBBtn>
    </Link>
    <MDBDataTable responsive striped bordered small {...data} />
  </Fragment>
);

export default Table;
