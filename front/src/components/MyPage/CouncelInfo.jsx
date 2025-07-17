import React from 'react'
import styled from 'styled-components';
import ChildImage from '../../assets/img/cardchild.png';
import ScrollWrapper from './MyPageScrollWrapper';

const CouncelInfo = ({ counselList }) => {
  // 날짜/시간 포맷 도우미 함수들
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${String(date.getMonth() + 1).padStart(2, '0')}월${String(date.getDate()).padStart(2, '0')}일`;
  };

  const formatTime = (timeStr) => timeStr?.substring(0, 5);
  return (
    <>
      <ScrollWrapper>
        <CardList>
          {counselList
            .filter(
              (item) =>
                (item.counsel_status === 'PENDING')
            )
            .map((item) => (
              <Card
                key={item.counsel_no}
                onClick={() => {
                  navigate(`/child/detail/${item.child_no}`);
                }}
              >
                <CardTop>
                  <TypeBadge $type={item.counsel_type === 'CHAT' ? '채팅' : '대면'}>
                    {item.counsel_type === 'CHAT' ? '채팅' : '대면'}
                  </TypeBadge>
                  <Status>{item.counsel_status === 'PENDING' ? '상담 대기' : '상담 완료'}</Status>
                </CardTop>
                <CardContent>
                  <Name>{item.child_name} 학부모</Name>
                  <CounselDate>{formatDate(item.counsel_date)}</CounselDate>
                  <Time>
                    {formatTime(item.counsel_start)} ~ {formatTime(item.counsel_end)}
                  </Time>
                </CardContent>
                <CardImage src={ChildImage} alt="아이" />
              </Card>
            ))}
        </CardList>
      </ScrollWrapper>
    </>
  )
}

export default CouncelInfo;


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
  justify-content: space-between;
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