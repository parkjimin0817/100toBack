import React, { useState, useEffect } from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import styled from 'styled-components';
import MyHealthDetailCard from './components/MyHealthDetailCard';
import HealthSummaryBox from './components/HealthSummaryBox';
import { useNavigate, useParams } from 'react-router-dom';
import useLoginStore from '../../store/loginStore';
import { memberHealthLogService } from '../../api/memberHealthLog';
import { toast } from 'react-toastify';

const MyHealthDetail = () => {
  const { healthLogNo } = useParams();
  const navigate = useNavigate();
  const { member } = useLoginStore();
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const result = await memberHealthLogService.getHealthLogDetail(healthLogNo);
      setData(result);
    } catch (error) {
      console.error('건강 기록 조회 실패:', error);
      alert('건강 기록을 불러오는 데 실패했습니다.');
      navigate('/teacherhealth');
    }
  };

  useEffect(() => {
    fetchData();
  }, [healthLogNo]);

  const handleEdit = () => {
    navigate(`/myhealth/edit/${healthLogNo}`);
  };

  const handleDelete = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        await memberHealthLogService.deleteHealthLog(healthLogNo);
        toast.success('건강 기록이 삭제되었습니다.');
        navigate('/teacherhealth');
      } catch (error) {
        console.error('삭제 실패:', error);
        toast.error('삭제에 실패했습니다.');
      }
    }
  };

  if (!data) return <div>로딩 중...</div>;

  return (
    <>
      <ContentHeader
        Title="나의 건강 데이터"
        Color="yellow"
        ButtonProps={[
          { Title: '수정하기', func: handleEdit },
          { Title: '삭제하기', func: handleDelete },
          { Title: '뒤로가기', func: () => navigate(-1) },
        ]}
      />
      <Wrapper>
        <DateRow>
          <Text>작성 날짜</Text>
          <Date>{data.create_date?.split('T')[0] || 'N/A'}</Date>
        </DateRow>
        <Content>
          <MyHealthDetailCard label="체온" value={`${data.temperature ?? '-'} ℃`} />
          <MyHealthDetailCard label="스트레스 지수" value={data.stress ?? '-'} />
          <MyHealthDetailCard label="수면시간" value={`${data.sleep ?? '-'} 시간`} />
          <MyHealthDetailCard label="증상" value={data.symptoms || '없음'} />
        </Content>
        <SecondContent>
          <HealthSummaryBox data={data} />
        </SecondContent>
      </Wrapper>
    </>
  );
};

export default MyHealthDetail;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const DateRow = styled.div`
  margin-top: 10px;
  padding: 0 20px;
  display: flex;
  justify-content: end;
`;

const Text = styled.div`
  width: 90px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  position: relative;
  text-align: left;

  &::after {
    content: '|';
    position: absolute;
    right: 0;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const Date = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 10px 0;
`;

const SecondContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 10px 0 20px;
`;
