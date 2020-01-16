import React from 'react';
import { div, MDBNavbar, MDBNavbarBrand, MDBCollapse,MDBNavbarNav,MDBBtn,MDBNav,MDBNavItem,MDBBreadcrumb,MDBBreadcrumbItem} from 'mdbreact';
import { BrowserRouter as Router,Redirect} from 'react-router-dom';
import baseConfig from '../Component/Auth/BaseConfig'
import DatabaseValidator from './DatabaseValidator'


class Page2 extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          collapse: false,
       
      };
  }
 
  routechangeHandler = () => {
    this.props.history.push('/new'); 

  }

  render() {
    const bgColor = {backgroundColor: '#e91e63'}
    const container = {height: 1300}
    const BreadCrum = {cursor: 'pointer'}
    return(
      <div>
        <Router>
          <header>
            <MDBNavbar style={bgColor} dark expand="xs" scrolling fixed="top">
              <MDBNavbarBrand >
                  <strong>Database Actions</strong>
              </MDBNavbarBrand>
              <MDBCollapse isOpen = { this.state.collapse } navbar>
              <MDBNavbarNav right>
              {/* <MDBBtn color="mdb-color" onClick={() => baseConfig.auth().signOut()}>Sign out!</MDBBtn> */}
                 <MDBBreadcrumb style={BreadCrum} >
                     <MDBBreadcrumbItem  onClick={() =>   this.props.history.push('/new')} >Validator</MDBBreadcrumbItem>
                     <MDBBreadcrumbItem  onClick={() =>   this.props.history.push('/main')} >Interactor</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem  active onClick={() => baseConfig.auth().signOut()}>LogOut</MDBBreadcrumbItem>
               </MDBBreadcrumb>
              <MDBNav>
              <MDBNavItem>
      </MDBNavItem>
              </MDBNav>
              </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </header>
        </Router>
        <div style={container} className="text-left mt-5  pt-5 ml-5 ">
          <h2 className="mb-4" >This App is focused to be a one entry point for validating to Databases</h2>
         <DatabaseValidator></DatabaseValidator>
        </div>
      </div>
    );
  }
}

export default Page2;