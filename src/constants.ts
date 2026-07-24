export const venders = (
  page: number,
  limit: number,
  sortBy: string,
  order: string,
  status: string,
  search: string,
) => {
  return `http://localhost:4000/vendors?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}&status=${status}&search=${search}`;
};

// http://localhost:4000/vendors?page=1&limit=10&sortBy=totalPurchaseValue&order=desc&status=Active&search=tech
