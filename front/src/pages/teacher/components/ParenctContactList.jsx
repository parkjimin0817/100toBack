import React from 'react';
import styled from 'styled-components';
import defaultImg from '../../../assets/defaultImg.png';
import { CiSquarePlus } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

const ParenctContactList = ({ selectedClass, searchKeyword, value, status }) => {
  const navigate = useNavigate();

  const handleClick = (childNo) => {
    navigate(`/child/detail/${childNo}`);
  };

  const filtered = value.filter((data) => {
    const matchedClass = selectedClass === '' || data.class_name === selectedClass;
    const matchedName = data.child_name.includes(searchKeyword);
    return matchedClass && matchedName;
  });

  console.log(filtered);

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
          {filtered.length !== 0 ? (
            filtered.map((data) => (
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
                  <div>{data.f_parent_name}(부): {data.f_parent_phone}</div>
                  <div>{data.m_parent_name}(모): {data.m_parent_phone}</div>
                </Dvitd>
              </Tr>
            ))
          ) : (
            <tr>
              <ErrorTd colSpan={5}>
                <ErrorTdDiv>
                  <BounceLoader color="#1A748E" />
                  <h1>{status}</h1>
                  {status === '연락처 불러오기 실패' ? (
                    <BackButton type="button" onClick={() => navigate(-1)}>
                      돌아가기
                    </BackButton>
                  ) : (
                    ''
                  )}
                </ErrorTdDiv>
              </ErrorTd>
            </tr>
          )}
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
  width: 100%;
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
  align-items: center;
  flex-direction: column;
  height: 90px;
  padding: ${({ theme }) => theme.spacing[3]};
  gap: ${({ theme }) => theme.spacing[3]};
`;

const Td = styled.td`
  height: 90px;
`;

const Img = styled.img`
  width: 50px;
  border-radius: 50px;
`;

const ErrorTd = styled.td`
  height: 300px;
`;

const ErrorTdDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
`;

const BackButton = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.lightblue};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
`;
