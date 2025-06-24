import { useState, useEffect } from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import styled from 'styled-components';
import MyPageProfileImage from '../manager/components/MyPageProfileImage';
import MyPageMyInfo from '../manager/components/MyPageMyInfo';
import MyPageCenterInfo from '../manager/components/MyPageCenterInfo';
import MyPageMenuBox from '../manager/components/MyPageMenuBox';
import { FaUmbrellaBeach, FaRegClock } from 'react-icons/fa';
import { RiHealthBookLine } from 'react-icons/ri';
import { useLoginStore } from '../../store/loginStore';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios.js';

const TeacherMyPage = () => {
  const member = useLoginStore((state) => state.member);
  const navigate = useNavigate();
  const isAuthenticated = useLoginStore((state) => state.isAuthenticated);

  const [myInfo, setMyInfo] = useState(null);
  const [editableInfo, setEditableInfo] = useState(null);
  const [centerInfo, setCenterInfo] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !member) {
      alert('로그인이 필요합니다');
      navigate('/');
      return;
    }

    const fetchMyInfo = async () => {
      try {
        const url = `/api/members/mypage?id=${member.memberNo}`;
        const { data } = await api.get(url);
        setMyInfo(data);

        setEditableInfo({
          memberName: data.member_name,
          memberBirth: data.member_birth,
          memberType: data.member_type,
        });

        setCenterInfo({
          centerName: data.center_name,
          centerTel: data.center_tel,
          centerAddress: data.center_address,
          centerType: data.center_type,
        });
      } catch (error) {
        alert('불러오기 실패');
      }
    };

    fetchMyInfo();
  }, [isAuthenticated, member, navigate]);

  if (!member || !editableInfo || !centerInfo) return null;

  const handleSave = async () => {
    try {
      await api.patch(`/api/members/mypage?id=${member.memberNo}`, {
        memberName: editableInfo.memberName,
        memberBirth: editableInfo.memberBirth,
        centerName: centerInfo.centerName,
        centerTel: centerInfo.centerTel,
        centerAddress: centerInfo.centerAddress,
        centerType: centerInfo.centerType,
      });
      alert('수정 완료!');
    } catch (e) {
      alert('수정 실패: ' + e.message);
    }
  };

  return (
    <Content>
      <ContentHeader
        Title={'마이페이지'}
        Color={'blue'}
        FontSize="xl"
        ButtonProps={[{ Title: '수정하기', func: handleSave }]}
      />

      <Wrapper>
        <InfoBox>
          <ProfileImgBox>
            <MyPageProfileImage />
          </ProfileImgBox>
          <MyInfoBox>
            <MyPageMyInfo info={editableInfo} isEditable={true} onChange={setEditableInfo} />
          </MyInfoBox>
          <CenterInfoBox>
            <MyPageCenterInfo
              centerInfo={centerInfo}
              isEditable={member.memberType === 'MANAGER'}
              onChange={setCenterInfo}
            />
          </CenterInfoBox>
        </InfoBox>

        <MenuBox>
          <MyPageMenuBox menuName="근태관리" icon={<FaRegClock size={60} />} url="/근태관리" color="blue" />
          <MyPageMenuBox menuName="나의 건강" icon={<RiHealthBookLine size={60} />} url="/myhealth" color="yellow" />
          <MyPageMenuBox
            menuName="휴가 및 워케이션 관리"
            icon={<FaUmbrellaBeach size={60} />}
            url="/teacher/workcation"
            color="blue"
          />
        </MenuBox>
      </Wrapper>
    </Content>
  );
};

export default TeacherMyPage;

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
  align-items: center;
`;
const InfoBox = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  box-sizing: border-box;
  gap: 20px; /* 컴포넌트 사이 간격 */
`;
const ProfileImgBox = styled.div`
  width: 20%;
  min-width: 170px;
`;

const MyInfoBox = styled.div`
  width: 30%;
  min-width: 300px;
`;

const CenterInfoBox = styled.div`
  width: 50%;
  min-width: 500px;
`;

const MenuBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 30px 0;
`;
