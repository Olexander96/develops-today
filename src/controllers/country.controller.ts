import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

// URL-адреси з .env
const AVALIABLE_COUNTRIES_URL = process.env.AVALIABLE_COUNTRIES_URL!;
const COUNTRY_INFO_URL = process.env.COUNTRY_INFO_URL!;
const COUNTRY_POPULATION_URL = process.env.COUNTRY_POPULATION_URL!;
const COUNTRY_IMAGES_URL = process.env.COUNTRY_IMAGES_URL!;

// Типи для зовнішніх API (можна винести у файл типів, якщо буде потреба)
type CountryInfo = {
  name: string;
  borders: string[];
};

type PopulationItem = {
  country: string;
  iso2: string;
  populationCounts: {
    year: string;
    value: number;
  }[];
};

type PopulationApiResponse = {
  data: PopulationItem[];
};

type FlagItem = {
  name: string;
  iso2: string;
  flag: string;
};

type FlagApiResponse = {
  data: FlagItem[];
};

export const getAvailableCountries = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await fetch(`${AVALIABLE_COUNTRIES_URL}`);
    const countries = await response.json();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get available countries!' });
  }
};

export const getCountryInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const code = req.params.code;

  try {
    const [countryInfoRes, populationRes, flagRes] = await Promise.all([
      fetch(`${COUNTRY_INFO_URL}${code}`),
      fetch(`${COUNTRY_POPULATION_URL}`),
      fetch(`${COUNTRY_IMAGES_URL}`),
    ]);

    const countryInfo: CountryInfo = await countryInfoRes.json();
    const populationData: PopulationApiResponse = await populationRes.json();
    const flagData: FlagApiResponse = await flagRes.json();

    const population = populationData.data.find(
      (item) => item.iso2 === code || item.country === countryInfo.name
    );

    const flag = flagData.data.find(
      (item) => item.iso2 === code || item.name === countryInfo.name
    );

    res.json({
      name: countryInfo.name,
      borders: countryInfo.borders,
      population: population?.populationCounts || [],
      flagUrl: flag?.flag || null,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get country info' });
  }
};
