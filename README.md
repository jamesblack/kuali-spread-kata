# kuali-spread-kata

# Prerequisites

- [`node`](https://nodejs.org/en/) >= 6
- `npm` (should come bundled with node)
- `yarn` (optional)

# Installation

- Clone this repo
- `npm i` or `yarn` - Installs dependencies

# Scripts

- `npm start` - Starts up the server on port 8000 (by default)
- `npm run start.dev` - Starts the server in dev mode (will restart server when
  there are file changes)

Alternatively, you can use yarn to run these scripts:

- `yarn start`
- `yarn start.dev`

# Usage

To hit the endpoints, use these links, or use the curl commands to test the api:

## Weather

[Weather](http://localhost:8000/weather)

```sh
curl http://localhost:8000/weather
```

## Soccer

[Soccer](http://localhost:8000/soccer)

```sh
curl http://localhost:8000/soccer
```
