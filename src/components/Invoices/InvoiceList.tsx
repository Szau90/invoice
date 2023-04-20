import styles from "@/styles/InvoiceList.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppSelector } from "@/Hooks/hooks";

const InvoiceList: React.FC<{
  id: string;
  clientName: string;
  price: number;
  status: string;
  createdAt: Date;
}> = (props) => {
  const { id, clientName, price, status, createdAt } = props;
  const router = useRouter();

  const darkMode = useAppSelector((state) => state.ui.isDarkMode);
  const darkmodeHandler = darkMode
    ? `${styles.box} ${styles.dark}`
    : styles.box;

  const action = () => {
    router.push(`/${id}`);
  };
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
      <ul className={styles.list}>
        <li>
          <div className={styles.wrapper}>
            <div onClick={action} className={darkmodeHandler}>
              <div className={styles.col1}>
                <h3>
                  <span className={styles.hashTag}>#</span>
                  {id}
                </h3>
                <p>Due {createdAt.toString().slice(0, 10)}</p>
                <p className={styles.desktop}>{clientName}</p>
                <h3 className={styles.mobile}>£ {price}</h3>
              </div>
              <div className={styles.col2}>
                <p className={styles.mobile}>{clientName}</p>
                <h3 className={styles.desktop}>£ {price}</h3>
                <div className={classHandler}>
                  <span>•</span>
                  {status}
                </div>

                <div className={styles.desktop}>
                  <Image
                    src={"/assets/icon-arrow-right.svg"}
                    width={7}
                    height={10}
                    alt={"arrow-right"}
                    onClick={action}
                  />
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};

export default InvoiceList;
