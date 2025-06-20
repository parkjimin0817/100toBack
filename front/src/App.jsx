import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/common/LoginPage';

import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/Common/Layout';
import Home from './pages/Home';
import SearchId from './pages/common/SearchId';
import SeachIdSuccss from './pages/common/SeachIdSuccss';

import UserTypeSelect from './pages/common/signup/UserTypeSelect';
import TermsAgreement from './pages/common/signup/TermsAgreement';
import SignUpBasicInfo from './pages/common/signup/SignUpBasicInfo';
import ChildList from '././pages/teacher/ChildList';
import SearchFormNav from './components/Common/SearchFormNav';
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

import FamilyCommunityPage from './pages/teacher/FamilyCommunityPage';
import ManagerMyPage from './pages/manager/ManagerMyPage';
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route element={<Layout />}>
            {/* Main Page */}
            <Route path="/home" element={<Home />} />
            <Route path="/parent/main" element={<ParentMainPage />} />
            {/* 학부모 마이페이지 */}
            <Route path="/parent/mypage" element={<ParentMyPage />} />
            {/* 학부모 아동 추가 페이지 */}
            <Route path="/parent/addchild" element={<AddChild />} />
            {/* 학부모 아동 검색 페이지 */}
            <Route path="/parent/searchchild" element={<SearchChild />} />
            {/* <Route path="/" element={<Home />} /> */}
            {/* 아동 목록 페이지(교사) */}
            <Route path="/childlist" element={<ChildList />} />
            {/* 유치원 반 목록 페이지(교사 -> 아동 출결) */}
            <Route path="/classlist" element={<AttendanceClassList />} />
            {/* 반별 일과표 목록 페이지 */}
            <Route path="/daily" element={<DailySchedule />} />
            {/* 반별 일과표 목록  */}
            <Route path="/dailyDetail/:SCHADULE_NO" element={<DailyScheduleDetail />} />
            <Route path="/childlist" element={<ChildList />} />
            {/* 아동목록 페이지(교사) */}
            <Route path="/dailyDetail" element={<DailyScheduleDetail />} />
            {/* 아동 반배치 페이지(시설장) */}
            <Route path="/manager/classplacement" element={<ClassPlacement />} />
            {/* 교사 목록 페이지(시설장) */}
            <Route path="/manager/teacherlist" element={<TeacherList />} />
            {/* 추가 페이지는 아래 붙이기. */}
            {/* 교사 아동 상세보기 페이지 */}
            <Route path="/child/detail" element={<ChildDetail />} />

            {/* 교사 가정통신문 게시글 목록 페이지 */}
            <Route path="/familycommunity/list" element={<FamilyCommunityPage />} />

            {/* 회원가입 승인 리스트(시설장) */}
            <Route path="/approvalList" element={<ApprovalList />}></Route>
            {/* 시설장 승인 리스트(관리자) */}
            {/**
             * 관리자
             *
             * 1. 관리자 시설장 회원가입 승인
             *
             * */}
            <Route path="/approvalListAdmin" element={<ApprovalListAdmin />} />
            {/**
             * 학부모
             *
             * 1. 학부모 메인페이지
             *
             * */}
            <Route path="/parent/main" element={<ParentMainPage />} />

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
            <Route path="/myhealth/:id" element={<MyHealthDetail />} />
            <Route path="/teacherhealth/write" element={<MyHealthForm />} />
            <Route path="/myhealth/edit/:id" element={<MyHealthForm />} />
            <Route path="/teacher/parentcontactinfo" element={<ParentContact />} />
            <Route path="/scheduleTeacher" element={<ScheduleTeacher />} />
            <Route path="/teacher/myattendance" element={<MyAttendance />} />
            <Route path="/teacher/mypage" element={<TeacherMyPage />} />

            {/**
             * 시설장
             *
             * 1. 시설장 마이페이지
             * 2. 시설장 반 배정 페이지
             * 3. 시설장 교사 목록 리스트 페이지
             * 4. 시설장 교사, 회원가입 승인 페이지
             * 5. 시설장 교사 휴가 / 워케이션 관리 페이지
             * 6. 시설장 교사 근태 관리 페이지
             * 7. 시설장 교사 소개 및 조회 페이지
             *
             * 8. 시설장 교사 상세보기 페이지(만들어야함)
             *
             *  */}
            <Route path="/manager/mypage" element={<ManagerMyPage />} />
            <Route path="/manager/classplacement" element={<ClassPlacement />} />
            <Route path="/manager/teacherlist" element={<TeacherList />} />
            <Route path="/approvalList" element={<ApprovalList />} />
            <Route path="/vacationList" element={<VacationList />} />
            <Route path="/manager/teacherattendance" element={<TeacherAttendance />} />
            <Route path="/manager/introteacher" element={<TeacherIntroList />} />

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
             *
             *  */}
            <Route path="/childlist" element={<ChildList />} />
            <Route path="/classlist" element={<AttendanceClassList />} />
            <Route path="/childhealthcheck" element={<ChildHealthCheck />} />
            <Route path="/childlifecheck" element={<ChildLifeCheck />} />
            <Route path="/daily" element={<DailySchedule />} />
            <Route path="/dailyDetail/:SCHADULE_NO" element={<DailyScheduleDetail />} />
            <Route path="/child/detail" element={<ChildDetail />} />
            <Route path="/teacher/workcation" element={<MyVacation />} />

            {/**
             * 공용
             *
             * 1. 가정통신문 페이지
             * 2. 아동 건강 리스트 페이지
             * 3. 아동 생활 리스트 페이지
             *
             *  */}
            <Route path="/familycommunity/list" element={<FamilyCommunityPage />} />
            <Route path="/child/healthlist" element={<PersonalHealth />} />
            <Route path="/child/lifelist" element={<PersonalLife />} />

            {/* 수정필요(navigator) */}
            <Route path="/childattendance" element={<AttendancePage />} />
          </Route>
          {/* 공통 회원가입, 로그인, 아이디찾기, 비밀번호 찾기 */}

          {/* Login Page */}
          <Route path="/" element={<LoginPage />} />
          {/* 회원가입 권한 선택 */}
          <Route path="/signup/userselect" element={<UserTypeSelect />} />
          {/* 회원가입 약관 동의 */}
          <Route path="/signup/terms" element={<TermsAgreement />} />
          {/* 회원가입 정보 입력 */}
          <Route path="/signup/info" element={<SignUpBasicInfo />} />
          <Route path="/signup/teacher" element={<SignUpWorkSpaceInfo />} />
          <Route path="/signup/complete" element={<SignUpComplete />} />
          <Route path="/signup/parent" element={<SignUpChildInfo />} />

          <Route path="/signup/manager" element={<SignUpCenterInfo />} />
          {/* Regist Page */}
          <Route path="/regist" element={<Home />}></Route>

          <Route path="/signup/center" element={<SignUpCenterInfo />} />

          {/* Find ID Page */}
          <Route path="/findid" element={<SearchId />} />
          {/* Find ID Success Page */}
          <Route path="/findidsuccess" element={<SeachIdSuccess />} />
          {/* Find Password Page */}
          <Route path="/findpwd" element={<SearchPassword />} />
          {/* Find Password Page -처음으로 나오는 비밀번호 찾기 페이지*/}
          {/* authenticationuser -비밀번호 찾기 사용자인증 페이지  */}
          <Route path="/authenticationuser" element={<AuthenticationUser />} />
          {/* Change Password Page - 비밀번호 재설정 페이지 */}
          <Route path="/changepwd" element={<ChangePassword />} />

          {/* 404 Not Found */}
          <Route path="*" element={<ErrorPage />} />

          {/* Regist Page */}
          <Route path="/regist" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        draggable
        hideProgressBar={false}
        newestOnTop
        theme="light"
        pauseOnHover
      />
    </ThemeProvider>
  );
}

export default App;
