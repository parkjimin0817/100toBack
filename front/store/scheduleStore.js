import { create } from 'zustand';

const useScheduleStore = create((set) => ({
  schedule: [],
  loading: false,
  error: null,

  inputSchedule: (scheduleData) => {
    set({
      schedule: [
        {
          center_no: scheduleData.center_no,
          class_no: scheduleData.class_no,
          member_no: scheduleData.member_no,
          description: scheduleData.description,
          start_time: scheduleData.start_time,
        },
      ],
    });
  },
}));

export default useScheduleStore;
