import React from 'react';
import {
  render, fireEvent, cleanup, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';

import { DatePicker } from './DatePicker';
import { DatePickerWrapperProps } from './DatePicker.types';
import { TextInput } from '../TextInput/TextInput';

describe('DatePicker test', () => {
  const props: DatePickerWrapperProps = {
    variant: 'inline',
    label: 'Only calendar',
    helperText: 'Some helper text',
    textFieldComponentRender: (p: object) => <TextInput {...p} />,
    onChange: jest.fn(),
    value: new Date(),
  };

  const getCurrentMonthDate = (): string => {
    const current = new Date();
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(current);
    return `${month} ${current.getDate()}th`;
  };

  const getCurrentMonthYear = (): string => {
    const current = new Date();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(current);
    return `${month} ${current.getFullYear()}`;
  };

  afterEach(cleanup);

  test('render', async () => {
    const { getByTestId } = render(
      <DatePicker {...props} />,
    );
    expect(getByTestId("text-input")).toBeDefined();
    expect(getByTestId("text-input")).toBeEnabled();
    expect(getByTestId("text-input")).toBeVisible();
    expect(getByTestId("text-input")).toBeInTheDocument();
  });

  test('initialized when click', async () => {
    const { container, getByTestId, getByRole } = render(
      <DatePicker {...props} />,
    );
    fireEvent.click(getByTestId("text-input"));

    expect(getByRole("textbox").innerHTML).toEqual("");
    expect(getByRole("textbox")).toHaveValue(getCurrentMonthDate());
    waitFor(() => {
      expect(props.onChange).toBeCalled(), { timeout: 250 };
    });
  });

  test("open pop-up", async () => {
    const { container, getByTestId } = render(
      <DatePicker {...props} />,
    );
    fireEvent.click(getByTestId("text-input"));
    waitFor(() => {
      expect(props.onChange).toBeCalled(), { timeout: 250 };

      expect(container.getElementsByClassName(".MuiPickersBasePicker-container")).toBeDefined();
      expect(container.getElementsByClassName(".MuiPickersBasePicker-container")).toBeVisible();
      expect(container.getElementsByClassName(".MuiPickersBasePicker-container")).toHaveLength(1);
    });
  });

  test("controls present", async () => {
    const { container, getByTestId } = render(
      <DatePicker {...props} />,
    );
    fireEvent.click(getByTestId("text-input"));
    waitFor(() => {
      expect(props.onChange).toBeCalled(), { timeout: 250 };

      expect(container.getElementsByClassName("open-year")).toBeDefined();
      expect(container.getElementsByClassName("open-year")).toBeVisible();
      expect(container.getElementsByClassName("open-year")).toHaveLength(1);

      expect(container.getElementsByClassName("MuiPickersCalendarHeader-iconButton")).toBeDefined();
      expect(container.getElementsByClassName("MuiPickersCalendarHeader-iconButton")).toBeVisible();
      expect(container.getElementsByClassName("MuiPickersCalendarHeader-iconButton")).toHaveLength(2);
    });
  });

  test("year control onchange pop-up", async () => {
    const { container, getByTestId } = render(
      <DatePicker {...props} />,
    );
    fireEvent.click(getByTestId("text-input"));
    waitFor(() => {
      expect(props.onChange).toBeCalled(), { timeout: 250 };

      fireEvent.click(container.getElementsByClassName("open-year")[0]);
      waitFor(() => {
        expect(props.onChange).toBeCalled(), { timeout: 250 };

        expect(document.getElementsByClassName("MuiPickersBasePicker-pickerView")).toBeDefined();
        expect(document.getElementsByClassName("MuiPickersBasePicker-pickerView")).toBeVisible();
        expect(document.getElementsByClassName("MuiPickersBasePicker-pickerView")).toHaveLength(1);
      });
    });
  });

  test("current date visible", async () => {
    const { container, getByTestId } = render(
      <DatePicker {...props} />,
    );
    fireEvent.click(getByTestId("text-input"));
    waitFor(() => {
      expect(props.onChange).toBeCalled(), { timeout: 250 };

      expect(container.getElementsByTagName("div.customTopBar > div")).toBeDefined();
      expect(container.getElementsByTagName("div.customTopBar > div")).toBeVisible();
      expect(container.querySelector("div.customTopBar > div")?.innerHTML).toEqual(getCurrentMonthYear);
    });
  });

  test("left month control onchange", async () => {
    const { container, getByTestId } = render(
      <DatePicker {...props} />,
    );
    fireEvent.click(getByTestId("text-input"));
    waitFor(() => {
      expect(props.onChange).toBeCalled(), { timeout: 250 };

      fireEvent.click(container.getElementsByClassName("MuiPickersCalendarHeader-iconButton")[0]);
      expect(props.onChange).toBeCalled(), { timeout: 250 };
    });
  });

  test("right month control onchange", async () => {
    const { container, getByTestId } = render(
      <DatePicker {...props} />,
    );
    fireEvent.click(getByTestId("text-input"));
    waitFor(() => {
      expect(props.onChange).toBeCalled(), { timeout: 250 };

      fireEvent.click(container.getElementsByClassName("MuiPickersCalendarHeader-iconButton")[1]);
      expect(props.onChange).toBeCalled(), { timeout: 250 };
    });
  });
});
