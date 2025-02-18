import { describe, it, expect } from 'vitest';
import {
  getHoursAndMinutes12,
  getHoursAndMinutes24,
  isArrivalNextDay,
  differenceInHoursAndMinutes,
} from './time-conversion-utils';

describe('getHoursAndMinutes12', () => {
  it('should return time in 12-hour format', () => {
    const date = '2023-10-10T14:30:00Z';
    const result = getHoursAndMinutes12(date);
    expect(result).toBe('7:30 AM');
  });
});

describe('getHoursAndMinutes24', () => {
  it('should return time in 24-hour format', () => {
    const date = '2023-10-10T14:30:00Z';
    const result = getHoursAndMinutes24(date);
    expect(result).toBe('07:30');
  });
});

describe('isArrivalNextDay', () => {
  it('should return true if arrival is on the next day', () => {
    const dateStart = '2023-10-10T23:30:00Z';
    const dateEnd = '2023-10-11T05:30:00Z';
    const result = isArrivalNextDay(dateStart, dateEnd);
    expect(result).toBe(true);
  });

  it('should return false if arrival is on the same day', () => {
    const dateStart = '2023-10-10T14:30:00Z';
    const dateEnd = '2023-10-10T16:30:00Z';
    const result = isArrivalNextDay(dateStart, dateEnd);
    expect(result).toBe(false);
  });
});

describe('differenceInHoursAndMinutes', () => {
  it('should return the difference in hours and minutes', () => {
    const dateStart = '2023-10-10T14:30:00Z';
    const dateEnd = '2023-10-10T16:45:00Z';
    const result = differenceInHoursAndMinutes(dateStart, dateEnd);
    expect(result).toBe('2 hs 15 mins');
  });

  it('should return the difference in hours and minutes when crossing days', () => {
    const dateStart = '2023-10-10T23:30:00Z';
    const dateEnd = '2023-10-11T01:45:00Z';
    const result = differenceInHoursAndMinutes(dateStart, dateEnd);
    expect(result).toBe('2 hs 15 mins');
  });
});
