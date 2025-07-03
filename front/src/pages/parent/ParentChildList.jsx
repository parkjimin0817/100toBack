import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentHeader from '../../components/Common/ContentHeader';

import ParentChildrenList from '../../components/ParentChildrenList';
import ChildImg from '../../assets/Child.png';
import { useNavigate, useParams } from 'react-router-dom';
import { List } from '../../components/ChildDummyData';
import ChildDetailInfoArea from '../../components/Common/ChildDetailInfoArea';
import useLoginStore from '../../store/loginStore';
import { toast } from 'react-toastify';

const ParentChildList = () => {
  const [selectedChild, setSelectedChild] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const navigate = useNavigate();

  const member = useLoginStore((state) => state.member);
  const role = member.memberType;
  const memberNo = member.memberNo;

  useEffect(() => {
    if (role === 'PARENT') {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
      toast.error('잘못된 접근입니다.');
      setTimeout(() => navigate(-1), 3500); // 토스트 띄우고 3.5초 후 이동
    }
  }, [role, navigate]);

  if (isAuthorized === null) return null; // 아직 권한 확인 중이라면 아무것도 안 보이게
  if (isAuthorized === false) return null; // 권한 없으면 화면 렌더링 안 함

  return (
    <>
      <Content>
        <ContentHeader Title="나의 아동" Color="orange" />
        <InnerContent>
          <ParentChildrenList childFilter={memberNo} onChildClick={setSelectedChild} />
        </InnerContent>
      </Content>

      <ChildInfoArea>{selectedChild && <ChildDetailInfoArea childNo={selectedChild.child_no} />}</ChildInfoArea>
    </>
  );
};

const ChildInfoArea = styled.div`
  width: 100%;
  min-height: 400px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
  padding: ${({ theme }) => theme.spacing[5]};
`;

const InnerContent = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
`;

const Content = styled.div`
  width: 100%;
  min-height: 300px;
  background-color: #ffffff;
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export default ParentChildList;
