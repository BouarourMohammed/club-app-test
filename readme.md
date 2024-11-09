# Test React Native

This project is a test implementation of a football club and player management app built with **React Native**, **Redux**, and **TypeScript** using **Expo**.

A small video demo of the app on iOS and Android is available here: [![Club App Test](https://github.com/user-attachments/assets/3bc74e3c-11c3-40e1-bb0c-f4917ddf9c40)](https://github.com/user-attachments/assets/3bc74e3c-11c3-40e1-bb0c-f4917ddf9c40)

## Table of Contents

- [Project Overview](#project-overview)
- [Data Model](#data-model)
- [Screens](#screens)
- [Installation](#installation)
- [Usage](#usage)
- [APK](#apk)
  

## Project Overview

This application allows users to view a list of football clubs and see details about each club and its players. Key features include:

- State management using **Redux**.
- Defined data models for **Clubs**, **Players**, and **Seasons** with generated test data.
- Optional integration of **React Hook Form** for handling club addition forms.

## Data Model

Data models and test data generation are detailed in the files [src/types/index.ts](src/types/index.ts), [src/store/thunks/dataThunks.ts](src/store/thunks/dataThunks.ts).

## Screens

1. **Home Screen**: Displays a list of football clubs.
2. **Club Details Screen**: Shows details of the selected club, including the list of players for the current season.
3. **Add Club Screen** (Optional): Allows users to add new clubs using [React Hook Form](https://react-hook-form.com/get-started/#ReactNative). Accessible from the Home Screen, it updates the Redux state with the new club in real-time.

## Installation

To install and run the project locally, follow these steps:

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd test-react-native

# Install dependencies
npm install

# Start the Expo development server (no custom dev client required)
npx expo start

# Optional: Eject to iOS/Android projects to build native code
npx expo prebuild

# Run the app on iOS or Android
npx expo run:ios     # For iOS
npx expo run:android # For Android
```

## Usage

- **Home Screen**: View a list of all clubs. Tap on a club to see its details.
- **Club Details Screen**: View the club’s information and the list of players for the current season.
- **Add Club Screen**: Accessible from the Home Screen, allowing users to add clubs directly to the Redux store in real-time.

## APK

The APK file is located here: [app.zip](app.zip)
