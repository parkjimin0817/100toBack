import React, { useEffect, useState } from 'react'
import ImageInputBlock from './ImageInputBlock';
import TextInputBlock from './TextInputBlock';
import styled from 'styled-components';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { classService } from '../../api/class';

const BoardEditor = (
  { category, 
    formState, 
    updateFormField, 
    addBlock, 
    updateBlock, 
    selectBlock, 
    deleteBlock }
) => {
  const [classRoomList, setClassRoomList] = useState([]);

  useEffect(() => {
    const getClassRoomList = async () => {
      try {
        const responseData = await classService.classroomlist(formState.centerId);
        console.log(responseData);
        setClassRoomList(responseData);
      } catch (error) {
        console.error("반 조회 실패 : ", error);
          alert("반 조회 실패");
      }
    }
    getClassRoomList();
  }, [])

  return (
    <FormContainer>
      {/* <form onSubmit={handleSubmit}> */}
      <div>
        <HeadBlock>
          <HeadLabel htmlFor='title'>제 목</HeadLabel>
          <HeadInput id='title' type="text" value={formState?.title} onChange={(e) => updateFormField("title", e.target.value)} />
        </HeadBlock>
        <HeadBlock>
        {(category === 'family_notice' ||
          category === 'note') && (
          <>
          {/* 로딩시, api 호출해서 옵션을 채울 예정  */}
            <HeadLabel htmlFor='classRoom'>반 선택</HeadLabel>
            <Select id='classRoom' type="text" value={formState?.classRoomNo} onChange={(e) => updateFormField("classRoomNo",e.target.value)} >
              <option value="선택">반 선택</option>
              {classRoomList.map((classRoom) => (
                <option key={classRoom.class_no} value={classRoom.class_no}>
                  {classRoom.class_name}
                </option>
              ))}
            </Select>
          </>
          )
        }
          <HeadLabel htmlFor='writer'>작성자</HeadLabel>
          <HeadInput id='writer' type="text" value={formState?.memberName} onChange={(e) => updateFormField("memberName", e.target.value)} />
        </HeadBlock>
        {category !== 'gallery' && (
          <HeadBlock>
            <HeadLabel htmlFor='file'>첨부 파일</HeadLabel>
            <HeadInput id='file' type="file" onChange={(e) => updateFormField("file", e.target.files[0])} />
          </HeadBlock>
        )}

        <div style={{ marginTop: "1rem" }}>
          {formState?.contents.map((block) => (
            // <div key={block.boardContentNo} style={{ marginBottom: "1rem" }}>
            <>
              {block.type === "default" ? (
                <ButtonBox>
                  <AddBlockButton type="button" onClick={() => selectBlock("TEXT", block.boardContentNo)}>
                    텍스트 추가
                  </AddBlockButton>
                  <AddBlockButton type="button" onClick={() => selectBlock("IMG", block.boardContentNo)}>
                    이미지 추가
                  </AddBlockButton>
                  <AddBlockButton type='button' onClick={() => deleteBlock(block.boardContentNo)}>
                    <FaMinus></FaMinus>
                  </AddBlockButton>
                </ButtonBox>
              ) : block.type === "TEXT" ? (
                <TextInputBlock
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
            </>
          ))}
          <AddBlockButton type="button" onClick={() => addBlock("default")}>
            <FaPlus></FaPlus>
          </AddBlockButton>
        </div>

        {/* <button type="submit">작성 완료</button> */}
      </div>
    </FormContainer>
  );
};

const HeadBlock = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;
const HeadLabel = styled.label`
  display: flex;
  width: 150px;
  height: 45px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.green};
  color: white;
`;
const HeadInput = styled.input`
  flex : 1;
  border: 1px solid #BEBEBE;
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
const AddBlockButton = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  border: 1px solid #BEBEBE;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
const Select = styled.select`
  flex : 1;
  border: 1px solid #BEBEBE;
  padding: 10px;
`;

export default BoardEditor;