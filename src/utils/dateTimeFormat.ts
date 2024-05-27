import moment from "moment";

// Unix number to DateTime
// April 20th 2023, 8:25 pm
export const dateTimeFormat = (date: any) => {
  return moment(date).format("MMMM Do YYYY, h:mm a");
};
