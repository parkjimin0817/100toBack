import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import BoardEditor from '../components/Board/BoardEditor';
import ContentHeader from '../components/Common/ContentHeader';
import styled from 'styled-components';
import useLoginStore from '../store/loginStore';
import { boardService } from '../api/boards';
import axios from 'axios';
import { useBlockNavigation } from '../hook/useBlockNavigation';

const categoryName = {
  family_notice : "가정통신문",
  notice : "공지사항",
  note : "알림장",
  photo : "사진 게시판",
  meal_plan : "식단표",
  default : "테스트"
}

const BoardUpdatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const postData = location.state?.post || null;
  const category = location.state?.category || "default";

  const member = useLoginStore((state) => state.member);
/**
 * 페이지 최상위 컴포넌트에서 상태 관리
 */
  const [formState, setFormState] = useState({
    title: postData.title,
    type : postData.type, 
    classRoomNo: postData.classNo,
    file: null,
    memberName: member.memberName,
    memberId : member.memberNo,
    centerId : member.centerNo,
    contents: postData.boardContents,
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

    // ✅ 1. 제목 유효성 검사
    if (!formState.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    // ✅ 2. 반 선택 유효성 검사 (category가 반이 필요한 경우만)
    if ((category === 'family_notice' || category === 'note') && !formState.classRoomNo) {
      alert("반을 선택해주세요.");
      return;
    }

    // ✅ 3. 콘텐츠가 최소 1개 이상 있어야 함
    if (formState.contents.length === 0) {
      alert("내용을 최소 1개 이상 작성해주세요.");
      return;
    }

    // ✅ 4. 콘텐츠 내용 검증 (빈 텍스트 or 이미지 파일 없음 등)
    const hasInvalidBlock = formState.contents.some((item) => {
      if (item.type === "TEXT" && !item.contentText?.trim()) return true;
      if (item.type === "IMG" && !item.contentFile) return true;
      return false;
    });

    if (hasInvalidBlock) {
      alert("빈 텍스트 블록이나 이미지가 누락된 블록이 있습니다.");
      return;
    }

    // console.log("formState : ", formState);
    // console.log("responseData : ", postData);

    const formData = new FormData();

    // 📦 JSON으로 직렬화한 게시글 본문 데이터
    const payload = {
      title: formState.title,
      type: formState.type,
      classRoomId: formState.classRoomNo,
      centerId: formState.centerId,
      memberId: formState.memberId,
      contents: formState.contents.map((item, index) => ({
        contentId: item.boardContentNo || null,
        type: item.type,
        contentText: item.contentText || null,
        contentFile: item.contentFile?.name ? item.contentFile.name : item.contentFile,
        sortOrder: index,
      })),
    };

    // console.log("payload : ", payload);

    // 👉 JSON 문자열로 보내기
    formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }));

    // 📁 첨부된 메인 파일이 있다면
    if (formState.file) {
      formData.append('file', formState.file);
    }

    // 📁 contents 내부 이미지 파일들
    formState.contents.forEach((item) => {
      // console.log(postData.boardContents[index].contentFile);
      if (item.type === 'IMG') {
        formData.append(`contentFiles`, item.contentFile);
      }
    });

    // console.log("전송할 데이터:", formData);

    // axios 전송 예시
    await axios.put(`http://localhost:8888/api/boards/${postData.boardNo}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    allowNavigation();
    navigate(`/${category}/${postData.boardNo}`);
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
      type: "default", // or 'text' or 'image'
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
              ...(content.type === 'IMG'
                ? { contentFile: newData }
                : { contentText: newData }),
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
  }

  const deleteBlock = (id) => {
    setFormState((prev) => ({
      ...prev,
      contents: prev.contents.filter((content) => content.boardContentNo !== id),
    }));
  };

  return (
    <PageContainer 
      onSubmit={handleSubmit}
      onChange={() => setIsDirty(true)}
    >
      <ContentHeader
        Title={categoryName[category]}
        Color={'green'}
        ButtonProps={[
          { Title: '수정완료', type : "submit" },
          { Title: '뒤로가기', func: () => handleGoBack()},
        ]}
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
}

const PageContainer = styled.form`
  width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export default BoardUpdatePage;