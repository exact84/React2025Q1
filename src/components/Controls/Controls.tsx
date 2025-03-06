import { useRouter } from 'next/router';

const Controls = ({ totalPages }: { totalPages: number }) => {
  const router = useRouter();
  const currentPage = parseInt(router.query.page as string) || 1;

  const handleChangePage = (page: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    });
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
