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
    classRoomNo: null,
    file: null,
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
    if ((category === 'family_notice' || category === 'note') && !formState.classRoomNo) {
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

    //컨텐츠 부분에 있는 파일들
    const filterData = formState.contents.filter((item) => item.type === 'IMG');

    //첨부파일
    const otherFile = formState.file;

    // 1. Presigned URL 요청 [첨부파일]
    const presigned = await getPresignedUrl(otherFile.name, otherFile.type, path);

    console.log(presigned);

    // 2. S3에 업로드 [첨부파일]
    await uploadFileToS3(presigned.presignedUrl, otherFile);

    // 1. Presigned URL 요청 [컨텐츠 부분에 있는 파일]
    const presignedResults = await Promise.all(
      filterData.map((item) => getPresignedUrl(item.contentFile.name, item.contentFile.type, detailPath))
    );

    // 2. S3에 업로드 [컨텐츠 부분에 있는 파일]
    await Promise.all(
      presignedResults.map((presigned, index) => uploadFileToS3(presigned.presignedUrl, filterData[index].contentFile))
    );

    let imgFileIndex = 0;

    const contents = formState.contents.map((item, index) => {
      if (item.type === 'IMG') {
        const changeName = presignedResults[imgFileIndex]?.changeName;
        imgFileIndex += 1;

        return {
          type: item.type, // "IMG"
          contentText: null,
          contentFile: changeName, // "board/content/xxx.jpg"
          contentFileKey: `contentFile_${index}`,
        };
      } else {
        return {
          type: item.type, // "TEXT"
          contentText: item.contentText,
          contentFile: null,
          contentFileKey: null,
        };
      }
    });

    const payload = {
      title: formState.title,
      type: formState.type,
      fileName: presigned?.changeName || null,
      centerId: formState.centerId,
      classRoomId: formState.classRoomNo,
      memberId: formState.memberId,
      contents: contents,
    };

    // 게시판 저장
    const boardNo = await boardService.createBoard(payload);
    if (!boardNo) {
      throw new Error('게시판 생성 실패했습니다.');
    }

    allowNavigation();
    navigate(`/${category}/list`);
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
    if(category === "photo" || category === "meal_plan") {
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
  }, [])

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
