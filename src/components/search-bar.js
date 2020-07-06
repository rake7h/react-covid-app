/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {countryToFlag} from '../utils';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function SearchBar(props) {
  const classes = useStyles();
  const handleSelectChange = (value) => {
    props.get(value);
  }
  return (
    <>
    <Autocomplete
      id="country-select-demo"
      style={{ width: 300 }}
      onChange={(event, newValue) => {
          newValue
          ? handleSelectChange(newValue)
          : handleSelectChange('')
        }}
      options={props.countries}
      loading={props.loading}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(option) => (
        <React.Fragment>
          <span>{countryToFlag(option.code)}</span>
          {option.label}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
    </>
  );
}
