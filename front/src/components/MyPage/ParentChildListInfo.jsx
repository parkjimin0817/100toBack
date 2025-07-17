import React from 'react'
import styled from 'styled-components';
import { childInfo } from '../../api/childInfo';
import ChildPicture from '../../pages/parent/components/childpic.png';
import AddImage from '../../pages/parent/components/addsquare.png';
import SearchImage from '../../pages/parent/components/search.png'
import ChildImage from '../../assets/img/cardchild.png';
import ScrollWrapper from './MyPageScrollWrapper';

const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;

const ParentChildListInfo = ({ childList, openAddModal, openBringModal }) => {
  return (
    // <MenuBox>
    //   {childList.map((data) => {
    //     const { age, gender, birthday } = childInfo(data.child_resident_no);
    //     return (
    //       <Card key={data.child_no} onClick={() => navigate(`/parent/mychild?childNo=${data.child_no}`)}>
    //         <ProfileDiv>
    //           <NameDiv>{data.child_name}</NameDiv>
    //           <AgeDiv>
    //             ({age}세/{gender === '남자' ? '남' : '여'})
    //           </AgeDiv>
    //           <BirthDiv>생일 {birthday}</BirthDiv>
    //         </ProfileDiv>
    //         <ImgDiv>
    //           <Img
    //             src={data.child_profile ? `${CLOUDFRONT_URL}/${data.child_profile}` : ChildPicture}
    //             alt="아이 이미지"
    //           />
    //         </ImgDiv>
    //       </Card>
    //     );
    //   })}
      // <AddChild>
      //   <AddBox onClick={openAddModal}>
      //     <Plus>아동 추가</Plus>
      //     <Img src={AddImage} />
      //   </AddBox>
      //   <AddBox onClick={openBringModal}>
      //     <Plus>아동 검색</Plus>
      //     <Img src={SearchImage} />
      //   </AddBox>
      // </AddChild>
    // </MenuBox>
    <>
      <ScrollWrapper>
        <CardList>
          {childList.map((data, index) => {
            const { age, gender, birthday } = childInfo(data.child_resident_no);
            return (
              <Card
                key={`${data.counsel_no}.${index}`}
                onClick={() => navigate(`/parent/mychild?childNo=${data.child_no}`)}
              >
                <CardContent>
                  <Name>{data.child_name}</Name>
                  <CounselDate>({age}세/{gender === '남자' ? '남' : '여'})</CounselDate>
                  <Time>생일 {birthday}</Time>
                </CardContent>
                <CardImage src={ChildImage} alt="아이" />
              </Card>
            );
          })}
          <Card>
            <AddChild>
              <AddBox onClick={openAddModal}>
                <Plus>아동 추가</Plus>
                <Img src={AddImage} />
              </AddBox>
              <AddBox onClick={openBringModal}>
                <Plus>아동 검색</Plus>
                <Img src={SearchImage} />
              </AddBox>
            </AddChild>
          </Card>
        </CardList>
      </ScrollWrapper>
    </>
  )
}

export default ParentChildListInfo;


const MenuBox = styled.div`
  padding: 20px;
  width: 100%;
  height: 70%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 30px 0;
  gap: 20px;
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

const Img = styled.img`
  padding: 5px;
  background-color: white;
  border-radius: 30px;
  width: 30px;
  height: 30px;
`;

const AddChild = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AddBox = styled.div`
  width: 160px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.lightblue};
  padding: 0 10px;

  &:hover {
    cursor: pointer;
  }
`;

const Plus = styled.div`
  margin-right: 10px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: white;
  flex: 1;
`;

// 테스트
const CardList = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 20px;
  padding: 20px;
  width: max-content;
`;

const Card = styled.div`
  width: 180px;
  height: 180px;
  background-color: #d9f0ff;
  border-radius: 10px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 12px;

  &:hover {
    cursor: pointer;
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TypeBadge = styled.div`
  background-color: ${({ $type }) => ($type === '채팅' ? '#00bfff' : '#7fc8a9')};
  color: white;
  padding: 2px 8px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
`;

const Status = styled.div`
  font-size: 12px;
  color: #555;
`;

const CardContent = styled.div`
  text-align: center;
  font-size: 13px;
`;

const Name = styled.div`
  font-weight: bold;
`;

const CounselDate = styled.div`
  font-size: 12px;
`;

const Time = styled.div`
  margin-top: 2px;
  font-size: 12px;
  color: #333;
`;

const CardImage = styled.img`
  width: 64px;
  height: 77px;
  align-self: center;
`;