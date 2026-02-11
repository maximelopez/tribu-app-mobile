import { create } from 'zustand';

export interface Family {
    id: string;
    name: string;
    city: string;
    slogan: string | null;
    themes: string[];
    creatorId: string;
    joinRequests: { id: string; name: string }[];
    members?: { id: string; name: string; score: number; avatarUrl?: string }[];
}

interface FamilyStore {
    family: Family | null;
    setFamily: (family: Family | ((prev: Family | null) => Family | null)) => void;
    clearFamily: () => void;
}

export const useFamilyStore = create<FamilyStore>((set) => ({
  family: null,
  setFamily: (familyOrUpdater) =>
    set((state) => ({
      family: typeof familyOrUpdater === 'function'
        ? (familyOrUpdater as (prev: Family | null) => Family | null)(state.family)
        : familyOrUpdater,
    })),
  clearFamily: () => set({ family: null }),
}));
