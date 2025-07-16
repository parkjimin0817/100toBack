import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardTable from '../components/Board/BoardTable';
import theme from '../styles/theme';
import ContentHeader from '../components/Common/ContentHeader';
import { useNavigate } from 'react-router-dom';
import { boardService } from '../api/boards';
import Pagination from '../components/Common/Pagenation';
import useLoginStore from '../store/loginStore';

const columns = [
  {
    label: '번호',
    key: 'boardNo',
    width: '100px',
    align: 'center',
  },
  {
    label: '파일',
    key: 'attachment',
    width: '120px',
  },
  {
    label: '작성자',
    key: 'memberName',
    width: '120px',
  },
  {
    label: '제목',
    key: 'title',
    width: '100%',
  },
  {
    label: '작성일',
    key: 'createDate',
    width: '160px',
  },
  {
    label: '조회수',
    key: 'views',
    width: '100px',
  },
];

const NoticePage = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1); // 1부터 시작
  const navigate = useNavigate();
  const member = useLoginStore((state) => state.member);

  const tableInfo = {
    color: theme.colors.white,
    backgroundColor: member.memberType === 'PARENT' ? theme.colors.purple : theme.colors.green,
    thFontSize: theme.fontSizes.lg,
    tbFontSize: theme.fontSizes.base,
  };

  useEffect(() => {
    const getPostList = async () => {
      try {
        const responseData = await boardService.typeBoardList('NOTICE', member.centerNo, page);
        console.log(responseData);
        setData(responseData);
        // alert("게시글 조회 성공");
      } catch (error) {
        console.error('게시글 조회 실패 : ', error);
        alert('게시글 조회 실패');
      }
    };
    getPostList();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <PageContainer>
      <ContentHeader
        Title={'공지사항'}
        Color={member.memberType === 'PARENT' ? 'purple' : 'green'}
        // 학부모는 못봄, 교사는 작성하기 못함, 시설장만 가능
        ButtonProps={
          member.memberType === 'PARENT'
            ? []
            : [
                {
                  Title: '작성하기',
                  func: () => {
                    navigate('/notice/write', { state: { category: 'notice' } });
                  },
                },
              ]
        }
      ></ContentHeader>
      <ContentDiv>
        {data && (
          <BoardContainer>
            <BoardTable tableInfo={tableInfo} columns={columns} boardData={data.content} />
          </BoardContainer>
        )}
        {data && (
          <Pagination
            currentPage={data.number + 1}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
            Color={member.memberType === 'PARENT' ? 'purple' : 'green'}
          />
        )}
      </ContentDiv>
    </PageContainer>
  );
};

const ContentDiv = styled.div`
  min-height: 530px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const PageContainer = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  width: 100%;
`;

export default NoticePage;
