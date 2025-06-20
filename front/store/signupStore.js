import { create } from 'zustand';

export const useSignUpStore = create((set, get) => ({
  role: '', //userSelect
  basicInfo: {}, //기본정보
  extraInfo: {}, // 근무지, 아동, 시설 정보 입력

  setRole: (role) => set({ role }),
  setBasicInfo: (data) => set({ basicInfo: data }),
  setExtraInfo: (data) => set({ extraInfo: data }),

  getAll: () => {
    const { role, basicInfo, extraInfo } = get();
    return { role, ...basicInfo, ...extraInfo };
  },

  resetSignUp: () => set({ role: '', basicInfo: {}, extraInfo: {} }),
}));
