import styles from "@/styles/LightGrayBtn.module.css";
import { League_Spartan } from "next/font/google";
import { useAppSelector } from "@/Hooks/hooks";

const league = League_Spartan({ subsets: ["latin"] });

const LightGrayBtn: React.FC<{ title: string; action: () => void }> = (
  props
) => {
  const darkMode = useAppSelector((state) => state.ui.isDarkMode);

  const darkModeHandler = darkMode
    ? `${styles.btn} ${styles.dark}`
    : styles.btn;

  return (
    <>
      <div className={darkModeHandler}>
        <button
          type="button"
          onClick={props.action}
          className={league.className}
        >
          {props.title}
        </button>
      </div>
    </>
  );
};

export default LightGrayBtn;
