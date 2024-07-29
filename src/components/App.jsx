import { useState, useEffect } from 'react';
import '../styles/App.scss';
import callToApi from '../services/api';
import { v7 as uuid } from 'uuid';

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
  const [continentSelector, setcontinentSelector] = useState('all');
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
  const handleSelectContinent = (ev) => setcontinentSelector(ev.target.value);
  const handleAddNewCountry = () => {
    if (
      newCountryData.flag === '' &&
      newCountryData.name === '' &&
      newCountryData.capital === '' &&
      newCountryData.continent === ''
    ) {
      setError('YOU FORGOT SOMETHING');
    } else {
      setError('');
      setCountries([{ id: uuid(), ...newCountryData }, ...countries]);
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
      <header className="header">
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
      <form className="filters" action="" onSubmit={handleFormSubmit}>
        <h3>Filters</h3>
        <div>
          <label htmlFor="search">By country: </label>
          <input
            type="text"
            name="search"
            id="search"
            value={searchValue}
            onChange={handleSearchInput}
          />
        </div>

        <div>
          <label htmlFor="continent">By continent:</label>
          <select
            name="continent"
            id="continent"
            value={continentSelector}
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
        </div>
      </form>
    );
  };
  const renderAddCountryForm = () => {
    return (
      <form
        className="add-form"
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
        {error ? <p className="red">{error}</p> : null}
      </form>
    );
  };
  const renderCountryCards = () => {
    return countries
      .filter((country) => {
        return country.name.toLowerCase().includes(searchValue.toLowerCase());
      })
      .filter((country) => {
        if (continentSelector === 'all') {
          return country;
        } else if (continentSelector === 'north-america') {
          return country.continent === 'North America';
        } else if (continentSelector === 'south-america') {
          return country.continent === 'South America';
        } else {
          return country.continent.toLowerCase() === continentSelector;
        }
      })
      .map((country) => {
        return (
          <section className="card" key={country.id}>
            <div>
              <p>{country.flag}</p>
              <p>{country.name}</p>
              <p>{country.capital}</p>
              <p>{country.continent}</p>
            </div>
            <div>
              <button
                className="delete-button"
                id={country.id}
                onClick={handleDelBtn}
              >
                x
              </button>
            </div>
          </section>
        );
      });
  };

  return (
    <>
      {renderHeader()}
      <main className="main">
        <div className="forms">
          {renderSearchForm()}
          {renderAddCountryForm()}
        </div>
        <div className="cards-container">{renderCountryCards()}</div>
      </main>
    </>
  );
}

export default App;
