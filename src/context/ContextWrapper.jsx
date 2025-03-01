import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error("Unknown action type");
  }
}

function initEvents() {
  try {
    const storageEvents = localStorage.getItem("savedEvents");
    return storageEvents ? JSON.parse(storageEvents) : [];
  } catch {
    return [];
  }
}

export default function ContextWrapper({ children }) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const filteredEvents = useMemo(() => {
    const checkedLabels = new Set(
      labels.filter((lbl) => lbl.checked).map((lbl) => lbl.label)
    );
    return savedEvents.filter((evt) => checkedLabels.has(evt.label));
  }, [savedEvents, labels]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels) =>
      [...new Set(savedEvents.map((evt) => evt.label))].map((label) => ({
        label,
        checked: prevLabels.find((lbl) => lbl.label === label)?.checked ?? true,
      }))
    );
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  const updateLabel = useCallback(
    (label) => {
      setLabels((prevLabels) =>
        prevLabels.map((lbl) => (lbl.label === label.label ? label : lbl))
      );
    },
    [setLabels]
  );

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
