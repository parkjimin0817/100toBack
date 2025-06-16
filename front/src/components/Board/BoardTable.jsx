import React from 'react'
import styled from 'styled-components';

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
  return (
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
          <BoardTR key={rowIndex}>
            {columns.map(col => (
              <BoardTD>
                {row[col.key]}
              </BoardTD>
            ))}
          </BoardTR>
        ))}
      </BoardTBody>
    </BoardTableContainer>
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
`;

const BoardTD = styled.td`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 10px 5px;
`;

export default BoardTable;