import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { addMonths } from "date-fns";
import moment from "moment";
import { Button } from "./ui/button";

const Monthforatt = ({ onSelectMonth }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const nextMonth = addMonths(new Date(), 0);
  const [month, setMonth] = useState(nextMonth);
  
  const handleMonthChange = (value) => {
    setMonth(value);
    // Create a date object for the first day of the selected month
    const firstDayOfMonth = new Date(currentYear, value.getMonth(), 1);
    onSelectMonth(firstDayOfMonth); // Pass this date object
  };

  return (
    <div className="monthSection flex items-center gap-1">
      <p className="text-black">Month: </p>
      <Popover>
        <PopoverTrigger>
          <Button
            variant="outline"
            className="flex gap-2 items-center text-white bg-black"
          >
            <CalendarDays className="h-5 w-5 " />
            {month ? moment(month).format("MMM YYYY") : moment(today).format("MMM D, YYYY")}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            month={month}
            onMonthChange={handleMonthChange}
            className="flex flex-1 justify-center rounded-md border"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Monthforatt;
