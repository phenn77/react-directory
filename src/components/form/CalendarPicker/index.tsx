import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import dayjs from "dayjs";

interface CalendarPickerInput {
  placeholder: string;
  required: boolean;
  format: string;
  onChange: (event: any) => void;
  error?: boolean;
  name: string;
}

export const CalendarPicker = (props: CalendarPickerInput) => {
  const today = dayjs();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DemoItem>
          <DatePicker
            className={"calendar-picker"}
            sx={{
              pb: "4px",
              width: {
                sm: "60%",
                md: 1 / 2,
                lg: "70%",
              },
            }}
            maxDate={props.format === "DD-MM-YYYY" ? today : null}
            format={props.format}
            views={
              props.format === "DD-MM-YYYY"
                ? ["year", "month", "day"]
                : ["year"]
            }
            onChange={props.onChange}
            slotProps={{
              textField: {
                name: props.name,
                id: props.name,
                placeholder: props.placeholder,
                required: props.required,
                ...(props.required && {
                  error: props.error,
                }),
                inputProps: { readOnly: true, fullwidth: "true" },
              },
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};
