import React, { useState, forwardRef } from 'react';
import { DatePickerWrapper, Icon } from './DiaryDateCalendar.styled';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import CalendarIcon from '../../assets/calendar.svg';
import { useDispatch } from 'react-redux';
import { setDate } from '../../redux/diary/slice';
import { format } from 'date-fns';

export const DiaryDateCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();

  const handleChange = date => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    setSelectedDate(date);
    dispatch(setDate(formattedDate));
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <DatePickerWrapper onClick={onClick} ref={ref}>
      {value}
      <Icon src={CalendarIcon} alt="calendar icon" />
    </DatePickerWrapper>
  ));

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleChange}
      dateFormat="dd.MM.yyyy"
      customInput={<ExampleCustomInput />}
      maxDate={new Date()}
    />
  );
};
