import React, { useEffect, useState } from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import MyHealthInputCard from './components/MyHealthInputCard';

const prevData = {
  temp: '36.5',
  stress: '6',
  sleep: '7',
  symptom: '두통',
};

const MyHealthForm = () => {
  const { id } = useParams(); //수정이면 id가 있음
  const isEdit = Boolean(id); //id가 있으면 isEdit : true
  const navigate = useNavigate();

  const [form, setForm] = useState({
    temp: '',
    stress: '',
    sleep: '',
    symptom: '',
  });

  //수정 시 기존 데이터
  useEffect(() => {
    if (isEdit) {
      setForm(prevData);
    }
  }, [isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (isEdit) {
      console.log('수정요청', form);
    } else {
      console.log('저장요청', form);
    }
    navigate('/myhealth');
  };
  return (
    <Content>
      <ContentHeader
        Title={isEdit ? '내 건강 정보 수정' : '내 건강 정보 작성'}
        Color="yellow"
        ButtonProps={[{ Title: isEdit ? '수정하기' : '저장하기', func: handleSave }]}
      />
      <Wrapper>
        <Text>오늘의 건강 상태를 입력해주세요!</Text>
        <MyHealthInputCard
          text="체온을 입력해주세요."
          label="체온"
          name="temp"
          value={form.temp}
          unit="℃"
          onChange={handleChange}
        />
        <MyHealthInputCard
          text="현재 느끼는 스트레스의 지수를 선택해주세요."
          label="스트레스"
          name="stress"
          value={form.stress}
          onChange={handleChange}
          type="number"
        />
        <MyHealthInputCard
          text="오늘은 몇시간 주무셨나요?"
          label="수면시간"
          name="sleep"
          value={form.sleep}
          unit="시간"
          onChange={handleChange}
          type="number"
        />
        <MyHealthInputCard
          text="오늘 아프거나 불편한 곳이 있나요?"
          label="증상"
          name="symptom"
          value={form.symptom}
          onChange={handleChange}
        />
      </Wrapper>
    </Content>
  );
};

export default MyHealthForm;

const Content = styled.div`
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px auto;
  width: 80%;
  height: 600px;
`;

const Text = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin: 10px 0;
`;
