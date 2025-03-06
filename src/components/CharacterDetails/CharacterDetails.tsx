'use client';

import Loader from '@components/Loader/Loader';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/indexStore';
import { useGetCharacterQuery } from 'store/slices/apiSlice';
import { extractIdFromUrl } from 'utils/extractIdFromUrl';

const CharacterDetails = () => {
  const selectedCharacter = useSelector(
    (state: RootState) => state.items.selectedCharacter
  );

  const { data, isLoading } = useGetCharacterQuery(
    extractIdFromUrl(selectedCharacter?.url || '')
  );

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      {data?.name}|{data?.eye_color}|{data?.skin_color}
    </div>
  );
};

export default CharacterDetails;
