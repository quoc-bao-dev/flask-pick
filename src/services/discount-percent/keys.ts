export const discountPercentKeys = {
  all: ['discount-percent'] as const,
  lists: () => [...discountPercentKeys.all, 'list'] as const,
};
