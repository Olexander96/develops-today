# Country Info App

An application for retrieving information about countries, their holidays, and calendar.

## Requirements

- Node.js (version 18 or higher)
- npm (Node.js package manager)

## Installation

1. Clone the repository:

```bash
git clone [your repository URL]
cd [project folder name]
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables (you can get from task description):

```env
PORT=5000
PUBLIC_HOLIDAYS_URL=...PublicHolidays/
AVALIABLE_COUNTRIES_URL=...AvailableCountries
COUNTRY_INFO_URL=...CountryInfo/
COUNTRY_POPULATION_URL=...countries/population
COUNTRY_IMAGES_URL=...countries/flag/images
```

## Running the Project

For development (with auto-reload on changes):

```bash
npm run dev
```

For production:

```bash
npm start
```

The server will be available at: `http://localhost:5000`

## API Endpoints

### Countries

- `GET /api/countries/available` - get list of available countries
- `GET /api/countries/info/:code` - get detailed information about a country

### Users

- `POST /api/users/:userId/calendar/holidays` - add holidays to user's calendar

## Technologies

- TypeScript
- Express.js
- Node.js
- ES Modules
