import { useRef, useState } from 'react';
import { vacationService } from '../../api/vacation';
import useLoginStore from '../../store/loginStore';
import { toast } from 'react-toastify';

export const useVacationForm = () => {
  const [type, setType] = useState('');
  const [typeDetail, setTypeDetail] = useState('');
  const [customDetail, setCustomDetail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [fileNames, setFileNames] = useState([]); //파일 이름만 보여주려고 파일 이름 저장 값
  const [attachments, setAttachments] = useState([]); //실제로 폼데이터로 전송할 용도
  const { member } = useLoginStore();

  const memberNo = member?.memberNo;

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

  const handleSubmit = async (e, onSuccess) => {
    e.preventDefault();

    if (!type || !typeDetail || !startDate || !endDate || !reason || (typeDetail === '기타' && !customDetail.trim())) {
      toast.warning('모든 항목을 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('type', type === '휴가' ? 'VACATED' : type === '워케이션' ? 'WORKATION' : '');
    formData.append('type_detail', typeDetail === '기타' ? customDetail : typeDetail);
    formData.append('start_date', startDate);
    formData.append('end_date', endDate);
    formData.append('reason', reason);
    attachments.forEach((attachment) => formData.append('attachment', attachment));

    try {
      const data = await vacationService.requestVacation(memberNo, formData);

      toast.success('휴가 신청이 완료되었습니다.');
      if (onSuccess) onSuccess();
      return data;
    } catch (err) {
      console.error('휴가 신청 실패 : ', err);
      toast.error('휴가 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const resetForm = () => {
    setType('');
    setTypeDetail('');
    setCustomDetail('');
    setStartDate('');
    setEndDate('');
    setReason('');
    setFileNames([]);
    setAttachments([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // 파일 인풋 초기화
    }
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
    resetForm,
  };
};
