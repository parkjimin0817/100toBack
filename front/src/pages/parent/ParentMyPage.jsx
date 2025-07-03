import { useState, useEffect } from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import styled from 'styled-components';
import MyPageProfileImage from '../manager/components/MyPageProfileImage';
import MyPageMyInfo from './components/MyPageMyInfo';
import MyPageCenterInfo from '../manager/components/MyPageCenterInfo';
import { useNavigate } from 'react-router-dom';
import ChildPicture from './components/childpic.png';
import AddImage from './components/addsquare.png';
import SearchImage from './components/search.png';
import { useLoginStore } from '../../store/loginStore';
import { childService } from '../../api/child';
import { childInfo } from '../../api/childInfo';
import api from '../../api/axios.js';
import { toast } from 'react-toastify';

import ChildAddModal from './components/childAddModal.jsx';
import ChildBringModal from './components/childBringModal.jsx';

const ParentMyPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const member = useLoginStore((state) => state.member);
  const setMember = useLoginStore((state) => state.setMember);
  const [editableInfo, setEditableInfo] = useState({
    memberName: member.memberName,
    memberBirth: member.memberBirth,
    memberPhone: member.memberPhone,
  });
  const [childList, setChildList] = useState([]);
  const navigate = useNavigate();

  const fetchChildList = async () => {
    try {
      const result = await childService.getParentChildList(member.memberNo);
      console.log('아동정보:', result);
      setChildList(result);
    } catch (error) {
      console.error('자녀 목록을 가져오는 데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    window.refreshChildList = fetchChildList;
    return () => {
      delete window.refreshChildList;
    };
  }, []);

  //info 수정
  const handleEditSubmit = async () => {
    try {
      const { data } = await api.patch(`/api/members/mypage/parent`, {
        member_no: member.memberNo,
        member_name: editableInfo.memberName,
        member_birth: editableInfo.memberBirth,
        member_phone: editableInfo.memberPhone,
      });

      setMember({
        ...member,
        memberName: editableInfo.memberName,
        memberBirth: editableInfo.memberBirth,
        memberPhone: editableInfo.memberPhone,
      });

      setIsEditMode(false);
    } catch (e) {
      toast.error('수정 실패: ' + e.message);
    }
  };

  useEffect(() => {
    fetchChildList();
    handleEditSubmit();
  }, []);

  const handleChange = (key, value) => {
    setEditableInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleEditClick = () => {
    if (!isEditMode) {
      setEditableInfo({
        memberNo: member.memberNo,
        memberName: member.memberName,
        memberBirth: member.memberBirth,
        memberPhone: member.memberPhone,
      });
      setIsEditMode(true);
    } else {
      handleEditSubmit();
    }
  };

  //modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBringModalOpen, setIsBringModalOpen] = useState(false);
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const openBringModal = () => setIsBringModalOpen(true);
  const closeBringModal = () => setIsBringModalOpen(false);

  return (
    <Content>
      <ContentHeader
        Title={'마이페이지'}
        Color={'orange'}
        FontSize="xl"
        ButtonProps={[{ Title: isEditMode ? '저장하기' : '수정하기', func: handleEditClick }]}
      />
      <Wrapper>
        <InfoBox>
          <ProfileImgBox>
            <MyPageProfileImage isEditMode={isEditMode} />
          </ProfileImgBox>
          <MyInfoBox>
            <MyPageMyInfo isEditMode={isEditMode} editableInfo={editableInfo} onChange={handleChange} />
          </MyInfoBox>
          <CenterInfoBox>
            <MyPageCenterInfo isEditMode={isEditMode} />
          </CenterInfoBox>
        </InfoBox>
        <MenuBox>
          {childList.map((data) => {
            console.log(data);
            const { age, gender, birthday } = childInfo(data.child_resident_no);
            return (
              <Card key={data.child_no} onClick={() => navigate(`/child/detail?id=${data.child_no}`)}>
                <ProfileDiv>
                  <NameDiv>{data.child_name}</NameDiv>
                  <AgeDiv>
                    ({age}세/{gender === '남자' ? '남' : '여'})
                  </AgeDiv>
                  <BirthDiv>생일 {birthday}</BirthDiv>
                </ProfileDiv>
                <ImgDiv>
                  <Img src={data.child_profile || ChildPicture} alt="아이 이미지" />
                </ImgDiv>
              </Card>
            );
          })}
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
        </MenuBox>
      </Wrapper>
      <ChildAddModal isOpen={isAddModalOpen} onClose={closeAddModal} />
      <ChildBringModal isOpen={isBringModalOpen} onClose={closeBringModal} />
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
  gap: 20px;
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
  flex-wrap: wrap;
  flex-direction: row;
  margin: 30px 0;
  gap: 20px;
`;

const Card = styled.div`
  width: 240px;
  height: 360px;
  background-color: ${({ theme }) => theme.colors.lightblue};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  flex-shrink: 0;
  margin-right: ${({ theme }) => theme.spacing[8]};

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
  width: 140px;
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
