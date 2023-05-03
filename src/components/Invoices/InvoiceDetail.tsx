import styles from "@/styles/InvoiceDetail.module.css";
import SideBar from "../Ui/SideBar";
import InvoiceItem from "./InvoiceItem";
import { useAppSelector } from "@/Hooks/hooks";
import EditFormReact from "../Form/EditFormReact";
import { Item } from "@/models/Invoices";

const InvoiceDetail: React.FC<{
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
  item: Item[];
  price: number;
  description: string;
}> = (props) => {
  const showModal = useAppSelector((state) => state.ui.showFormModal);
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

  const darkMode = useAppSelector((state) => state.ui.isDarkMode);

  const classHandler = darkMode ? styles.dark : styles.main;
  return (
    <>
      <SideBar />
      <main className={classHandler}>
        {showModal && (
          <EditFormReact
            id={id}
            senderAddress={senderAddress}
            clientName={clientName}
            clientEmail={clientEmail}
            clientAddress={clientAddress}
            paymentDue={paymentDue}
            createdAt={createdAt}
            description={description}
    
            status={status}
          />
        )}
        <InvoiceItem
          status={status}
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
      </main>
    </>
  );
};

export default InvoiceDetail;
