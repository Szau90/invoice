import styles from "@/styles/DeleteBtn.module.css";
import { League_Spartan } from "next/font/google";

const league = League_Spartan({ subsets: ["latin"] });

const DeleteBtn: React.FC<{ action: () => void }> = (props) => {
  return (
    <>
      <div className={styles.btn}>
        <button className={league.className} onClick={props.action}>
          Delete
        </button>
      </div>
    </>
  );
};

export default DeleteBtn;
