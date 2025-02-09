import React, { useState, useEffect } from 'react';
import StyledVaccineData from './StyledVaccineData';
import axios from 'axios';
import ChartBox from 'components/organisms/ChartBox/ChartBox';
import Headline from 'components/atoms/Headline/Headline';
import { mapCountryDailyData_vacc, mapGlobalDailyData_vacc, mapGlobalSumData_vacc, mapCountrySumData_vacc, mapCountriesArray } from 'assets/helpers';

const VaccineData = () => {
  const [globalSumData, setGlobalSumData] = useState(null);
  const defaultCountry = 'Poland';
  const [selectedCountrySum, setSelectedCountrySum] = useState(defaultCountry);
  const [countrySumData, setCountrySumData] = useState(null);
  const [countriesArray, setCountriesArray] = useState(null);
  const [countryDailyData, setCountryDailyData] = useState(null);
  const [globalDailyData, setGlobalDailyData] = useState(null);
  const [selectedCountryDaily, setSelectedCountryDaily] = useState(defaultCountry);

  useEffect(() => {
    const source = axios.CancelToken.source();
    let config = { cancelToken: source.token };
    axios
      .get('https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=all', config)
      .then((response) => {
        setGlobalSumData(mapGlobalSumData_vacc(response.data));
        setGlobalDailyData(mapGlobalDailyData_vacc(response.data));
      })
      .catch((err) => console.error(err));

    axios
      .get('https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1', config)
      .then((response) => setCountriesArray(mapCountriesArray(response.data)))
      .catch((err) => console.error(err));

    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    if (!selectedCountrySum) return;
    setCountrySumData(null);
    const source = axios.CancelToken.source();
    let config = { cancelToken: source.token };
    axios
      .get(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${selectedCountrySum}?lastdays=all`, config)
      .then((response) => setCountrySumData(mapCountrySumData_vacc(response.data)))
      .catch((err) => {});
  }, [selectedCountrySum]);

  useEffect(() => {
    if (!selectedCountryDaily) return;
    setCountryDailyData(null);
    const source = axios.CancelToken.source();
    let config = { cancelToken: source.token };
    axios
      .get(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${selectedCountryDaily}?lastdays=all`, config)
      .then((response) => setCountryDailyData(mapCountryDailyData_vacc(response.data)))
      .catch((err) => {});
  }, [selectedCountryDaily]);

  return (
    <StyledVaccineData>
      <>
        <Headline size="2">Szczepienia</Headline>
        <ChartBox data={globalSumData?.datasets} labels={globalSumData?.labels} isLoader={globalSumData ? false : true}>
          Szczepienia na świecie przyrostowo
        </ChartBox>
        <ChartBox data={globalDailyData?.datasets} labels={globalDailyData?.labels} isBarChart={true} isLoader={globalDailyData ? false : true}>
          Szczepienia na świecie dziennie
        </ChartBox>
        <ChartBox
          data={countrySumData?.data}
          labels={countrySumData?.labels}
          countries={countriesArray}
          callback={setSelectedCountrySum}
          selectedCountry={selectedCountrySum}
          isLoader={countrySumData ? false : true}
        >
          Szczepienia wg. kraju przyrostowo
        </ChartBox>
        <ChartBox
          data={countryDailyData?.data}
          labels={countryDailyData?.labels}
          countries={countriesArray}
          callback={setSelectedCountryDaily}
          selectedCountry={selectedCountryDaily}
          isBarChart={true}
          isLoader={countryDailyData ? false : true}
        >
          Szczepienia wg. kraju dziennie
        </ChartBox>
      </>
    </StyledVaccineData>
  );
};

export default VaccineData;
