import { useState } from 'react';
import { useGetCountriesQuery } from '../store/countriesApi';
import CountryList from '../components/CountryList/CountryList';
import Search from '../components/Search/Search';
import useDebouncedValue from '../utils/useDebouncedValue';

const Home = () => {
  const { data: countries, error, isLoading } = useGetCountriesQuery();
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [sortType, setSortType] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const searchQuery = useDebouncedValue(search, 300);

  const filteredCountries =
    countries?.filter((country) => {
      return (
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (region === '' || country.region === region)
      );
    }) || [];

  if (sortType) {
    filteredCountries.sort((a, b) => {
      const valueA = sortType === 'name' ? a.name.common : a.population;
      const valueB = sortType === 'name' ? b.name.common : b.population;
      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const handleSort = (type: 'name' | 'population') => {
    if (sortType === type) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortType(type);
      setSortOrder('asc');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
      <Search searchQuery={search} onSearch={setSearch} />
      <select value={region} onChange={(e) => setRegion(e.target.value)}>
        <option value="">All</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>

      <button onClick={() => handleSort('name')}>
        Sort by name{' '}
        {sortType === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
      </button>
      <button onClick={() => handleSort('population')}>
        Sort by population{' '}
        {sortType === 'population' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
      </button>
      <CountryList countries={filteredCountries} />
    </div>
  );
};

export default Home;
