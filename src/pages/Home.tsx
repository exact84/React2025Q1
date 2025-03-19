import { useState, useMemo } from 'react';
import { useGetCountriesQuery } from '../store/countriesApi';
import CountryList from '../components/CountryList/CountryList';
import Search from '../components/Search/Search';
import useDebouncedValue from '../utils/useDebouncedValue';

const Home = () => {
  const { data: countries, error, isLoading } = useGetCountriesQuery();
  const [search, setSearch] = useState('');
  // const [sortType, setSortType] = useState<"name" | "population" | "">("");
  // const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const searchQuery = useDebouncedValue(search, 300);

  const filteredCountries = useMemo(() => {
    return (
      countries?.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []
    );
  }, [countries, searchQuery]);

  // const sortedCountries = useMemo(() => {
  //   return [...filteredCountries].sort((a, b) => {
  //     if (!sortType) return 0;

  //     const valueA = sortType === "name" ? a.name.common : a.population;
  //     const valueB = sortType === "name" ? b.name.common : b.population;

  //     if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
  //     if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
  //     return 0;
  //   });
  // }, [filteredCountries, sortType, sortOrder]);

  // const handleSort = (type: "name" | "population") => {
  //   if (sortType === type) {
  //     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  //   } else {
  //     setSortType(type);
  //     setSortOrder("asc");
  //   }
  // };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
      <Search searchQuery={search} onSearch={setSearch} />
      <CountryList countries={filteredCountries} />
    </div>
  );
};

export default Home;
