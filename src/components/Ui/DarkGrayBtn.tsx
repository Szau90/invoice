import styles from "@/styles/DarkGrayBtn.module.css";
import { League_Spartan } from "next/font/google";

const league = League_Spartan({ subsets: ["latin"] });

const DarkGrayBtn: React.FC<{ title: string; action: () => void }> = (
  props
) => {
  return (
    <>
      <div className={styles.btn}>
        <button
          type="submit"
          onClick={props.action}
          className={league.className}
        >
          {props.title}
        </button>
      </div>
    </>
  );
};

export default DarkGrayBtn;
