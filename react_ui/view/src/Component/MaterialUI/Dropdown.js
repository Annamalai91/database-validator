import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
      
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  second : {
      width:100,
      margin: theme.spacing(1),
  },

}));






export default function CustomizedSelects(props) {
  console.log("Props coming")
  console.log(props.datavalue)
  const classes = useStyles();

 
  return (
    <div>
      <FormControl className={classes.margin}>
        <InputLabel>Coloumn to be Filtered</InputLabel>
        <BootstrapInput disabled={true} defaultValue={props.datavalue} />
      </FormControl>
      <FormControl className={classes.second}>
        <InputLabel >Operation</InputLabel>
        <Select
          value={props.selectedvalue == undefined ? "is" : props.selectedvalue}
          onChange={props.changed}
          input={<BootstrapInput  />}
        >
          <MenuItem value="is">is</MenuItem>
          <MenuItem value="in">in</MenuItem>
          <MenuItem value="like">like</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel required={true} >Value of Filter(Comma seperated for "in" operation)</InputLabel>
        <BootstrapInput defaultValue="Please enter the Search Sring " onBlur={props.filtervalue} style={{width:400}} />
      </FormControl>
    </div>
  );
}
