import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BoardEditor from '../components/Board/BoardEditor';
import ContentHeader from '../components/Common/ContentHeader';
import styled from 'styled-components';
import useLoginStore from '../store/loginStore';
import { boardService } from '../api/boards';
import { useBlockNavigation } from '../hook/useBlockNavigation';
import { getPresignedUrl, uploadFileToS3 } from '../api/fileApi';

const categoryName = {
  family_notice: '가정통신문',
  notice: '공지사항',
  note: '알림장',
  photo: '사진 게시판',
  meal_plan: '식단표',
  default: '테스트',
};

const BoardWritePage = () => {
  const location = useLocation();
  const category = location.state?.category || 'default';
  const navigate = useNavigate();
  const member = useLoginStore((state) => state.member);
  /**
   * 페이지 최상위 컴포넌트에서 상태 관리
   */
  const [formState, setFormState] = useState({
    title: '',
    type: String(category).toUpperCase(),
    classRoomNo: member?.classNo || null,
    attachment: null,
    memberName: member.memberName,
    memberId: member.memberNo,
    centerId: member.centerNo,
    contents: [],
  });

  /**
   * 수정중 페이지 이동 감지시 경고창 띄움.
   */
  const [isDirty, setIsDirty] = useState(false); // 내용 변경 여부

  const { allowNavigation } = useBlockNavigation({
    when: isDirty,
    message: '작성 중인 내용이 저장되지 않았습니다. 정말 이동하시겠습니까?',
  });

  const handleGoBack = () => {
    if (!isDirty || window.confirm('작성 중인 내용이 저장되지 않았습니다. 정말 이동하시겠습니까?')) {
      navigate(-1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 입력 검증

    // ✅ 1. 제목 유효성 검사
    if (!formState.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    // ✅ 2. 반 선택 유효성 검사 (category가 반이 필요한 경우만)
    if (category === 'note' && !formState.classRoomNo) {
      alert('반을 선택해주세요.');
      return;
    }
  };

  const updateFormField = (key, value) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addBlock = () => {
    const newBlock = {
      boardContentNo: Date.now(),
      type: 'default', // or 'text' or 'image'
    };
    setFormState((prev) => ({
      ...prev,
      contents: [...prev.contents, newBlock],
    }));
  };

  const updateBlock = (id, newData) => {
    setFormState((prev) => ({
      ...prev,
      contents: prev.contents.map((content) =>
        content.boardContentNo === id
          ? {
              ...content,
              ...(content.type === 'IMG' ? { contentFile: newData } : { contentText: newData }),
            }
          : content
      ),
    }));
  };

  const selectBlock = (type, id) => {
    setFormState((prev) => ({
      ...prev,
      contents: prev.contents.map((content) =>
        content.boardContentNo === id
          ? {
              ...content,
              type: type,
              ...(type === 'IMG' ? { contentFile: '' } : { contentText: '' }),
            }
          : content
      ),
    }));
  };

  const deleteBlock = (id) => {
    setFormState((prev) => ({
      ...prev,
      contents: prev.contents.filter((content) => content.boardContentNo !== id),
    }));
  };

  // 게시판 종류에 따라 초기 블록 추가.
  useEffect(() => {
    if (category === 'photo' || category === 'meal_plan') {
      const newBlock = {
        boardContentNo: Date.now(),
        type: 'IMG',
        contentFile: '',
      };
      setFormState((prev) => ({
        ...prev,
        contents: [...prev.contents, newBlock],
      }));
    } else {
      const newBlock = {
        boardContentNo: Date.now(),
        type: 'TEXT',
        contentText: '',
      };
      setFormState((prev) => ({
        ...prev,
        contents: [...prev.contents, newBlock],
      }));
    }
  }, []);

  return (
    <PageContainer onSubmit={handleSubmit} onChange={() => setIsDirty(true)}>
      <ContentHeader
        Title={categoryName[category]}
        Color={member.memberType === 'PARENT' ? 'purple' : 'green'}
        ButtonProps={[{ Title: '작성하기', type: 'submit' }, { Title: '뒤로가기', func: () => handleGoBack() }, ,]}
      ></ContentHeader>

      {/* 공통 에디터 컴포넌트 */}
      <BoardEditor
        category={category}
        formState={formState}
        updateFormField={updateFormField}
        updateBlock={updateBlock}
        addBlock={addBlock}
        selectBlock={selectBlock}
        deleteBlock={deleteBlock}
      />
    </PageContainer>
  );
};

const PageContainer = styled.form`
  width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export default BoardWritePage;
