import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ContentHeader from '../components/Common/ContentHeader';
import ImagePost from '../components/Board/ImagePost';
import { boardService } from '../api/boards';
import Pagination from '../components/Common/Pagenation';
import useLoginStore from '../store/loginStore';
import { toast } from 'react-toastify';

const MealPlanPage = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1); // 1부터 시작
  const navigate = useNavigate();
  const member = useLoginStore((state) => state.member);

  useEffect(() => {
    const getPostList = async () => {
      try {
        const responseData = await boardService.typeBoardList('MEAL_PLAN', member.centerNo, page);
        setData(responseData);
        // alert("게시글 조회 성공");
      } catch (error) {
        toast.error('게시글 조회 실패 : ', error);
        alert('게시글 조회 실패');
      }
    };
    getPostList();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleClick = (boardNo) => {
    const currentPath = location.pathname;
    const basePath = currentPath.split('/')[1]; // "notice" 등
    navigate(`/${basePath}/${boardNo}`);
  };

  return (
    <PageContainer>
      <ContentHeader
        Title={'식단표 게시판'}
        Color={member.memberType === 'PARENT' ? 'purple' : 'green'}
        // 교사면 버튼 추가, 학부모면 없음.
        ButtonProps={
          member.memberType === 'PARENT'
            ? []
            : [
                {
                  Title: '작성하기',
                  func: () => {
                    navigate('/meal_plan/write', { state: { category: 'meal_plan' } });
                  },
                },
              ]
        }
      ></ContentHeader>
      {data && (
        <BoardContainer>
          {data.content.length > 0 ? (
            data.content.map((post, index) => (
              <ImagePost onClick={() => handleClick(post.boardNo)} postData={post} key={index}></ImagePost>
            ))
          ) : (
            <div>등록된 게시글이 없습니다.</div>
          )}
        </BoardContainer>
      )}
      {data && (
        <Pagination currentPage={data.number + 1} totalPages={data.totalPages} onPageChange={handlePageChange} />
      )}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const BoardContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 50px;
  flex-wrap: wrap;
  margin-left: 50px;
  margin-right: 50px;
  gap: 20px;
`;

export default MealPlanPage;
