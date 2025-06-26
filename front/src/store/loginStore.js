import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useLoginStore = create(
  persist(
    (set) => ({
      member: null,
      isAuthenticated: false,

      // 로그인
      login: (memberData) => {
        set({
          member: {
            memberNo: memberData.memberNo,
            memberId: memberData.memberId,
            memberName: memberData.memberName,
            memberProfile: memberData.memberProfile,
            memberType: memberData.memberType,
            centerNo: memberData.centerNo,
            classNo: memberData.classNo,
            centerTel: memberData.centerTel,
          },
          isAuthenticated: true,
        });
        console.log('🧾 로그인된 유저 정보:', useLoginStore.getState().member);
      },

      // 로그아웃
      logout: () => {
        set({
          member: null,
          isAuthenticated: false,
        });
      },

      // 사용자 정보 업데이트
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },
    }),
    {
      name: 'login-storage', // localStorage에 저장될 키 이름
      // storage: localStorage, // 기본은 localStorage (생략해도 됨)
      partialize: (state) => ({
        member: state.member,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useLoginStore;
