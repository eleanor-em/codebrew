# codebrew

## Configuration
* `express-server/config.js` needs to be created following the example from `express-server/config.js.sample`.
* To test locally, ensure `mobile/config.js` has the correct API address. It should point to the computer hosting the Express server on LAN.

## Back-end
### Express server:
To install dependencies: `npm install` in __express-server__

To run: `npm start` in __express-server__

### React frontend:
To install dependencies: `npm install` in __react-frontend__

To run: `npm start` in __react-frontend__

The files are set up for React to proxy to backend server for API calls.

## Mobile app
To install Expo:
1. `npm i --global expo`
2. `npm i --global expo-cli`
 
To run: `expo start` (in `mobile/`)

### Code overview
- Focus on `App.tsx`, `api.ts`, `utils.ts`, `screens/`, and `components/`.
- The `components/__tests__` should be filled out properly but I haven't got there yet.
- The navigation is done in `navigation/BottomTabNavigator.jsx` via some black magic.
It's not too hard to figure out loosely what's going on by reading [https://reactnavigation.org/docs/stack-navigator](https://reactnavigation.org/docs/stack-navigator).
- `screens/AuthorisationScreen.jsx` will be the one-time PIN flow.
- `screens/PrescriptionsScreen.jsx` contains buttons (need to be styled properly) leading to "Current Prescriptions" as
well as "Last Repeat". This flow can be sketched out in more detail tomorrow. 
