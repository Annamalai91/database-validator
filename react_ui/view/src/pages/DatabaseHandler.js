import React, { Component } from 'react';
import MultiSelect from '../Component/MaterialUI/MultiSelect'
import RadioButton from '../Component/MaterialUI/RadioButton'
import axios from '../Component/Axios/axios'

class DatabaseHandler extends Component {
//Setting the state
    state = {
       isDatabaseSelected : false,
       isTableSelected : false,
       selectedDatabase : null,
       selectedTable : null,
       retrievedDatabase : null,
       retrievedTable : null,
       retrievedColumns : null,
       columnsSelected : []
      };
// Get the columns selected

handleColoumnChange = event => {
    this.setState({columnsSelected: event.target.value});
  };




//Get all databases using Component Did Mount

componentDidMount () {
    axios.get( '/getalldatabases' )
        .then( response => {
            //console.log(response.data)
             let retrievedDatabase = response.data.filter(database => {
     
                    if(database.Database!="performance_schema" && database.Database!="sys" && database.Database!="information_schema" && database.Database!="mysql"  )
                       return true  
             });
             retrievedDatabase = retrievedDatabase.map(databaseObj => {
                 return databaseObj.Database
             })

             console.log( retrievedDatabase );
             this.setState({retrievedDatabase: retrievedDatabase});
        } )
        .catch(error => {
            console.log(error);
            // this.setState({error: true});
        });
}


// On change, we want to know what has changed

handleRadioChange = (event,whichRadio) => {
    const selectedValue=event.target.value; 
    let retrievedTable = null;
    let retrievedColumns = null;
    if(whichRadio === "Database") 
        {
            axios.get(`/getalltables/${selectedValue}`)
            .then( response => {
                console.log(response.data[1])

               retrievedTable = response.data[1].map(tableObj => {
                   return Object.values(tableObj).toString()
                })
                console.log(retrievedTable);
            this.setState({isDatabaseSelected:true ,retrievedTable: retrievedTable});
               
            } )
            .catch(error => {
                console.log(error);

            });
            
           
            
        }
    if(whichRadio === "Table")
    {
        axios.get(`/getallColumns/${selectedValue}`)
        .then( response => {
            console.log(response.data)

           retrievedColumns = response.data.map(columnObj => {
               return Object.values(columnObj).toString()
            })
            console.log(retrievedColumns);
        this.setState({ retrievedColumns : retrievedColumns, isTableSelected:true});
        console.log(selectedValue)
           
        } )
        .catch(error => {
            console.log(error);

        });
        
       
        
    }
    
       
    
 
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
            <MultiSelect 
            dataObj={this.state.retrievedColumns}
            changed={(event) => this.handleColoumnChange(event)}
            coloumnValue = {this.state.columnsSelected}
            ></MultiSelect>
        );
      }
        return (
            <div>
                  <div> {this.state.retrievedDatabase === null ? null : 
                <RadioButton
                title="Select the Database you want to Query"
                changed={(event) => this.handleRadioChange(event,"Database")}
                dataArray = {this.state.retrievedDatabase}
                  /> }
                </div>
                {tableview}
                {columnview}
  
                
            </div>
        );
    }
}

export default DatabaseHandler;