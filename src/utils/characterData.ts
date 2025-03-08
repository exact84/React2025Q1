import { GetServerSidePropsContext } from 'next';

const FALLBACK_QUERY_PARAMS = {
  page: '1',
};

export async function getCharacterData(context: GetServerSidePropsContext) {
  try {
    const { query } = context;
    const response = await fetch(
      `https://swapi.dev/api/people/?${new URLSearchParams({ ...FALLBACK_QUERY_PARAMS, ...query }).toString()}`
    );

    const data = await response.json();
    return {
      props: {
        characters: data.results,
        count: data.count,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        characters: null,
        count: null,
      },
    };
  }
}
