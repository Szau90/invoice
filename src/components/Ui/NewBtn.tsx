import styles from "@/styles/NewBtn.module.css";
import Image from "next/image";
import { League_Spartan } from "next/font/google";
import { useAppDispatch } from "@/Hooks/hooks";
import { uiActions } from "@/store/ui-slice";

const league = League_Spartan({ subsets: ["latin"] });

const NewBtn = () => {
  const dispatch = useAppDispatch();

  const action = () => {
    dispatch(uiActions.toogle());
  };

  return (
    <>
      <button className={styles.btn} onClick={action}>
        <span className={styles.circle}>
          <Image
            src={"/assets/icon-plus.svg"}
            width={11}
            height={11}
            alt={"icon-plus"}
          />
        </span>
        <h3 className={league.className}>
          New <span className={styles.short}>Invoice</span>
        </h3>
      </button>
    </>
  );
};

export default NewBtn;
