import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5_000,
    },
    mutations: {
      onError: (error: any) => {
        const message = error?.response?.data?.message ?? 'Đã xảy ra lỗi';
        console.error(message);
        // import { toast } from '@/components/ui/Toast'; // TODO: Implement toast
        // toast.error(message);
      },
    },
  },
});
