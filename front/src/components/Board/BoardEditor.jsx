import React, { useEffect, useState } from 'react';
import ImageInputBlock from './ImageInputBlock';
// import TextInputBlock from './TextInputBlock';
import SimpleEditor from './TextInputBlock copy';
import styled from 'styled-components';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { IoDocumentText } from "react-icons/io5";
import { FaImage } from "react-icons/fa6";
import { classService } from '../../api/class';
import { th } from 'date-fns/locale';

const BoardEditor = ({ category, formState, updateFormField, addBlock, updateBlock, selectBlock, deleteBlock }) => {
  const [classRoomList, setClassRoomList] = useState([]);

  useEffect(() => {
    const getClassRoomList = async () => {
      try {
        const responseData = await classService.classroomlist(formState.centerId);
        console.log(responseData);
        setClassRoomList(responseData);
      } catch (error) {
        console.error('반 조회 실패 : ', error);
        alert('반 조회 실패');
      }
    };
    getClassRoomList();
  }, []);

  // 블럭 추가 후, 추가 버튼 감추기 위한 함수. type이 default인 블럭이 있는지 검사
  function hasDefaultBlock(contents) {
    return contents?.some((block) => block.type === 'default');
  }

  return (
    <FormContainer>
      {/* <form onSubmit={handleSubmit}> */}
      <div>
        <HeadBlock>
          <HeadLabel htmlFor="title">제 목</HeadLabel>
          <HeadInput
            id="title"
            type="text"
            value={formState?.title}
            onChange={(e) => updateFormField('title', e.target.value)}
          />
        </HeadBlock>
        <HeadBlock>
          {(category === 'family_notice' || category === 'note') && (
            <>
              {/* 로딩시, api 호출해서 옵션을 채울 예정  */}
              <HeadLabel htmlFor="classRoom">반 선택</HeadLabel>
              {classRoomList.length > 0 && (
                <Select
                  id="classRoom"
                  type="text"
                  value={formState?.classRoomNo}
                  onChange={(e) => updateFormField('classRoomNo', e.target.value)}
                >
                  <option value="선택">반 선택</option>
                  {classRoomList.map((classRoom) => (
                    <option key={classRoom.class_no} value={classRoom.class_no}>
                      {classRoom.class_name}
                    </option>
                  ))}
                </Select>
              )}
            </>
          )}
          <HeadLabel htmlFor="writer">작성자</HeadLabel>
          <HeadInput
            id="writer"
            type="text"
            value={formState?.memberName}
            onChange={(e) => updateFormField('memberName', e.target.value)}
            readOnly
          />
        </HeadBlock>
        {(category !== 'photo' && category !== 'meal_plan') && (
          <HeadBlock>
            <HeadLabel>첨부 파일</HeadLabel>
            {formState.attachment ? (
              <OtherFile>
                <label>
                  현재 파일 :{' '}
                  {typeof formState.attachment === 'string'
                    ? formState.attachment.split('/').pop()
                    : formState.attachment.name}
                </label>
                <OtherFileChange htmlFor="file">파일 변경</OtherFileChange>
                <input
                  id="file"
                  type="file"
                  hidden
                  onChange={(e) => updateFormField('attachment', e.target.files[0])}
                />
              </OtherFile>
            ) : (
              <HeadInput id="file" type="file" onChange={(e) => updateFormField('attachment', e.target.files[0])} />
            )}
          </HeadBlock>
        )}

        <div style={{ marginTop: '1rem' }}>
          {formState?.contents.map((block, index) => (
            // <div key={block.boardContentNo} style={{ marginBottom: "1rem" }}>
            <div key={index}>
              {block.type === 'default' ? (
                <ButtonBox>
                  <AddBlockButton type="button" onClick={() => selectBlock('TEXT', block.boardContentNo)}>
                    <IoDocumentText />
                  </AddBlockButton>
                  <AddBlockButton type="button" onClick={() => selectBlock('IMG', block.boardContentNo)}>
                    <FaImage />
                  </AddBlockButton>
                  <AddBlockButton type="button" onClick={() => deleteBlock(block.boardContentNo)}>
                    <FaMinus></FaMinus>
                  </AddBlockButton>
                </ButtonBox>
              ) : block.type === 'TEXT' ? (
                <SimpleEditor /*TextInputBlock*/
                  key={block.boardContentNo}
                  onChange={(value) => updateBlock(block.boardContentNo, value)}
                  content={block.contentText}
                  blockDelete={() => deleteBlock(block.boardContentNo)}
                />
              ) : (
                <ImageInputBlock
                  id={block.boardContentNo}
                  value={block.contentFile}
                  onChange={updateBlock}
                  blockDelete={() => deleteBlock(block.boardContentNo)}
                />
              )}
              {/* </div> */}
            </div>
          ))}
          {hasDefaultBlock(formState?.contents) ? (
            <></>
          ) : (
            <BlockButtonBox>
              <AddBlockButton type="button" onClick={() => addBlock('default')}>
                <FaPlus></FaPlus>
              </AddBlockButton>
            </BlockButtonBox>
          )}
        </div>

        {/* <button type="submit">작성 완료</button> */}
      </div>
    </FormContainer>
  );
};

const OtherFileChange = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  background: ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0 5px;

  &:hover {
    scale: 0.98;
  }
`;

const OtherFile = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: 1;
  border: 1px solid #bebebe;
  padding: 10px;
`;

const HeadBlock = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;
const HeadLabel = styled.label`
  display: flex;
  width: 150px;

  border-radius: 5px;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.green};
  color: white;
`;
const HeadInput = styled.input`
  flex: 1;
  border: 1px solid #bebebe;
  padding: 10px;
`;
const FormContainer = styled.div`
  margin: 40px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const BlockButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddBlockButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  padding: 15px;
  /* border: 1px solid #bebebe; */
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.green};
  color: white;

  & > svg {
    width: 100%;
    height: 100%;
  }
`;
const Select = styled.select`
  flex: 1;
  border: 1px solid #bebebe;
  padding: 10px;
`;

export default BoardEditor;
