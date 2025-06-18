import React from 'react';
import styled from 'styled-components';
import defaultImg from '../../../assets/defaultImg.png';
import { CiSquarePlus } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

const contactData = [
  { img: defaultImg, class: '햇님반', name: '박지민', phone: '010-1234-5678' },
  { img: defaultImg, class: '햇님반', name: '김승기', phone: '010-2222-3333' },
  { img: defaultImg, class: '달님반', name: '양동민', phone: '010-9999-8888' },
  { img: defaultImg, class: '햇님반', name: '정형일', phone: '010-1234-5678' },
  { img: defaultImg, class: '햇님반', name: '김승기', phone: '010-2222-3333' },
  { img: defaultImg, class: '달님반', name: '양동민', phone: '010-9999-8888' },
  { img: defaultImg, class: '햇님반', name: '정형일', phone: '010-1234-5678' },
  { img: defaultImg, class: '햇님반', name: '정의철', phone: '010-2222-3333' },
  { img: defaultImg, class: '달님반', name: '홍길동', phone: '010-9999-8888' },
  { img: defaultImg, class: '햇님반', name: '박길동', phone: '010-1234-5678' },
  { img: defaultImg, class: '햇님반', name: '김지수', phone: '010-2222-3333' },
  { img: defaultImg, class: '달님반', name: '똥쟁이', phone: '010-9999-8888' },
];

const ParenctContactList = ({ selectedClass, searchKeyword }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    //아동 id 추가해야함
    navigate('/child/detail');
  };
  const filtered = contactData.filter((data) => {
    const matchedClass = selectedClass === '' || data.class === selectedClass;
    const matchedName = data.name.includes(searchKeyword);
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
          {filtered.map((data, index) => (
            <Tr key={index}>
              <Td>
                <Img src={data.img} />
              </Td>
              <Td>{data.name}</Td>
              <Td>{data.class}</Td>
              <Td>
                <CiSquarePlus size={30} style={{ cursor: 'pointer' }} onClick={() => handleClick()} />
                {/*여기 누르면 아동 상세보기 페이지로 이동하게 하기 */}
              </Td>
              <Td>{data.phone}</Td>
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
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  min-width: 600px;
`;

const Th = styled.th`
  padding: 12px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: bold;
  text-align: center;
`;

const Tr = styled.tr`
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[200]};
  }
`;

const Td = styled.td`
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  text-align: center;
`;

const Img = styled.img`
  width: 50px;
  border-radius: 50px;
`;
