import styles from "@/styles/PurpleBtn.module.css";
import { League_Spartan } from "next/font/google";

const league = League_Spartan({ subsets: ["latin"] });

const PurpleBtn: React.FC<{ title: string; action: () => void }> = (props) => {
  return (
    <>
      <div className={styles.btn}>
        <button
          onClick={props.action}
          type="submit"
          className={league.className}
        >
          {props.title}
        </button>
      </div>
    </>
  );
};

export default PurpleBtn;
