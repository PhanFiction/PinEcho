export const formatTimestampToDate = (timestamp) => {
  const dateObject = new Date(Date.parse(timestamp));

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObject);

  return formattedDate;
}