import { Moment } from 'moment';
import { DatePickerProps } from '@material-ui/pickers';

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

interface IPosition {
  horizontal: number | 'left' | 'center' | 'right';
  vertical: number | 'center' | 'top' | 'bottom';
}

export type WeekDay =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';
export interface OwnBaseProps {
  value: Date | null | Moment;
  variant?: 'dialog' | 'inline' | 'static';
  helperText?: string;
  disableToolbar?: boolean;
  // eslint-disable-next-line no-unused-vars
  label?: string;
  // eslint-disable-next-line no-unused-vars
  textFieldComponentRender?: (props: any) => JSX.Element;
  // eslint-disable-next-line no-unused-vars
  handleDateChange?: (value: Date | string | null) => void | undefined;
  autoClose?: boolean;
  anchorOrigin?: IPosition | undefined;
  transformOrigin?: IPosition | undefined;
  format?: string | undefined;
  minDate?: Date | null;
  maxDate?: Date | null;
  localizationCode?: string;
  weekStartsOn?: WeekDay;
  updateMomentLocale?: boolean;
  inactive?: boolean;
  topHeaderSelectReadOnly?: boolean;
  initCalendarWithUTC?: boolean;
  isKeyboard?: boolean;
}

export type DatePickerWrapperProps = OwnBaseProps & Optional<DatePickerProps, 'onChange'>;
