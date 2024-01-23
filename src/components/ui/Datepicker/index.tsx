import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import dayjs from "dayjs";

interface DatePickerInput {
  placeholder: string
}

export const Datepicker = (props: DatePickerInput) => {
  const today = dayjs();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DemoItem>
          <DatePicker
            maxDate={today}
            format="DD-MM-YYYY"
            slotProps={{ textField: { placeholder: props.placeholder } }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};
