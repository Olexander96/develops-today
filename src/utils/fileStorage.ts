import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data', 'calendars.json');

export const readCalendars = (): Record<string, any[]> => {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
};

export const saveCalendars = (data: Record<string, any[]>): void => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};
