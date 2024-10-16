import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { addMonths } from "date-fns";
import moment from "moment";
import { Button } from "./ui/button";

const MonthSelection = ({ onSelectDate }) => {
  const today = new Date();
  const nextMonth = addMonths(new Date(), 0);
  const [month, setMonth] = useState(nextMonth);
  const [selectedDate, setSelectedDate] = useState(today);

  const handleMonthChange = (value) => {
    setMonth(value);
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
              ? moment(month).format("MMM yyyy")
              : moment(selectedDate).format("MMM D, yyyy")}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            month={month}
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
