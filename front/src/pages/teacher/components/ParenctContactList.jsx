import React from 'react';
import styled from 'styled-components';
import defaultImg from '../../../assets/defaultImg.png';
import { CiSquarePlus } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

const ParenctContactList = ({ selectedClass, searchKeyword, value }) => {
  const navigate = useNavigate();

  const handleClick = (childNo) => {
    navigate(`/child/detail/${childNo}`);
  };

  const filtered = value.filter((data) => {
    const matchedClass = selectedClass === '' || data.class_name === selectedClass;
    const matchedName = data.child_name.includes(searchKeyword);
    return matchedClass && matchedName;
  });

  return (
    <Wrapper>
      <Table>
        <thead>
          <tr>
            <Th>아동 사진</Th>
            <Th>아동 이름</Th>
            <Th>반</Th>
            <Th>상세보기</Th>
            <Th>학부모 전화번호</Th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((data) => (
            <Tr key={data.child_no}>
              <Td>
                <Img src={defaultImg} />
              </Td>
              <Td>{data.child_name}</Td>
              <Td>{data.class_name === null ? '선택된 반이 없습니다.' : data.class_name}</Td>
              <Td>
                <CiSquarePlus size={30} style={{ cursor: 'pointer' }} onClick={() => handleClick(data.child_no)} />
                {/*여기 누르면 아동 상세보기 페이지로 이동하게 하기 */}
              </Td>
              <Dvitd>
                <div>아버지: {data.f_parent_phone}</div>
                <div>어머니: {data.m_parent_phone}</div>
              </Dvitd>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default ParenctContactList;

const Wrapper = styled.div`
  width: 90%;
  height: 450px;
  margin: 0 auto;
  border-radius: 10px;
  overflow: auto;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Table = styled.table`
  border-collapse: collapse;
  table-layout: fixed;
  min-width: 600px;
`;

const Th = styled.th`
  padding: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;
`;

const Tr = styled.tr`
  letter-spacing: 2px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[200]};
  }
`;

const Dvitd = styled.td`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  white-space: nowrap;
  height: 90px;
  padding: 10px;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const Td = styled.td`
  height: 90px;
`;

const Img = styled.img`
  width: 50px;
  border-radius: 50px;
`;
