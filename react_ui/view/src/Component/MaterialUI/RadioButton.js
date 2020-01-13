import React from 'react';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles({
    root: {
        minWidth: 300,
    },
  });


export default function RadioButton(props) {
 // const [value, setValue] = React.useState('female');
  const classes = useStyles();


  // const handleChange = event => {
  //   setValue(event.target.value);
  // };

 

  return (
    <FormControl component="fieldset">
         <p>{props.title}</p>
         {/* <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row> */}
         <RadioGroup aria-label="position" name="position" onClick={props.changed} row>
         {props.dataArray.map((data, index) => {


            //  console.log(data);
             return (
              <FormControlLabel className={classes.root}
          key={data}
          value={data}
          control={<Radio color="secondary" />}
          label={data}
          labelPlacement="top"
              /> );
    }) }

        {/* <FormControlLabel className={classes.root}
          value={props.dataArray[0]}
          control={<Radio color="primary" />}
          label={props.dataArray[0]}
          labelPlacement="top"
        />
        <FormControlLabel className={classes.root}
          value="start"
          control={<Radio color="primary" />}
          label="Start"
          labelPlacement="top"
        />
        <FormControlLabel className={classes.root}
          value="bottom"
          control={<Radio color="primary" />}
          label="Bottom"
          labelPlacement="top"
        />
        <FormControlLabel className={classes.root}
          value="end"
          control={<Radio color="primary" />}
          label="End"
          labelPlacement="top"
        /> */}
      </RadioGroup>
    </FormControl>
  );
}
