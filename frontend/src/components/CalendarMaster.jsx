import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";

const CalendarMaster = ({ setHolidayData }) => {
  const [holidayFields, setHolidayFields] = useState([
    { id: 1, name: "", date: null },
  ]);
  const [savedHolidays, setSavedHolidays] = useState([]);
  // Default to empty array
  const [isValid, setIsValid] = useState(true);
  const maxFields = 5;
  const fetchHolidays = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5472/services/getholidays"
      );
      console.log(response.data);
      if (response.data && Array.isArray(response.data)) {
        setSavedHolidays(response.data);
      } else {
        setSavedHolidays([]);
      }
    } catch (error) {
      console.error("Error fetching holidays:", error);
      setSavedHolidays([]);
    }
  };
  useEffect(() => {
    fetchHolidays();
  }, []);
  useEffect(() => {
    console.log(savedHolidays); // Log the saved holidays after it updates
  }, [savedHolidays]);
  const addHolidayField = () => {
    if (holidayFields.length < maxFields) {
      setHolidayFields([
        ...holidayFields,
        { id: holidayFields.length + 1, name: "", date: null },
      ]);
    }
  };

  const removeHolidayField = (index) => {
    setHolidayFields(holidayFields.filter((_, i) => i !== index));
  };

  const handleDateChange = (id, selectedDate) => {
    const isDateAlreadySelected = holidayFields.some(
      (field) =>
        field.date && field.date.toDateString() === selectedDate.toDateString()
    );

    if (isDateAlreadySelected) {
      alert("This date is already selected for another holiday.");
      return;
    }

    setHolidayFields(
      holidayFields.map((field) =>
        field.id === id ? { ...field, date: selectedDate } : field
      )
    );
  };

  const handleNameChange = (id, name) => {
    const regex = /^[A-Za-z\s]*$/;

    if (regex.test(name)) {
      setIsValid(true);
    } else {
      setIsValid(false); // Set to false if invalid characters are entered
    }

    setHolidayFields(
      holidayFields.map((field) =>
        field.id === id ? { ...field, name } : field
      )
    );
  };

  const saveHolidays = async () => {
    const holidaysToSave = holidayFields
      .filter((field) => field.name && field.date)
      .map((field) => ({
        name: field.name,
        date: `${field.date.getDate()}/${
          field.date.getMonth() + 1
        }/${field.date.getFullYear()}`, // Format date as DD/MM/YYYY
      }));

    if (holidaysToSave.length === 0) {
      alert("No complete holiday data to save.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5472/services/addholidays",
        {
          holidays: holidaysToSave,
        }
      );

      if (response.status === 201) {
        alert("Holidays added successfully!");
        fetchHolidays();
        // setHolidayData(holidaysToSave);
        setHolidayFields([{ id: 1, name: "", date: null }]);
      } else if (response.status === 409) {
        alert("Some holidays already exist.");
      } else {
        alert("Failed to add holidays. Please try again.");
      }
    } catch (error) {
      console.error("Error adding holidays:", error);
      alert("Failed to add holidays. Please try again.");
    }
  };

  const isFirstHolidayComplete = holidayFields[0].name && holidayFields[0].date;

  return (
    <div className="bg-[#f7f7f7] p-5 rounded-lg">
      <h1 className="text-black py-10 text-2xl">Calendar Master</h1>
      <hr
        className="mx-auto bg-[#0000003b] my-2 rounded-sm"
        style={{ width: "100%", height: "1px", borderWidth: 0 }}
      />

      <h1 className="text-black text-3xl pt-16 pb-5">Add Holidays</h1>
      <div className="py-9 flex gap-5">
        <Button
          className="bg-green-700"
          onClick={addHolidayField}
          disabled={
            holidayFields.length >= maxFields || !isFirstHolidayComplete
          }
        >
          Add Holiday +
        </Button>
        <Button className="bg-[#80963ff0]" onClick={saveHolidays}>
          Save
        </Button>
      </div>

      <div>
        {holidayFields.map((field, index) => (
          <div key={field.id} className="flex items-start mb-4">
            <Input
              type="text"
              placeholder={`Enter Holiday`}
              className="w-[500px] text-black mb-2"
              value={field.name}
              onChange={(e) => handleNameChange(field.id, e.target.value)}
            />
            {!isValid && (
              <p className="text-red-500 text-sm mt-1">
                Only letters are allowed.
              </p>
            )}
            <div className="flex items-center flex-col">
              <Popover>
                <PopoverTrigger>
                  <Button
                    variant="outline"
                    className="flex gap-2 items-center text-white bg-black mx-5"
                  >
                    <CalendarDays className="h-5 w-5" />
                    Select Date
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={field.date}
                    onSelect={(selectedDate) =>
                      handleDateChange(field.id, selectedDate)
                    }
                    className="flex flex-1 justify-center rounded-md border"
                  />
                </PopoverContent>
              </Popover>
              {field.date && (
                <div className="mt-2 text-black">
                  Selected Date: {field.date.toLocaleDateString()}
                </div>
              )}
            </div>

            {index !== 0 && (
              <Button
                variant="destructive"
                onClick={() => removeHolidayField(index)}
                className="ml-4 text-white bg-red-600"
              >
                Delete
              </Button>
            )}
          </div>
        ))}
      </div>

      <h1 className="text-black text-3xl pt-16 pb-5">Saved Holidays</h1>
      <div className="py-5">
        {savedHolidays.length > 0 ? (
          <ul>
            {savedHolidays.map((holiday, index) => (
              <li key={index} className="text-black mb-2">
                {holiday.name} - {holiday.date}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-black">No holidays saved.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarMaster;
