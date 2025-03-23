import { SetStateAction, useCallback, useMemo, useState } from 'react';
import { useGetCountriesQuery } from '../store/countriesApi';
import CountryList from '../components/CountryList/CountryList';
import Search from '../components/Search/Search';

const Home = () => {
  const { data: countries, error, isLoading } = useGetCountriesQuery();
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [sortType, setSortType] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredCountries = useMemo(() => {
    if (!countries) return [];
    const result = countries.filter((country) => {
      return (
        country.name.common.toLowerCase().includes(search.toLowerCase()) &&
        (region === '' || country.region === region)
      );
    });

    if (sortType) {
      result.sort((a, b) => {
        const valueA = sortType === 'name' ? a.name.common : a.population;
        const valueB = sortType === 'name' ? b.name.common : b.population;
        return sortOrder === 'asc'
          ? valueA > valueB
            ? 1
            : -1
          : valueA < valueB
            ? 1
            : -1;
      });
    }
    return result;
  }, [countries, search, region, sortType, sortOrder]);

  const handleSort = useCallback(
    (type: SetStateAction<string>) => {
      setSortOrder((prev) =>
        sortType === type ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'
      );
      setSortType(type);
    },
    [sortType]
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
      <Search searchQuery={search} onSearch={setSearch} />
      <span>Region: </span>
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
