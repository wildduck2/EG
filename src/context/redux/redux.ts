import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import localizationReducer from "../localization/localization";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  localization: localizationReducer,
});

export const store = configureStore({
  reducer: {
    localization: localizationReducer,
  },
});

//NOTE: you will need this later
// import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync'
// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createStateSyncMiddleware({})),
// initMessageListener(store)
