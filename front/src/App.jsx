import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/common/LoginPage';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/Common/Layout';
import Home from './pages/Home';
import SearchId from './pages/common/SearchId';
import UserTypeSelect from './pages/common/signup/UserTypeSelect';
import TermsAgreement from './pages/common/signup/TermsAgreement';
import SignUpBasicInfo from './pages/common/signup/SignUpBasicInfo';
import ChildList from '././pages/teacher/ChildList';
import SearchPassword from './pages/common/SearchPassword';
import AuthenticationUser from './pages/common/AuthenticationUser';
import ChangePassword from './pages/common/ChangePassword';
import SignUpWorkSpaceInfo from './pages/common/signup/SignUpWorkSpaceInfo';
import SignUpComplete from './pages/common/signup/SignUpComplete';
import ApprovalList from './pages/manager/ApprovalList';
import ApprovalListAdmin from './pages/admin/ApprovalListAdmin';
import VacationList from './pages/manager/VacationList';
import SignUpChildInfo from './pages/common/signup/SignUpChildInfo';
import SignUpCenterInfo from './pages/common/signup/SignUpCenterInfo';
import MyVacation from './pages/teacher/MyVacation';
import ChildHealthCheck from './pages/teacher/ChildHealthCheck';
import SeachIdSuccess from './pages/common/SeachIdSuccss';
import AttendanceClassList from './pages/teacher/AttendanceClassList';
import ClassPlacement from './pages/manager/ClassPlacement';
import DailySchedule from './pages/teacher/DailySchedule';
import DailyScheduleDetail from './pages/teacher/DailyScheduleDetail';
import { ToastContainer } from 'react-toastify';
import ChildDetail from './pages/teacher/ChildDetail';
import FamilyNoticePage from './pages/teacher/FamilyNoticePage';
import BoardWritePage from './pages/BoardWritePage';
import NoticePage from './pages/NoticePage';
import NotePage from './pages/NotePage';
import ChildLifeCheck from './pages/teacher/ChildLifeCheck';
import MyHealth from './pages/teacher/MyHealth';
import MyHealthDetail from './pages/teacher/MyHealthDetail';
import MyHealthForm from './pages/teacher/MyHealthForm';
import ParentContact from './pages/teacher/ParentContact';
import TeacherList from './pages/manager/TeacherList';
import TeacherMyPage from './pages/teacher/TeacherMyPage';
import AttendancePage from './pages/AttendancePage';
import TeacherAttendance from './pages/manager/TeacherAttendance';
import TeacherIntroList from './pages/manager/TeacherIntroList';
import ScheduleTeacher from './pages/teacher/ScheduleTeacher';
import PersonalHealth from './pages/parent/PersonalHealth';
import PersonalLife from './pages/parent/PersonalLife';
import TeacherMainPage from './pages/teacher/TeacherMainPage';
import MyAttendance from './pages/teacher/MyAttendance';
import ParentMainPage from './pages/common/ParentMain/ParentMainPage';
import TeacherMainAttendance from './pages/teacher/components/TeacherMainAttendance';
import ParentMyPage from './pages/parent/ParentMyPage';
import AddChild from './pages/parent/AddChild';
import SearchChild from './pages/parent/SearchChild';
import ErrorPage from './pages/ErrorPage';
import ParentChildList from './pages/parent/ParentChildList';
import ClassRoomManage from './pages/manager/ClassRoomManage';
import ScheduleManager from './pages/manager/SceduleManager';
import BoardDetailPage from './pages/BoardDetailPage';
import BoardUpdatePage from './pages/BoardUpdatePage';
import PhotoPage from './pages/PhotoPage';
import MealPlanPage from './pages/MealPlanPage';
import ClassListPage from './pages/ClassListPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route element={<Layout />}>
            {/* 반 목록 -> 반별 아동목록 */}
            <Route path="/class/list" element={<ClassListPage />} />
            {/**
             * 학부모
             *
             * 1. 학부모 메인페이지
             *
             * */}
            <Route path="/parent/main" element={<ParentMainPage />} />
            <Route path="/parent/mychild" element={<ParentChildList />} />
            <Route path="/parent/mypage" element={<ParentMyPage />} />

            {/**
             * 교사
             *
             * 1. 교사 메인페이지
             * 2. 교사 건강 관리 리스트 페이지
             * 3. 교사 건강 상세보기 페이지
             * 4. 교사 건강 작성 페이지
             * 5. 교사 건강 수정 페이지
             * 6. 학부모 연락처 페이지
             * 7. 교사 개인, 유치원 일정 관리 페이지
             * 8. 교사 근태 관리 페이지
             * 9. 교사 마이페이지
             *
             * */}
            <Route path="/teacher/main" element={<TeacherMainPage />} />
            <Route path="/teacherhealth" element={<MyHealth />} />
            <Route path="/myhealth/:healthLogNo" element={<MyHealthDetail />} />
            <Route path="/teacherhealth/write" element={<MyHealthForm />} />
            <Route path="/myhealth/edit/:healthLogNo" element={<MyHealthForm />} />
            <Route path="/teacher/parentcontactinfo" element={<ParentContact />} />
            <Route path="/scheduleTeacher" element={<ScheduleTeacher />} />
            <Route path="/teacher/myattendance" element={<MyAttendance />} />
            <Route path="/teacher/mypage" element={<TeacherMyPage />} />

            {/**
             * 시설장
             *
             * 1. 시설장 마이페이지(교사 마이페이지랑 같음 element도 TeacherMyPage로 통일시킴)
             * 2. 시설장 반 배정 페이지
             * 3. 시설장 교사 목록 리스트 페이지
             * 4. 시설장 교사, 회원가입 승인 페이지
             * 5. 시설장 교사 휴가 / 워케이션 관리 페이지
             * 6. 시설장 교사 근태 관리 페이지
             * 7. 시설장 교사 소개 및 조회 페이지
             * 8. 시설장 반 목록 / 생성 모달
             *
             *    시설장 교사 상세보기 페이지(만들어야함)
             *
             * 10. 시설장 유치원 일정 페이지
             *
             *  */}
            <Route path="/manager/mypage" element={<TeacherMyPage />} />
            <Route path="/manager/classplacement" element={<ClassPlacement />} />
            <Route path="/manager/teacherlist" element={<TeacherList />} />
            <Route path="/approvalList" element={<ApprovalList />} />
            <Route path="/vacationList" element={<VacationList />} />
            <Route path="/manager/teacherattendance/:memberNo" element={<TeacherAttendance />} />
            <Route path="/manager/introteacher" element={<TeacherIntroList />} />
            <Route path="/manager/classmanage" element={<ClassRoomManage />} />
            <Route path="/manager/schedule" element={<ScheduleManager />} />

            {/**
             * 교사, 시설장 공용
             *
             * 1. 아동 목록 페이지
             * 2. 유치원 반 리스트 페이지
             * 3. 아동 건강 체크리스트 작성 및 수정 페이지
             * 4. 아동 생활 체크리스트 작성 및 수정 페이지
             * 5. 아동 일과표 반 리스트 페이지
             * 6. 일과표 반 상세보기
             * 7. 아동 상세보기
             * 8. 교사 휴가 관리 페이지
             * 9. 아동 출결 관리 페이지
             * 10. 공지사항 페이지
             * 10-1. 목록
             * 10-2. 작성
             * 10-3. 상세
             * 10-4. 수정
             *
             *  */}
            <Route path="/childlist" element={<ChildList />} />
            {/* 반별아동목록 */}
            <Route path="/childlist/:classNo" element={<ChildList />} />
            <Route path="/classlist" element={<AttendanceClassList />} />
            <Route path="/childhealthcheck" element={<ChildHealthCheck />} />
            <Route path="/childlifecheck" element={<ChildLifeCheck />} />
            <Route path="/daily" element={<DailySchedule />} />
            <Route path="/dailyDetail/:class_no" element={<DailyScheduleDetail />} />
            <Route path="/child/detail/:id" element={<ChildDetail />} />
            <Route path="/teacher/workcation" element={<MyVacation />} />
            <Route path="/childattendance/:class_no" element={<AttendancePage />} />
            <Route path="/notice">
              <Route path="list" element={<NoticePage />} />
              <Route path="write" element={<BoardWritePage />} />
              <Route path=":id" element={<BoardDetailPage />} />
              <Route path="update/:id" element={<BoardUpdatePage />} />
            </Route>

            {/**
             * 공용
             *
             * 1. 가정통신문 페이지
             * 1-1. 게시글 목록 페이지
             * 1-2. 작성 페이지
             * 2. 아동 건강 리스트 페이지
             * 3. 아동 생활 리스트 페이지
             * 4. 알림장 페이지
             * 4-1. 목록
             * 4-2. 작성
             * 4-3. 상세
             * 4-4. 수정
             * 5. 사진 게시판 페이지
             * 5-1. 목록
             * 5-2. 작성
             * 5-3. 상세
             * 5-4. 수정
             * 6. 식단표 게시판 페이지
             * 6-1. 목록
             * 6-2. 작성
             * 6-3. 상세
             * 6-4. 수정
             *
             *  */}
            <Route path="/family_notice">
              <Route path="list" element={<FamilyNoticePage />} />
              <Route path="write" element={<BoardWritePage />} />
              <Route path=":id" element={<BoardDetailPage />} />
              <Route path="update/:id" element={<BoardUpdatePage />} />
            </Route>
            <Route path="/child/healthlist" element={<PersonalHealth />} />
            <Route path="/child/lifelist" element={<PersonalLife />} />
            <Route path="/note">
              <Route path="list" element={<NotePage />} />
              <Route path="write" element={<BoardWritePage />} />
              <Route path=":id" element={<BoardDetailPage />} />
              <Route path="update/:id" element={<BoardUpdatePage />} />
            </Route>
            <Route path="/photo">
              <Route path="list" element={<PhotoPage />} />
              <Route path="write" element={<BoardWritePage />} />
              <Route path=":id" element={<BoardDetailPage />} />
              <Route path="update/:id" element={<BoardUpdatePage />} />
            </Route>
            <Route path="/meal_plan">
              <Route path="list" element={<MealPlanPage />} />
              <Route path="write" element={<BoardWritePage />} />
              <Route path=":id" element={<BoardDetailPage />} />
              <Route path="update/:id" element={<BoardUpdatePage />} />
            </Route>
          </Route>

          {/**
           * 관리자
           *
           * 1. 관리자 시설장 회원가입 승인
           *
           * */}
          <Route path="/approvalListAdmin" element={<ApprovalListAdmin />} />

          {/**
           * 공통 회원가입, 로그인, 아이디찾기, 비밀번호 찾기
           *
           * 1. 로그인 페이지
           * 2-1. 회원가입 권한 선택
           * 2-2. 회원가입 약관 동의
           * 2-3. 회원가입 정보 입력
           * 2-4. 회원가입 교사 정보 입력
           * 2-5. 회원가입 시설장 정보 입력
           * 2-6. 회원가입 학부모 정보 입력
           * 2-7. 회원가입 성공 페이지
           * 2-8. 회원가입 관리자 페이지
           * 3-1. 아이디 찾기
           * 3-2. 아이디 찾기 성공
           * 4-1. 비밀번호 찾기(아이디 입력 페이지)
           * 4-2. 비밀번호 찾기(이름, 인증번호 찾기)
           * 4-3. 비밀번호 재설정
           * 5. 에러페이지
           *
           *  */}
          <Route path="/" element={<LoginPage />} />

          <Route path="/signup/userselect" element={<UserTypeSelect />} />
          <Route path="/signup/terms" element={<TermsAgreement />} />
          <Route path="/signup/info" element={<SignUpBasicInfo />} />
          <Route path="/signup/teacher" element={<SignUpWorkSpaceInfo />} />
          <Route path="/signup/center" element={<SignUpCenterInfo />} />
          <Route path="/signup/parent" element={<SignUpChildInfo />} />
          <Route path="/signup/complete" element={<SignUpComplete />} />
          <Route path="/signup/manager" element={<SignUpCenterInfo />} />

          <Route path="/findid" element={<SearchId />} />
          <Route path="/findidsuccess" element={<SeachIdSuccess />} />

          <Route path="/findpwd" element={<SearchPassword />} />
          <Route path="/authenticationuser" element={<AuthenticationUser />} />
          <Route path="/changepwd" element={<ChangePassword />} />

          <Route path="*" element={<ErrorPage />} />

          {/* Test Page */}
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        closeOnClick
        draggable
        hideProgressBar={false}
        newestOnTop
        theme="light"
        pauseOnHover
        toastClassName="toast-message"
      />
    </ThemeProvider>
  );
}

export default App;
