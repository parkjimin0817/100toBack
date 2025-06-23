import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSignUpStore = create(
  persist(
    (set, get) => ({
      type: '', //userSelect
      basicInfo: {}, //기본정보

      setType: (type) => set({ type }),
      setBasicInfo: (data) => set({ basicInfo: data }),

      getAll: () => {
        const { type, basicInfo } = get();
        return { type, ...basicInfo };
      },

      resetSignUp: () => set({ type: '', basicInfo: {} }),
    }),

    {
      name: 'sign-up-storage',
    }
  )
);
