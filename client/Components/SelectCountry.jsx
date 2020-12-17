import React from 'react';
import {Select} from "@chakra-ui/react";

const SelectCountry = (props) => {
  
  if (props.countries) {
    var countryOptions = props.countries.map(
      (country, i) => 
      (<option key={`month${i}`} value={country}>{country}</option>)
    )
  }
  return(
    <>
    <Select placeholder="Is there a country you're most interested in visiting?">
      {countryOptions}
    </Select>
    </>
  )
};

export default SelectCountry;