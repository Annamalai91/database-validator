import React from 'react';
import {  MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';


const CardExample = (props) => {

    let borderColor = "danger"
    if(props.finalValidationResult==="Success")
    {
      borderColor = "success"
    }
  return (
    <div style={{float:"left"}}>
    <MDBCol>
      <MDBCard border={borderColor} style={{ width: "22rem", margin:"5px", borderWidth:"2px"}}>

        <MDBCardBody>
          <MDBCardTitle>Table : {props.CardTitle}</MDBCardTitle>
          <MDBCardText>
              The Results of the Validation is {props.finalValidationResult}
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
    </div>
  )
}

export default CardExample;