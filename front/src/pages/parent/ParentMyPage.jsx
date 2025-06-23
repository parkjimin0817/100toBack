import { useState } from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import styled from 'styled-components';
import MyPageProfileImage from '../manager/components/MyPageProfileImage';
import MyPageMyInfo from './components/MyPageMyInfo';
import MyPageCenterInfo from '../manager/components/MyPageCenterInfo';
import { useNavigate } from 'react-router-dom';
import ChildPicture from './components/childpic.png';
import AddImage from './components/addsquare.png';
import SearchImage from './components/search.png';

const ParentMyPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const hanldeEditClick = () => {
    setIsEditMode((prev) => !prev);
  };
  const navigate = useNavigate();
  return (
    <Content>
      <ContentHeader
        Title={'마이페이지'}
        Color={'blue'}
        FontSize="xl"
        ButtonProps={[{ Title: isEditMode ? '저장하기' : '수정하기', func: hanldeEditClick }]}
      />
      <Wrapper>
        <InfoBox>
          <ProfileImgBox>
            <MyPageProfileImage isEditMode={isEditMode} />
          </ProfileImgBox>
          <MyInfoBox>
            <MyPageMyInfo isEditMode={isEditMode} />
          </MyInfoBox>
          <CenterInfoBox>
            <MyPageCenterInfo isEditMode={isEditMode} />
          </CenterInfoBox>
        </InfoBox>
        <MenuBox>
          <Card onClick={() => navigate('/child/detail?id=1')}>
            <ProfileDiv>
              <NameDiv> 씩씩한 정형일 </NameDiv>
              <AgeDiv>(6세/남)</AgeDiv>
              <BirthDiv> 생일 10.04 </BirthDiv>
            </ProfileDiv>
            <ImgDiv>
              <Img src={ChildPicture} />
            </ImgDiv>
          </Card>
          <AddChild>
            <AddBox onClick={() => navigate('/parent/addchild')}>
              <Plus>아동 추가</Plus>
              <Img src={AddImage} />
            </AddBox>
            <AddBox onClick={() => navigate('/parent/searchchild')}>
              <Plus>아동 검색</Plus>
              <Img src={SearchImage} />
            </AddBox>
          </AddChild>
        </MenuBox>
      </Wrapper>
    </Content>
  );
};

export default ParentMyPage;

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
  margin-right: 35px;
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
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin: 30px 0;
`;

const Card = styled.div`
  width: 240px;
  height: 360px;
  background-color: ${({ theme }) => theme.colors.lightblue};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  flex-shrink: 0;

  :hover {
    cursor: pointer;
  }
`;

const ProfileDiv = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[8]};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ theme }) => theme.colors.white};
  gap: ${({ theme }) => theme.spacing[1]};
`;

const NameDiv = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const AgeDiv = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const BirthDiv = styled.div`
  margin-top: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

const ImgDiv = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const Img = styled.img``;

const AddChild = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 360px;
`;

const AddBox = styled.div`
  margin-left: 50px;
  margin-right: 50px;
  width: 120px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background: ${({ theme }) => theme.colors.lightblue};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing[12]};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    cursor: pointer;
  }
`;

const Plus = styled.div`
  margin-right: 10px;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
