import { useState } from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import styled from 'styled-components';
import MyPageProfileImage from '../manager/components/MyPageProfileImage';
import MyPageMyInfo from '../manager/components/MyPageMyInfo';
import MyPageCenterInfo from '../manager/components/MyPageCenterInfo';
import MyPageMenuBox from '../manager/components/MyPageMenuBox';
import { FaUmbrellaBeach, FaRegClock } from 'react-icons/fa';
import { RiHealthBookLine } from 'react-icons/ri';

const TeacherMyPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const hanldeEditClick = () => {
    setIsEditMode((prev) => !prev);
  };
  return (
    <Content>
      <ContentHeader
        Title={'마이페이지'}
        Color={'blue'}
        FontSize="xl"
        ButtonProps={[{ Title: isEditMode ? '저장하기' : '수정하기', func: hanldeEditClick }]}
      />

      {/* 만약, 시설장이 들어갈 경우, 
      Title={'교사 상세보기'}
      Color={'blue'}
      ButtonProps={[{ Title: '뒤로가기', func: () => navigate(-1) }, { Title: '퇴사 처리' }]}
      교사 본인이 들어올 경우,
      Title={'교사 마이페이지'}
      Color={'orange'}
      ButtonProps={[{ Title: '뒤로가기', func: () => navigate(-1) }, { Title: '탈퇴하기' }]} */}

      <Wrapper>
        <InfoBox>
          <ProfileImgBox>
            <MyPageProfileImage isEditMode={isEditMode} />
          </ProfileImgBox>
          <MyInfoBox>
            <MyPageMyInfo isEditMode={isEditMode} />
          </MyInfoBox>
          <CenterInfoBox>
            <MyPageCenterInfo />
          </CenterInfoBox>
        </InfoBox>
        <MenuBox>
          <MyPageMenuBox menuName="근태관리" icon={<FaRegClock size={60} />} url="/근태관리" color="blue" />
          <MyPageMenuBox menuName="나의 건강" icon={<RiHealthBookLine size={60} />} url="/myhealth" color="yellow" />
          <MyPageMenuBox
            menuName="휴가 및 워케이션 관리"
            icon={<FaUmbrellaBeach size={60} />}
            url="/myvacation"
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
