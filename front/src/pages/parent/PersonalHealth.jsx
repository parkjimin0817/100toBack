import { useNavigate, useSearchParams } from 'react-router-dom';
import ContentHeader from '../../components/Common/ContentHeader';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const PersonalHealth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [child, setChild] = useState([]);

  useEffect(() => {
    const fetchChildDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/api/childs/healthlog?childNo=${id}`);
        setLogs(response.data);

        const response2 = await axios.get(`http://localhost:8888/api/childs/get?child_no=${id}`);
        setChild(response2.data);
      } catch (error) {
        console.error('아동 건강로그 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChildDetail();
  }, [id]);

  return (
    <Container>
      <ContentHeader
        Title={'아동 건강 체크리스트'}
        Color={'orange'}
        ButtonProps={[{ Title: '뒤로가기', func: () => navigate(-1) }]}
      />
      <Name>{child?.child_name || '아동 이름 없음'}</Name>
      <Table>
        <THead>
          <tr>
            <th>날짜</th>
            <th>체온</th>
            <th>키</th>
            <th>몸무게</th>
            <th>증상</th>
            <th>메모</th>
          </tr>
        </THead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6}>로딩중...</td>
            </tr>
          ) : logs.length > 0 ? (
            [...logs]
              .sort((a, b) => new Date(b.create_date) - new Date(a.create_date))
              .map((item, index) => (
                <tr key={index}>
                  <td>{dayjs(item.create_date).format('YYYY-MM-DD')}</td>
                  <td>{item.temperature}</td>
                  <td>{item.height}</td>
                  <td>{item.weight}</td>
                  <td>{item.symptoms}</td>
                  <td>{item.healthLogMemo}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={6}>건강 기록이 없습니다.</td>
            </tr>
          )}
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
  border-spacing: 0;
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

const THead = styled.thead`
  background: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.white};

  th:first-child {
    border-top-left-radius: ${({ theme }) => theme.borderRadius.lg};
  }

  th:last-child {
    border-top-right-radius: ${({ theme }) => theme.borderRadius.lg};
  }
`;
