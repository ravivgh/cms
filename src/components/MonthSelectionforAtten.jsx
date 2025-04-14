import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { setMonth, getYear, getMonth } from "date-fns";
import moment from "moment";
import { Button } from "./ui/button";

const MonthSelectionforAtten = ({ selectedMonth: initialSelectedMonth, selectedDate: initialSelectedDate, onSelectMonth, onSelectDate }) => {
    const [month, setMonthState] = useState(setMonth(new Date(), initialSelectedMonth - 1));
    const [selectedDate, setSelectedDate] = useState(initialSelectedDate);

    useEffect(() => {
        const newMonth = setMonth(new Date(getYear(new Date()), initialSelectedMonth - 1), initialSelectedMonth - 1);
        setMonthState(newMonth);
    }, [initialSelectedMonth]);

    useEffect(() => {
        setSelectedDate(initialSelectedDate);
    }, [initialSelectedDate]);

    const handleMonthChange = (newMonth) => {
        setMonthState(newMonth);
        onSelectMonth(getMonth(newMonth) + 1);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onSelectDate(date);
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
                            ? moment(month).format("MMM")
                            : moment().format("MMM")}
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

export default MonthSelectionforAtten;