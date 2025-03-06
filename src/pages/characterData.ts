import { GetServerSidePropsContext } from 'next';
import { Character } from 'types/characterTypes';

export async function getCharacterData(context: GetServerSidePropsContext) {
  const { query, params } = context;
  let character: Character | null = null;
  try {
    if (params?.id) {
      const response = await fetch(`https://swapi.dev/api/people/${params.id}`);
      character = await response.json();

      if (!character) {
        return { props: { character: null } };
      }
    }
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
      return { props: { characters: [], character: character } };
    }

    return {
      props: {
        characters: data.results,
        count: data.count,
        character: character,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { characters: [] },
    };
  }
}
