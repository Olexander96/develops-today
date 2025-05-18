import { Router, RequestHandler } from 'express';
import { addHolidaysToCalendar } from '../controllers/user.controller.js';

const router = Router();

router.post(
  '/:userId/calendar/holidays',
  addHolidaysToCalendar as RequestHandler
);

export default router;
