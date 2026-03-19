/**
 * formatCurrency
 * Formats a number into a Vietnamese currency string (e.g., 50.000 đ)
 */
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('vi-VN') + ' đ';
};
