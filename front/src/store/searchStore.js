import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSearchIdStore = create(
  persist((set, get) => ({
    memberId: null,
    memberPwd: null,

    searchId: (memberData) => {
      set({
        memberId: memberData.memberId,
      });
    },

    searchPwd: (memberData) => {
      set({
        memberId: memberData.memberId,
        memberPwd: memberData.memberPwd,
      });
    },
  }))
);

export default useSearchIdStore;
