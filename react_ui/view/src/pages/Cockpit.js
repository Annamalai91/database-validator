import React, { Component } from 'react';
import { NavLink,Redirect} from 'react-router-dom';
import baseConfig from '../Component/Auth/BaseConfig'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import {AuthContext} from '../Component/Auth/Auth'


import './Cockpit.css'

class Cockpit extends Component {

state = { isSignedIn: false }

    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            baseConfig.auth.GoogleAuthProvider.PROVIDER_ID,
            baseConfig.auth.FacebookAuthProvider.PROVIDER_ID,
            baseConfig.auth.TwitterAuthProvider.PROVIDER_ID,
            baseConfig.auth.GithubAuthProvider.PROVIDER_ID,
            baseConfig.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          signInSuccess: () => false
        }
      }






    render() {

       
     

        return (
            <AuthContext.Consumer>
                {
                    (context) => context.currentUser ? <Redirect to="/main" />

                    :
                    <div className="Cockpit">
                    <div className="Cockpit__Aside"></div>
                    <div className="Cockpit__Form">
                        <div className="PageSwitcher">
                            <NavLink to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                        </div>
                        <div className="FormTitle">
                                <NavLink to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> 
                        </div>
                        <StyledFirebaseAuth
                        uiConfig={this.uiConfig}
                        firebaseAuth={baseConfig.auth()}/>
                    </div>
                </div>
                }
      
            </AuthContext.Consumer>
        );
    }
}

export default Cockpit;

// import React, { useCallback, useContext } from "react";
// import { withRouter, Redirect } from "react-router";
// import app from "./base.js";
// import { AuthContext } from "./Auth.js";

// const Login = ({ history }) => {
//   const handleLogin = useCallback(
//     async event => {
//       event.preventDefault();
//       const { email, password } = event.target.elements;
//       try {
//         await app
//           .auth()
//           .signInWithEmailAndPassword(email.value, password.value);
//         history.push("/");
//       } catch (error) {
//         alert(error);
//       }
//     },
//     [history]
//   );

//   const { currentUser } = useContext(AuthContext);

//   if (currentUser) {
//     return <Redirect to="/" />;
//   }

//   return (
//     <div>
//       <h1>Log in</h1>
//       <form onSubmit={handleLogin}>
//         <label>
//           Email
//           <input name="email" type="email" placeholder="Email" />
//         </label>
//         <label>
//           Password
//           <input name="password" type="password" placeholder="Password" />
//         </label>
//         <button type="submit">Log in</button>
//       </form>
//     </div>
//   );
// };

// export default withRouter(Login);