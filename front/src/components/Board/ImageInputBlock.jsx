import React, { useRef, useState, useEffect } from "react";

const ImageInputBlock = ({ id, value, onChange, blockDelete }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  // 이미지가 바뀌면 미리보기 경로 갱신
  useEffect(() => {
    if (value && typeof value === "object") {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [value]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(id, file); // 부모에게 전달
    }
  };

  const handleClickChange = () => {
    fileInputRef.current.click();
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "2rem auto"}}>
      {preview ? (
        <img
          src={preview}
          alt="미리보기"
          style={{ maxWidth: "100%", maxHeight: "300px" }}
        />
      ) : (
        <p>이미지를 선택해주세요</p>
      )}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button type="button" onClick={handleClickChange}>
        {preview ? "이미지 변경" : "이미지 업로드"}
      </button>
      <button onClick={() => blockDelete(id)}>delete</button>
    </div>
  );
};

export default ImageInputBlock;