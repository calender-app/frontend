import { FieldProps } from "@aldabil/react-scheduler/types";

export const CALENDER_FIELDS: FieldProps[] = [
  {
    name: "is_full_day",
    type: "select",
    default: "NO",
    options: [
      { id: 1, text: "YES", value: "YES" },
      { id: 2, text: "NO", value: "NO" },
    ],
    config: {
      label: "Full Day",
    },
  },
  {
    name: "repeat",
    type: "select",
    default: "NEVER",
    options: [
      { id: 1, text: "Daily", value: "DAILY" },
      { id: 2, text: "Weekly", value: "WEEKLY" },
      { id: 3, text: "Monthly", value: "MONTHLY" },
      { id: 4, text: "Never", value: "NEVER" },
      { id: 4, text: "Biweekly", value: "BIWEEKLY" },
    ],
    config: {
      label: "Repeat",
    },
  },
  {
    name: "repeat_interval",
    type: "input",
    default: 1,
    config: {
      label: "Repeat Interval(wont apply for 'NEVER')",
    },
  },

  {
    name: "description",
    type: "input",
    config: { label: "Description", multiline: true, rows: 4 },
  },
  {
    name: "note",
    type: "input",
    config: { label: "Note", multiline: true, rows: 2 },
  },
];
