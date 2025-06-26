import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import BoardEditor from '../components/Board/BoardEditor';
import ContentHeader from '../components/Common/ContentHeader';
import styled from 'styled-components';
import useLoginStore from '../store/loginStore';
import { boardService } from '../api/boards';
import axios from 'axios';

const categoryName = {
  family_notice : "가정통신문",
  notice : "공지사항",
  note : "알림장",
  album : "사진 게시판",
  foodmenu : "식단표",
  default : "테스트"
}

const BoardWritePage = () => {
  const location = useLocation();
  const category = location.state?.category || "default";

  const member = useLoginStore((state) => state.member);
/**
 * 페이지 최상위 컴포넌트에서 상태 관리
 */
  const [formState, setFormState] = useState({
    title: "",
    type : String(category).toUpperCase(),
    classRoomId: null,
    file: null,
    memberName: member.memberName,
    memberId : member.memberNo,
    centerId : member.centerNo,
    contents: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 입력 검증


    // console.log("전송할 데이터:", formState);

    // try {
    //   await boardService.createBoard(formState);
    //   alert("게시글 작성 성공");
    // } catch (error) {
    //   console.error("게시글 작성 실패 : ", error);
    //   alert("게시글 작성 실패");
    // }

    // 서버 전송 로직 작성 가능

    // const formData = new FormData();

    // const payload = {
    //   title: formState.title,
    //   type: formState.type,
    //   classRoomId: formState.classRoomId,
    //   centerId: formState.centerId,
    //   memberId: formState.memberId,
    //   contents: formState.contents.map((item, index) => ({
    //     type: item.type,
    //     contentText: item.contentText || null,
    //     contentFile: item.contentFile || null,
    //   }))
    // };

    // formData.append("data", new Blob([JSON.stringify(payload)], { type: "application/json" }));

    // if (formState.file) {
    //   formData.append("file", formState.file);
    // }

    const formData = new FormData();

    // 📦 JSON으로 직렬화한 게시글 본문 데이터
    const payload = {
      title: formState.title,
      type: formState.type,
      classRoomId: formState.classRoomId,
      centerId: formState.centerId,
      memberId: formState.memberId,
      contents: formState.contents.map((item, index) => ({
        type: item.type,
        contentText: item.contentText || null,
        contentFileKey: item.contentFile ? `contentFile_${index}` : null,
        sortOrder: index,
      })),
    };

    // 👉 JSON 문자열로 보내기
    formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }));

    // 📁 첨부된 메인 파일이 있다면
    if (formState.file) {
      formData.append('file', formState.file);
    }

    // 📁 contents 내부 이미지 파일들
    formState.contents.forEach((item) => {
      if (item.type === 'IMG' && item.contentFile) {
        formData.append(`contentFiles`, item.contentFile);
      }
    });

    console.log("전송할 데이터:", formData);

    // axios 전송 예시
    await axios.post("http://localhost:8888/api/boards", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const updateFormField = (key, value) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addBlock = () => {
    const newBlock = {
      id: Date.now(),
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
        content.id === id
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
        content.id === id
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
      contents: prev.contents.filter((content) => content.id !== id),
    }));
  };

  return (
    <PageContainer onSubmit={handleSubmit}>
      <ContentHeader
        Title={categoryName[category]}
        Color={'green'}
        ButtonProps={[
          { Title: '작성하기', func: () => alert('작성하기 페이지 이동~') },
          { Title: '뒤로가기', func: () => alert('돌아간다.')},
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

export default BoardWritePage;