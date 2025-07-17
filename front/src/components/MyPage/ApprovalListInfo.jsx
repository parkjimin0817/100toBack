import React, { useEffect, useState } from 'react'
import useLoginStore from '../../store/loginStore';
import { approvalListService } from '../../api/approvalList';
import styled from 'styled-components';

const ApprovalListInfo = () => {
  // 회원가입 승인 리스트에 몇개 쌓였는지, 간략히 보여주는 화면
  const [dataAll, setDataAll] = useState([]);
  const { member } = useLoginStore();

  const fetchPendingList = async () => {
    try {
      const data = await approvalListService.getMemberPendingList(member.centerNo);
      setDataAll(data || []);
    } catch (error) {
      console.error('승인 대기 목록 로딩 실패:', error.message);
    }
  };

  useEffect(() => {
    fetchPendingList();
  }, []);

  const teacherList = dataAll.filter((item) => item.member_type === 'TEACHER' && item.status === 'PENDING');
  const parentList = dataAll.filter(
    (item) => item.member_type === 'PARENT' && !item.child_name && item.status === 'PENDING'
  );
  const childList = dataAll.filter((item) => item.child_name && item.status === 'PENDING');

  return (
    <ApprovalSection>
      <ApprovalHeaderRow>
        <ApprovalSectionTitle>회원가입 승인 대기</ApprovalSectionTitle>
      </ApprovalHeaderRow>
      <ApprovalHeaderRow>
        <MainApprovalCard>
          <MainApprovalClass>교사</MainApprovalClass>
          <MainApprovalEmoji>👩‍🏫</MainApprovalEmoji>
          <MainApprovalCount>{teacherList.length} 개</MainApprovalCount>
        </MainApprovalCard>
        <MainApprovalCard>
          <MainApprovalClass>학부모</MainApprovalClass>
          <MainApprovalEmoji>👪</MainApprovalEmoji>
          <MainApprovalCount>{parentList.length} 개</MainApprovalCount>
        </MainApprovalCard>
        <MainApprovalCard>
          <MainApprovalClass>아동</MainApprovalClass>
          <MainApprovalEmoji>👶</MainApprovalEmoji>
          <MainApprovalCount>{childList.length} 개</MainApprovalCount>
        </MainApprovalCard>
      </ApprovalHeaderRow>
    </ApprovalSection>
  )
}

export default ApprovalListInfo

const ApprovalSection = styled.div`
  padding: 20px 100px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const ApprovalHeaderRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 20px;
`;

const ApprovalSectionTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const MainApprovalCard = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

const MainApprovalClass = styled.div`
  font-size: 13px;
  color: #333;
  font-weight: 600;
  margin-bottom: 5px;
`;

const MainApprovalEmoji = styled.div`
  font-size: 28px;
`;

const MainApprovalCount = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #00aaff;
  margin-top: 5px;
`;
