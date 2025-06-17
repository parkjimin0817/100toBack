import React from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import styled from 'styled-components';
import MyHealthDetailCard from './components/MyHealthDetailCard';
import HealthSummaryBox from './components/HealthSummaryBox';
import { useNavigate, useParams } from 'react-router-dom';

const data = {
  createDate: '2025-07-29',
  temp: '24',
  stress: '5',
  sleep: '5',
  symptom: '두통',
};

const MyHealthDetail = () => {
  const { id } = useParams(); //url에서 id 추출
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/myhealth/edit/${id}`);
  };

  const handleDelete = () => {
    alert('삭제하시겠습니까?');
    navigate(`/myhealth`);
  };
  return (
    <>
      <ContentHeader
        Title="나의 건강 데이터"
        Color="yellow"
        ButtonProps={[
          { Title: '수정하기', func: handleEdit },
          { Title: '삭제하기', func: handleDelete },
        ]}
      />
      <Wrapper>
        <DateRow>
          <Text>작성 날짜</Text>
          <Date>{data.createDate}</Date>
        </DateRow>
        <Content>
          <MyHealthDetailCard label="체온" value={`${data.temp} ℃`} />
          <MyHealthDetailCard label="스트레스 지수" value={data.stress} />
          <MyHealthDetailCard label="수면시간" value={`${data.sleep}시간`} />
          <MyHealthDetailCard label="증상" value={data.symptom || '없음'} />
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
