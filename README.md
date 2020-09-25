# codebrew

## Front-end
To install Expo:
1. `npm i --global expo`
2. `npm i --global expo-cli`

To run: `npm start` (in `mobile`)

### Code overview
- Ignore everything except `screens/` and `components/`.
- The `components/__tests__` should be filled out properly but I haven't got there yet.
- The navigation is done in `navigation/BottomTabNavigator.jsx` via some black magic.
It's not too hard to figure out loosely what's going on by reading [https://reactnavigation.org/docs/stack-navigator](https://reactnavigation.org/docs/stack-navigator).
- `screens/AuthorisationScreen.jsx` will be the one-time PIN flow.
- `screens/PrescriptionsScreen.jsx` contains buttons (need to be styled properly) leading to "Current Prescriptions" as
well as "Last Repeat". This flow can be sketched out in more detail tomorrow. 