/**
 * Helper utility to calculate analog clock rotations for any given UTC offset.
 *
 * @param {Date} date - Current date object
 * @param {number} offsetHours - UTC offset in hours
 * @returns {{ hourDeg: number, minuteDeg: number, secondDeg: number }}
 */
export const calculateClockRotation = (date, offsetHours = 0) => {
  const d = new Date(date.getTime() + offsetHours * 3600000);
  const hours = d.getUTCHours();
  const minutes = d.getUTCMinutes();
  const seconds = d.getUTCSeconds();

  return {
    hourDeg: (hours % 12) * 30 + minutes * 0.5,
    minuteDeg: minutes * 6 + seconds * 0.1,
    secondDeg: seconds * 6,
  };
};

export const WORLD_CITIES = [
  { name: "Cupertino", offset: -7, label: "Today, -12:30" },
  { name: "Tokyo", offset: 9, label: "Today, +3:30" },
  { name: "Sydney", offset: 10, label: "Today, +4:30" },
  { name: "Paris", offset: 2, label: "Today, -3:30" },
];
