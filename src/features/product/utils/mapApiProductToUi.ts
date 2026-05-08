import { formatCountdown } from '@/core/utils/date';
import type { Product as ApiProduct } from '@/services/product';
import type { Product } from '../types';

export const mapApiProductToUi = (item: ApiProduct, index: number): Product => {
  const sold = item.soldTotal ?? 0;
  const now = new Date();
  const startTime = item.flashSaleStart ? new Date(item.flashSaleStart) : null;

  const isFuture = startTime ? startTime > now : false;
  const type: 'sale' | 'notify' = isFuture ? 'notify' : 'sale';

  return {
    id: Number(item.itemId) || index,
    image: item.image,
    topLabel: item.isShopOfficial
      ? 'mall'
      : item.isShopPreferred || item.isShopPreferredPlus
        ? 'favorite'
        : null,
    bottomLabel: item.isLowerThanHistory
      ? 'cheaper'
      : item.isPriceUnchanged
        ? 'stable'
        : null,
    title: item.name,
    originalPrice: item.priceBeforeDiscount,
    discountPercent: item.discountPercent,
    currentPrice: item.price,
    rating: item.ratingAvg,
    sold,
    total: sold + item.stock,
    timeRemaining: type === 'sale' ? formatCountdown(item.flashSaleEnd) : '',
    buttonText: 'Nhắc tôi săn sale',
    type,
    flashSaleEnd: item.flashSaleEnd,
  };
};
