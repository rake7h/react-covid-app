import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCountries } from '../store'

import SearchBar from "../components/search-bar";
import Overview from "../components/overview";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCountries())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
  const countries = useSelector(state => state.countries.countries)
  const loading = useSelector(state => state.countries.loading)

  const [selectedCountry, setCountry] = React.useState('');

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box mt={12} display="flex" justifyContent="center">
          <SearchBar get={setCountry} countries={countries} loading={loading}/>
        </Box>
        <Box mt={12}>
          <Overview country={selectedCountry}/>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Home;
