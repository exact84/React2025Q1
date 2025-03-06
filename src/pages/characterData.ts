import { Character } from 'types/characterTypes';

export async function getServerSideProps({
  params,
  query,
}: {
  params?: { id: string };
  query?: { search?: string; page?: string };
}) {
  try {
    if (params?.id) {
      const response = await fetch(`https://swapi.dev/api/people/${params.id}`);
      const character: Character = await response.json();

      if (!character) {
        return { notFound: true };
      }

      return {
        props: { character },
      };
    } else {
      const searchQuery = query?.search || '';
      const page = query?.page || '1';

      const response = await fetch(
        `https://swapi.dev/api/people/?search=${encodeURIComponent(
          searchQuery
        )}&page=${page}`
      );
      const data = await response.json();

      if (!data.results.length) {
        return { notFound: true };
      }

      return {
        props: { characters: data.results },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
