import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { IoMdDownload } from 'react-icons/io';
import { TiDocumentText } from 'react-icons/ti';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { boardService } from '../../../api/boards';

const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;

const TeacherDocumentList = ({ documents, onDelete, onViewed }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = documents.slice(startIndex, endIndex);
  const totalPages = Math.ceil(documents.length / itemsPerPage);

  const handlePreview = async (d) => {
    if (!d.fileUrl) return;
    const previewUrl = `${CLOUDFRONT_URL}/${d.fileUrl}`;
    const extension = d.fileUrl.split('.').pop().toLowerCase();
    const previewable = ['pdf', 'png', 'jpg', 'jpeg', 'gif'];

    try {
      await boardService.updateViewedDate(d.board_no);
      onViewed();
    } catch (error) {
      console.error('최근 열람 날짜 업데이트 실패:', error);
    }

    if (previewable.includes(extension)) {
      window.open(previewUrl, '_blank');
    } else {
      toast.info('해당 파일은 브라우저에서 미리보기를 지원하지 않습니다. 다운로드를 이용해주세요.');
    }
  };

  const handleDownload = async (d) => {
    if (!d.fileUrl) return;

    try {
      await boardService.updateViewedDate(d.board_no);
      onViewed();
    } catch (error) {
      console.error('최근 열람 날짜 업데이트 실패:', error);
    }
  };

  const handleDelete = async (d) => {
    if (!d.board_no) return;

    if (!window.confirm(`${d.title}을 정말 삭제하시겠습니까?`)) return;

    try {
      await boardService.boardDelete(d.board_no);
      toast.success('삭제 완료되었습니다.');
      onDelete();
    } catch (error) {
      toast.error('삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <Table>
        <Thead>
          <tr>
            <th>번호</th>
            <th>생성일</th>
            <th>제목</th>
            <th>미리보기</th>
            <th>다운로드</th>
            <th>삭제</th>
          </tr>
        </Thead>
        <tbody>
          {paginatedData.map((d, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{d.create_date.split('T')[0]}</td>
              <td>{d.title}</td>
              <td>
                <TiDocumentText size={20} onClick={() => handlePreview(d)} style={{ cursor: 'pointer' }} />
              </td>
              <td>
                <FileName onClick={() => handleDownload(d)}></FileName>
                <IoMdDownload size={20} onClick={() => handleDownload(d)} style={{ cursor: 'pointer' }} />
              </td>
              <td>
                <RiDeleteBin6Line size={20} onClick={() => handleDelete(d)} style={{ cursor: 'pointer' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {totalPages > 0 && (
        <Pagination>
          {Array.from({ length: totalPages }, (_, i) => (
            <PageButton key={i} $active={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </PageButton>
          ))}
        </Pagination>
      )}
    </>
  );
};

export default TeacherDocumentList;
const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  padding: 10px;

  th,
  td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid black;
    word-wrap: break-word;
  }

  tbody tr {
    &:hover {
      cursor: pointer;
      background-color: ${({ theme }) => theme.colors.gray[300]};
    }
  }

  th:nth-child(1),
  td:nth-child(1) {
    width: 10%;
  }
  th:nth-child(2),
  td:nth-child(2) {
    width: 20%;
  }
  th:nth-child(3),
  td:nth-child(3) {
    width: 30%;
  }
  th:nth-child(4),
  td:nth-child(4) {
    width: 8%;
  }
  th:nth-child(5),
  td:nth-child(5) {
    width: 8%;
  }
  th:nth-child(6),
  td:nth-child(6) {
    width: 8%;
  }
`;

const Thead = styled.thead`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
  font-size: ${({ $fontSize }) => ($fontSize ? $fontSize : '')};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  & th:first-child {
    border-top-left-radius: 10px;
  }

  & th:last-child {
    border-top-right-radius: 10px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  background-color: ${({ $active, theme }) => ($active ? theme.colors.blue : theme.colors.white)};
  color: ${({ $active, theme }) => ($active ? theme.colors.white : theme.colors.text)};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;

const FileName = styled.span`
  cursor: pointer;
  margin-right: ${({ theme }) => theme.spacing[1]};

  &:hover {
    text-decoration: underline;
  }
`;
