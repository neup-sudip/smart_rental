const Pagination = ({ handlePageChange, searchParams, totalPages }) => {
  return (
    <>
      <div className="text-end">
        <button
          onClick={() => handlePageChange(-1)}
          disabled={parseInt(searchParams.get("page") ?? 1) <= 1}
          type="button"
          className="btn btn-primary me-2"
        >
          Prev
        </button>
        <button
          onClick={() => handlePageChange(1)}
          disabled={parseInt(searchParams.get("page") ?? 1) >= totalPages}
          type="button"
          className="btn btn-primary"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
