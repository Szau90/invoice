import { Item } from "@/models/Invoices";
import styles from "@/styles/Items.module.css";

const Items: React.FC<{ items: Item[] }> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <div key={index} className={styles.container}>
          <h1  className={styles.name}>{item.name}</h1>
          <div  className={`${styles.mobile} ${styles.info}`}>
            <h1>{item.quantity} x</h1>
            <h1 >£ {item.price}</h1>
          </div>
          <h1 className={styles.qty}>{item.quantity}</h1>
          <h1 className={styles.price}> £ {item.price}</h1>
          <h1 className={styles.total}>£ {item.total}</h1>
        </div>
      ))}
    </>
  );
};

export default Items;
