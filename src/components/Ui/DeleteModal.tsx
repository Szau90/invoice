import styles from "@/styles/DeleteModal.module.css";
import LightGrayBtn from "./LightGrayBtn";
import DeleteBtn from "./DeleteBtn";
import { useAppDispatch, useAppSelector } from "@/Hooks/hooks";
import { useRouter } from "next/router";
import { uiActions } from "@/store/ui-slice";

const DeleteModal: React.FC<{ id: string; }> = (props) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const darkMode = useAppSelector(state => state.ui.isDarkMode)

    const deleteInvoice = async (invoiceId: string) => {
        const res = await fetch(`/api/delete/${invoiceId}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          const body = await res.json();
          throw new Error(body.data.error.message);
        }
    
        router.push("/");
        dispatch(uiActions.deleteModalOff())
      };

      const deleteHandler = () => deleteInvoice(props.id);
      const cancelHandler = () => {
        dispatch(uiActions.deleteModalOff())
      }

      const darkModeHandler = darkMode ? `${styles.modal} ${styles.darkModal}` : styles.modal 
  return (
    <>
    <div className={styles.backdrop}>
      <div className={darkModeHandler}>
        <div className={styles.content}>
          <h2>Confirm Deletion</h2>
          <p>
            {" "}
            Are you sure you want to delete #{props.id} ? This action cannot be
            undone.
          </p>
          <div className={styles.btnGrp}>
            <div className={styles.cancel}>
              <LightGrayBtn action={cancelHandler} title={"Cancel"} />
            </div>
            <div className={styles.delete}>
              <DeleteBtn action={deleteHandler} />
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default DeleteModal;
