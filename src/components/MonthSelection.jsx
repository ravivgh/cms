import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { addMonths, setMonth, getYear } from "date-fns";
import moment from "moment";
import { Button } from "./ui/button";

const MonthSelection = ({ selectedMonth, onSelectDate }) => {
  const [month, setMonthState] = useState(setMonth(new Date(), selectedMonth - 1));
  const [selectedDate, setSelectedDate] = useState(setMonth(new Date(), selectedMonth - 1));

  useEffect(() => {
    const newMonth = setMonth(new Date(getYear(new Date()), selectedMonth - 1), selectedMonth - 1);
    setMonthState(newMonth);
    setSelectedDate(newMonth);
  }, [selectedMonth]);

  const handleMonthChange = (value) => {
    setMonthState(value);
    onSelectDate(value.getMonth() + 1);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onSelectDate(date.getMonth() + 1);
  };

  return (
    <div className="monthSection flex items-center gap-1">
      <p className="text-black">Month : </p>
      <Popover>
        <PopoverTrigger>
          <Button
            variant="outline"
            className="flex gap-2 items-center text-white bg-black"
          >
            <CalendarDays className="h-5 w-5 " />
            {month
              ? moment(month).format("MMM YYYY")
              : moment(selectedDate).format("MMM YYYY")}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            month={month} // Use the updated 'month' state here
            selected={selectedDate}
            onMonthChange={handleMonthChange}
            onSelect={handleDateChange}
            className="flex flex-1 justify-center rounded-md border"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MonthSelection;