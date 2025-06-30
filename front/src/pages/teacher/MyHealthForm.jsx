import React, { useEffect, useState } from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import MyHealthInputCard from './components/MyHealthInputCard';
import useLoginStore from '../../store/loginStore';
import { memberHealthLogService } from '../../api/memberHealthLog';
import { toast } from 'react-toastify';

const MyHealthForm = () => {
  const { healthLogNo } = useParams();
  const isEdit = Boolean(healthLogNo);
  const navigate = useNavigate();
  const { member } = useLoginStore();

  const [form, setForm] = useState({
    temperature: '',
    stress: '',
    sleep: '',
    symptoms: '',
  });

  //수정 시 기존 데이터
  useEffect(() => {
    if (isEdit) {
      const fetchData = async () => {
        const result = await memberHealthLogService.getHealthLogDetail(healthLogNo);
        setForm({
          temperature: result.temperature,
          stress: result.stress,
          sleep: result.sleep,
          symptoms: result.symptoms,
        });
      };
      fetchData();
    }
  }, [isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (isEdit) {
        const mergedData = {
          healthLogNo: healthLogNo,
          memberNo: member.memberNo,
          temperature: form.temperature,
          stress: form.stress,
          sleep: form.sleep,
          symptoms: form.symptoms,
        };

        await memberHealthLogService.updateHealthLog(mergedData);
        toast.success('건강 정보가 수정되었습니다.');
      } else {
        await memberHealthLogService.createHealthLog({
          ...form,
          memberNo: member.memberNo,
        });
        toast.success('건강 정보가 저장되었습니다.');
      }
      navigate('/teacherhealth', { state: { refreshed: true } });
    } catch (error) {
      console.error('저장 실패:', error);
      toast.error('저장에 실패했습니다. 다시 시도해주세요.');
    }
  };
  return (
    <Content>
      <ContentHeader
        Title={isEdit ? '내 건강 정보 수정' : '내 건강 정보 작성'}
        Color="yellow"
        ButtonProps={[{ Title: '저장하기', func: handleSave }]}
      />
      <Wrapper>
        <Text>오늘의 건강 상태를 입력해주세요!</Text>
        <MyHealthInputCard
          text="체온을 입력해주세요."
          label="체온"
          name="temperature"
          value={form.temperature}
          unit="℃"
          onChange={handleChange}
        />
        <MyHealthInputCard
          text="현재 느끼는 스트레스의 지수를 선택해주세요."
          label="스트레스"
          name="stress"
          value={form.stress}
          onChange={handleChange}
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
          name="symptoms"
          value={form.symptoms}
          onChange={handleChange}
          longWidth="100%"
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
