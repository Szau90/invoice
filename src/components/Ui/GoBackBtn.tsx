import styles from "@/styles/GoBackBtn.module.css";
import Image from "next/image";
import { League_Spartan } from "next/font/google";
import { useAppSelector } from "@/Hooks/hooks";

const league = League_Spartan({ subsets: ["latin"] });

const GoBackBtn: React.FC<{ action: () => void }> = (props) => {
  const darkMode = useAppSelector((state) => state.ui.isDarkMode);

  const classHandler = darkMode ? `${styles.dark} ${styles.btn}` : styles.btn;

  return (
    <div className={classHandler}>
      <button className={league.className} onClick={props.action}>
        <Image
          src={"/assets/icon-arrow-left.svg"}
          width={7}
          height={10}
          alt={"icon-arrow-left"}
        />
        Go back{" "}
      </button>
    </div>
  );
};

export default GoBackBtn;
