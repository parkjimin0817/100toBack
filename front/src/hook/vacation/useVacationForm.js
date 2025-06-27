import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState } from 'react';
import { Form } from 'react-router-dom';

export const useVacationForm = () => {
  const [type, setType] = useState('');
  const [typeDetail, setTypeDetail] = useState('');
  const [customDetail, setCustomDetail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [fileNames, setFileNames] = useState([]); //파일 이름만 보여주려고 파일 이름 저장 값
  const [attachments, setAttachments] = useState([]); //실제로 폼데이터로 전송할 용도

  const fileInputRef = useRef(null);

  const vacationOptions = [
    { value: '연차', label: '연차' },
    { value: '병가', label: '병가' },
    { value: '경조', label: '경조' },
    { value: '반차', label: '반차' },
    { value: '기타', label: '기타 (직접 입력)' },
  ];

  const workcationOptions = [
    { value: '사전답사', label: '사전답사' },
    { value: '세미나 참석', label: '세미나 참석' },
    { value: '기타', label: '기타 (직접 입력)' },
  ];

  const getDetailOptions = () => {
    if (type === '휴가') return vacationOptions;
    if (type === '워케이션') return workcationOptions;
    return [];
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setTypeDetail('');
    setCustomDetail('');
  };

  const handleDetailChange = (e) => {
    setTypeDetail(e.target.value);
    if (e.target.value !== '기타') setCustomDetail('');
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setAttachments(selectedFiles);
    setFileNames(selectedFiles.map((file) => file.name));
  };

  const handleButtonClick = () => fileInputRef.current.click();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('type', type);
    formData.append('typeDetail', typeDetail === '기타' ? customDetail : typeDetail);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('reason', reason);
    attachments.forEach((attachment) => formData.append('attachements', attachment));

    console.log('폼 제출:', {
      type,
      typeDetail: typeDetail === '기타' ? customDetail : typeDetail,
      startDate,
      endDate,
      reason,
      attachments,
    });
  };

  return {
    type,
    typeDetail,
    customDetail,
    fileNames,
    fileInputRef,
    startDate,
    endDate,
    reason,
    getDetailOptions,
    handleTypeChange,
    handleDetailChange,
    handleFileChange,
    handleButtonClick,
    handleSubmit,
    setCustomDetail,
    setStartDate,
    setEndDate,
    setReason,
  };
};
