import React, { Component } from 'react';
import MultiSelect from '../Component/MaterialUI/MultiSelect'
import RadioButton from '../Component/MaterialUI/RadioButton'

class DatabaseHandler extends Component {
//Setting the state
    state = {
       isDatabaseSelected : false,
       isTableSelected : false,
       selectedDatabase : null,
       selectedTable : null,
       retrievedDatabase : ["DB1","DB2","DB3","DB4"],
       retrievedTable : ["Table1","Table2","Table3","Table4"]
      };

// On change, we want to know what has changed

handleRadioChange = (event,whichRadio) => {
    const selectedValue=event.target.value; 

    if(whichRadio === "Database") 
        this.setState({ selectedDatabase : selectedValue,isDatabaseSelected:true });
    if(whichRadio === "Table")
        this.setState({ selectedTable : selectedValue, isTableSelected:true});
    
 
  };

    render() {
//Setting the views that are needed
        let tableview = null;
        let columnview = null;
//If database is selected, then we can show the tables
    if (this.state.isDatabaseSelected) {
      tableview = (
          <div>
        <RadioButton
        title="Select the Table you want to Query" 
        changed={(event) => this.handleRadioChange(event,"Table")}
        dataArray = {this.state.retrievedTable}
        />
        </div>
      );
    }
//If table is selected, then we can show the columns
    if (this.state.isTableSelected) {
        columnview = (
            <MultiSelect></MultiSelect>
        );
      }
        return (
            <div>
                  <div>
                <RadioButton
                title="Select the Database you want to Query"
                changed={(event) => this.handleRadioChange(event,"Database")}
                dataArray = {this.state.retrievedDatabase}
                />
                </div>
                {   console.log(this.state.Database)}
                {tableview}
                {columnview}
            
                
            </div>
        );
    }
}

export default DatabaseHandler;