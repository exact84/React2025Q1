// import React from 'react';
// // import '../styles/index.module.css';

// const index = () => {
//   return <div></div>;
// };

// export default index;

import { GetServerSideProps } from 'next';
import { getCharacterData } from './characterData';
import Home from './Home';
import { Character } from 'types/characterTypes';
// import MainContainer from '@components/MainContainer/MainContainer';

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
