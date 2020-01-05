import React, { Component } from 'react';
import MultiSelect from '../Component/MaterialUI/MultiSelect'
import RadioButton from '../Component/MaterialUI/RadioButton'
import Modal from '../Component/MaterialUI/Modal'
import axios from '../Component/Axios/axios'
import Table from '../Component/MaterialUI/Table'
import { MDBBtn} from "mdbreact";
import DropDown from '../Component/MaterialUI/Dropdown'


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
       Tabledata : null,
       operation : {},
       filtervalue: [],
       showbutton : false
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
            this.setState({isDatabaseSelected:true ,retrievedTable: retrievedTable,selectedDatabase:selectedValue,selectedTable:null,isTableSelected:false});
               
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
    {
        if(selectedValue === "No")
        {
            this.setState({columnsfilterSelected:[],columnsSelected:[]})
        } 
        this.setState({filterSelected:selectedValue,showTable:false,columnsfilterSelected:[],columnsSelected:[]});
    }

    
 
  };


  //This method executes when the filter values are entered in dropdown component

   handleDropDownChange = (event,filter) => {
     let operationObj = this.state.operation;
     console.log(filter)

        operationObj[filter] = event.target.value
        console.log(operationObj)
        this.setState({operation:operationObj});
 
    
   
  };

  //This method is used to set the state of filtered value

  
  handleFilterValueChange = (event,filter) => {
       let filterValueArr = this.state.filtervalue; 
       let tempObj = {};
       let iselementpresent= false;
       let tempvalue = this.state.operation[filter]
       if(tempvalue == undefined )
       {
           tempvalue = "is"
       }
       console.log(event.target.value)
       console.log(filterValueArr.length)
       
       if(event.target.value !="Please enter the Search Sring ")
       {
        tempObj[filter] = [tempvalue,event.target.value]
        console.log(tempObj)
       let tempObjKeys =  Object.keys(tempObj).toString()
       console.log(tempObjKeys)
       if(filterValueArr.length == 0)
       {
        filterValueArr.push(tempObj)
       }
       else
       {
        filterValueArr.forEach((element,index) => {
            console.log("Inside the for each")
            console.log(element)
            
            console.log("Valie of index is ")
            console.log(index)
            const tempkey =  Object.keys(element).toString()
                console.log(tempkey)
            if(tempObjKeys==tempkey)
            {
                console.log("Came inside the if both are ewuasd")
                filterValueArr[index] = tempObj;
                iselementpresent = true;
            }
            
        }
        );
      if(filterValueArr.length != 0 && !iselementpresent)
      {
        filterValueArr.push(tempObj)
      }
       }
      
        // filterValueArr.push(tempObj)
      console.log(filterValueArr)
        this.setState({filtervalue:filterValueArr});
       }
    
  };

//Call to database when select is selected and No filters are selected 

databaseCallSelectNoFilterHandler = (Databse,Table,Columns,filter,columnarr) => {
    let rowarr = null;
    let TableSkeleton = null;
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



//Call to database when select is selected and Yes filters are selected 

databaseCallSelectYesFilterHandler = (Databse,Table,Columns,filter,columnarr) => {
    let filtervalue = this.state.filtervalue
    console.log("Came inside the Yes filter handler")
    console.log("*****Database******")
    console.log(Databse);
    console.log("*****Table******")
    console.log(Table);
    console.log("*****Columns******")
    console.log(Columns);
    console.log("*****filter******")
    console.log(filter);
    console.log("*****filtervalue******")
    console.log(filtervalue)
    



    let rowarr = null;
    let TableSkeleton = null;
    axios.get("/SelectQueryWithFilter",{
        params: {
            Databse: Databse,
            Table : Table,
            Columns : Columns,
            filter : filter,
            filtervalue : filtervalue
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


  // After Clicking on this button, we need to call databse to get the results, as we got whatever we need

databaseCallHandler = () => {

    console.log("CAme insde after button")
 const Databse = this.state.selectedDatabase;
 const Table = this.state.selectedTable;
 const Columns = this.state.columnsSelected;
 const filter = this.state.filterSelected;
 const operation = this.state.operationSelected;
 let columnarr=null;
 


 if(Columns!=null)
 {
    columnarr = Columns.map(column => ({
        label: column.charAt(0).toUpperCase() + column.slice(1),
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


   if(operation==="Select" && filter==="No")
        {
            this.databaseCallSelectNoFilterHandler(Databse,Table,Columns,filter,columnarr);
        }

    
   if(operation==="Select" && filter==="Yes")
   {
       this.databaseCallSelectYesFilterHandler(Databse,Table,Columns,filter,columnarr);
   }
            
 }

    render() {
//Setting the views that are needed
        let tableview = null;
        let columnview = null;
        let filterview=null;
        let buttonview = null;
        let filtermodalview = null;
        let tablebody=null;
        const Operations = ["Select","Update","Delete","Insert"]
        const filterOperation = ["Yes","No"]
        let filterinputview = null;
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
        if(this.state.filterSelected=="Yes")
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
          <div style={{clear:"both"}}>
          <div style={{marginTop: 15}} >
              <h3>Results for the Query</h3>
         <Table data={this.state.Tabledata}></Table> 
         </div>
         </div>
      );
  }

    //If filter is selected then we can get the inputs of the filter form the User
    if(this.state.columnsfilterSelected.length>0)
    {
           console.log(this.state.columnsfilterSelected);
        filterinputview = (
            <div style={{clear: "both"}} >
                <div  style={{float: "left"}}>
                  {         

                      this.state.columnsfilterSelected.map(valuerecord => {
                          console.log(valuerecord)
                        return <div >
                            <DropDown datavalue={valuerecord} filtervalue={(event) => this.handleFilterValueChange(event,valuerecord)} changed={(event) => this.handleDropDownChange(event,valuerecord)} selectedvalue={this.state.operation[valuerecord]} /> 
                        </div>
                      }
                        
                      )
                  }
               </div>
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

if(this.state.filterSelected ==="No" && this.state.columnsSelected.length>0)
{
buttonview = (
    <div  style={{clear:"both"}}>
                      <MDBBtn onClick={this.databaseCallHandler}>Submit</MDBBtn>
                      </div>
         
);
}
else {
    if(this.state.filterSelected ==="Yes" && this.state.columnsfilterSelected.length>0 && (this.state.filtervalue.length == this.state.columnsfilterSelected.length )) {
        buttonview = (
            <div  style={{clear:"both"}}>
                              <MDBBtn onClick={this.databaseCallHandler}>Submit</MDBBtn>
                              </div>
                 
        );
    }
    
}


        return (
            <div>
                {defaultView}
                {tableview}
                {filterview}
                {columnview}
               
                {filtermodalview}
                {filterinputview}
                {console.log(this.state.columnsfilterSelected.length)}
                {console.log(this.state.filtervalue.length)}
                {buttonview}
                {tablebody}
            </div>
        );
    }
}

export default DatabaseHandler;