import { ErrorBoundary, Search } from '@/app/components/index';
import ResultPage from '@/app/components/ResultPage/ResultPage';
import ReduxProvider from '@/app/components/ReduxProvider/ReduxProvider';
import getPageCount from '@/utils/pages';
import { notFound } from 'next/navigation';

async function getCharacterData(page: string, search: string) {
  try {
    const queryParams = new URLSearchParams();
    if (page) queryParams.set('page', page);
    if (search) queryParams.set('search', search);

    const response = await fetch(
      `https://swapi.dev/api/people/?${queryParams.toString()}`,
      { cache: 'no-store' }
    );

    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      return null;
    }

    return {
      characters: data.results ?? null,
      count: data.count,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const { page = '1', search = '' } = searchParams;
  console.log(page, search);

  const data = await getCharacterData(page, search);

  if (!data) {
    notFound();
  }

  return (
    <div className="list">
      <Search />
      <ErrorBoundary>
        <ReduxProvider>
          <ResultPage
            characters={data.characters}
            totalPages={getPageCount(data.count, 10)}
          />
        </ReduxProvider>
      </ErrorBoundary>
    </div>
  );
}
