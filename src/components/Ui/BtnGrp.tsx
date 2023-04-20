import styles from "@/styles/StatusLabel.module.css";
import DeleteBtn from "../Ui/DeleteBtn";
import LightGrayBtn from "../Ui/LightGrayBtn";
import PurpleBtn from "../Ui/PurpleBtn";
import { useAppDispatch } from "@/Hooks/hooks";
import { uiActions } from "@/store/ui-slice";
import { useRouter } from "next/router";

const BtnGrp: React.FC<{ id: string; status: string }> = (props) => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const updateInvoiceStatus = async (invoiceId: string, status: string) => {
    const res = await fetch(`/api/editStatus/${invoiceId}`, {
      method: "PUT",
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.data.error.message);
    }

    router.push("/");
  };

  const toogleModalHandler = () => {
    dispatch(uiActions.deleteModalOn());
  };

  const statusHandler = () => updateInvoiceStatus(props.id, status);

  const action = () => {
    dispatch(uiActions.toogle());
  };
  return (
    <>
      <div className={styles.editBtn}>
        <LightGrayBtn title={"Edit"} action={action} />
      </div>
      <DeleteBtn action={toogleModalHandler} />
      <div className={styles.purpleBtn}>
        <PurpleBtn title={"Mark as Paid"} action={statusHandler} />
      </div>
    </>
  );
};

export default BtnGrp;
