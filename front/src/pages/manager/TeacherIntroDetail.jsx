import { useState, useEffect } from 'react';
import ContentHeader from '../../components/Common/ContentHeader.jsx';
import styled from 'styled-components';
import MyPageProfileImage from './components/MyPageProfileImage.jsx';
import MyPageMyInfo from './components/MyPageMyInfo.jsx';
import MyPageCenterInfo from './components/MyPageCenterInfo.jsx';
import MyPageMenuBox from './components/MyPageMenuBox.jsx';
import { FaUmbrellaBeach, FaRegClock } from 'react-icons/fa';
import { RiHealthBookLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import api from '../../api/axios.js';

const TeacherIntroDetail = () => {
  const { teacherNo } = useParams();
  const [editableInfo, setEditableInfo] = useState({});

  const fetchTeacherDetail = async () => {
    try {
      const url = `/api/members/mypage?id=${teacherNo}`;
      const { data } = await api.get(url);

      setEditableInfo({
        memberName: data.member_name,
        memberBirth: data.member_birth,
        memberType: data.member_type,
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
      <ContentHeader Title={'교사 상세정보'} Color={'blue'} FontSize="xl" />

      <Wrapper>
        <InfoBox>
          <ProfileImgBox>
            <MyPageProfileImage />
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
