import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../api/axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CiCalendar } from 'react-icons/ci';
import { toast } from 'react-toastify';

const CouncelListTable = ({ data, memberType, onRefresh, memberNo }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [counselData, setCounselData] = useState([]);

  useEffect(() => {
    const fetchCounselForParent = async () => {
      if (memberType === 'PARENT' && memberNo) {
        try {
          const res = await api.get(`http://localhost:8888/api/counsel/parent`, {
            params: { memberNo },
          });

          const convertedData = res.data.map((item) => ({
            name: item.child_name,
            type: item.counsel_type,
            time:
              item.counsel_start && item.counsel_end
                ? `${item.counsel_start.slice(0, 5)} ~ ${item.counsel_end.slice(0, 5)}`
                : '시간 없음',
            date: item.counsel_date,
            status: item.counsel_status,
            counselNo: item.counsel_no,
          }));

          setCounselData(convertedData);
        } catch (err) {
          toast.error('상담 내역 불러오기 실패');
        }
      }
    };

    fetchCounselForParent();
  }, [memberType, memberNo]);

  const handleEditClick = (index, item) => {
    setEditIndex(index);
    setEditedData({ ...item });
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedData({});
  };

  const handleDelete = async (counselNo) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await api.delete(`http://localhost:8888/api/counsel/delete`, {
        params: { counselNo },
      });
      onRefresh();
      toast.success('삭제가 완료되었습니다.');
    } catch (err) {
      toast.error('삭제 실패');
    }
  };

  const handleSave = async (counselNo) => {
    const [startTime = '', endTime = ''] = (editedData.time || '').split(' ~ ');
    if (startTime >= endTime) {
      toast.error('상담 시간을 다시 확인해주세요');
      return;
    }

    const payload = {
      counsel_type: editedData.type,
      counsel_status: editedData.status,
      counsel_date: new Date(editedData.date),
      counsel_start: startTime,
      counsel_end: endTime,
    };

    try {
      await api.patch(`http://localhost:8888/api/counsel/update`, payload, {
        params: { counselNo },
      });
      toast.success('수정이 완료되었습니다.');
      setEditIndex(null);
      setEditedData({});
      if (typeof onRefresh === 'function') onRefresh();
    } catch (err) {
      toast.error('수정 실패: 네트워크 또는 서버 오류', err);
    }
  };

  const handleChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const list = memberType === 'PARENT' ? counselData : data;

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <th>이름</th>
            <th>상담 형태</th>
            <th>상담 시간</th>
            <th>상담 날짜</th>
            <th>상담 상태</th>
            {memberType !== 'PARENT' && <th>상태 변경</th>}
          </tr>
        </thead>
        <tbody>
          {list.map((item, idx) => {
            const [start = '', end = ''] = (item.time || '').split(' ~ ');
            return (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>
                  {editIndex === idx ? (
                    <select value={editedData.type} onChange={(e) => handleChange('type', e.target.value)}>
                      <option value="CHAT">비대면</option>
                      <option value="FTOF">대면</option>
                    </select>
                  ) : item.type === 'CHAT' ? (
                    '비대면'
                  ) : (
                    '대면'
                  )}
                </td>
                <td>
                  {editIndex === idx ? (
                    <>
                      <input
                        type="time"
                        value={editedData.time?.split(' ~ ')[0] || ''}
                        onChange={(e) =>
                          handleChange('time', `${e.target.value} ~ ${editedData.time?.split(' ~ ')[1] || ''}`)
                        }
                      />
                      ~
                      <input
                        type="time"
                        value={editedData.time?.split(' ~ ')[1] || ''}
                        onChange={(e) =>
                          handleChange('time', `${editedData.time?.split(' ~ ')[0] || ''} ~ ${e.target.value}`)
                        }
                      />
                    </>
                  ) : item.time ? (
                    `${start.slice(0, 5)} ~ ${end.slice(0, 5)}`
                  ) : (
                    '시간 없음'
                  )}
                </td>
                <td>
                  {editIndex === idx ? (
                    <DateInputWrapper>
                      <StyledDatePicker
                        selected={new Date(editedData.date)}
                        onChange={(date) => handleChange('date', date.toISOString().split('T')[0])}
                        dateFormat="yyyy-MM-dd"
                      />
                      <CalendarIcon />
                    </DateInputWrapper>
                  ) : (
                    item.date
                  )}
                </td>
                <td>
                  {editIndex === idx ? (
                    <select value={editedData.status} onChange={(e) => handleChange('status', e.target.value)}>
                      <option value="PENDING">상담대기</option>
                      <option value="COMPLETED">상담완료</option>
                    </select>
                  ) : item.status === 'PENDING' ? (
                    '상담대기'
                  ) : (
                    '상담완료'
                  )}
                </td>
                {memberType !== 'PARENT' && (
                  <td>
                    {editIndex === idx ? (
                      <>
                        <Button className="update" onClick={() => handleSave(item.counselNo)}>
                          등록하기
                        </Button>
                        <Button onClick={handleCancel}>취소</Button>
                      </>
                    ) : (
                      <>
                        <Button className="update" onClick={() => handleEditClick(idx, item)}>
                          수정
                        </Button>
                        <Button onClick={() => handleDelete(item.counselNo)}>삭제</Button>
                      </>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

export default CouncelListTable;

const TableWrapper = styled.div`
  width: 100%;
  padding: 10px;
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.black};
    word-wrap: break-word;
  }

  th:nth-child(1),
  td:nth-child(1) {
    width: 10%;
  }
  th:nth-child(2),
  td:nth-child(2) {
    width: 10%;
  }
  th:nth-child(3),
  td:nth-child(3) {
    width: 30%;
  }
  th:nth-child(4),
  td:nth-child(4) {
    width: 17%;
  }
  th:nth-child(5),
  td:nth-child(5) {
    width: 12%;
  }
  th:nth-child(6),
  td:nth-child(6) {
    width: 16%;
    text-align: left;
  }
`;

const Button = styled.button`
  margin: ${({ theme }) => theme.spacing[1]};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[3]};
  background: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  cursor: pointer;

  &.update {
    background: ${({ theme }) => theme.colors.green};
  }
`;

const DateInputWrapper = styled.div`
  position: relative;
  width: 130px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 30px;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  padding-right: 36px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const CalendarIcon = styled(CiCalendar)`
  position: absolute;
  right: ${({ theme }) => theme.spacing[4]};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.gray[500]};
  pointer-events: none;
`;
