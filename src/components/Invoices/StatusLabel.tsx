import styles from "@/styles/StatusLabel.module.css";
import { useAppSelector } from "@/Hooks/hooks";

import BtnGrp from "../Ui/BtnGrp";

const StatusLabel: React.FC<{
  id: string;
  status: string;
}> = (props) => {
  const { id, status } = props;

  const darkMode = useAppSelector((state) => state.ui.isDarkMode);

  const darkmodeHandler = darkMode ? styles.dark : styles.box;

  const classHandler =
    status === "pending"
      ? styles.pending
      : status === "paid"
      ? styles.paid
      : darkMode && status === "draft"
      ? styles.darkStatus
      : styles.draft;

  return (
    <>
      <div className={darkmodeHandler}>
        <div className={styles.status}>
          <h1>Status</h1>
          <p className={classHandler}>
            {" "}
            <span>•</span> {props.status}
          </p>
        </div>
        <div className={`${styles.btnGrp} ${styles.hide}`}>
          <BtnGrp id={id} status={status} />
        </div>
      </div>
    </>
  );
};

export default StatusLabel;
