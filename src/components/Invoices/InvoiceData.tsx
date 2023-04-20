import styles from "@/styles/InvoiceData.module.css";
import { useAppSelector } from "@/Hooks/hooks";
import DeleteModal from "../Ui/DeleteModal";

const InvoiceData: React.FC<{
  id: string;
  senderAddress: {
    city: string;
    country: string;
    postCode: string;
    street: string;
  };
  createdAt: Date;
  clientName: string;
  clientEmail: string;
  clientAddress: {
    city: string;
    country: string;
    postCode: string;
    street: string;
  };
  paymentDue: Date;
  item: [
    {
      name: string;
      price: number;
      quantity: number;
      total: number;
    },
    {
      name: string;
      price: number;
      quantity: number;
      total: number;
    }
  ];
  price: number;
  description: string;
}> = (props) => {
  const showModal = useAppSelector((state) => state.ui.showDeleteModal);
  const darkMode = useAppSelector((state) => state.ui.isDarkMode);

  const darkmodeHandler = darkMode ? styles.dark : styles.box;
  const darkContainerHandler = darkMode
    ? `${styles.container} ${styles.darkContainer}`
    : styles.container;
  const darkFooterHandler = darkMode
    ? `${styles.footer} ${styles.darkFooter}`
    : styles.footer;
  const darkC1handler = darkMode ? `${styles.c1} ${styles.darkCol}` : styles.c1;
  const darkC2handler = darkMode ? `${styles.c2} ${styles.darkCol}` : styles.c2;
  const darkC3handler = darkMode ? `${styles.c3} ${styles.darkCol}` : styles.c3;
  const darkC4handler = darkMode ? `${styles.c4} ${styles.darkCol}` : styles.c4;
  const darkTableHandler = darkMode
    ? `${styles.table} ${styles.darkTable}`
    : styles.table;

  const {
    id,
    senderAddress,
    createdAt,
    clientAddress,
    clientName,
    clientEmail,
    paymentDue,
    item,
    price,
    description,
  } = props;

  const isEmpty = item[1] === undefined || item[1].name === "";

  return (
    <>
      <div className={darkmodeHandler}>
        {showModal && <DeleteModal id={id} />}
        <div className={darkTableHandler}>
          <div className={styles.col1}>
            <div className={styles.title}>
              <h1>
                <span>#</span>
                {id}
              </h1>
              <p>{description}</p>
            </div>
            <div className={styles.mobile}>
              <p>{senderAddress.street}</p>
              <p>{senderAddress.city}</p>
              <p>{senderAddress.postCode}</p>
              <p>{senderAddress.country}</p>
            </div>
            <div className={styles.date}>
              <p>Invoice Date</p>
              <h1>{createdAt.toString().slice(0, 10)}</h1>
            </div>
            <div className={styles.payment}>
              <p>Payment Due</p>
              <h1>{paymentDue.toString().slice(0, 10)}</h1>
            </div>
          </div>
          <div className={styles.col2}>
            <p>Bill to</p>
            <h1>{clientName}</h1>
            <p>{clientAddress.street}</p>
            <p>{clientAddress.city}</p>
            <p>{clientAddress.postCode}</p>
            <p>{clientAddress.country}</p>
          </div>
          <div className={styles.col3}>
            <p>Sent to</p>
            <h1>{clientEmail}</h1>
          </div>
          <div className={`${styles.col4} ${styles.desktop}`}>
            <p>{senderAddress.street}</p>
            <p>{senderAddress.city}</p>
            <p>{senderAddress.postCode}</p>
            <p>{senderAddress.country}</p>
          </div>
        </div>
        <section className={styles.wrapper}>
          <div className={darkContainerHandler}>
            <div className={darkC1handler}>
              <p className={styles.desktop}>Item name</p>
              <h1>{item[0].name}</h1>
              <div className={`${styles.mobile} ${styles.info}`}>
                <h1>{item[0].quantity} x</h1>
                <h1>£ {item[0].price}</h1>
              </div>
              {!isEmpty && (
                <div>
                  <h1>{item[1].name}</h1>
                  <div className={`${styles.mobile} ${styles.info}`}>
                    <h1 className={styles.mobile}>{item[1].quantity} x</h1>
                    <h1 className={styles.mobile}>£ {item[1].price}</h1>
                  </div>
                </div>
              )}
            </div>
            <div className={darkC2handler}>
              <p className={styles.desktop}>Qty.</p>
              <h1 className={styles.desktop}>{item[0].quantity}</h1>
              {!isEmpty && (
                <h1 className={styles.desktop}>{item[1].quantity}</h1>
              )}
            </div>
            <div className={darkC3handler}>
              <p className={styles.desktop}>Price</p>
              <h1 className={styles.desktop}>£ {item[0].price}</h1>
              {!isEmpty && (
                <h1 className={styles.desktop}>£ {item[1].price}</h1>
              )}
            </div>
            <div className={darkC4handler}>
              <p className={styles.desktop}>Total</p>
              <h1>£ {item[0].total.toFixed(2)}</h1>
              {!isEmpty && <h1>£ {item[1].total}</h1>}
            </div>
          </div>

          <div className={darkFooterHandler}>
            <p>Amuount Due</p>
            <h1>£ {price}</h1>
          </div>
        </section>
      </div>
    </>
  );
};

export default InvoiceData;
