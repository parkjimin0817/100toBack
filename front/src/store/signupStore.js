import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSignUpStore = create(
  persist(
    (set, get) => ({
      type: '', //userSelect
      basicInfo: {}, //기본정보
      extraInfo: {}, // 근무지, 아동, 시설 정보 입력

      setType: (type) => set({ type }),
      setBasicInfo: (data) => set({ basicInfo: data }),
      setExtraInfo: (data) => set({ extraInfo: data }),

      getAll: () => {
        const { type, basicInfo, extraInfo } = get();
        return { type, ...basicInfo, ...extraInfo };
      },

      resetSignUp: () => set({ type: '', basicInfo: {}, extraInfo: {} }),
    }),

    {
      name: 'sign-up-storage',
    }
  )
);
