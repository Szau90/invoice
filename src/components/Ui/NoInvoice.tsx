import styles from "@/styles/NoInvoice.module.css";
import Image from "next/image";
import { useAppSelector } from "@/Hooks/hooks";

const NoInvoice = () => {
  const darkMode = useAppSelector((state) => state.ui.isDarkMode);

  const darkmodeHandler = darkMode
    ? `${styles.box} ${styles.dark}`
    : styles.box;
  return (
    <>
      <div className={styles.container}>
        <div className={darkmodeHandler}>
          <Image
            width={241}
            height={200}
            alt="empty"
            src={"/assets/illustration-empty.svg"}
          />
          <h1>There is nothing here</h1>
          <p>
            Create a new invoice by clicking the
            <br /> New Invoice button and get started
          </p>
        </div>
      </div>
    </>
  );
};

export default NoInvoice;
