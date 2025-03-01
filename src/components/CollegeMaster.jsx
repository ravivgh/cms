import { useState, useEffect, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays, X, Download, Mic } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import jsPDF from "jspdf";

const CollegeMaster = () => {
  const [holidayFields, setHolidayFields] = useState(() => {
    const saved = localStorage.getItem("holidayFields");
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((field) => ({
        ...field,
        date: field.date ? new Date(field.date) : null,
      }));
    }
    return [{ id: 1, date: null, name: "", recurring: false }];
  });
  const [reminder, setReminder] = useState(() => {
    const saved = localStorage.getItem("reminder");
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        dueDate: parsed.dueDate ? new Date(parsed.dueDate) : null,
      };
    }
    return {
      feesAmount: "",
      durationDays: "",
      dueDate: null,
      frequency: "one-time",
    };
  });
  const [weekends, setWeekends] = useState(() => {
    const saved = localStorage.getItem("weekends");
    return saved ? JSON.parse(saved) : { saturday: false, sunday: false };
  });
  const [activeSection, setActiveSection] = useState("weekend");
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const maxFields = 5;

  const recognitionRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("holidayFields", JSON.stringify(holidayFields));
    localStorage.setItem("reminder", JSON.stringify(reminder));
    localStorage.setItem("weekends", JSON.stringify(weekends));
  }, [holidayFields, reminder, weekends]);

  const addToHistory = (newState) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setHolidayFields(history[historyIndex - 1].holidayFields);
      setReminder(history[historyIndex - 1].reminder);
      setWeekends(history[historyIndex - 1].weekends);
      toast.success("Undo successful");
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setHolidayFields(history[historyIndex + 1].holidayFields);
      setReminder(history[historyIndex + 1].reminder);
      setWeekends(history[historyIndex + 1].weekends);
      toast.success("Redo successful");
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(holidayFields);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setHolidayFields(reordered);
    addToHistory({ holidayFields: reordered, reminder, weekends });
  };

  const addHolidayField = () => {
    if (holidayFields.length < maxFields) {
      const newFields = [
        ...holidayFields,
        {
          id: holidayFields.length + 1,
          date: null,
          name: "",
          recurring: false,
        },
      ];
      setHolidayFields(newFields);
      addToHistory({ holidayFields: newFields, reminder, weekends });
    } else {
      toast.error(`Maximum of ${maxFields} holidays allowed`);
    }
  };

  const removeHolidayField = (index) => {
    const newFields = holidayFields.filter((_, i) => i !== index);
    setHolidayFields(newFields);
    addToHistory({ holidayFields: newFields, reminder, weekends });
  };

  const handleDateChange = (id, selectedDate) => {
    const newFields = holidayFields.map((field) =>
      field.id === id ? { ...field, date: selectedDate } : field
    );
    setHolidayFields(newFields);
    addToHistory({ holidayFields: newFields, reminder, weekends });
  };

  const handleNameChange = (id, value) => {
    const newFields = holidayFields.map((field) =>
      field.id === id ? { ...field, name: value } : field
    );
    setHolidayFields(newFields);
    addToHistory({ holidayFields: newFields, reminder, weekends });
  };

  const toggleRecurring = (id) => {
    const newFields = holidayFields.map((field) =>
      field.id === id ? { ...field, recurring: !field.recurring } : field
    );
    setHolidayFields(newFields);
    addToHistory({ holidayFields: newFields, reminder, weekends });
  };

  const handleReminderChange = (field, value) => {
    const newReminder = { ...reminder, [field]: value };
    setReminder(newReminder);
    addToHistory({ holidayFields, reminder: newReminder, weekends });
  };

  const handleWeekendChange = (day) => {
    const newWeekends = { ...weekends, [day]: !weekends[day] };
    setWeekends(newWeekends);
    addToHistory({ holidayFields, reminder, weekends: newWeekends });
  };

  const checkHolidayConflicts = () => {
    const conflicts = [];
    holidayFields.forEach((field, i) => {
      if (!field.date) return;
      const date = field.date.toDateString();
      holidayFields.forEach((other, j) => {
        if (i !== j && other.date && other.date.toDateString() === date) {
          conflicts.push(`${field.name} overlaps with ${other.name}`);
        }
      });
      const day = field.date.getDay();
      if ((day === 6 && weekends.saturday) || (day === 0 && weekends.sunday)) {
        conflicts.push(
          `${field.name} falls on a working ${
            day === 6 ? "Saturday" : "Sunday"
          }`
        );
      }
    });
    return conflicts;
  };

  const validateHolidayFields = () =>
    holidayFields.every((field) => field.name && field.date);
  const validateReminder = () =>
    reminder.feesAmount &&
    reminder.durationDays &&
    reminder.dueDate &&
    Number(reminder.feesAmount) > 0 &&
    Number(reminder.durationDays) > 0;

  const saveConfiguration = async () => {
    setIsSaving(true);
    if (activeSection === "weekend") {
      const conflicts = checkHolidayConflicts();
      if (conflicts.length > 0) {
        toast.error(`Conflicts detected:\n${conflicts.join("\n")}`);
        setIsSaving(false);
        return;
      }
      if (!validateHolidayFields()) {
        toast.error("Please fill in all holiday names and dates");
        setIsSaving(false);
        return;
      }
    }
    if (activeSection === "reminder" && !validateReminder()) {
      toast.error("Please fill in all reminder fields with valid values");
      setIsSaving(false);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(
      activeSection === "weekend"
        ? "Weekend and Holiday Configuration Saved!"
        : "Reminder Saved!"
    );
    setIsSaving(false);
  };

  const resetForm = () => {
    const newFields = [{ id: 1, date: null, name: "", recurring: false }];
    const newReminder = {
      feesAmount: "",
      durationDays: "",
      dueDate: null,
      frequency: "one-time",
    };
    const newWeekends = { saturday: false, sunday: false };
    setHolidayFields(newFields);
    setReminder(newReminder);
    setWeekends(newWeekends);
    addToHistory({
      holidayFields: newFields,
      reminder: newReminder,
      weekends: newWeekends,
    });
    toast.success("Form reset successfully");
  };

  const importHolidays = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const csv = event.target.result;
      const lines = csv.split("\n").slice(1);
      const newHolidays = lines
        .map((line) => {
          const [name, date, recurring] = line.split(",");
          return {
            id: holidayFields.length + 1 + lines.indexOf(line),
            name,
            date: date ? new Date(date) : null,
            recurring: recurring?.trim().toLowerCase() === "true",
          };
        })
        .filter((h) => h.name && h.date);
      if (holidayFields.length + newHolidays.length <= maxFields) {
        setHolidayFields([...holidayFields, ...newHolidays]);
        addToHistory({
          holidayFields: [...holidayFields, ...newHolidays],
          reminder,
          weekends,
        });
        toast.success("Holidays imported successfully");
      } else {
        toast.error(`Cannot exceed ${maxFields} holidays`);
      }
    };
    reader.readAsText(file);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yOffset = 20;

    // Title
    doc.setFontSize(18);
    doc.text("Academic Calendar Configuration", pageWidth / 2, yOffset, {
      align: "center",
    });
    yOffset += 15;

    // Weekends Section
    doc.setFontSize(14);
    doc.text("Weekends", 20, yOffset);
    yOffset += 10;
    doc.setFontSize(12);
    doc.text(
      `Saturday: ${weekends.saturday ? "Working" : "Non-Working"}`,
      20,
      yOffset
    );
    yOffset += 10;
    doc.text(
      `Sunday: ${weekends.sunday ? "Working" : "Non-Working"}`,
      20,
      yOffset
    );
    yOffset += 15;

    // Holidays Section
    doc.setFontSize(14);
    doc.text("Holidays", 20, yOffset);
    yOffset += 10;
    doc.setFontSize(12);
    if (holidayFields.length > 0) {
      holidayFields.forEach((field, index) => {
        if (yOffset > 280) {
          doc.addPage();
          yOffset = 20;
        }
        const dateStr =
          field.date instanceof Date && !isNaN(field.date)
            ? field.date.toLocaleDateString()
            : "No Date Set";
        const holidayText = `${index + 1}. ${
          field.name || "Unnamed Holiday"
        } - ${dateStr}${field.recurring ? " (Recurring)" : ""}`;
        doc.text(holidayText, 20, yOffset);
        yOffset += 10;
      });
    } else {
      doc.text("No holidays configured", 20, yOffset);
      yOffset += 10;
    }
    yOffset += 15;

    // Reminder Section
    doc.setFontSize(14);
    doc.text("Reminder", 20, yOffset);
    yOffset += 10;
    doc.setFontSize(12);
    if (
      reminder.feesAmount &&
      reminder.durationDays &&
      reminder.dueDate instanceof Date &&
      !isNaN(reminder.dueDate)
    ) {
      const reminderText = `Fees of $${
        reminder.feesAmount
      } due on ${reminder.dueDate.toLocaleDateString()} (in ${
        reminder.durationDays
      } days, ${reminder.frequency})`;
      doc.text(reminderText, 20, yOffset);
    } else {
      doc.text("No reminder set", 20, yOffset);
    }

    doc.save("academic_config.pdf");
    toast.success("PDF downloaded successfully");
  };

  const startVoiceInput = (id) => {
    if (!("webkitSpeechRecognition" in window)) {
      toast.error("Speech recognition not supported in this browser");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleNameChange(id, transcript);
      toast.success(`Voice input: "${transcript}"`);
    };
    recognition.onerror = () => toast.error("Voice recognition failed");
    recognition.onend = () => (recognitionRef.current = null);
    recognition.start();
    recognitionRef.current = recognition;
  };

  const filteredHolidays = holidayFields.filter(
    (field) =>
      field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (field.date && field.date.toLocaleDateString().includes(searchQuery))
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Toaster position="top-right" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
      >
        <div className="bg-[#d4ecd4] p-6">
          <h1 className="text-2xl font-semibold text-black">
            Academic Calendar Management
          </h1>
          <p className="text-black text-sm mt-1">
            Configure weekends, holidays, and payment reminders
          </p>
        </div>

        <div className="p-8">
          <div className="flex gap-4 mb-6">
            <Button
              onClick={() => setActiveSection("weekend")}
              className={`${
                activeSection === "weekend"
                  ? "bg-black text-white"
                  : "bg-transparent text-gray-700 border border-black"
              } hover:text-white rounded-full`}
            >
              Weekend Configuration
            </Button>
            <Button
              onClick={() => setActiveSection("reminder")}
              className={`${
                activeSection === "reminder"
                  ? "bg-black text-white"
                  : "bg-transparent text-gray-700 border border-black"
              } hover:text-white rounded-full`}
            >
              Set Reminder
            </Button>
            <Button
              onClick={() => setActiveSection("summary")}
              className={`${
                activeSection === "summary"
                  ? "bg-black text-white"
                  : "bg-transparent text-gray-700 border border-black"
              } hover:text-white rounded-full`}
            >
              Summary
            </Button>
            <Button
              onClick={() => setActiveSection("calendar")}
              className={`${
                activeSection === "calendar"
                  ? "bg-black text-white"
                  : "bg-transparent text-gray-700 border border-black"
              } hover:text-white rounded-full`}
            >
              Calendar Preview
            </Button>
          </div>

          {activeSection === "weekend" && (
            <>
              <div className="pb-6 border-b border-gray-200">
                <h2 className="text-xl font-medium text-gray-800 mb-4">
                  Weekend Configuration
                </h2>
                <div className="grid grid-cols-2 gap-6 max-w-md">
                  <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                    <Checkbox
                      id="saturday"
                      checked={weekends.saturday}
                      onCheckedChange={() => handleWeekendChange("saturday")}
                    />
                    <label
                      htmlFor="saturday"
                      className="text-sm font-medium text-gray-700"
                    >
                      Saturday Working Day
                    </label>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                    <Checkbox
                      id="sunday"
                      checked={weekends.sunday}
                      onCheckedChange={() => handleWeekendChange("sunday")}
                    />
                    <label
                      htmlFor="sunday"
                      className="text-sm font-medium text-gray-700"
                    >
                      Sunday Working Day
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium text-gray-800">
                    Holiday Schedule
                  </h2>
                  <div className="space-x-3">
                    <Button
                      onClick={addHolidayField}
                      disabled={holidayFields.length >= maxFields}
                      className="bg-[#1d68bd] hover:bg-[#1d68bd] text-white rounded-full text-sm"
                    >
                      Add Holiday
                    </Button>
                    <label className="bg-[#1d68bd] hover:bg-[#1d68bd] text-white rounded-full px-4 py-2 cursor-pointer text-base">
                      Import CSV
                      <input
                        type="file"
                        accept=".csv"
                        onChange={importHolidays}
                        className="hidden"
                      />
                    </label>
                    <Button
                      onClick={saveConfiguration}
                      disabled={isSaving}
                      className="bg-[#116752] hover:bg-[#116752] text-white"
                    >
                      {isSaving ? "Saving..." : "Save Configuration"}
                    </Button>
                    <Button
                      onClick={undo}
                      disabled={historyIndex <= 0}
                      className=" text-black bg-transparent border border-black"
                    >
                      Undo
                    </Button>
                    <Button
                      onClick={redo}
                      disabled={historyIndex >= history.length - 1}
                      className="bg-gray-500 hover:bg-gray-600 text-white"
                    >
                      Redo
                    </Button>
                  </div>
                </div>

                <Input
                  type="text"
                  placeholder="Search holidays..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-4 w-full text-black"
                />

                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="holidays">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-4"
                      >
                        {filteredHolidays.map((field, index) => (
                          <Draggable
                            key={field.id}
                            draggableId={field.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <motion.div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border"
                              >
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <Input
                                      type="text"
                                      placeholder="Holiday Name"
                                      value={field.name}
                                      onChange={(e) =>
                                        handleNameChange(
                                          field.id,
                                          e.target.value
                                        )
                                      }
                                      className="w-full text-black"
                                    />
                                    <Button
                                      variant="ghost"
                                      onClick={() => startVoiceInput(field.id)}
                                      className="p-2 "
                                    >
                                      <Mic className="h-5 w-5 text-black" />
                                    </Button>
                                  </div>
                                  {field.date instanceof Date &&
                                    !isNaN(field.date) && (
                                      <p className="text-xs text-gray-500 mt-1">
                                        Date: {field.date.toLocaleDateString()}
                                      </p>
                                    )}
                                </div>

                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="flex items-center gap-2 bg-slate-200 text-black"
                                    >
                                      <CalendarDays className="h-4 w-4" />
                                      {field.date instanceof Date &&
                                      !isNaN(field.date)
                                        ? "Edit Date"
                                        : "Set Date"}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={field.date}
                                      onSelect={(date) =>
                                        handleDateChange(field.id, date)
                                      }
                                      className="rounded-md border"
                                    />
                                  </PopoverContent>
                                </Popover>

                                <Checkbox
                                  checked={field.recurring}
                                  onCheckedChange={() =>
                                    toggleRecurring(field.id)
                                  }
                                  className="ml-2"
                                />
                                <span className="text-sm text-gray-500">
                                  Recurring
                                </span>

                                {index > 0 && (
                                  <Button
                                    variant="ghost"
                                    onClick={() => removeHolidayField(index)}
                                    className="text-gray-400 hover:text-red-500"
                                  >
                                    <X className="h-5 w-5" />
                                  </Button>
                                )}
                              </motion.div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </>
          )}

          {activeSection === "reminder" && (
            <div className="pb-6">
              <h2 className="text-xl font-medium text-gray-800 mb-4">
                Set Reminder
              </h2>
              <div className="grid grid-cols-4 gap-6 max-w-3xl">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Fees Amount
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={reminder.feesAmount}
                    onChange={(e) =>
                      handleReminderChange("feesAmount", e.target.value)
                    }
                    className="w-full text-black"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Duration (Days)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter days"
                    value={reminder.durationDays}
                    onChange={(e) =>
                      handleReminderChange("durationDays", e.target.value)
                    }
                    className="w-full text-black"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Due Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-white text-black border"
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {reminder.dueDate instanceof Date &&
                        !isNaN(reminder.dueDate)
                          ? reminder.dueDate.toLocaleDateString()
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={reminder.dueDate}
                        onSelect={(date) =>
                          handleReminderChange("dueDate", date)
                        }
                        className="rounded-md border"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Frequency
                  </label>
                  <select
                    value={reminder.frequency}
                    onChange={(e) =>
                      handleReminderChange("frequency", e.target.value)
                    }
                    className="w-full p-2 border rounded text-black bg-white"
                  >
                    <option value="one-time">One-Time</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 space-x-3">
                <Button
                  onClick={saveConfiguration}
                  disabled={isSaving}
                  className="bg-[#116752] hover:bg-[#116752] text-white rounded-full"
                >
                  {isSaving ? "Saving..." : "Save Reminder"}
                </Button>
                <Button
                  onClick={() => {
                    if (validateReminder()) {
                      toast.custom(
                        <div className="bg-gray-800 text-white p-4 rounded-lg">
                          <p>Reminder Preview ({reminder.frequency}):</p>
                          <p>
                            Fees of ${reminder.feesAmount} due on{" "}
                            {reminder.dueDate.toLocaleDateString()} (in{" "}
                            {reminder.durationDays} days)
                          </p>
                        </div>
                      );
                    }
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                >
                  Preview Reminder
                </Button>
                <Button
                  onClick={resetForm}
                  className="bg-transparent text-red-500  hover:bg-slate-200 rounded-full"
                >
                  Reset Form
                </Button>
              </div>
            </div>
          )}

          {activeSection === "summary" && (
            <div className="pb-6">
              <h2 className="text-xl font-medium text-gray-800 mb-4">
                Configuration Summary
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-700">
                    Weekends
                  </h3>
                  <p className="text-sm text-gray-600">
                    Saturday: {weekends.saturday ? "Working" : "Non-Working"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Sunday: {weekends.sunday ? "Working" : "Non-Working"}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700">
                    Holidays
                  </h3>
                  {holidayFields.length > 0 ? (
                    <ul className="list-disc pl-5 text-sm text-gray-600">
                      {holidayFields.map((field) => (
                        <li key={field.id}>
                          {field.name || "Unnamed Holiday"} -{" "}
                          {field.date instanceof Date && !isNaN(field.date)
                            ? field.date.toLocaleDateString()
                            : "No Date Set"}{" "}
                          {field.recurring && "(Recurring)"}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-600">
                      No holidays configured
                    </p>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700">
                    Reminder
                  </h3>
                  {reminder.feesAmount &&
                  reminder.durationDays &&
                  reminder.dueDate instanceof Date &&
                  !isNaN(reminder.dueDate) ? (
                    <p className="text-sm text-gray-600">
                      Fees of ${reminder.feesAmount} due on{" "}
                      {reminder.dueDate.toLocaleDateString()} (in{" "}
                      {reminder.durationDays} days, {reminder.frequency})
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600">No reminder set</p>
                  )}
                </div>
                <Button
                  onClick={downloadPDF}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Download className="h-4 w-4 mr-2" /> Download PDF
                </Button>
              </div>
            </div>
          )}

          {activeSection === "calendar" && (
            <div className="pb-6">
              <h2 className="text-xl font-medium text-gray-800 mb-4">
                Calendar Preview
              </h2>
              <Calendar
                mode="single"
                className="rounded-md border text-black"
                modifiers={{
                  holidays: holidayFields
                    .map((field) => field.date)
                    .filter((d) => d instanceof Date && !isNaN(d)),
                  reminders:
                    reminder.dueDate instanceof Date && !isNaN(reminder.dueDate)
                      ? [reminder.dueDate]
                      : [],
                }}
                modifiersStyles={{
                  holidays: { backgroundColor: "#ffcccc", color: "#000" },
                  reminders: { backgroundColor: "#cce5ff", color: "#000" },
                }}
              />
              <p className="text-sm text-gray-600 mt-2">
                Red: Holidays | Blue: Reminders
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CollegeMaster;
