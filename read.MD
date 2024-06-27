
# Backend Project

## Overview

This is the backend service for the team management application. It is built using Node.js and TypeScript, and it leverages Supabase for database management.


## Installation

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



## Environment Variables

Make sure to set up the following environment variables in a `.env` file:

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

