import { useNavigate, useSearchParams } from 'react-router-dom';
import ContentHeader from '../../components/Common/ContentHeader';
import styled from 'styled-components';
import { List } from '../../components/ChildDummyData'; // ✅ named import → 정상 작동
import { useEffect, useState } from 'react';

const PersonalHealth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [child, setChild] = useState(null);

  useEffect(() => {
    const found = List.find((item) => item.id === parseInt(id));
    if (found) setChild(found);
  }, [id]);

  if (!child) return <div>로딩중...</div>;

  return (
    <Container>
      <ContentHeader
        Title={'아동 건강 체크리스트'}
        Color={'orange'}
        ButtonProps={[{ Title: '뒤로가기', func: () => navigate(-1) }]}
      />
      <Name>{child.name}</Name>
      <Table>
        <thead>
          <tr>
            <th>날짜</th>
            <th>체온</th>
            <th>키</th>
            <th>몸무게</th>
            <th>증상</th>
            <th>메모</th>
          </tr>
        </thead>
        <tbody>
          {[...child.healthRecords]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.temp}</td>
                <td>{item.height}</td>
                <td>{item.weight}</td>
                <td>{item.symptom}</td>
                <td>{item.memo}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PersonalHealth;

const Container = styled.div`
  width: 100%;
  min-height: 840px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Name = styled.div`
  text-align: center;
  padding-top: 30px;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Table = styled.table`
  width: 90%;
  margin: 30px auto;
  border-collapse: collapse;
  font-size: 15px;

  th,
  td {
    border-bottom: 1px solid ${({ theme }) => theme.colors.black};
    padding: 10px;
    text-align: center;
  }

  th {
    font-weight: bold;
  }
`;
