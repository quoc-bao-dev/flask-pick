export const discountTypeKeys = {
  all: ['discount-types'] as const,
  lists: () => [...discountTypeKeys.all, 'list'] as const,
  list: () => [...discountTypeKeys.lists()] as const,
};
