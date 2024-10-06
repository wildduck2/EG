import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateTypes, Language } from "./localization.types";

const initialState: initialStateTypes = {
  language: {
    lan: "ar",
    dir: "rtl",
  },
};

export const localizationSlice = createSlice({
  name: "localization",
  initialState,
  reducers: {
    changeLocalization: (
      state: initialStateTypes,
      action: PayloadAction<Language>,
    ) => {
      state.language = {
        lan: action.payload.lan,
        dir: action.payload.dir,
      };
    },
  },
});

export const { changeLocalization } = localizationSlice.actions;

export default localizationSlice.reducer;
