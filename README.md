# Coding Exercise

## Overview
<img width="1607" alt="Screenshot 2022-11-07 at 3 05 19 pm" src="https://user-images.githubusercontent.com/11530457/200224341-b0b59b01-7f81-4d90-a34b-903e3ce1db88.png">
<img width="1608" alt="Screenshot 2022-11-07 at 3 04 24 pm" src="https://user-images.githubusercontent.com/11530457/200224348-d1614f9f-266c-4ea5-b865-f9a5f5921ff5.png">

## Install
Run `npm install` under both `frontend` and `backend` directories
## Config
create a .env file under `frontend` directory with following content
```
REACT_APP_FAVOURITES_API_URL = http://localhost:3001
REACT_APP_DICTIONARY_API_URL = https://api.dictionaryapi.dev
```
## Run
the frontend app run with the node backend, so backend server should be run before frontend dev server.

`cd backend && npm start`
`cd frontend && npm start`

## Unit Test
`npm run test:jest`

### Results
<img width="772" alt="Screenshot 2022-11-07 at 3 01 08 pm" src="https://user-images.githubusercontent.com/11530457/200223949-0fb201a5-0296-4ea4-bc69-227257248e96.png">

## E2E Test
NOTE: Please start node backend before running e2e test

`npm run test:cy`

### Results
<img width="915" alt="Screenshot 2022-11-07 at 3 00 12 pm" src="https://user-images.githubusercontent.com/11530457/200223902-b9abe0df-3024-434d-bda6-6e6bac7bf025.png">

## Dockerise frontend
`cd frontend`

`docker build -t dictionary .`

`docker run -p 8080:80 dictionary`

## What can be imporved, if having more time.

1. Responsive design for small screen and mobile devices
2. Loading design with spinner. Only Loading... text has been added at the moment
3. More error handling design for handling api errors 
4. A11y improvement
5. Covering more scenarios on E2E test
