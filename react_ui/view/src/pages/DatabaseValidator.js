import React, { Component } from 'react';
import axios from '../Component/Axios/axios'
import RadioButton from '../Component/MaterialUI/RadioButton'
import Card from '../Component/MaterialUI/Card'


class DatabaseValidator extends Component {

    state =  {
        retrievedDatabase : null,
        showCards : false ,
        selectedDatabase : [],
        validationResults : []
    }

//Get all the databases using Component Did Mount

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

// handleDatabaseChange, Get the databse selected and get it stored in the state

handleDatabaseChange = (event) => {
    let selectedValue=[];
    selectedValue.push(event.target.value)
    if(selectedValue[0]!==undefined)
    {
        if(selectedValue[0]==="All")
        {
            selectedValue=this.state.retrievedDatabase;
        }
        console.log(selectedValue)
        axios.get("/validateDatabse",{
            params: {
                Database : selectedValue
            }
          })
            .then( response => {
               const rawResponse = response.data;
               this.setState({validationResults:rawResponse})
               this.setState({selectedDatabase:selectedValue})
               this.setState({showCards : true})
               

               
            } )
            .catch(error => {
                console.log(error);

            });
            
    }
 
}














    render() {

    let defaultView = null; 
    let cardsview = null; 
         // Build Default View 
   defaultView = (
     <div>
          {this.state.retrievedDatabase === null ? null : 
  <RadioButton
  title="Select the Database you want to Validate"
  changed={(event) => this.handleDatabaseChange(event)}
  dataArray = {["All",...this.state.retrievedDatabase]}
    /> }
  </div>

)

//Build Cards View

      // Build Default View 
      cardsview = (
        <div >
             {this.state.showCards ?
            <div>
           <br />
           { this.state.selectedDatabase.map((database, index) => {
                return (
                 <div style={{border:"1px solid #4B515D",boxShadow:" 0 2px 3px #ccc",padding:"22px 22px 22px 22px",overflow:"hidden",display:"inline-block",maxWidth:"95%"}}>
                    <h5>Validation Results for the <b>{database} </b> Database </h5>
                   {this.state.validationResults.map((ValidationObj,index) => {
                       let validatedDB = Object.keys(ValidationObj);
                       validatedDB = validatedDB[0].toString();
                       console.log(validatedDB)
                       console.log(database)
                       let ValidationResults = ValidationObj[validatedDB];
                       console.log(ValidationResults)
                       const CardTitle = ValidationResults[0];
                       const finalValidationResult = ValidationResults[1];
                       console.log(CardTitle);
                       console.log(finalValidationResult)
                       if(validatedDB===database)
                       {
                        return (
                          
                            <Card selectedDatabase={this.state.selectedDatabase} CardTitle={CardTitle} finalValidationResult={finalValidationResult}></Card>            
                         
                       )

                       }
                       
                   })}
                    </div>
            
                );
              })}
              </div>
    : null }
     </div>
   
   )


        return (
            <div>
               {defaultView}
               {cardsview}
                            </div>
        );
    }
}

export default DatabaseValidator;