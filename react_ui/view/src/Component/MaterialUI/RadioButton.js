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


export default function RadioButton() {
  const [value, setValue] = React.useState('female');
  const classes = useStyles();


  const handleChange = event => {
    setValue(event.target.value);
  };

 

  return (
    <FormControl component="fieldset">
      <p>Select the Database you want to Query</p>
      <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
        <FormControlLabel className={classes.root}
          value="top"
          control={<Radio color="primary" />}
          label="Top"
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
        />
      </RadioGroup>
    </FormControl>
  );
}
