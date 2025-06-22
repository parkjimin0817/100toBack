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
            memberNo: memberData.member_no,
            memberId: memberData.member_id,
            memberName: memberData.member_name,
            memberProfile: memberData.member_profile,
            memberType: memberData.member_type,
            centerNo: memberData.center_no,
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

      // 사용자 정보 업데이트
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },
    }),
    {
      name: 'user-storage', // localStorage에 저장될 키 이름
      // storage: localStorage, // 기본은 localStorage (생략해도 됨)
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useLoginStore;
