export const pricePresetKeys = {
  all: ['price-presets'] as const,
  list: () => [...pricePresetKeys.all, 'list'] as const,
};
