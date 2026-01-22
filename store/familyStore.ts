import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Family {
    id: string;
    name: string;
    city: string;
}

interface FamilyStore {
    family: Family | null;
    setFamily: (family: Family) => void;
    clearFamily: () => void;
}

export const useFamilyStore = create<FamilyStore>()(
  persist(
    (set) => ({
      family: null,
      setFamily: (family) => set({ family }),
      clearFamily: () => set({ family: null }),
    }),
    {
      name: 'tribu:family',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
