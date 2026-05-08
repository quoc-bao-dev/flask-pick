export const commonKeys = {
  all: ['common'] as const,
  social: () => [...commonKeys.all, 'social'] as const,
};
