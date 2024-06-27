
# Backend Project

## Overview

This is the backend service for the team management application. It is built using Node.js and TypeScript, and it leverages Supabase for database management.


## Installation

Clone the repository.
To install the necessary dependencies, run:

```bash
npm install
```

## Scripts


- **import-data**: Imports dummy data into the database.
  ```bash
  npm run import-data
  ```
- **build**: Compiles TypeScript files.
  ```bash
  npm run build
  ```
- **start**: Starts the server using nodemon.
  ```bash
  npm start
  ```
  create tsconfig.json file
  `````
  npx tsc --init
  `````

## Environment Variables

Make sure to set up the following environment variables in a `.env` file:

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

## Dependencies

### Main Dependencies

- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **@supabase/supabase-js**: Client library for interacting with Supabase.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.

### Development Dependencies

- **nodemon**: Automatically restarts the server when changes are detected during development.
- **typescript**: TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
- **@types/express**: TypeScript definitions for Express.
- **@types/node**: TypeScript definitions for Node.js.

These dependencies are essential for running and developing the backend application. Make sure to install them using `npm install` before starting the project.
