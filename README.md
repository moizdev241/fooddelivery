# ForkIt — Food Delivery (Demo)

A minimal React Native food delivery app built for a technical screening. Not
production-hardened — scoped to demonstrate architecture, auth/role handling,
and core CRUD/ordering flows with Firebase.

## Stack

- React Native CLI (0.87), TypeScript
- React Navigation (native-stack + bottom-tabs)
- Redux Toolkit + `redux-persist` (cart persists locally; auth state is
  re-derived from Firebase's own session on launch)
- Firebase (`@react-native-firebase`): Auth (Google Sign-In) + Firestore
- Single-accent light theme (`src/theme`), following Apple HIG spacing/typography conventions

## Folder structure

```
src/
  theme/         design tokens — colors, typography, spacing, radius
  constants/     screen names, roles, order status enums
  types.ts       shared domain types (UserProfile, Restaurant, Meal, Order)
  firebase/      single re-export point for the firebase modular SDK
  services/      Firestore/Auth reads & writes (authService, restaurantService, mealService, orderService, userService)
  redux/         store, rootReducer, slices (user, cart)
  navigation/    AuthNavigator, UserTabsNavigator, OwnerTabsNavigator, AppNavigator, RootNavigator
  components/    atoms (Button, TextInput, Txt, Badge, …) and molecules (RestaurantCard, MealRow, OrderCard)
  screens/       one folder per screen: `Screen.screen.tsx` + `styles.ts`
```

## Data model (Firestore)

- `users/{uid}` — `name, email, role: 'user' | 'owner', isBlocked`
- `restaurants/{id}` — `ownerId, name, description`
- `restaurants/{id}/meals/{id}` — `name, description, price`
- `orders/{id}` — `userId, userName, restaurantId, restaurantName, items[], totalAmount, status, statusHistory[], createdAt`

`firestore.rules` at the project root enforces: owners can only CRUD their
own restaurants/meals, customers can only create orders for themselves, and orders can
only move forward through the status chain below, one step at a time, each
step gated to the one role that's allowed to make it — see `orderService.ts`
for the corresponding named actions (`cancelOrder`, `startProcessing`, etc.)
and `OrderCard`'s "View history" toggle for the `statusHistory` timeline.

```
Placed --(Customer)--> Canceled
Placed --(Owner)--> Processing --(Owner)--> In Route --(Owner)--> Delivered --(Customer)--> Received
```

## Auth: Google Sign-In

`SignIn.screen.tsx` is a single "Continue with Google" button —
`authService.signInWithGoogle` gets an ID token from
`@react-native-google-signin/google-signin` and exchanges it for a Firebase
session via `GoogleAuthProvider`. First-time users land on
`CompleteProfile.screen.tsx` to pick a role (Customer / Restaurant Owner) —
name and email come straight from the Google account, so that screen only
asks for the one thing Google can't tell us — before a Firestore profile is
created. See `pendingAuth` in `userSlice` and the branch in
`RootNavigator`/`AuthNavigator` that drives it.

## What I still need from you

1. **A Firebase project** with:
   - **Authentication → Sign-in method → Google** enabled (this also requires
     setting a public app name + support email on the Google Cloud OAuth
     consent screen the first time — the console walks you through it).
   - **Firestore Database** created (start in test mode, then apply `firestore.rules`).
2. **An Android app** registered in that project with package name
   `com.fooddeliverytesting` → download `google-services.json` → place it at
   `android/app/google-services.json`. Google Sign-In on Android also
   **requires a SHA-1 fingerprint** registered on that app (Project Settings
   → your Android app → Add fingerprint) or it fails outright — for the
   debug build that's:
   ```sh
   keytool -list -v -keystore android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```
3. **An iOS app** registered with bundle ID `com.fooddeliverytesting` →
   download `GoogleService-Info.plist` → drag it into the `FoodDeliveryTesting`
   target in Xcode (`ios/FoodDeliveryTesting.xcworkspace`), checking "Copy
   items if needed".
4. **The Web client ID** Firebase auto-creates once Google sign-in is
   enabled (Authentication → Sign-in method → Google → Web SDK configuration,
   or the `client_id` entry with `"client_type": 3` in `google-services.json`)
   → paste it into `GOOGLE_WEB_CLIENT_ID` in `src/constants/constants.ts`.
   Not a secret, just needs to match your project.

Once those are in place:

```sh
npm install
cd ios && pod install && cd ..
npm run ios      # or: npm run android
```

Note: two of the app's queries (order history, incoming orders) combine an
equality filter with `orderBy`, which Firestore serves only with a composite
index. The first time each query runs, Firestore/Metro will log an error
with a direct link to auto-create the missing index — just click it once.

## Trying both roles

Sign in with two different Google accounts, picking **Customer** on one and
**Restaurant Owner** on the other when each completes their profile. As the
owner: create a restaurant, add a few meals, then sign in as the customer to
browse and place an order — it shows up under the owner's **Orders** tab in
real time.
