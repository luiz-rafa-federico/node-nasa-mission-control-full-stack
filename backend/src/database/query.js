function getPagination(limit, page) {
  const docsLimit = Math.abs(limit) || 0;
  const pageNumber = Math.abs(page) || 1;

  const skip = (pageNumber - 1) * limit;

  return { skip, docsLimit };
}

module.exports = { getPagination };
