import React, { useState } from 'react';
import axios from 'axios';
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import SelectCountry from './SelectCountry.jsx';


function Main() {
  const [month, setMonth] = useState('');
  const [temp, setTemp] = useState('');
  const [continent, setContinent] = useState('');
  const [apiData, setApiData] = useState('');
  const [countries, setCountries ] = useState('');

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthOptions = months.map((mon, i) => {
    return (<option value={mon} key={`month${i}`}>{mon}</option>)
  })

  const continents = ["Africa", "Asia", "Europe", "North America", "Oceania", "South America"]
  const continentOptions = continents.map((continent, i) => (<option key={`continents${i}`} value={continent}>{continent}</option>))

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/recs', {
      month,
      temp,
      continent,
      country: ""
    })
    .then(res => {
      if (res.status === 200) {
        console.log('hit axios get recs response, data: ', res.data);
        setApiData(res.data);
      }
    })
  }

  const getCountries = (val) => {
    console.log('axios hit get countries: ', val);
    axios.get(`/recs/months/${val}`)
    .then(res => {
      if (res.status === 200) {
       
        /**format of response is [{'country': countryName}]
         * objects cannot be passed as react props
         * conver to array of strings only
         */
        const countriesData = res.data.countries.map    (countryObj => (
          countryObj['country']
        ));
        setCountries(countriesData);
      }
    })
  }

  return(
    <div>
      <h2>When are you travelling?</h2>
      <form onSubmit={handleSubmit}>
        <Select key="selectmonth" name="month" placeholder="What month are you travelling" isRequired onChange={e => setMonth(e.target.value)}>
          {monthOptions}
        </Select>
        <Select key="selectcont" name="continent" placeholder="Where are you going?" onChange={
          e => {
            getCountries(e.target.value);
            setContinent(e.target.value);
          }
        }>
          {continentOptions}
        </Select>
        {/* if countries array has values display select for country */}
        {countries.length ? <SelectCountry  countries={countries}/> : <></>}
        <Select key="selecttemp" name="temp" placeholder = "What's your ideal temperature?" onChange={e => setTemp(e.target.value)}>
          <option key={'temp0'} value="0-30">Freezing!</option>
          <option key={'temp1'} value="30-50">Cold</option>
          <option key={'temp2'} value="50-60">Chillly</option>
          <option key={'temp3'} value="60-70">Mild</option>
          <option key={'temp4'} value="60-70">Warm</option>
          <option key={'temp5'} value="70-80">Hot</option>
          <option key={'temp6'} value="90-120">Oppressive</option>
        </Select>
        <Input type="submit" value="Send me my recs!" />
      </form>
      {/* if api data has a length > 0, display recs component */}
    </div>
  )
}

export default Main;