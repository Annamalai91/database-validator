import React, { Component } from 'react';
import baseConfig from '../Component/Auth/BaseConfig'

class Main extends Component {
    render() {
        return (
            <div>
                <h1>next page</h1>
                <button onClick={() => baseConfig.auth().signOut()}>Sign out!</button>
            </div>
        );
    }
}

export default Main;