export const getHoursAndMinutes12 = (date: string) => {
  const dateObject = new Date(date);

  return dateObject.toLocaleString('en-US', { timeZone: 'PST', hour: 'numeric', minute: '2-digit', hour12: true });
};

export const getHoursAndMinutes24 = (date: string) => {
  const dateObject = new Date(date);

  return dateObject.toLocaleString('en-US', { timeZone: 'PST', hour: 'numeric', minute: '2-digit', hour12: false });
};

export const isArrivalNextDay = (dateStart: string, dateEnd: string) => {
  const dateStartObject = new Date(dateStart);
  const dateEndObject = new Date(dateEnd);

  return dateStartObject.getDate() !== dateEndObject.getDate();
};
