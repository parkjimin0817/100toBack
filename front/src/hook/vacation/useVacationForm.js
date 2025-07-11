import { useRef, useState } from 'react';
import { vacationService } from '../../api/vacation';
import useLoginStore from '../../store/loginStore';
import { toast } from 'react-toastify';

export const useVacationForm = () => {
  const [selectedType, setSelectedType] = useState('');
  const [typeDetail, setTypeDetail] = useState('');
  const [customDetail, setCustomDetail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [fileName, setFileName] = useState(''); //파일 이름만 보여주려고 파일 이름 저장 값
  const [attachment, setAttachment] = useState(null);

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

  //휴가, 워케이션 고르기
  const getDetailOptions = () => {
    if (selectedType === '휴가') return vacationOptions;
    if (selectedType === '워케이션') return workcationOptions;
    return [];
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setTypeDetail('');
    setCustomDetail('');
  };

  const handleDetailChange = (e) => {
    setTypeDetail(e.target.value);
    if (e.target.value !== '기타') setCustomDetail('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
    setFileName(file.name); //원본 파일 이름
  };

  const handleButtonClick = () => fileInputRef.current.click();

  const handleSubmit = async (e, onSuccess) => {
    e.preventDefault();

    if (
      !selectedType ||
      !typeDetail ||
      !startDate ||
      !endDate ||
      !reason ||
      (typeDetail === '기타' && !customDetail.trim())
    ) {
      toast.warning('모든 항목을 입력해주세요.');
      return;
    }

    const type = selectedType === '휴가' ? 'VACATED' : selectedType === '워케이션' ? 'WORKATION' : '';
    const type_detail = typeDetail === '기타' ? customDetail : typeDetail;

    const request = {
      type,
      type_detail,
      start_date: startDate,
      end_date: endDate,
      reason: reason,
    };

    try {
      const data = await vacationService.requestVacation(request, attachment);
      toast.success('휴가 신청이 완료되었습니다.');
      if (onSuccess) onSuccess();
      return data;
    } catch (err) {
      console.error('휴가 신청 실패 : ', err);
      toast.error('휴가 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const resetForm = () => {
    setSelectedType('');
    setTypeDetail('');
    setCustomDetail('');
    setStartDate('');
    setEndDate('');
    setReason('');
    setFileName('');
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // 파일 인풋 초기화
    }
  };

  return {
    selectedType,
    typeDetail,
    customDetail,
    fileName,
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
    resetForm,
  };
};
