import React, { Component } from 'react';
import MultiSelect from '../Component/MaterialUI/MultiSelect'
import RadioButton from '../Component/MaterialUI/RadioButton'

class DatabaseHandler extends Component {
    render() {
        return (
            <div>
                <RadioButton></RadioButton>
                <MultiSelect></MultiSelect>
            </div>
        );
    }
}

export default DatabaseHandler;