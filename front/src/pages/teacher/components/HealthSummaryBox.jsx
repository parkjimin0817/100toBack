import React from 'react';
import styled from 'styled-components';

const HealthSummaryBox = ({ data }) => {
  const generateSummary = (data) => {
    const result = [];
    const temp = parseFloat(data.temp);
    if (temp >= 36 && temp <= 37.5) {
      result.push(`정상 체온입니다. (${temp}℃)`);
    } else if (temp > 37.5) {
      result.push(`체온이 높습니다. (${temp}℃) `);
    } else {
      result.push(`체온이 낮습니다. (${temp}℃)`);
    }

    if (data.stress >= 9) {
      result.push('스트레스가 매우 높은 상태예요. 깊은 호흡과 휴식이 필요합니다.');
    } else if (data.stress >= 7) {
      result.push('스트레스 지수가 높습니다. 잠시 쉬어가세요.');
    } else if (data.stress >= 4) {
      result.push('스트레스를 잘 관리하고 계시네요! 화이팅입니다!');
    } else {
      result.push('스트레스 거의 없네요! 오늘도 평화롭게 💆');
    }

    const sleep = Number(data.sleep);

    if (sleep >= 10) {
      result.push(`너무 오래 주무셨어요. (${sleep}시간) 몸이 더 피곤할 수 있어요.`);
    } else if (sleep >= 7) {
      result.push(`충분히 주무셨네요! (${sleep}시간) 좋은 하루가 예상돼요 :)`);
    } else if (sleep >= 5) {
      result.push(`수면시간이 ${sleep}시간이에요. 오늘은 일찍 잡시다.`);
    } else {
      result.push(`수면이 많이 부족해요. (${sleep}시간) 건강에 무리가 갈 수 있어요!`);
    }

    result.push(data.symptom ? `현재 증상 : ${data.symptom}` : '오늘 아프신 곳은 없으시네요. 잘 관리되고 있습니다.');

    return result;
  };

  const summaryList = generateSummary(data);

  return (
    <Wrapper>
      <Title>오늘의 건강 요약</Title>
      <Content>
        {summaryList.map((line, index) => (
          <Row key={index}>{line}</Row>
        ))}
      </Content>
    </Wrapper>
  );
};

export default HealthSummaryBox;

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 20px 0;
  border: 1px solid black;
  border-radius: 10px;
  height: 200px;
`;

const Title = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Content = styled.div`
  width: 100%;
`;

const Row = styled.div`
  width: 100%;
  margin: 10px;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
