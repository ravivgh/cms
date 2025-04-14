import React, { useState } from 'react';

function DatePicker({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event) => {
    const newDate = new Date(event.target.value);
    setSelectedDate(newDate);
    console.log('Selected Date:', newDate);
    if (onDateChange) {
      onDateChange(newDate); // Pass the new date back to the parent
    }
  };

  return (
    <div>
      <input
        type="date"
        value={selectedDate.toISOString().split('T')[0]}
        onChange={handleDateChange}
      />
      {/* You can add more UI elements for the date picker as needed */}
    </div>
  );
}

export { DatePicker };