import styles from "@/styles/EditForm.module.css";
import { uiActions } from "@/store/ui-slice";
import { useAppDispatch, useAppSelector } from "@/Hooks/hooks";
import { League_Spartan } from "next/font/google";
import PurpleBtn from "../Ui/PurpleBtn";
import LightGrayBtn from "../Ui/LightGrayBtn";
import TrashBtn from "../Ui/TrashBtn";

import { useState, useEffect } from "react";
import Invoices from "@/models/Invoices";
import { addDays } from "@/components/Functions/addDate";
import { useRouter } from "next/router";
import {
  useDateInputEdit,
  useInputEdit,
  useNumInputEdit,
} from "@/Hooks/use-inputEditForm";

const league = League_Spartan({ subsets: ["latin"] });

const EditForm: React.FC<{
  id: string;
  senderAddress: {
    city: string;
    country: string;
    postCode: string;
    street: string;
  };
  clientName: string;
  clientEmail: string;
  clientAddress: {
    city: string;
    country: string;
    postCode: string;
    street: string;
  };
  createdAt: Date;
  paymentTerms: number;
  description: string;
  paymentDue: Date;
  item: {
    0: {
      name: string;
      price: number;
      quantity: number;
      total: number;
    };
    1: {
      name: string;
      price: number;
      quantity: number;
      total: number;
    };
  };
}> = (props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const action = () => {
    dispatch(uiActions.toogle());
    dispatch(uiActions.secondItemOff());
    resetSecondItemName();
    resetSecondItemQty();
    resetSecondItemPrice();
  };
  const secondItemOn = () => {
    dispatch(uiActions.secondItemOn());
  };
  const secondItemOff = () => {
    dispatch(uiActions.secondItemOff());
    resetSecondItemName();
    resetSecondItemQty();
    resetSecondItemPrice();
  };

  const showSecondItem = useAppSelector((state) => state.ui.showSecondItem);
  const {
    id,
    senderAddress,
    createdAt,
    clientAddress,
    clientName,
    clientEmail,
    item,
    description,
    paymentTerms,
  } = props;

  const isEmpty = item[1] === undefined;

  const {
    value: enteredSenderAddress,
    isValid: enteredSenderAddressIsValid,
    valueChangeHandler: senderAddressChangeHandler,
    inputBlurHandler: senderAddressBlurHandler,
    reset: resetAddress,
  } = useInputEdit((value) => value.trim() !== "", senderAddress.street);

  const {
    value: enteredSenderCity,
    isValid: enteredSenderCityIsValid,
    valueChangeHandler: senderCityChangeHandler,
    inputBlurHandler: senderCityBlurHandler,
    reset: resetCity,
  } = useInputEdit((value) => value.trim() !== "", senderAddress.city);
  const {
    value: enteredSenderPostCode,
    isValid: enteredSenderPostCodeIsValid,
    valueChangeHandler: senderPostCodeChangeHandler,
    inputBlurHandler: senderPostCodeBlurHandler,
    reset: resetPostCode,
  } = useInputEdit((value) => value.trim() !== "", senderAddress.postCode);
  const {
    value: enteredSenderCountry,
    isValid: enteredSenderCountryIsValid,
    valueChangeHandler: senderCountryChangeHandler,
    inputBlurHandler: senderCountryBlurHandler,
    reset: resetSenderCountry,
  } = useInputEdit((value) => value.trim() !== "", senderAddress.country);
  const {
    value: enteredClientAddress,
    isValid: enteredClientAddressIsValid,
    valueChangeHandler: clientAddressChangeHandler,
    inputBlurHandler: clientAddressBlurHandler,
    reset: resetclientAddress,
  } = useInputEdit((value) => value.trim() !== "", clientAddress.street);

  const {
    value: enteredClientCity,
    isValid: enteredClientCityIsValid,
    valueChangeHandler: clientCityChangeHandler,
    inputBlurHandler: clientCityBlurHandler,
    reset: resetclientCity,
  } = useInputEdit((value) => value.trim() !== "", clientAddress.city);
  const {
    value: enteredClientPostCode,
    isValid: enteredClientPostCodeIsValid,
    valueChangeHandler: clientPostCodeChangeHandler,
    inputBlurHandler: clientPostCodeBlurHandler,
    reset: resetClientPostCode,
  } = useInputEdit((value) => value.trim() !== "", clientAddress.postCode);
  const {
    value: enteredClientCountry,
    isValid: enteredClientCountryIsValid,
    valueChangeHandler: clientCountryChangeHandler,
    inputBlurHandler: clientCountryBlurHandler,
    reset: resetClientCountry,
  } = useInputEdit((value) => value.trim() !== "", clientAddress.country);
  const {
    value: enteredClientName,
    isValid: enteredClientNameIsValid,
    valueChangeHandler: clientNameChangeHandler,
    inputBlurHandler: clientNameBlurHandler,
    reset: resetClientName,
  } = useInputEdit((value) => value.trim() !== "", clientName);
  const {
    value: enteredClientEmail,
    isValid: enteredClientEmailIsValid,
    valueChangeHandler: clientEmailChangeHandler,
    inputBlurHandler: clientEmailBlurHandler,
    reset: resetClientEmail,
  } = useInputEdit((value) => value.includes("@"), clientEmail);
  const {
    value: enteredCreateDate,
    isValid: enteredCreateDateIsValid,
    dateValueChangeHandler: createDateChangeHandler,
    inputBlurHandler: createDateBlurHandler,
    reset: resetCreateDate,
  } = useDateInputEdit((value) => value.toString() !== "", createdAt);
  const {
    value: enteredPaymentTerm,
    isValid: enteredPaymentTermIsValid,
    numValueChangeHandler: paymentTermChangeHandler,
    inputBlurHandler: paymentTermBlurHandler,
    reset: resetPaymentTerm,
  } = useNumInputEdit((value) => value > 0, paymentTerms);
  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInputEdit((value) => value.trim() !== "", description);
  const {
    value: enteredItemName,
    isValid: enteredItemNameIsValid,
    valueChangeHandler: itemNameChangeHandler,
    inputBlurHandler: itemNameBlurHandler,
    reset: resetItemName,
  } = useInputEdit((value) => value.trim() !== "", item[0].name);
  const {
    value: enteredItemQty,
    isValid: enteredItemQtyIsValid,
    numValueChangeHandler: itemQtyChangeHandler,
    inputBlurHandler: itemQtyBlurHandler,
    reset: resetItemQty,
  } = useNumInputEdit((value) => value > 0, item[0].quantity);
  const {
    value: enteredItemPrice,
    isValid: enteredItemPriceIsValid,
    numValueChangeHandler: itemPriceChangeHandler,
    inputBlurHandler: itemPriceBlurHandler,
    reset: resetItemPrice,
  } = useNumInputEdit((value) => value > 0, item[0].price);
  const {
    value: enteredSecondItemName,
    isValid: enteredSecondItemNameIsValid,
    valueChangeHandler: secondItemNameChangeHandler,
    inputBlurHandler: secondItemNameBlurHandler,
    reset: resetSecondItemName,
  } = useInputEdit((value) => value.trim() !== "", isEmpty ? "" : item[1].name);
  const {
    value: enteredSecondItemQty,
    isValid: enteredSecondItemQtyIsValid,
    numValueChangeHandler: secondItemQtyChangeHandler,
    inputBlurHandler: secondItemQtyBlurHandler,
    reset: resetSecondItemQty,
  } = useNumInputEdit((value) => value > 0, isEmpty ? 0 : item[1].quantity);
  const {
    value: enteredSecondItemPrice,
    isValid: enteredSecondItemPriceIsValid,
    numValueChangeHandler: secondItemPriceChangeHandler,
    inputBlurHandler: secondItemPriceBlurHandler,
    reset: resetSecondItemPrice,
  } = useNumInputEdit((value) => value > 0, isEmpty ? 0 : item[1].price);

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (
      enteredSenderAddressIsValid &&
      enteredSenderCityIsValid &&
      enteredSenderPostCodeIsValid &&
      enteredSenderCountryIsValid &&
      enteredClientAddressIsValid &&
      enteredClientCityIsValid &&
      enteredClientPostCodeIsValid &&
      enteredClientCountryIsValid &&
      enteredClientNameIsValid &&
      enteredClientEmailIsValid &&
      enteredCreateDateIsValid &&
      enteredPaymentTermIsValid &&
      enteredDescriptionIsValid &&
      enteredItemNameIsValid &&
      enteredItemQtyIsValid &&
      enteredItemPriceIsValid
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [
    enteredSenderAddressIsValid,
    enteredSenderCityIsValid,
    enteredSenderPostCodeIsValid,
    enteredSenderCountryIsValid,
    enteredClientAddressIsValid,
    enteredClientCityIsValid,
    enteredClientPostCodeIsValid,
    enteredClientCountryIsValid,
    enteredClientNameIsValid,
    enteredClientEmailIsValid,
    enteredCreateDateIsValid,
    enteredPaymentTermIsValid,
    enteredDescriptionIsValid,
    enteredItemNameIsValid,
    enteredItemQtyIsValid,
    enteredItemPriceIsValid,
  ]);

  const data: Invoices = {
    clientAddress: {
      city: enteredClientCity,
      country: enteredClientCountry,
      postCode: enteredClientPostCode,
      street: enteredClientAddress,
    },
    clientEmail: enteredClientEmail,
    clientName: enteredClientName,
    createdAt: enteredCreateDate,
    description: enteredDescription,
    id: id,
    items: [
      {
        name: enteredItemName,
        price: enteredItemPrice!,
        quantity: enteredItemQty!,
        total: enteredItemPrice * enteredItemQty,
      },
      {
        name: enteredSecondItemName,
        price: enteredSecondItemPrice!,
        quantity: enteredSecondItemQty!,
        total: enteredSecondItemPrice * enteredSecondItemQty,
      },
    ],
    paymentTerms: enteredPaymentTerm!,
    senderAddress: {
      city: enteredSenderCity,
      country: enteredSenderCountry,
      postCode: enteredSenderPostCode,
      street: enteredSenderAddress,
    },
    status: "pending",
    paymentDue: new Date(Date.now()),
    total:
      enteredItemQty * enteredItemPrice +
      enteredSecondItemQty * enteredSecondItemPrice,
  };

  const updateInvoice = async (invoiceId: string) => {
    const res = await fetch(`/api/edit/${invoiceId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.data.error.message);
    }

    router.reload();
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    } else {
      resetClientEmail();
      resetClientName();
      resetAddress();
      resetCity();
      resetClientCountry();
      resetClientPostCode();
      resetCreateDate();
      resetDescription();
      resetItemName();
      resetItemPrice();
      resetItemQty();
      resetPaymentTerm();
      resetPostCode();
      resetSenderCountry();
      resetclientAddress();
      resetclientCity();
      resetSecondItemName();
      resetSecondItemQty();
      resetSecondItemPrice();

      dispatch(uiActions.secondItemOff());

      updateInvoice(data.id);
    }
  };

  const firstItemTotal = enteredItemQty * enteredItemPrice;
  const secondItemTotal = enteredSecondItemQty * enteredSecondItemPrice;
  return (
    <>
      <div className={styles.backdrop} onClick={action} />
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <h1>Edit #{id}</h1>
          <form onSubmit={formSubmitHandler}>
            <div className={styles.billFrom}>
              <h2>Bill from</h2>
              <div className={styles.longInput}>
                <label htmlFor="address">Street Address</label>
                <input
                  type="text"
                  value={enteredSenderAddress}
                  onChange={senderAddressChangeHandler}
                  onBlur={senderAddressBlurHandler}
                  className={league.className}
                />
              </div>
              <div className={styles.addressInputGrp}>
                <div>
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    value={enteredSenderCity}
                    onChange={senderCityChangeHandler}
                    onBlur={senderCityBlurHandler}
                    className={league.className}
                  />
                </div>
                <div>
                  <label htmlFor="postcode">Post Code</label>
                  <input
                    type="text"
                    value={enteredSenderPostCode}
                    onChange={senderPostCodeChangeHandler}
                    onBlur={senderPostCodeBlurHandler}
                    className={league.className}
                  />
                </div>
                <div>
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    value={enteredSenderCountry}
                    onChange={senderCountryChangeHandler}
                    onBlur={senderCountryBlurHandler}
                    className={league.className}
                  />
                </div>
              </div>
            </div>
            <div className={styles.billTo}>
              <h2>Bill to</h2>
              <div className={styles.longInput}>
                <label htmlFor="address">Client's Name</label>
                <input
                  type="text"
                  value={enteredClientName}
                  onChange={clientNameChangeHandler}
                  onBlur={clientNameBlurHandler}
                  className={league.className}
                />
              </div>
              <div className={styles.longInput}>
                <label htmlFor="clientEmail">Client's Email</label>
                <input
                  type="email"
                  value={enteredClientEmail}
                  onChange={clientEmailChangeHandler}
                  onBlur={clientEmailBlurHandler}
                  className={league.className}
                />
              </div>
              <div className={styles.longInput}>
                <label htmlFor="address">Street Address</label>
                <input
                  type="text"
                  value={enteredClientAddress}
                  onChange={clientAddressChangeHandler}
                  onBlur={clientAddressBlurHandler}
                  className={league.className}
                />
              </div>
              <div className={styles.addressInputGrp}>
                <div>
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    value={enteredClientCity}
                    onChange={clientCityChangeHandler}
                    onBlur={clientCityBlurHandler}
                    className={league.className}
                  />
                </div>
                <div>
                  <label htmlFor="postcode">Post Code</label>
                  <input
                    type="text"
                    value={enteredClientPostCode}
                    onChange={clientPostCodeChangeHandler}
                    onBlur={clientPostCodeBlurHandler}
                    className={league.className}
                  />
                </div>
                <div>
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    value={enteredClientCountry}
                    onChange={clientCountryChangeHandler}
                    onBlur={clientCountryBlurHandler}
                    className={league.className}
                  />
                </div>
              </div>
            </div>
            <div className={styles.description}>
              <div className={styles.descInputGrp}>
                <div>
                  <label htmlFor="city">Invoice date</label>
                  <input
                    type="date"
                    className={league.className}
                    value={new Date(enteredCreateDate)
                      .toISOString()
                      .slice(0, 10)}
                    onChange={createDateChangeHandler}
                    onBlur={createDateBlurHandler}
                  />
                </div>
                <div>
                  <label htmlFor="city">Payment terms</label>
                  <input
                    type="number"
                    value={enteredPaymentTerm}
                    onChange={paymentTermChangeHandler}
                    onBlur={paymentTermBlurHandler}
                    className={league.className}
                  />
                </div>
              </div>
              <div className={styles.longInput}>
                <label htmlFor="address">Project description</label>
                <input
                  type="text"
                  value={enteredDescription}
                  onChange={descriptionChangeHandler}
                  onBlur={descriptionBlurHandler}
                  className={league.className}
                />
              </div>
            </div>
            <div className={styles.itemList}>
              <h1>Item List</h1>
              <div className={styles.itemInputGrp}>
                <div className={styles.container}>
                  <div className={styles.name}>
                    <label htmlFor="itemName">Item name</label>
                    <input
                      type="text"
                      value={enteredItemName}
                      onChange={itemNameChangeHandler}
                      onBlur={itemNameBlurHandler}
                      className={league.className}
                    />
                  </div>
                  <div className={styles.qty}>
                    <label htmlFor="Qty">Qty.</label>
                    <input
                      type="number"
                      value={enteredItemQty}
                      onChange={itemQtyChangeHandler}
                      onBlur={itemQtyBlurHandler}
                      className={league.className}
                    />
                  </div>
                  <div className={styles.price}>
                    <label htmlFor="Price">Price</label>
                    <input
                      type="number"
                      value={enteredItemPrice}
                      onChange={itemPriceChangeHandler}
                      onBlur={itemPriceBlurHandler}
                      className={league.className}
                    />
                  </div>
                  <div className={styles.total}>
                    <p>Total</p>
                    <h2>{firstItemTotal.toFixed(2)}</h2>
                  </div>
                  <div className={styles.firstTrashBtn}>
                    <TrashBtn action={secondItemOff} />
                  </div>
                </div>
                <div className={styles.container}>
                  {showSecondItem && (
                    <div className={styles.name}>
                      <input
                        type="text"
                        value={showSecondItem && enteredSecondItemName}
                        onChange={secondItemNameChangeHandler}
                        onBlur={secondItemNameBlurHandler}
                        className={league.className}
                      />
                    </div>
                  )}
                  {showSecondItem && (
                    <div className={styles.qty}>
                      <input
                        type="number"
                        value={showSecondItem && enteredSecondItemQty}
                        onChange={secondItemQtyChangeHandler}
                        onBlur={secondItemQtyBlurHandler}
                        className={league.className}
                      />
                    </div>
                  )}
                  {showSecondItem && (
                    <div className={styles.price}>
                      <input
                        type="number"
                        value={showSecondItem && enteredSecondItemPrice}
                        onChange={secondItemPriceChangeHandler}
                        onBlur={secondItemPriceBlurHandler}
                        className={league.className}
                      />
                    </div>
                  )}
                  {showSecondItem && (
                    <>
                      <div className={styles.total}>
                        <h2> {secondItemTotal.toFixed(2)}</h2>
                      </div>
                      <div className={styles.trashBtn}>
                        <TrashBtn action={secondItemOff} />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <LightGrayBtn title={"+ Add New Item"} action={secondItemOn} />
            </div>
            <div className={styles.btnWrapper}>
              <div className={styles.actionBtnGrp}>
                <div className={styles.grayBtn}>
                  <LightGrayBtn title={"Cancel"} action={action} />
                </div>
                <div className={styles.purpleBtn}>
                  <PurpleBtn title={"Save Changes"} action={() => {}} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditForm;
