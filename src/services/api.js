const callToApi = () => {
  return fetch(
    'https://restcountries.com/v3.1/all?fields=name,capital,flag,continents,cca2'
  )
    .then((response) => response.json())
    .then((data) => {
      const result = data.map((country) => {
        const newData = {
          id: country.cca2,
          flag: country.flag,
          name: country.name.official,
          capital: country.capital[0],
        };

        //some countries have more than one continent
        if (country.continents.length > 1) {
          for (let index = 1; index < country.continents.length + 1; index++) {
            newData[`continents${index}`] = country.continents[index - 1];
          }
        } else {
          newData['continents1'] = country.continents[0];
        }
        return newData;
      });
      return result;
    });
};

export default callToApi;
