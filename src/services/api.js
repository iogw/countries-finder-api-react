const callToApi = () => {
  return fetch(
    'https://restcountries.com/v3.1/all?fields=name,capital,flag,continents,cca2'
  )
    .then((response) => response.json())
    .then((data) => {
      // return data;
      const result = data.map((country) => {
        const newData = {
          id: country.cca2,
          flag: country.flag,
          name: country.name.official,
        };
        newData.capital = country.capital[0];
        newData.continents = country.continents[0];

        // if (country.continents.length > 1) {
        //   for (let index = 0; index < country.continents.length; index++) {
        //     newData.continents.index = country.continents[index];
        //   }
        // } else {
        //   newData.continents = country.continents[0];
        // }
        return newData;
      });
      return result;
    });
};

export default callToApi;
