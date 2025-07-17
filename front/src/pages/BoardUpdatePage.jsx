import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BoardEditor from '../components/Board/BoardEditor';
import ContentHeader from '../components/Common/ContentHeader';
import styled from 'styled-components';
import useLoginStore from '../store/loginStore';
import { boardService } from '../api/boards';
import { useBlockNavigation } from '../hook/useBlockNavigation';
import api from '../api/axios';
import { getPresignedUrl, uploadFileToS3 } from '../api/fileApi';
import { toast } from 'react-toastify';

const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;

const categoryName = {
  family_notice: '가정통신문',
  notice: '공지사항',
  note: '알림장',
  photo: '사진 게시판',
  meal_plan: '식단표',
  default: '테스트',
};

const BoardUpdatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const postData = location.state?.post || null;
  const category = location.state?.category || 'default';

  const member = useLoginStore((state) => state.member);
  /**
   * 페이지 최상위 컴포넌트에서 상태 관리
   */

  const [formState, setFormState] = useState({
    title: postData.title,
    type: postData.type,
    classRoomNo: postData.classNo,
    attachment: postData.attachment,
    memberName: member.memberName,
    memberId: member.memberNo,
    centerId: member.centerNo,
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

  const isPrefixed = (path) => {
    return typeof path === 'string' && path.startsWith(CLOUDFRONT_URL);
  };
  const removePrefix = (path) => {
    if (isPrefixed(path)) {
      return path.slice(CLOUDFRONT_URL.length + 1); // 길이만큼 잘라냄 + / 한글자가 남음. 같이 자르기.
    }
    return path || '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    // ✅ 3. 콘텐츠가 최소 1개 이상 있어야 함
    if (formState.contents.length === 0) {
      alert('내용을 최소 1개 이상 작성해주세요.');
      return;
    }

    // ✅ 4. 콘텐츠 내용 검증 (빈 텍스트 or 이미지 파일 없음 등)
    const hasInvalidBlock = formState.contents.some((item) => {
      if (item.type === 'TEXT' && !item.contentText?.trim()) return true;
      if (item.type === 'IMG' && !item.contentFile) return true;
      return false;
    });

    if (hasInvalidBlock) {
      alert('빈 텍스트 블록이나 이미지가 누락된 블록이 있습니다.');
      return;
    }

    //S3 게시판 첨부파일 저장 위치
    const path = `board/${category}/`;

    //S3 게시판 컨텐츠 파일 저장 위치
    const detailPath = 'board/content/';

    // ✅ 1. 새로 등록된 File 객체만 골라냄 (수정된 이미지)
    const newImageItems = formState.contents.filter((item) => item.type === 'IMG' && item.contentFile instanceof File);

    //첨부파일
    const otherFile = formState?.attachment;
    let attachmentChangeName = null;

    //파일 타입
    if (otherFile instanceof File) {
      // 1. Presigned URL 요청 [첨부파일]
      const presigned = await getPresignedUrl(otherFile.name, otherFile.type, path);

      // 2. S3에 업로드 [첨부파일]
      await uploadFileToS3(presigned.presigned_url, otherFile);
      attachmentChangeName = presigned.change_name;
    }

    // ✅ 2. Presigned URL 요청 (새로운 이미지만)
    const presignedResults = await Promise.all(
      newImageItems.map((item) => getPresignedUrl(item.contentFile.name, item.contentFile.type, detailPath))
    );

    // ✅ 3. S3 업로드 (새로운 이미지만)
    await Promise.all(
      presignedResults.map((presigned, index) =>
        uploadFileToS3(presigned.presigned_url, newImageItems[index].contentFile)
      )
    );

    // ✅ 4. 컨텐츠 전체를 다시 구성
    let imgUploadIndex = 0;

    const contents = formState.contents.map((item, index) => {
      if (item.type === 'IMG') {
        if (item.contentFile instanceof File) {
          // 새로 등록된 이미지 → change_name으로 대체
          const changeName = presignedResults[imgUploadIndex]?.change_name;
          imgUploadIndex += 1;

          return {
            type: item.type,
            contentText: null,
            contentFile: removePrefix(changeName), // 예: "board/content/xxx.jpg"
            contentFileOriginal: item.contentFile.name,
          };
        } else {
          // 기존 이미지 URL 그대로 유지
          return {
            type: item.type,
            contentText: null,
            contentFile: removePrefix(item.contentFile), // 이미 있는 경로
            contentFileOriginal: item.contentFileOriginal ?? null,
          };
        }
      } else {
        return {
          type: item.type,
          contentText: item.contentText,
          contentFile: null,
          contentFileOriginal: null,
        };
      }
    });

    const payload = {
      title: formState.title,
      type: formState.type,
      attachment: attachmentChangeName ? attachmentChangeName : formState.attachment,
      attachmentOriginal: otherFile instanceof File ? otherFile.name : postData.attachmentOriginal,
      centerId: formState.centerId,
      classRoomId: formState.classRoomNo,
      memberId: formState.memberId,
      contents: contents,
    };

    // api 전송 예시
    const responseData = await boardService.updateBoard(postData.boardNo, payload);
    // await api.put(`http://localhost:8888/api/boards/${postData.boardNo}`, formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' },
    // });

    if (!responseData) {
      throw new Error('게시판 수정 실패했습니다.');
    }
    allowNavigation();
    navigate(`/${category}/${postData.boardNo}`);
    toast.success('수정 완료');
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

  return (
    <PageContainer onSubmit={handleSubmit} onChange={() => setIsDirty(true)}>
      <ContentHeader
        Title={categoryName[category]}
        Color={member.memberType === 'PARENT' ? 'purple' : 'green'}
        ButtonProps={[
          { Title: '수정완료', type: 'submit' },
          { Title: '뒤로가기', func: () => handleGoBack() },
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
};

const PageContainer = styled.form`
  width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export default BoardUpdatePage;
