import styles from "@/styles/Header.module.css";
import Image from "next/image";
import NewBtn from "./Ui/NewBtn";
import { useAppDispatch, useAppSelector } from "@/Hooks/hooks";
import { uiActions } from "@/store/ui-slice";

const Header: React.FC<{ invoiceLeft: number }> = (props) => {
  const { invoiceLeft } = props;
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    dispatch(uiActions.toogleFilter());
  };
  const darkmode = useAppSelector((state) => state.ui.isDarkMode);
  const darkmodeHandler = darkmode
    ? `${styles.box} ${styles.dark}`
    : styles.box;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={darkmodeHandler}>
          <div className={styles.invoices}>
            <h1>Invoices</h1>
            <p>
              <span className={styles.short}>There are </span> {invoiceLeft}{" "}
              invoices <span className={styles.short}>left</span>
            </p>
          </div>
          <div className={styles.filter}>
            <p>
              Filter <span className={styles.short}>by status</span>
            </p>
            <Image
              onClick={clickHandler}
              src={"/assets/icon-arrow-down.svg"}
              width={11}
              height={7}
              alt={"arrow-down"}
            />
          </div>
          <NewBtn />
        </div>
      </div>
    </>
  );
};

export default Header;
