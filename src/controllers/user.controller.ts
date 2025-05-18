import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { readCalendars, saveCalendars } from '../utils/fileStorage.js';

export const addHolidaysToCalendar = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { userId } = req.params;
  const { countryCode, year, holidays } = req.body; // Destructure request body for country code, year, and optional holiday names

  if (!countryCode || !year) {
    return res.status(400).json({ error: 'countryCode and year are required' });
  }

  const PUBLIC_HOLIDAYS_URL = process.env.PUBLIC_HOLIDAYS_URL;
  try {
    const response = await fetch(
      `${PUBLIC_HOLIDAYS_URL}${year}/${countryCode}`
    );
    const data = (await response.json()) as any[];
    // console.log(data)

    // If a list of specific holidays is provided, filter them from the full list
    const selectedHolidays =
      Array.isArray(holidays) && holidays.length > 0
        ? data.filter((h: any) => holidays.includes(h.localName))
        : data;
    // console.log(selectedHolidays);

    // Read the current calendars stored in the local file

    const calendars = readCalendars();
    if (!calendars[userId]) calendars[userId] = [];

    calendars[userId].push(...selectedHolidays);
    saveCalendars(calendars);

    res.json({ message: 'Holidays added', added: selectedHolidays.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch or save holidays' });
  }
};
