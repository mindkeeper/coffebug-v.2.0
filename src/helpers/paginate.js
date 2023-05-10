const paginate = (totalData, limit, currentPage) => {
  const totalPage = Math.ceil(totalData / limit);
  const hasNextPage = currentPage < totalPage;
  const hasPrevPage = currentPage > 1;

  const paginatiion = {
    currentPage: parseInt(currentPage),
    totalPage,
    totalData,
    pageSze: parseInt(limit),
    prev: hasPrevPage ? currentPage - 1 : null,
    next: hasNextPage ? currentPage + 1 : null,
  };
  return paginatiion;
};

module.exports = paginate;
