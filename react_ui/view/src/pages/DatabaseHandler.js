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
       columnupdateSelected : [],
       filterSelected : null,
       operationSelected : null,
       showTable : false,
       Tabledata : null,
       operation : {},
       filtervalue: [],
       filterupdatevalue : [],
       showbutton : false,
       Showmessage:false,
       affectedrow : null
     
      };

// This mehod is used to push things to array after some business operation

pushArrayItems = (filterarr,event) => {
    let temparr = [];
        
        console.log(filterarr)
        let columnselectedarr = event.target.value;
        console.log(columnselectedarr)
       
        columnselectedarr.forEach((column) => {
                console.log(column)
            filterarr.forEach((element,index) => {
                console.log("Element is ")
                console.log(element)
                
                console.log("Valie of index is ")
                console.log(index)
                const tempkey =  Object.keys(element).toString()
                    console.log(tempkey)
                if(tempkey===column)
                {
                    temparr.push(element)
                }
                
            });

        });

        return temparr
}


// This method is used to handle the column changes in the dropdown based on from where they are called from
// To improve this can be split into different method or overloaded or overrided in future

handleColoumnChange = (event,whichDropDown) => {
    if(whichDropDown==="Report")
    {
    
        this.setState({columnsSelected: event.target.value});
    }
 else{
   
    if(whichDropDown==="Filter")
    {  
    const temparr =  this.pushArrayItems(this.state.filtervalue,event)
    this.setState({columnsfilterSelected: event.target.value, filtervalue:temparr});
}
else{

    if(whichDropDown==="Update")
    {
        const temparr =  this.pushArrayItems(this.state.filterupdatevalue,event)
        this.setState({columnupdateSelected : event.target.value, filterupdatevalue:temparr});
    }

}


}
   
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

             //console.log( retrievedDatabase );
             this.setState({retrievedDatabase: retrievedDatabase});
        } )
        .catch(error => {
            console.log(error);
            // this.setState({error: true});
        });
}






// This method is used to handle the radio button changes in the UI  based on from where they are called from
// To improve this can be split into different method or overloaded or overrided in future

handleRadioChange = (event,whichRadio) => {
    const selectedValue=event.target.value; 
   // console.log(selectedValue)
    let retrievedTable = null;
    let retrievedColumns = null;
    if(whichRadio === "Database") 
        {
            axios.get(`/getalltables/${selectedValue}`)
            .then( response => {
               // console.log(response.data[1])

               retrievedTable = response.data[1].map(tableObj => {
                   return Object.values(tableObj).toString()
                })
           //     console.log(retrievedTable);
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
          //  console.log(response.data)

           retrievedColumns = response.data.map(columnObj => {
               return Object.values(columnObj).toString()
            })
          //  retrievedColumns = ["All",...retrievedColumns]
            console.log(retrievedColumns);

            
                this.setState({retrievedColumns : retrievedColumns, isTableSelected:true,selectedTable:selectedValue})
           
        
       // console.log(selectedValue)
           
        } )
        .catch(error => {
            console.log(error);

        });
    }
    
   // console.log("Outside operatat")
    if(whichRadio === "Operation") 
    {
       // console.log("Cae inside oeprat")
       
    this.setState({operationSelected:selectedValue,
        isDatabaseSelected : false,
        isTableSelected : false,
        selectedDatabase : null,
        selectedTable : null,
        retrievedTable : null,
        retrievedColumns : null,
        columnsSelected : [],
        columnsfilterSelected : [],
        columnupdateSelected : [],
        showTable : false,
        Tabledata : null,
        operation : {},
        filtervalue: [],
        showbutton : false,filterSelected:null,
        Showmessage : false,
        affectedrow : null
    });
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
    // console.log(filter)

        operationObj[filter] = event.target.value
       // console.log(operationObj)
        this.setState({operation:operationObj});
 
    
   
  };
  
// This is used to push array items from down securely and as per Business requiremment. 
// If the key is alreeady presen, it needs to overwritten and not pushed as new element 
  pushArrayItemsdropdown = (event,filter,filterarr,tempvalue) => {
    let tempObj = {};
    let iselementpresent= false;
    tempObj[filter] = [tempvalue,event.target.value]
    // console.log(tempObj)
    let tempObjKeys =  Object.keys(tempObj).toString()
  //  console.log(tempObjKeys)
    if(filterarr.length == 0)
    {
     filterarr.push(tempObj)
    }
    else
    {
     filterarr.forEach((element,index) => {
      //   console.log("Inside the for each")
       //  console.log(element)
         
       //  console.log("Valie of index is ")
       //  console.log(index)
         const tempkey =  Object.keys(element).toString()
          //   console.log(tempkey)
         if(tempObjKeys==tempkey)
         {
           //  console.log("Came inside the if both are ewuasd")
             filterarr[index] = tempObj;
             iselementpresent = true;
         }
         
     }
     );
   if(filterarr.length != 0 && !iselementpresent)
   {
     filterarr.push(tempObj)
   }
    }
   
    return filterarr
  }



  //This method is used to set the state of filtered value
  // Two way binded   
  handleFilterValueChange = (event,filter,operation) => {
       let filterarr = []; 
      
      
       let tempvalue = this.state.operation[filter]
       if(tempvalue == undefined )
       {
           tempvalue = "is"
       }
     //  console.log(event.target.value)
     //  console.log(filterarr.length)
       
       if(event.target.value !="Please enter a value")
       {
           console.log(this.state.operationSelected)
       
        if(operation==="filtervalue")
        {
            console.log("Came inside  filtervalue")
            filterarr = this.pushArrayItemsdropdown(event,filter,this.state.filtervalue,tempvalue)
            this.setState({filtervalue:filterarr});
        }else{
            if(operation==="filterupdatevalue")
            {
                console.log("Came inside  filterupdatevalue")
                filterarr = this.pushArrayItemsdropdown(event,filter,this.state.filterupdatevalue,tempvalue)
                this.setState({filterupdatevalue:filterarr});
            }
        }
       
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
    //    console.log(TableSkeleton)
        this.setState({Tabledata:TableSkeleton});
        this.setState({showTable:true});

    } )
    .catch(error => {
        console.log(error);

    });
    
}



//Call to database when select is selected and Yes filters are selected 

databaseCallSelectYesFilterHandler = (Databse,Table,Columns,filter,columnarr) => {
    let filtervalue = this.state.filtervalue;
    



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
        console.log(response)
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

// Call to Databsae when the Delete operation is selected 

databaseCallDeleteHandler = (Databse,Table,Columns,filter,columnarr) => {


    let filtervalue = this.state.filtervalue;

    let filterupdatevalue = this.state.filterupdatevalue;
console.log(Databse)
console.log(Table)

console.log(Columns)

console.log(filter)

console.log(columnarr)


   
    axios.delete("/DeleteQuery",{
        params: {
            Databse: Databse,
            Table : Table,
            Columns : Columns,
            filter : filter,
            filtervalue : filtervalue,
            filterupdatevalue : filterupdatevalue
        }
      })
    .then( response => {
        console.log(response)
        console.log(response.data)
        // rowarr = response.data[1]
        // TableSkeleton = {
        //     columns : columnarr,
        //     rows : rowarr
        // }
        // console.log(TableSkeleton)
        // this.setState({Tabledata:TableSkeleton});
        this.setState({Showmessage:true, affectedrow : response.data[0]});

    } )
    .catch(error => {
        console.log(error);

    });
    
}



// Call to Databsae when the Update operation is selected 

databaseCallUpdateHandler = (Databse,Table,Columns,filter,columnarr) => {
    let filtervalue = this.state.filtervalue;

    let filterupdatevalue = this.state.filterupdatevalue;
console.log(Databse)
console.log(Table)

console.log(Columns)

console.log(filter)

console.log(columnarr)


   
    axios.put("/UpdateQuery",null,{
        params: {
            Databse: Databse,
            Table : Table,
            Columns : Columns,
            filtervalue : filtervalue,
            filterupdatevalue : filterupdatevalue
        }
      })
    .then( response => {
        console.log(response)
        console.log(response.data)


        // this.setState({Tabledata:TableSkeleton});
        // this.setState({Showmessage:true});
        this.setState({Showmessage:true, affectedrow : response.data[0]});

    } )
    .catch(error => {
        console.log(error);

    });
    
}





  // After Clicking on this button, we need to call databse to get the results, as we got whatever we need

databaseCallHandler = () => {

 const Databse = this.state.selectedDatabase;
 const Table = this.state.selectedTable;
 let Columns = this.state.columnsSelected;
 const filter = this.state.filterSelected;
 const operation = this.state.operationSelected;
 let ColumnHeader=null;
 let allSelected = false;

 this.setState({Showmessage:false})

 if(Columns!=null)
 {
    Columns.forEach((column) => {
        console.log(column)
        if(column.toString()==="All")
        {
            allSelected = true;
        }
    });
    if(allSelected){
        Columns = this.state.retrievedColumns
        console.log(Columns)
    }
    ColumnHeader = Columns.map(column => ({
        label: column.charAt(0).toUpperCase() + column.slice(1),
        field: column,
        sort: 'asc',
        width: 150
    }))

 }

   if(operation==="Select" && filter==="No")
        {
            this.databaseCallSelectNoFilterHandler(Databse,Table,Columns,filter,ColumnHeader);
        }

    
   if(operation==="Select" && filter==="Yes")
   {
       this.databaseCallSelectYesFilterHandler(Databse,Table,Columns,filter,ColumnHeader);
   }

   if(operation==="Update")
   {
      this.databaseCallUpdateHandler(Databse,Table,Columns,filter,ColumnHeader);
   }

   if(operation==="Delete")
   {
      this.databaseCallDeleteHandler(Databse,Table,Columns,filter,ColumnHeader);
   }
            
 }

    render() {
//Setting the views that are needed
        let tableview = null;
        let deleteView = null;
        let columnview = null;
        let columnview2 = null;
        let filterview=null;
        let affectedrowsview = null; 
        let buttonview = null;
        let filtermodalview = null;
        let tablebody=null;
        const Operations = ["Select","Update","Delete"]
        const filterOperation = ["Yes","No"]
        let filterinputview = null;
        let filterupdateview = null;
        let coloumnReport = null;
        if(this.state.retrievedColumns != null)
        {
             coloumnReport = ["All",...this.state.retrievedColumns]
        }
        
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
 // Only applicable for Select 
 if (this.state.isTableSelected) {
 filterview = (
     this.state.operationSelected==="Select" ?
     
    <div>
    <RadioButton
    title="Do you want to add filter to the Query using Where conditon "
    changed={(event) => this.handleRadioChange(event,"filter")}
    dataArray ={filterOperation}
  
      /> 
</div> : null
         
);
 }

// Build the Delete View Dropdown 

if(this.state.operationSelected==="Delete")
{
    
    if (this.state.isTableSelected) {

        deleteView = (
            <div>
            <MultiSelect 
            dataObj={this.state.retrievedColumns}
            changed={(event) => this.handleColoumnChange(event,"Filter")}
            coloumnValue = {this.state.columnsfilterSelected}
            title="Please select the columns you like to add condition"
            ></MultiSelect>
          </div>
                 
        );
}
}

//If table is selected, then we can show the columns
//Also we will ask, if member want to add any condition to filter the results 
// Only for Slselct 
// Building Select View 
if(this.state.operationSelected==="Select")
{
    
    if (this.state.isTableSelected && this.state.filterSelected) {
        if(this.state.filterSelected=="Yes")
        columnview = (
            <div>
            <MultiSelect 
            dataObj={coloumnReport}
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
                dataObj={coloumnReport}
                changed={(event) => this.handleColoumnChange(event,"Report")}
                coloumnValue = {this.state.columnsSelected}
                title="Please select the columns needed to show in the report"
                ></MultiSelect>
           
                     
            );

        }

      }
}


// Buld the Update vView for Dropdown
if(this.state.operationSelected==="Update" && (this.state.columnupdateSelected.length>0 && (this.state.filterupdatevalue.length == this.state.columnupdateSelected.length )))
{
    columnview2 = (
        <div style={{clear:"both"}}>
        <MultiSelect 
        dataObj={this.state.retrievedColumns}
        changed={(event) => this.handleColoumnChange(event,"Filter")}
        coloumnValue = {this.state.columnsfilterSelected}
        title="Please select the columns you like to add condition"
        ></MultiSelect>
        </div>
    );
}
// Buld the Update vView for Dropdown 2
if(this.state.operationSelected==="Update")
{
    
    if (this.state.isTableSelected) {
        columnview = (
           
            <div style={{clear:"both"}}>
            <MultiSelect 
            dataObj={this.state.retrievedColumns}
            changed={(event) => this.handleColoumnChange(event,"Update")}
            coloumnValue = {this.state.columnupdateSelected}
            title="Please select the columns you like to Update"
            ></MultiSelect>           

           
           
          </div>
                 
        );
      

      }
}
   

//If Columns are selected, then we need to ask, if member is going to add any Where condition in the query
// When selected No during the Filter, we are going to pop up a message saying that 
//Only top 10 rows will be fetched 
  
if (this.state.filterSelected==="No") {
    // console.log("Came inbside filter selected")
    filtermodalview = (
   
        <div>
        <Modal
        data="If there are no Filter added, Then we will fetch only the Top 10 rows "
        modalvalue={true}
          /> 
 </div>
             
    );
  }


  // Build Affected Rows View

  if (this.state.Showmessage) {
    console.log("Came inbside Show sMessage")
    affectedrowsview = (
   
        <div>
        <Modal
        data={"Number of rows affected by "+this.state.operationSelected+" is "+this.state.affectedrow}
        modalvalue={true}
          /> 
 </div>
             
    );

  }
 


  //If column view is null then we can create the table
  // Build the table body
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
    // Build Filter input view.. that values that enter after we mulitselect 
    if(this.state.columnsfilterSelected.length>0)
    {
      //     console.log(this.state.columnsfilterSelected);
        filterinputview = (
            <div style={{clear: "both"}} >
                <div  style={{float: "left"}}>
                  {         

                      this.state.columnsfilterSelected.map((valuerecord,index) => {
                          console.log("Column Filter selected is ")
                        console.log(valuerecord)
                        return <div >
                            <DropDown menuitem={["is","in","like"]} datavalue={valuerecord} filtervalue={(event) => this.handleFilterValueChange(event,valuerecord,"filtervalue")} changed={(event) => this.handleDropDownChange(event,valuerecord)} datavalue2={this.state.filtervalue[index]} selectedvalue={this.state.operation[valuerecord]} /> 
                        </div>
                      }
                        
                      )
                  }
               </div>
           </div>
        );
    }


      //If columns to update is selected then we can get the inputs of the filter form the User
      if(this.state.columnupdateSelected.length>0)
      {
        //     console.log(this.state.columnupdateSelected);
          filterupdateview = (
              <div style={{clear: "both"}} >
                  <div  style={{float: "left"}}>
                    {         
  
                            this.state.columnupdateSelected.map((valuerecord,index) => {
                                console.log("Column Filter Update selected is ")
                            console.log(valuerecord)
                            return <div >
                                <DropDown menuitem={["is"]} datavalue={valuerecord} filtervalue={(event) => this.handleFilterValueChange(event,valuerecord,"filterupdatevalue")}  datavalue2={this.state.filterupdatevalue[index]}  /> 
                            </div>
                        }
                          
                        )
                    }
                 </div>
             </div>
          );
      }


      // Build Default View 
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
  
// Build Button view

if(this.state.filterSelected ==="No" && this.state.columnsSelected.length>0)
{
buttonview = (
    <div  style={{clear:"both"}}>
                      <MDBBtn onClick={this.databaseCallHandler}>Submit</MDBBtn>
                      </div>
         
);
}
else {
    if(this.state.columnsfilterSelected.length>0 && (this.state.filtervalue.length == this.state.columnsfilterSelected.length )) {
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
                {deleteView}
                {filterupdateview}
                {columnview2}
                {filtermodalview}
                {filterinputview}
              
               
                {/* {console.log(this.state.columnsfilterSelected.length)}
                {console.log(this.state.filtervalue.length)} */}
                {buttonview}
                {affectedrowsview}
                {tablebody}
            </div>
        );
    }
}

export default DatabaseHandler;