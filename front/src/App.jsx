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

import ApprovalList from './pages/ApprovalList';
import ApprovalListAdmin from './pages/ApprovalListAdmin';

import SignUpChildInfo from './pages/common/signup/SignUpChildInfo';
import SignUpCenterInfo from './pages/common/signup/SignUpCenterInfo';
import MyVacation from './pages/teacher/MyVacation';
import ChildHealthCheck from './pages/teacher/ChildHealthCheck';

import SeachIdSuccess from './pages/common/SeachIdSuccss';
import AttendanceClassList from './pages/AttendanceClassList';
import DailySchedule from './pages/DailySchedule';
import DailyScheduleDetail from './pages/DailyScheduleDetail';

import ClassPlacement from './pages/manager/ClassPlacement';

import ChildDetail from './pages/teacher/ChildDetail';

import FamilyCommunityPage from './pages/teacher/FamilyCommunityPage';

import ManagerMyPage from './pages/manager/ManagerMyPage';
import ChildLifeCheck from './pages/teacher/ChildLifeCheck';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route element={<Layout />}>
            {/* Main Page */}
            <Route path="/home" element={<Home />} />
            {/* <Route path="/" element={<Home />} /> */}
            {/* 유치원 반 목록 페이지(교사 -> 아동 출결) */}
            <Route path="/class" element={<AttendanceClassList />} />
            {/* 반별 일과표 목록 페이지 */}
            <Route path="/daily" element={<DailySchedule />} />
            {/* 반별 일과표 목록  */}
            <Route path="/dailyDetail" element={<DailyScheduleDetail />} />
            {/* 아동목록 페이지(교사) */}
            <Route path="/childlist" element={<ChildList />} />
            {/* 아동 반배치 페이지(시설장) */}
            <Route path="/manager/classplacement" element={<ClassPlacement />} />
            {/* 추가 페이지는 아래 붙이기. */}

            {/* 교사 가정통신문 게시글 목록 페이지 */}
            <Route path="/familycommunity/list" element={<FamilyCommunityPage />} />

            {/* 회원가입 승인 리스트(시설장) */}
            <Route path="/approvalList" element={<ApprovalList />}></Route>
            {/* 시설장 승인 리스트(관리자) */}
            <Route path="/approvalListAdmin" element={<ApprovalListAdmin />}></Route>
            {/* 교사 휴가 워케이션 신청 페이지 */}
            <Route path="/myvacation" element={<MyVacation />} />
            {/* 교사 아동 건강 체크리스트 페이지 */}
            <Route path="/childhealthcheck" element={<ChildHealthCheck />} />
            {/* 교사 아동 건강 체크리스트 페이지 */}
            <Route path="/childlifecheck" element={<ChildLifeCheck />} />
            {/* 교사 아동 상세보기 페이지 */}
            <Route path="/child/detail" element={<ChildDetail />} />
            {/* 시설장 마이페이지  페이지 */}
            <Route path="/managermypage" element={<ManagerMyPage />} />
          </Route>
          {/* Login Page */}
          <Route path="/login" element={<LoginPage />}></Route>
          {/* 회원가입 권한 선택 */}
          <Route path="/signup/userselect" element={<UserTypeSelect />} />
          {/* 회원가입 약관 동의 */}
          <Route path="/signup/terms" element={<TermsAgreement />} />
          {/* 회원가입 기본 정보 입력 */}
          <Route path="/signup/info" element={<SignUpBasicInfo />} />
          <Route path="/signup/teacher" element={<SignUpWorkSpaceInfo />} />
          <Route path="/signup/complete" element={<SignUpComplete />} />
          <Route path="/signup/parent" element={<SignUpChildInfo />} />
          <Route path="/signup/center" element={<SignUpCenterInfo />} />
          {/* Regist Page */}
          <Route path="/regist" element={<Home />}></Route>
          {/* Find ID Page */}
          <Route path="/findid" element={<SearchId />}></Route>
          {/* Find ID Success Page */}
          <Route path="/findidsuccess" element={<SeachIdSuccess />}></Route>
          {/* Find Password Page */}
          <Route path="/findpwd" element={<SearchPassword />}></Route>
          {/* Find Password Page -처음으로 나오는 비밀번호 찾기 페이지*/}
          <Route path="/authenticationuser" element={<AuthenticationUser />}></Route>
          {/* authenticationuser -비밀번호 찾기 사용자인증 페이지  */}
          <Route path="/changepwd" element={<ChangePassword />}></Route>
          {/* Change Password Page - 비밀번호 재설정 페이지 */}
          {/* 404 Not Found */}
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
