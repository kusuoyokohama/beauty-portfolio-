import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { QueryClient } from '@tanstack/react-query';
import type { AppRouter } from '../../../atelier-six-writer/server/routers';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get the backend URL from environment or use default
const BACKEND_URL = process.env.VITE_BACKEND_URL || 'http://localhost:3000';

// Create a custom fetch function that includes the session token
const createCustomFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const token = await AsyncStorage.getItem('sessionToken');

  const headers = new Headers(init?.headers || {});

  if (token) {
    headers.set('Cookie', `session=${token}`);
  }

  return fetch(input, {
    ...init,
    headers,
  });
};

// Create tRPC React hooks
export const trpc = createTRPCReact<AppRouter>();

// Create tRPC client
export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${BACKEND_URL}/api/trpc`,
      fetch: createCustomFetch,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  ],
});

// Create React Query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});
