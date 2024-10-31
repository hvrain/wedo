import DatePicker from "react-datepicker";

import "./CalendarStyle.css";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale/ko";

export default function Calendar({
  className,
  onChangeDate,
  selected,
  customInput,
  minDate,
}: {
  className?: string;
  onChangeDate: (e: Date | null) => void;
  selected?: Date | null;
  customInput: JSX.Element;
  minDate?: Date;
}) {
  return (
    <DatePicker
      locale={ko}
      dateFormatCalendar="yyyy년 MM월 dd일"
      dateFormat="yyyy-MM-dd"
      selected={selected}
      showPopperArrow={false}
      minDate={minDate}
      onChange={onChangeDate}
      calendarClassName={className}
      popperClassName={className}
      wrapperClassName={className}
      customInput={customInput}
    />
  );
}
