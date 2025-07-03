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
    TODAYLISTS: '/api/schedule/lists/main',
    DAILYSCHEDULE: `/api/schedule/dailyCreate`,
    DAILYSCHEDULELIST: (centerNo, classNo, scheduleDate) =>
      `/api/schedule/dailyList?centerNo=${centerNo}&classNo=${classNo}&scheduleDate=${scheduleDate}`,
    UPDATEDAILY: `/api/schedule/dailyUpdate`,
    DELETEDAILY: (scheduleNo) => `/api/schedule/dailyDelete/${scheduleNo}`,
  },
  MEMBERS: {
    BASE: '/api/members',
    CHECKID: (memberId) => `/api/members/checkId?memberId=${memberId}`,
    TEACHERSIGNUP: '/api/members/teacher',
    PARENTSIGNUP: '/api/members/parent',
    MANAGERSIGNUP: '/api/members/manager',
    LOGIN: `/api/members/login`,
    MYPAGE: (memberNo) => `/api/members/mypage?id=${memberNo}`,
    UPDATE: (memberNo) => `/api/members/mtpage?id=${memberNo}`,
    SEARCHID: `/api/members/searchId`,
    PWDSEARCHID: `/api/members/pwdSearchId`,
    PHONEACCESS: `/api/members/sendOne`,
    PWDUPDATE: `/api/members/pwdUpdate`,
    TEACHERLIST: (centerNo) => `/api/members/teacher/select/${centerNo}`,
    TEACHER_DETAIL_LIST: (centerNo) => `/api/members/teacher/list/${centerNo}`,
    TEACHER_DETAIL: (memberNo) => `/api/members/teacher/${memberNo}`,
  },
  APPLOVALLIST: {
    BASE: 'api/approval',
    CENTERPENDINGLIST: `api/approval/lists`,
    MEMBERPENDINGLIST: (centerNo) => `api/approval/lists/${centerNo}`,
    DECISIONCENTER: `api/approval/decision/center`,
    DECISIONMEMBER: `api/approval/decision/member`,
    DECISIONCHILD: `api/approval/decision/child`,
  },
  CENTERS: {
    BASE: '/api/center',
    DETAIL: (centerNo) => `/api/center/detail?centerNo=${centerNo}`,
  },
  CLASSROOM: {
    BASE: '/api/classroom',
    CREATE: '/api/classroom/create',
    CLASSROOMLIST: (centerNo) => `/api/classroom/list/${centerNo}`,
    GETRATE: (centerNo) => `/api/classroom/main/attendance-rate/${centerNo}`,
  },
  ATTENDANCE: {
    BASE: '/api/attendance',
    //교사 로그인 시 출퇴근 상태 불러오기
    TODAYATTENDANCE: (memberNo) => `/api/attendance/today/${memberNo}`,
    //출근 시간 기록
    WORKIN: (memberNo) => `/api/attendance/workin/${memberNo}`,
    //퇴근 시간 기록
    WORKOUT: (memberNo) => `/api/attendance/workout/${memberNo}`,
    //교사가 자신 근태 기록 조회
    //시설장이 교사 별 근태 조회
    TEACHERATTENDANCE: (memberNo, centerNo, year, month) =>
      `/api/attendance/teacher?memberNo=${memberNo}&centerNo=${centerNo}&year=${year}&month=${month}`,
    //교사 근태 수정
    UPDATETEACHERATTENDANCE: (attendanceNo) => `/api/attendance/teacher/update/${attendanceNo}`,
    //아동 출결 관리
    CHILDATTENDANCE: `/api/attendance/createChildAttendance`,
    //아동 출결 수정
    UPDATECHILDATTENDANCE: `/api/attendance/updateAttendance`,
  },
  MEMBER_HEALTH: {
    BASE: '/api/members/health',
    CREATE: '/api/members/health/create',
    LIST: (memberNo) => `/api/members/health/list?memberNo=${memberNo}`,
    DETAIL: (memberHealthLogNo) => `/api/members/health/detail?memberHealthLogNo=${memberHealthLogNo}`,
    EDIT: `/api/members/health/edit`,
    DELETE: `/api/members/health/delete`,
  },
  CHILDS: {
    BASE: '/api/childs',
    ADD: '/api/childs/add',
    LINK: '/api/childs/link',
    GETALL: '/api/childs/all',
    GET: '/api/childs/get',
    PARENTCHILDLIST: (memberNo) => `/api/childs/parentChild?memberNo=${memberNo}`,
    PARENTPHONENUMBER: (centerNo) => `/api/childs/phoneNumber/${centerNo}`,
  },
  BOARDS: {
    BASE: '/api/boards',
    ADD: '/api/boards',
    DETAIL: (id) => `/api/boards/${id}`,
    DELETE: (id) => `/api/boards/${id}`,
    TYPE: (type, centerNo, page) => `/api/boards/type/${type}?centerNo=${centerNo}&page=${page}`,
    GETRECENT3: (centerNo) => `api/boards/recent3/${centerNo}`,
  },
  VACATION: {
    BASE: '/api/vacation',
    REQUEST: (memberNo) => `/api/vacation/request/${memberNo}`,
    GETLIST: (memberNo) => `/api/vacation/${memberNo}`,
    DELETE: (vacationNo) => `/api/vacation/delete/${vacationNo}`,
    GETLISTALL: (centerNo, type, page = 0, size = 6) =>
      `/api/vacation/all?centerNo=${centerNo}${type ? `&type=${type}` : ''}&page=${page}&size=${size}`,
    APPROVE: (vacationNo) => `/api/vacation/approve/${vacationNo}`,
    REJECT: (vacationNo) => `/api/vacation/reject/${vacationNo}`,
  },
  LEAVE: {
    BASE: '/api/leave',
    GETLEAVE: (memberNo) => `/api/leave/${memberNo}`,
  },
  HOLIDAY: {
    BASE: '/api/holiday',
    GET: (year, month) => `api/holiday?year=${year}&month=${month}`,
  },
};
