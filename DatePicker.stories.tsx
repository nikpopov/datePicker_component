import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import '../theme/styles/theme.scss';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import {
  Title, Description, Primary, Props,
} from '@storybook/addon-docs/blocks';
import { TextField } from '@material-ui/core';
import { Moment } from 'moment/moment';
import { DatePicker } from './DatePicker';
import { DatePickerWrapperProps } from './DatePicker.types';
import { TextInput } from '../TextInput/TextInput';
import { Select } from '../Select/Select';
import { Icon, icons } from '../Icon/Icon';

// eslint-disable-next-line import/named
import { clearButton, SelectItem } from '../Select/Select.types';

import { DatePickerLocalizationCodes } from './utils';

type ComponentProps = {
  value: Date | null | Moment;
  setValue: any;
};

storiesOf('Controls / DatePicker', module)
  .add(
    'Keyboard DatePicker',
    () => {
      const textFieldComponent = (props: any): JSX.Element => (
        <TextInput {...props} />
      );
      const Component = ({ value, setValue }: ComponentProps): JSX.Element => {
        const propsDatePicker: DatePickerWrapperProps = {
          isKeyboard: true,
          variant: 'inline',
          label: 'Only calendar',
          helperText: 'Some helper text',
          textFieldComponentRender: textFieldComponent,
          handleDateChange: (option: any) => {
            const opt = option;
            setValue(option);
            action('Value = ')(option);
            action('moment utc() = ')(moment(opt).utc().format());
          },
          autoClose: true,
          value,
          format: 'yyyy/MM/dd',
          minDate: new Date('2008-01-01'),
          updateMomentLocale: boolean('updateMomentLocale', true),
          initCalendarWithUTC: boolean('initCalendarWithUTC', true),
          weekStartsOn: select('Start from SUNDAY', ['sunday', 'monday'], 'monday'),
        };

        return (
          <div style={{ width: '300px' }}>
            <DatePicker {...propsDatePicker} />
          </div>
        );
      };
      const [value, setValue] = React.useState<Date | null>(null);

      return (
        <div>
          <Component value={value} setValue={setValue} />
        </div>
      );
    },
    {
      docs: {
        page: () => (
          <>
            <Title>DatePicker</Title>
            <Description>Init Empty DatePicker</Description>
            <Primary name="DatePicker" />
            <Props of={DatePicker} />
          </>
        ),
      },
    },
  )
  .add(
    'Init Empty DatePicker',
    () => {
      const [dateValue, setDateValue] = React.useState<Date | null>(null);

      const textFieldComponent = (props: any): JSX.Element => (
        <TextInput
          withIconRight={<Icon iconName={icons.close} />}
          onClickRightIcon={() => setDateValue(null)}
          {...props}
        />
      );
      const Component = ({ value, setValue }: ComponentProps): JSX.Element => {
        const propsDatePicker: DatePickerWrapperProps = {
          variant: 'inline',
          label: 'Only calendar',
          helperText: 'Some helper text',
          textFieldComponentRender: textFieldComponent,
          handleDateChange: (option: any) => {
            const opt = option;
            setValue(option);
            action('Value = ')(option);
            action('moment utc() = ')(moment(opt).utc().format());
          },
          autoClose: true,
          value,
          format: 'yyyy/MM/dd HH:mm',
          minDate: new Date('2008-01-01'),
          updateMomentLocale: boolean('updateMomentLocale', true),
          initCalendarWithUTC: boolean('initCalendarWithUTC', true),
          weekStartsOn: select('Start from SUNDAY', ['sunday', 'monday'], 'monday'),
        };

        return (
          <div style={{ width: '300px' }}>
            <DatePicker {...propsDatePicker} />
          </div>
        );
      };

      return (
        <div>
          <Component value={dateValue} setValue={setDateValue} />
        </div>
      );
    },
    {
      docs: {
        page: () => (
          <>
            <Title>DatePicker</Title>
            <Description>Init Empty DatePicker</Description>
            <Primary name="DatePicker" />
            <Props of={DatePicker} />
          </>
        ),
      },
    },
  )
  .add(
    'Localized Desktop Date Picker',
    () => {
      const textFieldComponent = (props: any): JSX.Element => <TextInput {...props} withIcon={<Icon iconName={icons.calenderDay} />} />;
      const Component = ({ value, setValue }: ComponentProps): JSX.Element => {
        const [cultureCode, setCultureCode] = React.useState<string | undefined>();

        const propsDatePicker: DatePickerWrapperProps = {
          variant: 'inline',
          label: 'Only calendar',
          helperText: 'Some helper text',
          textFieldComponentRender: textFieldComponent,
          handleDateChange: (option: any) => {
            const opt = option;
            setValue(option);
            action('Value = ')(option);
            action('moment utc() = ')(moment(opt).utc().format());
          },
          autoClose: true,
          value,
          format: 'd MMMM yyyy',
          minDate: new Date('2008-01-01'),
          localizationCode: cultureCode,
          updateMomentLocale: boolean('updateMomentLocale', true),
          initCalendarWithUTC: boolean('initCalendarWithUTC', true),
          weekStartsOn: select('Start from SUNDAY', ['sunday', 'monday'], 'monday'),
        };

        const languageOptions = Object.keys(DatePickerLocalizationCodes).map((code) => ({
          id: code,
          name: (DatePickerLocalizationCodes as any)[code],
        }));

        return (
          <>
            <Select
              {...{
                options: languageOptions,
                clearButton: clearButton.auto,
                inputProps: {
                  required: false,
                  disabled: false,
                  helperText: 'Select culture code',
                },
                value,
                onChange: (
                  option: SelectItem | string | SelectItem[] | undefined | any | null,
                ): void => setCultureCode(option?.id),
              }}
            />
            <DatePicker {...propsDatePicker} />
          </>
        );
      };
      const [value, setValue] = React.useState<Date | null>(new Date());

      return (
        <div>
          <Component value={value} setValue={setValue} />
        </div>
      );
    },
    {
      docs: {
        page: () => (
          <>
            <Title>DatePicker</Title>
            <Description>DatePicker component</Description>
            <Primary name="DatePicker" />
            <Props of={DatePicker} />
          </>
        ),
      },
    },
  )
  .add(
    'Desktop Date Picker with custom input',
    () => {
      const textFieldComponent = (props: any): JSX.Element => (
        <TextField className="date-picker-input" {...props} />
      );
      const [value, setValue] = React.useState<Date | null>(new Date());

      const propsDatePicker: DatePickerWrapperProps = {
        variant: 'inline',
        textFieldComponentRender: textFieldComponent,
        handleDateChange: (option: any) => {
          setValue(option);
          action('Value set')(option);
        },
        autoClose: true,
        value,
        format: 'd MMM yyyy',
        minDate: new Date('2008-01-01'),
        initCalendarWithUTC: true,
      };

      return (
        <div>
          <DatePicker {...propsDatePicker} />
        </div>
      );
    },
    {
      docs: {
        page: () => (
          <>
            <Title>DatePicker</Title>
            <Description>Date Picker component</Description>
            <Primary name="DatePicker" />
            <Props of={DatePicker} />
          </>
        ),
      },
    },
  )
  .add(
    'Desktop Date Picker with custom week start day',
    () => {
      const [value, setValue] = React.useState<Date | null>(new Date());

      const propsDatePicker: DatePickerWrapperProps = {
        variant: 'inline',
        textFieldComponentRender: (props) => <TextField className="date-picker-input" {...props} />,
        handleDateChange: (option: any) => {
          setValue(option);
          action('Value set')(option);
        },
        autoClose: true,
        value,
        format: 'd MMM yyyy',
        minDate: new Date('2008-01-01'),
        topHeaderSelectReadOnly: true,
        leftArrowIcon: <Icon iconName={icons.pagnationLeft} />,
        rightArrowIcon: <Icon iconName={icons.pagnationRight} />,
      };

      return (
        <div>
          <DatePicker {...propsDatePicker} />
        </div>
      );
    },
    {
      docs: {
        page: () => (
          <>
            <Title>DatePicker</Title>
            <Description>Date Picker component</Description>
            <Primary name="DatePicker" />
            <Props of={DatePicker} />
          </>
        ),
      },
    },
  );
