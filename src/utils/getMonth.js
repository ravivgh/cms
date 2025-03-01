import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  const daysInMonth = dayjs(new Date(year, month + 1, 0)).date(); // Total days in the month
  const totalCells = Math.ceil((firstDayOfTheMonth + daysInMonth) / 7) * 7; // Total cells for the calendar grid

  let currentMonthCount = 1 - firstDayOfTheMonth;
  const daysMatrix = [];

  for (let i = 0; i < totalCells; i++) {
    const date = dayjs(new Date(year, month, currentMonthCount));
    if (i % 7 === 0) daysMatrix.push([]); // Start a new row for the week
    daysMatrix[daysMatrix.length - 1].push(date);
    currentMonthCount++;
  }

  return daysMatrix;
}
