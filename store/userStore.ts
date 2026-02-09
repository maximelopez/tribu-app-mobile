import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
  score: number | null;
  familyId: string | null;
  avatarUrl: string | null;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | ((prev: User | null) => User | null)) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (userOrUpdater) =>
        set((state) => ({
          user:
            typeof userOrUpdater === 'function'
              ? (userOrUpdater as (prev: User | null) => User | null)(state.user)
              : userOrUpdater,
        })),
      logout: () => set({ user: null }),
    }),
    {
      name: 'tribu:auth:user',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
