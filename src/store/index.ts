import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import invoiceListSlice from "./invoiceList-slice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    invoice: invoiceListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
