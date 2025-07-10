import { useState, useEffect } from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import styled from 'styled-components';
import MyPageProfileImage from '../manager/components/MyPageProfileImage';
import MyPageMyInfo from './components/MyPageMyInfo';
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
import MyPageCenterInfo from '../manager/components/MyPageCenterInfo.jsx';

const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;

const ParentMyPage = () => {
  const member = useLoginStore((state) => state.member);
  const setMember = useLoginStore((state) => state.setMember);
  const navigate = useNavigate();
  const isAuthenticated = useLoginStore((state) => state.isAuthenticated);

  const [editableInfo, setEditableInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [childList, setChildList] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBringModalOpen, setIsBringModalOpen] = useState(false);

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
          memberProfile: data.member_profile,
          memberType: data.member_type,
        });
      } catch (error) {
        toast.error('불러오기 실패', error);
      }
    };
    fetchMyInfo();
  }, [isAuthenticated, member, navigate]);

  const handleProfileUpdate = (newProfileName) => {
    setEditableInfo((prev) => ({
      ...prev,
      memberProfile: newProfileName,
    }));
  };

  const handleSave = async () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      try {
        await api.patch(`/api/members/mypage/parent`, {
          member_no: member.memberNo,
          member_name: editableInfo.memberName,
          member_birth: editableInfo.memberBirth,
          member_phone: editableInfo.memberPhone,
          address: editableInfo.address,
          member_profile: editableInfo.memberProfile,
        });
        setMember({
          ...member,
          memberName: editableInfo.memberName,
          memberBirth: editableInfo.memberBirth,
          memberPhone: editableInfo.memberPhone,
          address: editableInfo.address,
          memberProfile: editableInfo.memberProfile,
        });
        toast.success('수정이 성공적으로 완료되었습니다.');
        setIsEditing(false);
      } catch (e) {
        toast.error('수정 실패: ' + e.message);
      }
    }
  };

  //child
  useEffect(() => {
    if (!member) return;
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

  //child-modal
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const openBringModal = () => setIsBringModalOpen(true);
  const closeBringModal = () => setIsBringModalOpen(false);

  if (!member || !editableInfo) return null;

  return (
    <Content>
      <ContentHeader
        Title={'마이페이지'}
        Color={'orange'}
        FontSize="xl"
        ButtonProps={[{ Title: isEditing ? '수정완료' : '수정하기', func: handleSave }]}
      />
      <Wrapper>
        <InfoBox>
          <ProfileImgBox>
            <MyPageProfileImage
              memberProfile={editableInfo.memberProfile}
              memberType={editableInfo.memberType}
              isEditMode={isEditing}
              onProfileUpdate={handleProfileUpdate}
            />
          </ProfileImgBox>
          <MyInfoBox>
            <MyPageMyInfo info={editableInfo} isEditable={isEditing} onChange={setEditableInfo} />
          </MyInfoBox>
          <CenterInfoBox>
            <MyPageCenterInfo />
          </CenterInfoBox>
        </InfoBox>
        <MenuBox>
          {childList.map((data) => {
            const { age, gender, birthday } = childInfo(data.child_resident_no);
            return (
              <Card key={data.child_no} onClick={() => navigate(`/child/detail/${data.child_no}`)}>
                <ProfileDiv>
                  <NameDiv>{data.child_name}</NameDiv>
                  <AgeDiv>
                    ({age}세/{gender === '남자' ? '남' : '여'})
                  </AgeDiv>
                  <BirthDiv>생일 {birthday}</BirthDiv>
                </ProfileDiv>
                <ImgDiv>
                  <Img
                    src={data.child_profile ? `${CLOUDFRONT_URL}/${data.child_profile}` : ChildPicture}
                    alt="아이 이미지"
                  />
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
  padding: 20px;
  width: 100%;
  height: 70%;
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
