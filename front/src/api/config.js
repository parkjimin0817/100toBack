import TeacherAttendance from '../pages/manager/TeacherAttendance';

const { VITE_API_URL, VITE_API_TIMEOUT = 5000, VITE_API_VERSION = 'v1' } = import.meta.env;

export const API_CONFIG = {
  // BASE_URL: `${VITE_API_URL}/${VITE_API_VERSION}`, localhost:8001/api/v1
  BASE_URL: `${VITE_API_URL}`,
  TIMEOUT: VITE_API_TIMEOUT,
  HEADERS: {
    'Content-Type': 'application/json', //내가 서버로 보내는 데이터는 json이야
    Accept: 'application/json', //json으로 응답해줘.
  },
};

export const API_ENDPOINTS = {
  SCHEDULES: {
    BASE: '/api/schedule',
    CREATE: '/api/schedule/create',
    LISTS: `/api/schedule/lists`,
    EDIT: `/api/schedule/edit`,
    DELETE: `/api/schedule/delete`,
  },
  MEMBERS: {
    BASE: '/api/members',
    CHECKID: (memberId) => `/api/members/checkId?memberId=${memberId}`,
    TEACHERSIGNUP: '/api/members/teacher',
    PARENTSIGNUP: '/api/members/parent',
    MANAGERSIGNUP: '/api/members/manager',
    LOGIN: `/api/members/login`,
    MYPAGE: (memberNo) => `/api/members/mypage?id=${memberNo}`,
    SEARCHID: `/api/members/searchId`,
    PWDSEARCHID: `/api/members/pwdSearchId`,
    PHONEACCESS: `/api/members/sendOne`,
    PWDUPDATE: `/api/members/pwdUpdate`,
    TEACHERLIST: (centerNo) => `/api/members/teacher/select/${centerNo}`,
    TEACHER_DETAIL_LIST: (centerNo) => `/api/members/teacher/list/${centerNo}`,
  },
  APPLOVALLIST: {
    BASE: 'api/approvalList',
    PENDINGLIST: (centerNo) => `api/approval/lists/${centerNo}`,
    DECISIONMEMBER: `api/approval/decision/member`,
    DECISIONCHILD: `api/approval/decision/child`,
  },
  CENTERS: {
    BASE: '/api/center',
  },
  CLASSROOM: {
    BASE: '/api/classroom',
    CREATE: '/api/classroom/create',
    CLASSROOMLIST: (centerNo) => `/api/classroom/list/${centerNo}`,
  },
  ATTENDANCE: {
    BASE: '/api/attendance',
    //교사가 자신 근태 기록 조회
    //시설장이 교사 별 근태 조회
    TEACHERATTENDANCE: (memberNo) => `/api/attendance/teacher/${memberNo}`,
  },
};
