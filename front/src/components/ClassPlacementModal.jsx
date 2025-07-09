import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import api from '../api/axios';

const ClassPlacementModal = ({ isOpen, onClose, selectedDate, selectedItem, centerNo, onRefresh }) => {
  const [person, setPerson] = useState(null);
  const [classOptions, setClassOptions] = useState([]);
  const [selectedClass, setSelectedClass] = useState(0);

  const { id, role } = selectedItem || {};

  useEffect(() => {
    if (!isOpen || !id || !role) return;

    const fetchData = async () => {
      try {
        let res;
        if (role === 'child') {
          res = await api.get(`http://localhost:8888/api/childs/get`, {
            params: { child_no: id },
          });
        } else if (role === 'teacher') {
          res = await api.get(`http://localhost:8888/api/members/get`, {
            params: { member_no: id },
          });
        }

        const personData = res?.data;
        setPerson(personData);

        const classListRes = await api.get(`http://localhost:8888/api/classroom/list/${centerNo}`);
        const classList = classListRes?.data?.map((cls) => cls.class_name);
        setClassOptions(classListRes.data);

        // 🔥 className이 있는 경우만 selectedClass로 지정
        if (personData?.class_name) {
          const matched = classListRes.data.find((cls) => cls.class_name === personData.class_name);
          if (matched) {
            setSelectedClass(matched.class_no); // ✅ 정확한 반 번호로 설정
          } else {
            setSelectedClass(0); // 미배정
          }
        } else {
          setSelectedClass(0); // 미배정
        }
      } catch (err) {
        console.error('모달 데이터 로드 실패:', err);
      }
    };

    fetchData();
  }, [isOpen, id, role, centerNo]);

  const handleSubmit = async () => {
    try {
      const endpoint =
        role === 'child'
          ? `http://localhost:8888/api/childs/updateclass`
          : `http://localhost:8888/api/members/updateclass`;

      await api.patch(endpoint, null, {
        params:
          role === 'child' ? { child_no: id, class_no: selectedClass } : { member_no: id, class_no: selectedClass },
      });

      toast.success('반 배정이 성공적으로 완료되었습니다.');
      onClose();
      onRefresh?.();
    } catch (err) {
      toast.error('반 배정에 실패하였습니다.') + err;
    }
  };

  if (!isOpen || !person) return null;

  return (
    <Backdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Span>반 배정</Span>
        </ModalHeader>
        <ModalContent>
          <ModalDate>
            <Span>날짜 :</Span>
            <P>{selectedDate}</P>
          </ModalDate>
          <ModalMain>
            <ColumnLine>
              <Column>반</Column>
              <Column>이름</Column>
              <Column>가입일</Column>
              <Column>직위</Column>
            </ColumnLine>
            <ResultLine style={{ gap: '38px' }}>
              <Result>
                <Dropdown value={selectedClass} onChange={(e) => setSelectedClass(Number(e.target.value))}>
                  <option value={0}>미배정</option>
                  {classOptions.map((cls) => (
                    <option key={cls.class_no} value={cls.class_no}>
                      {cls.class_name}
                    </option>
                  ))}
                </Dropdown>
              </Result>
              <Result>{person.child_name || person.member_name || '이름 없음'}</Result>
              <Result>{person.create_date?.substring(0, 10)}</Result>
              <Result>{role === 'child' ? '아동' : role === 'teacher' ? '교사' : '직위 없음'}</Result>
            </ResultLine>
          </ModalMain>
        </ModalContent>
        <ModalFooter>
          <Button className="add" onClick={handleSubmit}>
            등록
          </Button>
          <Button onClick={onClose}>닫기</Button>
        </ModalFooter>
      </ModalContainer>
    </Backdrop>
  );
};

export default ClassPlacementModal;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndices.modal};
`;

const Span = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const P = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 30%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  span {
    margin: ${({ theme }) => theme.spacing[4]} 0;
    padding: 0 ${({ theme }) => theme.spacing[6]};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const ModalContent = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.black};
  padding: 0 ${({ theme }) => theme.spacing[4]};
  span {
    margin: ${({ theme }) => theme.spacing[2]} 0;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;

const ModalDate = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  top: 0;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  width: 100%;
  height: 10%;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const ModalMain = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 90%;
  padding: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.black};
  padding-left: 100px;
`;

const ColumnLine = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  gap: ${({ theme }) => theme.spacing[10]};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResultLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  gap: ${({ theme }) => theme.spacing[10]};
  margin-left: ${({ theme }) => theme.spacing[10]};
`;

const Result = styled.div`
  display: flex;
  flex-direction: column;
`;

const Dropdown = styled.select`
  width: 200px;
  height: 36px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  padding: 4px 8px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  height: 10%;
  padding: ${({ theme }) => theme.spacing[2]};
  background-color: ${({ theme }) => theme.colors.gray[100]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[300]};
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Button = styled.button`
  border: none;
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.gray[400]};
  &.add {
    background: ${({ theme }) => theme.colors.green};
  }

  &.edit {
    background: ${({ theme }) => theme.colors.orange};
  }
`;
