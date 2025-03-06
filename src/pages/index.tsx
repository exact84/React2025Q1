/* eslint-disable react-refresh/only-export-components */
import { GetServerSideProps } from 'next';
import { getCharacterData } from './characterData';
import Home from './Home';
import { Character } from 'types/characterTypes';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { props } = await getCharacterData(context);
  return { props };
};

export default function IndexPage({
  characters,
  count,
}: {
  characters: Character[];
  count: number;
}) {
  return <Home characters={characters} count={count} />;
}
