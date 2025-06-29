import { useEffect, useContext, useRef } from 'react';
import { useLocation, UNSAFE_NavigationContext, useNavigate } from 'react-router-dom';

export const useBlockNavigation = ({ when, message }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigator = useContext(UNSAFE_NavigationContext).navigator;

  const allowNextNavigation = useRef(false); // 이동 허용 여부 저장

  // ✅ 외부에서 이동 허용 트리거
  const allowNavigation = () => {
    allowNextNavigation.current = true;
  };

  // 🔁 브라우저 새로고침, 탭 닫기 방지
  useEffect(() => {
    if (!when) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = message; // 브라우저 기본 경고창
    };

    const handlePopState = (e) => {
      if (!allowNextNavigation.current && !window.confirm(message)) {
        // 뒤로 가기 취소
        allowNextNavigation.current = false;
        navigate(location.pathname); // 현재 경로로 되돌림
      } else {
        allowNextNavigation.current = true;
      }
    };

    // 브라우저 새로고침, 탭 닫기 등
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 브라우저 뒤로가기 버튼
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [when, message, navigate, location]);

  // 🔁 SPA 내 라우터 이동 차단
  useEffect(() => {
    if (!when) return;

    const originalPush = navigator.push;

    navigator.push = (...args) => {
      if (allowNextNavigation.current || window.confirm(message)) {
        allowNextNavigation.current = false; // 다음 이동은 허용했으므로 초기화
        originalPush(...args);
      }
    };

    return () => {
      navigator.push = originalPush;
    };
  }, [when, message, location]);

  return { allowNavigation };
};
