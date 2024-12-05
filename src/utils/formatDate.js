const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Formats a date object to Day Month(word), Year
 *
 * Example return: 7 June, 2024
 * @param {Date} date
 * @returns {String}
 */
export const formatDate = (date) => {
  let month = parseInt(date.getMonth());
  month = monthNames[month];
  let year = date.getFullYear();
  let day = date.getDate();

  return `${day} ${month}, ${year}`;
};
