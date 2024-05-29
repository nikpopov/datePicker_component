import React, { useState, useCallback, useEffect } from 'react';
import {
  DatePicker as DatePickerMaterial,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { TextField } from '@material-ui/core';
import ButtonUI from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { Moment } from 'moment';
import moment from 'moment-timezone';

import * as localeStrings from 'date-fns/locale';

import { DatePickerWrapperProps } from './DatePicker.types';
import { DatePickerLocalizationCodes } from './utils';

const weekDays = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

const DatePicker: React.FC<DatePickerWrapperProps> = ({
  variant,
  label,
  helperText,
  textFieldComponentRender,
  value,
  anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
  },
  transformOrigin = {
    vertical: 'top',
    horizontal: 'center',
  },
  format,
  minDate,
  maxDate,
  autoClose,
  required,
  disabled,
  handleDateChange,
  onChange,
  localizationCode = 'en',
  weekStartsOn = 'sunday',
  updateMomentLocale = false,
  inactive,
  topHeaderSelectReadOnly = false,
  initCalendarWithUTC = false,
  isKeyboard = false,
  ...rest
}): JSX.Element => {
  const localDatetimeFormat = 'YYYY MM DD HH:mm:ss';
  const [monthChange, setMonthChange] = useState<Date | string | null | Moment>(
    value && initCalendarWithUTC ? moment.tz(value, 'GMT') : value || moment(),
  );
  const [yearChange, setYearChange] = useState<boolean>(true);
  const [locale, setLocale] = useState((DatePickerLocalizationCodes as any)[localizationCode]);

  useEffect(() => {
    if (localizationCode) {
      if (updateMomentLocale) {
        moment.locale(localizationCode);
      }
      setLocale((DatePickerLocalizationCodes as any)[localizationCode]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localizationCode]);

  useEffect(() => {
    const tempValue = value && initCalendarWithUTC
      ? moment.tz(value, 'GMT').format(localDatetimeFormat)
      : value || moment();
    setMonthChange(tempValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const textFieldComponent = useCallback(
    (toolbarProps) => (textFieldComponentRender ? (
      textFieldComponentRender(toolbarProps)
    ) : (
      <TextField {...toolbarProps} />
    )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const datePickerToolbar = (toolbarProps: any, val: any): JSX.Element => {
    const { views, openView, setOpenView } = toolbarProps;

    const changeViewHandler = (): void => {
      if (openView !== views[0]) {
        setOpenView(views[0]);
        setYearChange(false);
      } else {
        setOpenView(views[1]);
        setYearChange(true);
      }
    };

    return (
      <div className="customTopBar">
        <div>{moment(val).format(topHeaderSelectReadOnly ? 'MMMM yyyy' : 'MMM yyyy')}</div>
        {!topHeaderSelectReadOnly && (
          <ButtonUI
            className={openView !== views[0] ? 'open-year' : 'open-year active'}
            onClick={() => changeViewHandler()}
          />
        )}
      </div>
    );
  };

  const customLocale = (localeStrings as any)[locale];
  if (customLocale?.options) {
    customLocale.options.weekStartsOn = weekDays[weekStartsOn];
  }

  const commonProps = {
    label,
    required,
    minDate,
    maxDate,
    variant,
    helperText,
    format,
    TextFieldComponent: textFieldComponent,
    disabled: disabled || inactive,
    PopoverProps: {
      anchorOrigin,
      transformOrigin,
    },
    autoOk: autoClose,
    style: ((disabled && { pointerEvents: 'none' }) as React.CSSProperties) || {},
    value:
      value && initCalendarWithUTC ? moment.tz(value, 'GMT').format(localDatetimeFormat) : value,
    ToolbarComponent: (toolbarProps: any) => datePickerToolbar(toolbarProps, monthChange),
    onMonthChange: (val: any) => {
      setMonthChange(val);
    },
    onYearChange: (val: any) => {
      setYearChange(true);
      setMonthChange(val);
    },
  };

  const renderDefaultDatePicker = (): any => (
    <DatePickerMaterial
      {...rest}
      {...commonProps}
      onChange={(val) => {
        const tempValue = val && initCalendarWithUTC ? moment(val).format(localDatetimeFormat) : val;

        if (yearChange && handleDateChange) {
          handleDateChange(tempValue);
        }

        if (onChange) {
          onChange(val);
        }
      }}
    />
  );

  const renderKeyboardDatePicker = (): any => (
    <KeyboardDatePicker
      {...rest}
      {...commonProps}
      onChange={(val: any) => {
        // eslint-disable-next-line eqeqeq
        if (val && val != 'Invalid Date') {
          const tempValue = val && initCalendarWithUTC ? moment(val).format(localDatetimeFormat) : val;

          if (yearChange && handleDateChange) {
            handleDateChange(tempValue);
          }

          if (onChange) {
            onChange(val);
          }
        }
      }}
    />
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={customLocale}>
      {isKeyboard ? renderKeyboardDatePicker() : renderDefaultDatePicker()}
    </MuiPickersUtilsProvider>
  );
};

export { DatePicker, DatePickerWrapperProps };
