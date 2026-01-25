import { create } from 'zustand';

interface Family {
    id: string;
    name: string;
    city: string;
    slogan: string | null;
    themes: string[];
}

interface FamilyStore {
    family: Family | null;
    setFamily: (family: Family) => void;
    clearFamily: () => void;
}

export const useFamilyStore = create<FamilyStore>((set) => ({
  family: null,
  setFamily: (family) => set({ family }),
  clearFamily: () => set({ family: null }),
}));
