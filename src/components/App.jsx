import { useState, useEffect } from 'react';
import '../styles/App.scss';
import callToApi from '../services/api';

function App() {
  // state
  const [countries, setCountries] = useState([]);

  //effects
  useEffect(() => {
    callToApi().then((response) => {
      setCountries(response);
    });
  }, []);

  //events

  //renders
  const renderHeader = () => {
    return (
      <header>
        <h1>Country Info App</h1>
        <p>
          Explore information about countries, capitals, and flags. Add new
          countries and flter through the list!
        </p>
      </header>
    );
  };
  const renderCountryCards = () => {
    return countries.map((country) => {
      return (
        <li key={country.id}>
          <p>{country.flag}</p>
          <p>{country.name}</p>
          <p>{country.capital}</p>
          <p>{country.continents}</p>
        </li>
      );
    });
  };

  return (
    <>
      {renderHeader()}
      <main>
        <ul>{renderCountryCards()}</ul>
      </main>
    </>
  );
}

export default App;
