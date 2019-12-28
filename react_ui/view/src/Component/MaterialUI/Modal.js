import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody } from 'mdbreact';

class ModalPage extends React.Component {
state = {
  modal11: this.props.modalvalue
}

toggle  = () => {

  this.setState({
    modal11: !this.state.modal11
  });
}

render() {
  return (
      <MDBContainer>
        {/* <MDBBtn color="warning" onClick={this.toggle}>Top</MDBBtn> */}
        <MDBModal isOpen={this.state.modal11} toggle={this.toggle} frame position="top">
          <MDBModalBody className="text-center">
           {this.props.data}
            <MDBBtn color="primary" onClick={this.toggle}>Close</MDBBtn>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default ModalPage;