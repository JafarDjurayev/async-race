export function getVisiblePages(
  currentPage: number,
  totalPages: number,
): (number | string)[] {
  const pages = [];
  const leftBound = 2;
  const rightBound = totalPages - 1;

  pages.push(1);

  if (currentPage > leftBound + 2) {
    pages.push('...');
  }

  const start = Math.max(leftBound, currentPage - 1);
  const end = Math.min(rightBound, currentPage + 1);

  for (let i = start; i <= end; i++) {
    if (i > leftBound && i < rightBound) {
      pages.push(i);
    }
  }

  if (currentPage < rightBound - 2) {
    pages.push('...');
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}
