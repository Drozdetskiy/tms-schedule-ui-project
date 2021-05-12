import { CronTab } from "../";

const chronTabList: Array<CronTab> = [
  {
    pk: 11,
    name: "chronTab One",
    minute: "1,2,3,4",
    hour: "4,5,6",
    day_of_week: "1,2,3",
    day_of_month: "3,4",
    month_of_year: "5,6",
  },
  {
    pk: 22,
    name: "chronTab Two",
    minute: "4,5,6,7",
    hour: "4,5,6",
    day_of_week: "1,2,3",
    day_of_month: "3,4",
    month_of_year: "5,6",
  },
  {
    pk: 33,
    name: "chronTab Three",
    minute: "8,9,10",
    hour: "4,5,6",
    day_of_week: "1,2,3",
    day_of_month: "3,4",
    month_of_year: "5,6",
  },
];

export default chronTabList;
