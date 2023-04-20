import styles from "@/styles/CheckboxModal.module.css";
import { useEffect, useState } from "react";
import { uiActions } from "@/store/ui-slice";
import { useAppDispatch, useAppSelector } from "@/Hooks/hooks";

const CheckboxModal = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.ui.filter);
  const checked = useAppSelector((state) => state.ui.checked);
  const darkMode = useAppSelector((state) => state.ui.isDarkMode);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(uiActions.changeFilter(event.target.value));
    dispatch(uiActions.toogleCheck());
  };
  useEffect(() => {
    if (!checked) {
      dispatch(uiActions.resetFilter());
    }
  }, [checked, dispatch]);

  const darkmodeHandler = darkMode
    ? `${styles.card} ${styles.dark}`
    : styles.card;

  return (
    <>
      <div className={darkmodeHandler}>
        <div>
          <label>
            <input
              onChange={changeHandler}
              type="checkbox"
              id="pending"
              name="pending"
              value={"pending"}
              checked={value === "pending" && checked}
            />
            <span className={styles.checkmark}></span>
            Pending
          </label>
          <label>
            <input
              onChange={changeHandler}
              type="checkbox"
              id="Paid"
              name="Paid"
              value={"paid"}
              checked={value === "paid" && checked}
            />
            Paid
          </label>
          <label>
            <input
              onChange={changeHandler}
              type="checkbox"
              id="draft"
              name="draft"
              value={"draft"}
              checked={value === "draft" && checked}
            />
            Draft
          </label>
        </div>
      </div>
    </>
  );
};

export default CheckboxModal;
