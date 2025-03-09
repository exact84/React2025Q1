import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Controls = ({ totalPages }: { totalPages: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') as string) || 1;

  useEffect(() => {
    if (!currentPage) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      const searchQuery = parseInt(searchParams.get('search') as string) || '';
      newSearchParams.set('page', '1');
      newSearchParams.set('search', searchQuery as string);
      router.replace(`${pathname}?${newSearchParams.toString()}`);
    }
  }, [currentPage, pathname, router, searchParams]);

  const handleChangePage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    const searchQuery = searchParams.get('search') || '';
    if (searchQuery) newSearchParams.set('search', searchQuery as string);
    else newSearchParams.delete('search');
    newSearchParams.set('page', page.toString());
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handleChangePage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handleChangePage(currentPage + 1);
    }
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        ◀
      </button>
      {pages.map((page) => (
        <button
          className={page === currentPage ? 'active' : ''}
          key={page}
          onClick={() => handleChangePage(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        ►
      </button>
    </div>
  );
};

export default Controls;
