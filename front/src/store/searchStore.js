import { create } from 'zustand';

const useSearchStore = create((set, get) => ({
  member: {
    member_id: '',
    member_pwd: '',
    member_name: '',
    member_phone: '',
    member_birth: '',
  },

  //성공 / 실패
  reaction: '',

  //전화번호 인증번호
  phoneAccess: {
    number: '',
    status: '',
  },

  //해당 페이지 나가면 store에 있는 정보 reset
  reset: (choice) => {
    switch (choice) {
      case 'member':
        set({
          member: {
            member_id: '',
            member_pwd: '',
            member_name: '',
            member_phone: '',
          },
        });
        break;
      case 'access':
        set({
          phoneAccess: {
            number: '',
            status: '',
          },
        });
      default:
        break;
    }
  },

  //아이디 찾기
  searchId: (memberData) => {
    set({
      member: memberData,
    });
  },

  //비밀번호 찾기(아이디)
  searchPwd: (memberData) => {
    set({
      member: memberData,
    });
  },

  //비밀번호 찾기(인증번호)
  savePhoneAccess: (phoneAccess) => {
    set({
      phoneAccess: phoneAccess,
    });
  },

  //비밀번호 찾기 성공/실패
  pwdSelectReaction: (reaction) => {
    set({
      reaction: reaction,
    });
  },
}));

export default useSearchStore;
