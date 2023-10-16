import { useState, useEffect } from 'react';
import '../styles/App.scss';
import callToApi from '../services/api';

function App() {
  // state
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [continentSelect, setContinentSelect] = useState('all');

  //effects
  useEffect(() => {
    callToApi().then((response) => {
      setCountries(response);
    });
  }, []);

  //events
  const handleFormSubmit = (ev) => ev.preventDefault();
  const handleSearchInput = (ev) => setSearchValue(ev.currentTarget.value);
  const handleSelectContinent = (ev) => setContinentSelect(ev.target.value);
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
      .filter((country) => {
        if (continentSelect === 'all') {
          return country;
        } else if (continentSelect === 'north-america') {
          return country.continents === 'North America';
        } else if (continentSelect === 'south-america') {
          return country.continents === 'South America';
        } else {
          return country.continents.toLowerCase() === continentSelect;
        }
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
          <form action="" onSubmit={handleFormSubmit}>
            <p>Filters</p>
            <label htmlFor="search">By country: </label>
            <input
              type="text"
              name="search"
              id="search"
              value={searchValue}
              onChange={handleSearchInput}
            />

            <label htmlFor="continent">By continent:</label>
            <select
              name="continent"
              id="continent"
              value={continentSelect}
              onChange={handleSelectContinent}
            >
              <option value="all">All</option>
              <option value="africa">Africa</option>
              <option value="north-america">North America</option>
              <option value="south-america">South America</option>
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
              <option value="oceania">Oceania</option>
            </select>
          </form>
        </div>
        <ul>{renderCountryCards()}</ul>
      </main>
    </>
  );
}

export default App;
