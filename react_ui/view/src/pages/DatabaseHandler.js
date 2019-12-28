import React, { Component } from 'react';
import MultiSelect from '../Component/MaterialUI/MultiSelect'
import RadioButton from '../Component/MaterialUI/RadioButton'
import Modal from '../Component/MaterialUI/Modal'
import axios from '../Component/Axios/axios'
import Table from '../Component/MaterialUI/Table'
import { MDBBtn } from "mdbreact";

class DatabaseHandler extends Component {

//Global variable


//Setting the state
    state = {
       isDatabaseSelected : false,
       isTableSelected : false,
       selectedDatabase : null,
       selectedTable : null,
       retrievedDatabase : null,
       retrievedTable : null,
       retrievedColumns : null,
       columnsSelected : [],
       columnsfilterSelected : [],
       filterSelected : null,
       operationSelected : null,
       showTable : false,
       Tabledata : null
      };
// Get the columns selected

handleColoumnChange = (event,whichDropDown) => {
    if(whichDropDown==="Report")
    this.setState({columnsSelected: event.target.value});
    if(whichDropDown==="Filter")
    this.setState({columnsfilterSelected: event.target.value});

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
    console.log(selectedValue)
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
            this.setState({isDatabaseSelected:true ,retrievedTable: retrievedTable,selectedDatabase:selectedValue});
               
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
        this.setState({ retrievedColumns : retrievedColumns, isTableSelected:true,selectedTable:selectedValue});
        console.log(selectedValue)
           
        } )
        .catch(error => {
            console.log(error);

        });
    }
    
    console.log("Outside operatat")
    if(whichRadio === "Operation") 
    {
        console.log("Cae inside oeprat")
    this.setState({operationSelected:selectedValue});
    }

    if(whichRadio === "filter") 
    this.setState({filterSelected:selectedValue});
    
 
  };

  // After Clicking on this button, we need to call databse to get the results, as we got whatever we need

databaseCallHandler = () => {

    console.log("CAme insde after button")
 const Databse = this.state.selectedDatabase;
 const Table = this.state.selectedTable;
 const Columns = this.state.columnsSelected;
 const filter = this.state.filterSelected;
 const operation = this.state.operationSelected;
 let columnarr=null;
 let rowarr = null;
 let TableSkeleton = null;

 if(Columns!=null)
 {
    columnarr = Columns.map(column => ({
        label: column,
        field: column,
        sort: 'asc',
        width: 150
    }))
    console.log(columnarr)
    console.log(typeof columnarr)
 }





 console.log(Databse);
 console.log(Table);
 console.log(Columns);
 console.log(operation);
 console.log(filter);


   if(operation==="Select")
        {
            axios.get("/SelectQuery",{
                params: {
                    Databse: Databse,
                    Table : Table,
                    Columns : Columns,
                    filter : filter
                }
              })
            .then( response => {
                console.log(response.data[1])
                rowarr = response.data[1]
                TableSkeleton = {
                    columns : columnarr,
                    rows : rowarr
                }
                console.log(TableSkeleton)
                this.setState({Tabledata:TableSkeleton});
                this.setState({showTable:true});

            } )
            .catch(error => {
                console.log(error);

            });
        }
            
 }

    render() {
//Setting the views that are needed
        let tableview = null;
        let columnview = null;
        let filterview=null;
        let filtermodalview = null;
        let tablebody=null;
        const Operations = ["Select","Update","Delete","Insert"]
        const filterOperation = ["Yes","No"]
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

 //Ask member, if he want to add any filter to the Query after he selects the table
 if (this.state.isTableSelected) {
 filterview = (
   
    <div>
    <RadioButton
    title="Do you want to add filter to the Query using Where conditon "
    changed={(event) => this.handleRadioChange(event,"filter")}
    dataArray ={filterOperation}
      /> 
</div>
         
);
 }


//If table is selected, then we can show the columns
//Also we will ask, if member want to add any condition to filter the results 
    if (this.state.isTableSelected && this.state.filterSelected) {
        if(this,this.state.filterSelected=="Yes")
        columnview = (
            <div>
            <MultiSelect 
            dataObj={this.state.retrievedColumns}
            changed={(event) => this.handleColoumnChange(event,"Report")}
            coloumnValue = {this.state.columnsSelected}
            title="Please select the columns needed to show in the report"
            ></MultiSelect>
            <MultiSelect 
            dataObj={this.state.retrievedColumns}
            changed={(event) => this.handleColoumnChange(event,"Filter")}
            coloumnValue = {this.state.columnsfilterSelected}
            title="Please select the columns you like to add condition"
            ></MultiSelect>
          </div>
                 
        );
        else{
            columnview = (
                <MultiSelect 
                dataObj={this.state.retrievedColumns}
                changed={(event) => this.handleColoumnChange(event,"Report")}
                coloumnValue = {this.state.columnsSelected}
                title="Please select the columns needed to show in the report"
                ></MultiSelect>
           
                     
            );

        }

      }

//If Columns are selected, then we need to ask, if member is going to add any Where condition in the query


// When selected No during the Filter, we are going to pop up a message saying that 
//Only top 10 rows will be fetched 
  
if (this.state.filterSelected==="No") {
    console.log("Came inbside filter selected")
    filtermodalview = (
   
        <div>
        <Modal
        data="If there are no Filter added, Then we will fetch only the Top 10 rows "
        modalvalue={true}
          /> 
 </div>
             
    );
  }

  //If column view is null then we can create the table
  if(columnview!=null && this.state.showTable)
  {
      tablebody = (
          <div style={{marginTop: 15}} >
         <Table data={this.state.Tabledata}></Table> 
         </div>
      );
  }

  const defaultView = (
      <div>
    <RadioButton
    title="Select the Operation you want to perform"
    changed={(event) => this.handleRadioChange(event,"Operation")}
    dataArray ={Operations}
      /> 
      <div> {this.state.retrievedDatabase === null ? null : 
    <RadioButton
    title="Select the Database you want to Query"
    changed={(event) => this.handleRadioChange(event,"Database")}
    dataArray = {this.state.retrievedDatabase}
      /> }
    </div>
    </div>
  )


        return (
            <div>
                {defaultView}
                {tableview}
                {filterview}
                {columnview}
               
                {filtermodalview}
          
                {this.state.columnsSelected.length < 1 ? null : 
                      <MDBBtn onClick={this.databaseCallHandler}>Submit</MDBBtn>
                }
                      {tablebody}
            </div>
        );
    }
}

export default DatabaseHandler;