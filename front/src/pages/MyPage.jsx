import React, { useEffect, useState } from 'react';
import ContentHeader from '../components/Common/ContentHeader';
import styled from 'styled-components';
import MemberBasicInfo from '../components/MyPage/MemberBasicInfo';
import useLoginStore from '../store/loginStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { childService } from '../api/child';
import ChildBringModal from './parent/components/childBringModal';
import ChildAddModal from './parent/components/childAddModal';
import CenterBasicInfo from '../components/MyPage/CenterBasicInfo';
import ClassBasicInfo from '../components/MyPage/ClassBasicInfo';
import CouncelInfo from '../components/MyPage/CouncelInfo';
import ParentChildListInfo from '../components/MyPage/ParentChildListInfo';
import AttendanceInfo from '../components/MyPage/AttendanceInfo';
import ApprovalListInfo from '../components/MyPage/ApprovalListInfo';

// 모든 사용자가 사용하는 마이페이지
// 직위 별로 다른 기능을 사용하도록 만들어야함.

const MyPage = () => {
  const { member } = useLoginStore();
  const setMember = useLoginStore((state) => state.setMember);
  const navigate = useNavigate();
  const isAuthenticated = useLoginStore((state) => state.isAuthenticated);

  // 사용자 정보 관리
  const [editableInfo, setEditableInfo] = useState(null);
  const [centerInfo, setCenterInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // 아동 관련 상태
  const [childList, setChildList] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBringModalOpen, setIsBringModalOpen] = useState(false);

  // 상담 정보
  const [counselList, setCounselList] = useState([]);

  // 사용자 & 시설 정보 불러오기
  useEffect(() => {
    if (!isAuthenticated || !member) {
      toast.error('로그인이 필요합니다');
      navigate('/');
      return;
    }

    const fetchMyInfo = async () => {
      try {
        const url = `/api/members/mypage?id=${member.memberNo}`;
        const { data } = await api.get(url);

        setEditableInfo({
          memberName: data.member_name,
          memberBirth: data.member_birth,
          address: data.address,
          memberPhone: data.member_phone,
          memberType: data.member_type,
          memberProfile: data.member_profile,
        });

        setCenterInfo({
          centerName: data.center_name,
          centerTel: data.center_tel,
          centerAddress: data.center_address,
          centerType: data.center_type,
        });

        console.log(data);
      } catch (error) {
        toast.error('불러오기 실패', error);
      }
    };

    fetchMyInfo();
  }, [isAuthenticated, member, navigate]);

  // 마이페이지 수정 함수
  const handleSave = async () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      try {
        await api.patch(`/api/members/mypage?id=${member.memberNo}`, {
          memberName: editableInfo.memberName,
          memberBirth: editableInfo.memberBirth,
          address: editableInfo.address,
          centerName: centerInfo.centerName,
          centerTel: centerInfo.centerTel,
          centerAddress: centerInfo.centerAddress,
          centerType: centerInfo.centerType,
          memberProfile: editableInfo.memberProfile,
        });
        setMember({
          ...member,
          memberName: editableInfo.memberName,
          memberBirth: editableInfo.memberBirth,
          address: editableInfo.address,
          memberProfile: editableInfo.memberProfile,
        });
        // centerInfo도 즉시 업데이트
        setCenterInfo((prev) => ({
          ...prev,
          centerName: centerInfo.centerName,
          centerTel: centerInfo.centerTel,
          centerAddress: centerInfo.centerAddress,
          centerType: centerInfo.centerType,
        }));
        toast.success('수정이 성공적으로 완료되었습니다.');
        setIsEditing(false);
      } catch (e) {
        toast.error('수정 실패: ' + e.message);
      }
    }
  };

  // 프로필 사진 수정 함수
  const handleProfileUpdate = (newProfileName) => {
    setEditableInfo((prev) => ({
      ...prev,
      memberProfile: newProfileName,
    }));
  };

  //아동 정보 불러오기 (학부모 일때만)
  useEffect(() => {
    if (!member) return;
    if (member.memberType !== 'PARENT') return;
    const fetchChildList = async () => {
      try {
        const result = await childService.getParentChildList(member.memberNo);
        setChildList(result);
      } catch (error) {
        console.error('자녀 목록을 가져오는 데 실패했습니다:', error);
      }
    };
    fetchChildList();
    window.refreshChildList = fetchChildList;
    return () => {
      delete window.refreshChildList;
    };
  }, [member]);

  // 아동 모달
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const openBringModal = () => setIsBringModalOpen(true);
  const closeBringModal = () => setIsBringModalOpen(false);

  // 상담 정보 불러오기
  useEffect(() => {
    // 부모는 불러오지 않음.
    if (member.centerNo) {
      fetchCounselData();
    }
  }, [member.centerNo]);

  const fetchCounselData = async () => {
    try {
      const res = await api.get(`http://localhost:8888/api/counsel/getall?centerNo=${member.centerNo}`);
      console.log(res);
      setCounselList(res.data);
    } catch (error) {
      toast.error('상담 목록 불러오기 실패:', error);
    }
  };

  if (!member || !editableInfo) return null;

  return (
    <Content>
      <ContentHeader
        Title={'마이페이지'}
        Color={'blue'}
        FontSize="xl"
        ButtonProps={[{ Title: isEditing ? '수정완료' : '수정하기', func: handleSave }]}
      />
      <Wrapper>
        {/* 사용자 정보를 띄우는 InfoBox */}
        <MemberBasicInfo
          editableInfo={editableInfo}
          isEditing={isEditing}
          onProfileUpdate={handleProfileUpdate}
          onChange={setEditableInfo}
        ></MemberBasicInfo>

        <div style={{ display: 'flex' }}>
          {/* 시설 정보 카드 */}
          <CenterBasicInfo
            center={centerInfo}
            isEditing={isEditing && member.memberType === 'MANAGER'}
            isTeacher={member.memberType === 'TEACHER'}
            onChange={setCenterInfo}
          ></CenterBasicInfo>

          {/* [교사] 담당 반 출결 & 건강  정보  */}
          {member.memberType === 'TEACHER' && <ClassBasicInfo classNo={member.classNo}></ClassBasicInfo>}
        </div>

        {/* [교사&학부모] 대기중인 상담 리스트 */}
        {member.memberType !== 'MANAGER' && (
          <FlexBox>
            <h1 style={{ textAlign: 'start' }}>상담 대기 목록</h1>
            <CouncelInfo counselList={counselList}></CouncelInfo>
          </FlexBox>
        )}

        {/* [학부모] 아동 리스트 */}
        {member.memberType === 'PARENT' && (
          <FlexBox>
            <h1 style={{ textAlign: 'start' }}>아동 목록</h1>
            <ParentChildListInfo
              childList={childList}
              openAddModal={openAddModal}
              openBringModal={openBringModal}
            ></ParentChildListInfo>
          </FlexBox>
        )}

        {/* [교사] 근태 정보 카드 */}
        {member.memberType === 'TEACHER' && (
          <FlexBox>
            <h1 style={{ textAlign: 'start' }}>근태 정보</h1>
            <AttendanceInfo></AttendanceInfo>
          </FlexBox>
        )}

        {/* [시설장] 회원가입 대기 리스트 */}
        {member.memberType === 'MANAGER' && (
          <FlexBox>
            <h1 style={{ textAlign: 'start' }}>대기 현황</h1>
            <ApprovalListInfo></ApprovalListInfo>
          </FlexBox>
        )}

        {/* [시설장] 대기중인 휴가 & 워케이션 리스트 */}
        {/* <VacationListInfo></VacationListInfo> */}
      </Wrapper>
      <ChildAddModal isOpen={isAddModalOpen} onClose={closeAddModal} />
      <ChildBringModal isOpen={isBringModalOpen} onClose={closeBringModal} />
    </Content>
  );
};

export default MyPage;

const Content = styled.div`
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  padding: 30px;
  flex-direction: column;
`;
