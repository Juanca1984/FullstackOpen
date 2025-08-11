import Weather from './Weather'

const CountryDetails = ({ country }) => {
  const languages = Object.values(country.languages)

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>

      <h3>Languages</h3>
      <ul>
        {languages.map(lang => <li key={lang}>{lang}</li>)}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />

      <Weather capital={country.capital[0]} />
    </div>
  )
}

export default CountryDetails
