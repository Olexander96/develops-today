import { Router } from 'express';
import {
  getAvailableCountries,
  getCountryInfo,
} from '../controllers/country.controller.js';

const router = Router();

router.get('/available', getAvailableCountries);
router.get('/info/:code', getCountryInfo);

export default router;
