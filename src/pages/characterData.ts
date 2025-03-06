import { GetServerSidePropsContext } from 'next';
import { Character } from 'types/characterTypes';

export async function getCharacterData(context: GetServerSidePropsContext) {
  console.log(
    'getCharacterData вызван с контекстом:',
    context.query,
    context.params
  );
  const { query, params } = context;
  try {
    if (params?.id) {
      const response = await fetch(`https://swapi.dev/api/people/${params.id}`);
      const character: Character = await response.json();

      if (!character) {
        return { props: { character: null } };
      }
      // console.log('Один персонаж:', character);
      return {
        props: { character },
      };
    } else {
      const searchQuery = query.query ? String(query.query) : '';
      const page = query.page ? String(query.page) : '1';

      const response = await fetch(
        `https://swapi.dev/api/people/?search=${encodeURIComponent(
          searchQuery
        )}&page=${page}`
      );
      const data = await response.json();
      console.log(
        'Результат поиска:',
        `https://swapi.dev/api/people/?search=${encodeURIComponent(
          searchQuery
        )}&page=${page}`,
        data.count
      );

      if (!data.results) {
        return { props: { characters: [] } };
      }

      return {
        props: { characters: data.results, count: data.count },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      props: { characters: [] },
    };
  }
}
