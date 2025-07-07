import React from 'react'
import styled from 'styled-components';
import { FiDownload } from "react-icons/fi";
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * ? use Props
 * ! tableInfo {
 * !    color : 글자색
 * !    backgroundColor : 배경색
 * !    thFontSize : 컬럼 제목 폰트사이즈
 * !    tbFontSize : 컬럼 내용 폰트 사이즈
 * ! }
 * ! columns [{ 컬럼들에 대한 정보를 담은 배열
 * !    label : 컬럼 명
 * !    key : 데이터와 매칭할 때 사용하는 키
 * !    width ? : 컬럼의 너비 (px, auto 등등.)
 * !    align ? : 컬럼 텍스트 좌우 정렬
 * !    onclick ?: 컬럼을 클릭했을 때, 작동할 클릭 이벤트
 * ! }, ]
 * ! boardData {} : 실제 게시판 데이터
 * 
 */

const BoardTable = ({ tableInfo, columns, boardData }) => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL을 가져옴

  const formatDate = (isoDate) => {
    if (!isoDate) return '';

    const date = new Date(isoDate);

    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleRowClick = (boardNo) => {
    const currentPath = location.pathname;
    const basePath = currentPath.split('/')[1]; // "notice" 등
    navigate(`/${basePath}/${boardNo}`);
  };

  return (
    <>
    <BoardTableContainer>
      <BoardTHead 
        $fontSize={tableInfo?.thFontSize}
        $color={tableInfo?.color}
        $backgroundColor={tableInfo?.backgroundColor}
      >
        <tr>
          {columns.map(col => (
            <BoardTH 
              key={col.key}
              $width={col.width}
              $align={col.align}
            >{col.label}</BoardTH>
          ))}
        </tr>
      </BoardTHead>
      <BoardTBody
        $fontSize={tableInfo?.tbFontSize}
      >
        {boardData && boardData.map((row, rowIndex) => (
          <BoardTR 
            key={rowIndex}
            onClick={() => handleRowClick(row.boardNo)}
          >
            {columns.map((col) => (
              <BoardTD key={rowIndex + col.key}>
                {col.key === "attachment" ? <FiDownload /> : 
                  col.key === "createDate" ? formatDate(row[col.key]) : 
                  row[col.key]
                }
              </BoardTD>
            ))}
          </BoardTR>
        ))}
      </BoardTBody>
    </BoardTableContainer>
    {(boardData.length < 1) && (
      <div>작성된 게시글이 없습니다.</div>
    )}
    </>
  )
}

const BoardTableContainer = styled.table`
  width: 90%;
`;

const BoardTHead = styled.thead`
  color : ${({ $color }) => $color ? $color : ""};
  background-color : ${({ $backgroundColor }) => $backgroundColor ? $backgroundColor : ""};
  font-size: ${({ $fontSize }) => $fontSize ? $fontSize : ""};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  & th:first-child {
    border-top-left-radius: 10px;
  }

  & th:last-child {
    border-top-right-radius: 10px;
  }
`;

const BoardTH = styled.th`
  min-width : 30px;
  max-width : ${({ $width }) => $width ? $width : ""};
  text-align : ${({ $align }) => $align ? $align : ""};
  padding: 10px 5px;
`;

const BoardTBody = styled.tbody`
  font-size: ${({ $fontSize }) => $fontSize ? $fontSize : ""};
`;

const BoardTR = styled.tr`
  border-bottom: 1px solid #BFBFBF;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;

const BoardTD = styled.td`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 10px 5px;
`;

export default BoardTable;