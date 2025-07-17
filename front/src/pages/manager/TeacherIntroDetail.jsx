import { useState, useEffect } from 'react';
import ContentHeader from '../../components/Common/ContentHeader.jsx';
import styled from 'styled-components';
import MyPageProfileImage from './components/MyPageProfileImage.jsx';
import MyPageMyInfo from './components/MyPageMyInfo.jsx';
import MyPageCenterInfo from './components/MyPageCenterInfo.jsx';
import MyPageMenuBox from './components/MyPageMenuBox.jsx';
import { FaUmbrellaBeach, FaRegClock } from 'react-icons/fa';
import { RiHealthBookLine } from 'react-icons/ri';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios.js';
import { resignService } from '../../api/resign.js';
import useLoginStore from '../../store/loginStore.js';
import { toast } from 'react-toastify';

const TeacherIntroDetail = () => {
  const { teacherNo } = useParams();
  const navigate = useNavigate();
  const [editableInfo, setEditableInfo] = useState({});
  const { member } = useLoginStore();

  const handleGoBack = () => {
    navigate('/manager/introteacher');
  };

  const handleResignment = async () => {
    const isConfirmed = window.confirm('정말로 해당 교사를 퇴직 처리하시겠습니까?');
    if (!isConfirmed) {
      return;
    }

    const mergedData = {
      center_no: member.centerNo,
      member_no: teacherNo,
    };

    try {
      await resignService.resignMember(mergedData);
      toast.success('퇴직 처리가 완료되었습니다.');
      navigate('/manager/introteacher');
    } catch (error) {
      toast.error('퇴직 처리 중 오류가 발생했습니다.');
    }
  };

  const fetchTeacherDetail = async () => {
    try {
      const url = `/api/members/mypage?id=${teacherNo}`;
      const { data } = await api.get(url);

      setEditableInfo({
        memberName: data.member_name,
        memberBirth: data.member_birth,
        memberType: data.member_type,
        memberProfile: data.member_profile,
        address: data.address,
      });
    } catch {
      alert('불러오기 실패');
    }
  };

  useEffect(() => {
    if (teacherNo) {
      fetchTeacherDetail();
    }
  }, [teacherNo]);

  return (
    <Content>
      <ContentHeader
        Title={'교사 상세정보'}
        Color={'blue'}
        FontSize="xl"
        ButtonProps={[
          { Title: '퇴직처리', func: handleResignment },
          { Title: '뒤로가기', func: handleGoBack },
        ]}
      />

      <Wrapper>
        <InfoBox>
          <ProfileImgBox>
            <MyPageProfileImage memberProfile={editableInfo.memberProfile} />
          </ProfileImgBox>
          <MyInfoBox>
            <MyPageMyInfo info={editableInfo} />
          </MyInfoBox>
          <CenterInfoBox>
            <MyPageCenterInfo />
          </CenterInfoBox>
        </InfoBox>
        <MenuBox>
          <MyPageMenuBox
            menuName="근태관리"
            icon={<FaRegClock size={60} />}
            url={`/manager/teacherattendance/${teacherNo}`}
            color="blue"
          />
          <MyPageMenuBox
            menuName="나의 건강"
            icon={<RiHealthBookLine size={60} />}
            url="/teacherhealth"
            color="yellow"
            data={{ teacherNo: teacherNo, teacherName: editableInfo.memberName }}
          />
          <MyPageMenuBox
            menuName="휴가 및 워케이션 관리"
            icon={<FaUmbrellaBeach size={60} />}
            url="/vacationList"
            color="blue"
          />
        </MenuBox>
      </Wrapper>
    </Content>
  );
};

export default TeacherIntroDetail;

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
  gap: 20px;
`;

const ProfileImgBox = styled.div`
  width: 20%;
  min-width: 170px;
`;

const MyInfoBox = styled.div`
  width: 30%;
  min-width: 400px;
`;

const CenterInfoBox = styled.div`
  width: 30%;
  min-width: 400px;
`;

const MenuBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 30px 0;
`;
