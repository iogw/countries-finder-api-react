import { useState, useEffect } from 'react';
import '../styles/App.scss';
import callToApi from '../services/api';

function App() {
  // state
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  //effects
  useEffect(() => {
    callToApi().then((response) => {
      setCountries(response);
    });
  }, []);

  //events
  const handleSearchInput = (ev) => setSearchValue(ev.currentTarget.value);
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
    return countries
    .filter((country) => {
      return country.name.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((country) => {
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
        <div>
          <p>Filters</p>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Busca por nombre"
            value={searchValue}
            onChange={handleSearchInput}
          />
          <select name="" id="">
            <option value="all">All</option>
            <option value="africa">Africa</option>
            <option value="north-america">North America</option>
            <option value="south-america">South America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>
        <ul>{renderCountryCards()}</ul>
      </main>
    </>
  );
}

export default App;
