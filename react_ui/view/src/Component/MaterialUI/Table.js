import React from 'react';
import { MDBDataTable } from 'mdbreact';

const DatatablePage = (props) => {
  return (
    <MDBDataTable
      striped
      bordered
      hover
      responsive
      data={props.data}
      searching={false}
    />
  );
}

export default DatatablePage;