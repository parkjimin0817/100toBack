import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { memberService } from '../../api/member';
import useSearchStore from '../../store/searchStore';
import { toast } from 'react-toastify';

export const useSearchIdForm = () => {
  const navigator = useNavigate();

  const BIRTHDAY_YEAR_LIST = Array.from({ length: 56 }, (_, i) => `${i + 1970}년`);
  const BIRTHDAY_MONTH_LIST = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
  const BIRTHDAY_DAY_LIST = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);

  const [name, setName] = useState('');
  const [choiceYear, setChoiceYear] = useState('');
  const [choiceMonth, setChoiceMonth] = useState('');
  const [choiceDay, setChoiceDay] = useState('');

  const [data, setData] = useState({
    member_name: '',
    member_birth: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { searchId } = useSearchStore();

  useEffect(() => {
    const year = choiceYear.replace('년', '');
    const month = choiceMonth.replace('월', '').padStart(2, '0');
    const day = choiceDay.replace('일', '').padStart(2, '0');

    setData({
      member_name: name,
      member_birth: `${year}-${month}-${day}`,
    });
  }, [name, choiceYear, choiceMonth, choiceDay]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'year':
        setChoiceYear(value);
        break;
      case 'month':
        setChoiceMonth(value);
        break;
      case 'day':
        setChoiceDay(value);
        break;
      default:
        break;
    }
  };

  const isValidDateInput = (year, month, day) => {
    return year && month && day;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error('이름을 입력해주세요.');
      return;
    }

    if (!isValidDateInput(choiceYear, choiceMonth, choiceDay)) {
      toast.error('생년월일을 모두 선택해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      console.log(data);

      const user = await memberService.searchId(data.member_name, data.member_birth);
      if (!user) {
        throw new Error('이름과 생년월일이 잘못되었습니다.');
      }

      searchId(user);

      toast.success('아이디 찾기를 성공했습니다.');
      navigator('/findidsuccess');
    } catch (error) {
      setError('아이디 찾기 실패했습니다.');
      toast.error('아이디 찾기 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    navigator,
    BIRTHDAY_YEAR_LIST,
    BIRTHDAY_MONTH_LIST,
    BIRTHDAY_DAY_LIST,
    name,
    choiceYear,
    choiceMonth,
    choiceDay,
    handleChange,
    handleSubmit,
    error,
    isLoading,
  };
};
