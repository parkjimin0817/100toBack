import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { memberHealthLogService } from '../../../api/memberHealthLog';
import useLoginStore from '../../../store/loginStore';

const MyHealthList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { member } = useLoginStore();
  const [data, setData] = useState([]);

  const targetMemberNo = location.state?.teacherNo || member.memberNo;

  const fetchData = async () => {
    try {
      const result = await memberHealthLogService.getHealthLogList(targetMemberNo);
      setData(result.reverse());
    } catch (error) {
      console.error('건강 기록 조회 실패:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [targetMemberNo]);

  const handleClick = (healthLogNo) => {
    navigate(`/myhealth/${healthLogNo}`);
  };

  return (
    <Wrapper>
      <Table>
        <thead>
          <tr>
            <th>번호</th>
            <th>등록자</th>
            <th>증상</th>
            <th>생성날짜</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.health_log_no} onClick={() => handleClick(item.health_log_no)}>
              <td>{data.length - index}</td>
              <td>{item.member_name}</td>
              <td>{item.symptoms ? item.symptoms : '증상 없음'}</td>
              <td>{item.create_date.split('T')[0]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default MyHealthList;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const Table = styled.table`
  width: 90%;
  margin-top: px;
  margin: 0 auto;
  table-layout: fixed;
  border-collapse: collapse;
  border-spacing: 0;
  overflow: hidden;

  thead {
    background-color: ${({ theme }) => theme.colors.yellow};
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    color: ${({ theme }) => theme.colors.white};
  }

  thead tr:first-child th:first-child {
    border-top-left-radius: 10px;
  }

  thead tr:first-child th:last-child {
    border-top-right-radius: 10px;
  }

  tr:hover {
    /* background-color: ${({ theme }) => theme.colors.gray[200]}; */
    cursor: pointer;
  }

  th,
  td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid black;
    word-wrap: break-word;
  }

  thead th {
    border-bottom: none;
  }
  th:nth-child(1),
  td:nth-child(1) {
    width: 10%;
  }
  th:nth-child(2),
  td:nth-child(2) {
    width: 30%;
  }
  th:nth-child(3),
  td:nth-child(3) {
    width: 30%;
  }
  th:nth-child(4),
  td:nth-child(4) {
    width: 20%;
  }
`;
