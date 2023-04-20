import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showFormModal: false,
    showCheckboxModal: false,
    filter: "all",
    checked: false,
    showFirstItem: false,
    showSecondItem: false,
    showDeleteModal: false,
    isDarkMode: false,
  },
  reducers: {
    toogle(state) {
      state.showFormModal = !state.showFormModal;
    },
    toogleFilter(state) {
      state.showCheckboxModal = !state.showCheckboxModal;
    },
    toogleCheck(state) {
      state.checked = !state.checked;
    },
    toogleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    deleteModalOn(state) {
      state.showDeleteModal = true;
    },
    deleteModalOff(state) {
      state.showDeleteModal = false;
    },
    changeFilter(state, action) {
      state.filter = action.payload;
    },
    resetFilter(state) {
      state.filter = "all";
    },
    firstItemOn(state) {
      state.showFirstItem = true;
    },
    firstItemOff(state) {
      state.showFirstItem = false;
    },
    secondItemOn(state) {
      state.showSecondItem = true;
    },
    secondItemOff(state) {
      state.showSecondItem = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
