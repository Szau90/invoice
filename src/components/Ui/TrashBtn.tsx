import styles from "@/styles/TrashBtn.module.css";
import Image from "next/image";

const TrashBtn: React.FC<{ action: () => void }> = (props) => {


  return (
    <>
      <div className={styles.btn}>
        <button type="button" onClick={props.action}>
          <Image
            src={"/assets/icon-delete.svg"}
            width={13}
            height={16}
            alt={"delete-btn"}
          />
        </button>
      </div>
    </>
  );
};

export default TrashBtn;
