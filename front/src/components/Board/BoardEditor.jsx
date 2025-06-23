import React, { useState } from 'react'
import ImageInputBlock from './ImageInputBlock';
import TextInputBlock from './TextInputBlock';
import styled from 'styled-components';
import { FaMinus, FaPlus } from 'react-icons/fa';

const BoardEditor = ({ category }) => {
  const [blocks, setBlocks] = useState([]);
  const [title, setTitle] = useState("");

  const addBlock = () => {
    const newBlock = {
      id: Date.now(),
      type : "default",
      content_text: "",
    };
    setBlocks([...blocks, newBlock]);
  };

  const selectBlock = (type, id) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, type : type } : block
      )
    );
  }

  const updateBlockContent = (id, value) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, content: value } : block
      )
    );
  };

  const deleteBlock = (id) => {
    setBlocks((prev) =>
      prev.filter((block) =>
        block.id !== id
      )
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("전송할 데이터:", blocks);
    // 서버 전송 로직 작성 가능
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <HeadBlock>
          <HeadLabel htmlFor='title'>제 목</HeadLabel>
          <HeadInput id='title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </HeadBlock>
        <HeadBlock>
        {(category === 'familycommunity' ||
          category === 'notice') && (
          <>
            <HeadLabel htmlFor='title'>반 선택</HeadLabel>
            <HeadInput id='title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </>
          )
        }
          <HeadLabel htmlFor='title'>작성자</HeadLabel>
          <HeadInput id='title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </HeadBlock>
        {category !== 'gallery' && (
          <HeadBlock>
            <HeadLabel htmlFor='title'>첨부 파일</HeadLabel>
            <HeadInput id='title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </HeadBlock>
        )}

        <div style={{ marginTop: "1rem" }}>
          {blocks.map((block) => (
            <div key={block.id} style={{ marginBottom: "1rem" }}>
              {block.type === "default" ? (
                <ButtonBox>
                  <AddBlockButton type="button" onClick={() => selectBlock("TEXT", block.id)}>
                    텍스트 추가
                  </AddBlockButton>
                  <AddBlockButton type="button" onClick={() => selectBlock("IMG", block.id)}>
                    이미지 추가
                  </AddBlockButton>
                  <AddBlockButton type='button' onClick={() => deleteBlock(block.id)}>
                    <FaMinus></FaMinus>
                  </AddBlockButton>
                </ButtonBox>
              ) : block.type === "text" ? (
                <TextInputBlock
                  key={block.id}
                  onChange={(value) => updateBlockContent(block.id, value)}
                />
              ) : (
                <ImageInputBlock
                  id={block.id}
                  value={block.content}
                  onChange={updateBlockContent}
                />
              )}
            </div>
          ))}
          <AddBlockButton type="button" /*onClick={() => setShowOptions(!showOptions)}*/onClick={() => addBlock("default")}>
            <FaPlus></FaPlus>
          </AddBlockButton>
        </div>

        <button type="submit">작성 완료</button>
      </form>
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
`;

export default BoardEditor;