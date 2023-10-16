import { useState, useEffect } from 'react';
import '../styles/App.scss';
import callToApi from '../services/api';

function App() {
  // state
  const newObjData = {
    flag: '',
    name: '',
    capital: '',
    continent: '',
  };
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [continentSelect, setContinentSelect] = useState('all');
  const [newCountryData, setNewCountryData] = useState(newObjData);
  const [error, setError] = useState('');

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
  const handleAddNewCountry = () => {
    if (
      newCountryData.flag === '' &&
      newCountryData.name === '' &&
      newCountryData.capital === '' &&
      newCountryData.continent === ''
    ) {
      setError('TE HAS OLVIDADO DE ALGO')
    } else {
      setError('')
      setCountries([newCountryData, ...countries]);
      setNewCountryData(newObjData);
    }
  };
  const handleDelBtn = (ev) => {
    const newList = countries;
    const idxInList = newList.findIndex(
      (element) => element.id === ev.currentTarget.id
    );
    newList.splice(idxInList, 1);
    setCountries([...newList]);
  };
  //renders
  const renderHeader = () => {
    return (
      <header>
        <h1>Country Info App</h1>
        <p>
          Explore information about countries, capitals, and flags. Add new
          countries and filter through the list!
        </p>
      </header>
    );
  };
  const renderSearchForm = () => {
    return (
      <form action="" onSubmit={handleFormSubmit}>
        <h3>Filters</h3>
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
    );
  };
  const renderAddCountryForm = () => {
    return (
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
        }}
      >
        <h3>Add Country</h3>
        <input
          id="name"
          type="text"
          placeholder="Country Name"
          value={newCountryData.name}
          onChange={(ev) =>
            setNewCountryData({
              ...newCountryData,
              [ev.target.id]: ev.target.value,
            })
          }
        />
        <input
          id="capital"
          type="text"
          placeholder="Capital"
          value={newCountryData.capital}
          onChange={(ev) =>
            setNewCountryData({
              ...newCountryData,
              [ev.target.id]: ev.target.value,
            })
          }
        />
        <input
          id="flag"
          type="text"
          placeholder="Flag Icon"
          value={newCountryData.flag}
          onChange={(ev) =>
            setNewCountryData({
              ...newCountryData,
              [ev.target.id]: ev.target.value,
            })
          }
        />
        <input
          id="continent"
          type="text"
          placeholder="Continent"
          value={newCountryData.continent}
          onChange={(ev) =>
            setNewCountryData({
              ...newCountryData,
              [ev.target.id]: ev.target.value,
            })
          }
        />
        <button type="submit" onClick={handleAddNewCountry}>
          Add country
        </button>
        <p>{error}</p>
      </form>
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
          return country.continent === 'North America';
        } else if (continentSelect === 'south-america') {
          return country.continent === 'South America';
        } else {
          return country.continent.toLowerCase() === continentSelect;
        }
      })
      .map((country) => {
        return (
          <li key={country.id}>
            <div>
              <p id={country.id} onClick={handleDelBtn}>
                x
              </p>
            </div>
            <div>
              <p>{country.flag}</p>
              <p>{country.name}</p>
              <p>{country.capital}</p>
              <p>{country.continent}</p>
            </div>
          </li>
        );
      });
  };

  return (
    <>
      {renderHeader()}
      <main>
        <div>
          {renderSearchForm()}
          {renderAddCountryForm()}
        </div>
        <ul>{renderCountryCards()}</ul>
      </main>
    </>
  );
}

export default App;
