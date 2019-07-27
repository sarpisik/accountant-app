import React, { Fragment } from 'react';
import Link from 'next/link';
import { MDBBtn, MDBIcon, MDBDataTable } from 'mdbreact';

const Table = ({ link, error, ...data }) => (
  <Fragment>
    <Link href={`/${link}`}>
      <MDBBtn className="rounded-pill" color="primary" outline>
        <MDBIcon icon="plus" />
      </MDBBtn>
    </Link>
    {error ? (
      <p className="deep-purple-text text-center">
        {error.type === 'database' ? error.error.message : error.message}
      </p>
    ) : (
      <MDBDataTable responsive striped bordered small {...data} />
    )}
  </Fragment>
);

export default Table;
