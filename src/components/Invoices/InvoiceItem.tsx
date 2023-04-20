import styles from "@/styles/InvoiceItem.module.css";
import GoBackBtn from "../Ui/GoBackBtn";
import InvoiceData from "./InvoiceData";
import StatusLabel from "./StatusLabel";
import BtnGrp from "../Ui/BtnGrp";
import { useAppSelector } from "@/Hooks/hooks";
import { useRouter } from "next/router";

const InvoiceItem: React.FC<{
  id: string;
  status: string;
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
  const {
    id,
    status,
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
  const router = useRouter();
  const action = () => {
    router.push("/");
  };
  const darkMode = useAppSelector((state) => state.ui.isDarkMode);
  const darkmodeHandler = darkMode
    ? `${styles.mobile} ${styles.darkBox}`
    : `${styles.mobile} ${styles.box}`;
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <GoBackBtn action={action} />
          <StatusLabel status={status} id={id} />
          <InvoiceData
            id={id}
            senderAddress={senderAddress}
            createdAt={createdAt}
            clientName={clientName}
            clientEmail={clientEmail}
            clientAddress={clientAddress}
            paymentDue={paymentDue}
            item={item}
            price={price}
            description={description}
          />
        </div>
        <div className={darkmodeHandler}>
          <BtnGrp id={id} status={status} />
        </div>
      </div>
    </>
  );
};

export default InvoiceItem;
