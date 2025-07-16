import { useNavigate, useSearchParams } from 'react-router-dom';
import ContentHeader from '../../components/Common/ContentHeader';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import api from '../../api/axios';
import { toast } from 'react-toastify';

const PersonalLife = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [logs, setLogs] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 0,
    totalPage: 0,
    totalCount: 0,
    hasNext: false,
    hasPrevious: false,
  });
  const [loading, setLoading] = useState(true);
  const [child, setChild] = useState([]);

  const fetchChildDetail = async (page = 0) => {
    try {
      const response = await api.get(`http://localhost:8888/api/childs/activitylog?childNo=${id}&page=${page}`);

      setLogs(response.data.content);
      setPageInfo({
        currentPage: response.data.currentPage,
        totalPage: response.data.totalPage,
        totalCount: response.data.totalCount,
        hasNext: response.data.hasNext,
        hasPrevious: response.data.hasPrevious,
      });

      const response2 = await api.get(`http://localhost:8888/api/childs/get?child_no=${id}`);
      setChild(response2.data);
    } catch (error) {
      toast.error('아동 생활로그 불러오기 실패: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildDetail();
  }, [id]);

  // if (logs.length === 0) return <div>로딩중...</div>;

  return (
    <Container>
      <ContentHeader
        Title={'아동 생활 체크리스트'}
        Color={'orange'}
        ButtonProps={[{ Title: '뒤로가기', func: () => navigate(-1) }]}
      />
      <Name>{child.child_name || '아동 이름 없음'}</Name>

      <Table>
        <THead>
          <tr>
            <th>날짜</th>
            <th>식사</th>
            <th>낮잠시간</th>
            <th>놀이참여</th>
            <th>교우관계</th>
            <th>메모</th>
          </tr>
        </THead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6}>로딩중...</td>
            </tr>
          ) : logs.length > 0 ? (
            logs.map((item, index) => (
              <tr key={index}>
                <td>{dayjs(item.create_date).format('YYYY-MM-DD')}</td>
                <td>{item.dailyMeal_amount}</td>
                <td>{`${item.napStart_time?.substring(0, 5)} ~ ${item.napEnd_time?.substring(0, 5)}`}</td>
                <td>{item.play_participation}</td>
                <td>{item.daily_friendship}</td>
                <td>{item.activity_log_memo}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>생활 기록이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <PageDiv>
        {Array.from({ length: pageInfo.totalPage }, (_, i) => (
          <PageButton key={i} onClick={() => fetchChildDetail(i)} $active={pageInfo.currentPage === i}>
            {i + 1}
          </PageButton>
        ))}
      </PageDiv>
    </Container>
  );
};

export default PersonalLife;

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

  th {
    &:nth-child(1) {
      width: 17.05%;
    }
    &:nth-child(2) {
      width: 11.36%;
    }
    &:nth-child(3) {
      width: 14.77%;
    }
    &:nth-child(4) {
      width: 17.05%;
    }
    &:nth-child(5) {
      width: 17.05%;
    }
    &:nth-child(6) {
      width: 22.73%;
    }
  }

  th:first-child {
    border-top-left-radius: ${({ theme }) => theme.borderRadius.lg};
  }

  th:last-child {
    border-top-right-radius: ${({ theme }) => theme.borderRadius.lg};
  }
`;

const PageDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
`;

const PageButton = styled.button`
  padding: 6px 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ $active, theme }) => ($active ? theme.colors.orange : theme.colors.white)};
  color: ${({ $active, theme }) => ($active ? theme.colors.white : theme.colors.text)};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.base};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;
