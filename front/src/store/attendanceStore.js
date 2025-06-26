import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAttendanceStore = create(
  persist(
    (set) => ({
      attendance: null,
      // 출퇴근 상태 설정
      setAttendance: (todayAttendanceData) => {
        set({ attendance: todayAttendanceData });
      },
      //출퇴근 초기화
      resetAttendance: () => {
        set({ attendance: null });
      },
    }),
    {
      name: 'attendance-storage',
      partialize: (state) => ({
        attendance: state.attendance,
      }),
    }
  )
);

export default useAttendanceStore;
