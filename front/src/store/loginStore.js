import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useLoginStore = create(
  persist(
    (set) => ({
      member: null,
      isAuthenticated: false,
      attendance: null,
      setMember: (newMember) => set({ member: newMember }),

      // 로그인
      login: (memberData) => {
        set({
          member: {
            memberNo: memberData.memberNo,
            memberId: memberData.memberId,
            memberName: memberData.memberName,
            memberProfile: memberData.memberProfile,
            memberBirth: memberData.memberBirth,
            memberPhone: memberData.memberPhone,
            memberType: memberData.memberType,
            centerNo: memberData.centerNo,
            classNo: memberData.classNo,
            centerTel: memberData.centerTel,
          },
          isAuthenticated: true,
        });
      },

      // 로그아웃
      logout: () => {
        set({
          member: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'login-storage',
      partialize: (state) => ({
        member: state.member,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useLoginStore;
