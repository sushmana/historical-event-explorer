import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './darkTheme.css'

const CustomDatePickerDarkTheme = () => {
      const [selectedDate, setSelectedDate] = useState(null);
  return (
      <div className='date-picker-container'>
            <DatePicker inline className= "custom-datepicker text-black" selected={selectedDate} onChange={setSelectedDate(date)} onSelect={handleDateSelect} showMonthDropdown showYearDropdown/>
      </div>
  )
}

export default CustomDatePickerDarkTheme