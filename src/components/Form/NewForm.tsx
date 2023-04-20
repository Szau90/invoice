import styles from "@/styles/NewForm.module.css";
import { uiActions } from "@/store/ui-slice";
import { useAppDispatch } from "@/Hooks/hooks";
import { League_Spartan } from "next/font/google";
import PurpleBtn from "../Ui/PurpleBtn";
import LightGrayBtn from "../Ui/LightGrayBtn";
import TrashBtn from "../Ui/TrashBtn";
import useInput from "@/Hooks/use-input";
import { useNumInput } from "@/Hooks/use-input";
import { useDateInput } from "@/Hooks/use-input";
import { useState, useEffect } from "react";
import Invoices from "@/models/Invoices";
import { makeid } from "@/components/Functions/makeId";
import { addDays } from "@/components/Functions/addDate";

const league = League_Spartan({ subsets: ["latin"] });

const NewForm = () => {
  const dispatch = useAppDispatch();

  const action = () => {
    dispatch(uiActions.toogle());
  };

  const {
    value: enteredSenderAddress,
    isValid: enteredSenderAddressIsValid,
    hasError: senderAddressHasError,
    valueChangeHandler: senderAddressChangeHandler,
    inputBlurHandler: senderAddressBlurHandler,
    reset: resetAddress,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredSenderCity,
    isValid: enteredSenderCityIsValid,
    hasError: senderCityHasError,
    valueChangeHandler: senderCityChangeHandler,
    inputBlurHandler: senderCityBlurHandler,
    reset: resetCity,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredSenderPostCode,
    isValid: enteredSenderPostCodeIsValid,
    hasError: senderPostCodeHasError,
    valueChangeHandler: senderPostCodeChangeHandler,
    inputBlurHandler: senderPostCodeBlurHandler,
    reset: resetPostCode,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredSenderCountry,
    isValid: enteredSenderCountryIsValid,
    hasError: senderCountryHasError,
    valueChangeHandler: senderCountryChangeHandler,
    inputBlurHandler: senderCountryBlurHandler,
    reset: resetSenderCountry,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredClientAddress,
    isValid: enteredClientAddressIsValid,
    hasError: clientAddressHasError,
    valueChangeHandler: clientAddressChangeHandler,
    inputBlurHandler: clientAddressBlurHandler,
    reset: resetclientAddress,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredClientCity,
    isValid: enteredClientCityIsValid,
    hasError: clientCityHasError,
    valueChangeHandler: clientCityChangeHandler,
    inputBlurHandler: clientCityBlurHandler,
    reset: resetclientCity,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredClientPostCode,
    isValid: enteredClientPostCodeIsValid,
    hasError: clientPostCodeHasError,
    valueChangeHandler: clientPostCodeChangeHandler,
    inputBlurHandler: clientPostCodeBlurHandler,
    reset: resetClientPostCode,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredClientCountry,
    isValid: enteredClientCountryIsValid,
    hasError: clientCountryHasError,
    valueChangeHandler: clientCountryChangeHandler,
    inputBlurHandler: clientCountryBlurHandler,
    reset: resetClientCountry,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredClientName,
    isValid: enteredClientNameIsValid,
    hasError: clientNameHasError,
    valueChangeHandler: clientNameChangeHandler,
    inputBlurHandler: clientNameBlurHandler,
    reset: resetClientName,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredClientEmail,
    isValid: enteredClientEmailIsValid,
    hasError: clientEmailHasError,
    valueChangeHandler: clientEmailChangeHandler,
    inputBlurHandler: clientEmailBlurHandler,
    reset: resetClientEmail,
  } = useInput((value) => value.includes("@"));
  const {
    value: enteredCreateDate,
    isValid: enteredCreateDateIsValid,
    dateValueHasError: createDateHasError,
    dateValueChangeHandler: createDateChangeHandler,
    inputBlurHandler: createDateBlurHandler,
    reset: resetCreateDate,
  } = useDateInput((value) => value.toString() !== "");
  const {
    value: enteredPaymentTerm,
    isValid: enteredPaymentTermIsValid,
    numValueHasError: paymentTermHasError,
    numValueChangeHandler: paymentTermChangeHandler,
    inputBlurHandler: paymentTermBlurHandler,
    reset: resetPaymentTerm,
  } = useNumInput((value) => value > 0);
  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredItemName,
    isValid: enteredItemNameIsValid,
    hasError: itemNameHasError,
    valueChangeHandler: itemNameChangeHandler,
    inputBlurHandler: itemNameBlurHandler,
    reset: resetItemName,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredItemQty,
    isValid: enteredItemQtyIsValid,
    numValueHasError: itemQtyHasError,
    numValueChangeHandler: itemQtyChangeHandler,
    inputBlurHandler: itemQtyBlurHandler,
    reset: resetItemQty,
  } = useNumInput((value) => value > 0);
  const {
    value: enteredItemPrice,
    isValid: enteredItemPriceIsValid,
    numValueHasError: itemPriceHasError,
    numValueChangeHandler: itemPriceChangeHandler,
    inputBlurHandler: itemPriceBlurHandler,
    reset: resetItemPrice,
  } = useNumInput((value) => value > 0);

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
    id: makeid(),
    items: [
      {
        name: enteredItemName,
        price: enteredItemPrice!,
        quantity: enteredItemQty!,
        total: enteredItemPrice!,
      },
      {
        name: enteredItemName,
        price: enteredItemPrice!,
        quantity: enteredItemQty!,
        total: enteredItemPrice!,
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
    paymentDue: addDays(new Date(enteredCreateDate), enteredPaymentTerm),
    total: 0,
  };

  const sendRequest = async () => {
    const response = await fetch("api/add/new-invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const invoiceData = await response.json();

    console.log(invoiceData);

    if (!response.ok) {
      throw new Error("Sending invoice data failed.");
    }
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

      sendRequest();
    }
  };
  const senderStreetClassHandler = senderAddressHasError
    ? ` ${styles.longInput} ${styles.invalid}`
    : styles.longInput;
  const senderCityClassHandler = senderCityHasError ? styles.invalid : "";
  const senderPostCodeClassHandler = senderPostCodeHasError
    ? styles.invalid
    : "";
  const senderCountryClassHandler = senderCountryHasError ? styles.invalid : "";
  const clientNameClassHandler = clientNameHasError
    ? ` ${styles.longInput} ${styles.invalid}`
    : styles.longInput;
  const clientEmailClassHandler = clientEmailHasError
    ? ` ${styles.longInput} ${styles.invalid}`
    : styles.longInput;
  const clientAddressClassHandler = clientAddressHasError
    ? ` ${styles.longInput} ${styles.invalid}`
    : styles.longInput;
  const clientCityClassHandler = clientCityHasError ? styles.invalid : "";
  const clientPostCodeClassHandler = clientPostCodeHasError
    ? styles.invalid
    : "";
  const clientCountryClassHandler = clientCountryHasError ? styles.invalid : "";
  const invoiceDateClassHandler = createDateHasError ? styles.invalid : "";
  const paymentTermsClassHandler = paymentTermHasError ? styles.invalid : "";
  const descriptionClassHandler = descriptionHasError
    ? ` ${styles.longInput} ${styles.invalid}`
    : styles.longInput;
  const itemNameClassHandler = itemNameHasError
    ? `${styles.name} ${styles.invalid}`
    : styles.name;
  const itemQtyClassHandler = itemQtyHasError
    ? `${styles.qty} ${styles.invalid}`
    : styles.qty;
  const itemPriceClassHandler = itemPriceHasError
    ? `${styles.price} ${styles.invalid}`
    : styles.price;

  return (
    <>
      <div className={styles.backdrop} onClick={action} />
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <h1>New invoice</h1>
          <form onSubmit={formSubmitHandler}>
            <div className={styles.billFrom}>
              <h2>Bill from</h2>
              <div className={senderStreetClassHandler}>
                <label htmlFor="address">Street Address</label>
                <input
                  required
                  type="text"
                  className={league.className}
                  onChange={senderAddressChangeHandler}
                  onBlur={senderAddressBlurHandler}
                  value={enteredSenderAddress}
                />
              </div>

              <div className={styles.addressInputGrp}>
                <div className={senderCityClassHandler}>
                  <label htmlFor="city">City</label>
                  <input
                    required
                    type="text"
                    className={league.className}
                    onChange={senderCityChangeHandler}
                    onBlur={senderCityBlurHandler}
                    value={enteredSenderCity}
                  />
                </div>
                <div className={senderPostCodeClassHandler}>
                  <label htmlFor="postcode">Post Code</label>
                  <input
                    required
                    type="text"
                    className={league.className}
                    onChange={senderPostCodeChangeHandler}
                    onBlur={senderPostCodeBlurHandler}
                    value={enteredSenderPostCode}
                  />
                </div>
                <div className={senderCountryClassHandler}>
                  <label htmlFor="country">Country</label>
                  <input
                    required
                    type="text"
                    className={league.className}
                    onChange={senderCountryChangeHandler}
                    onBlur={senderCountryBlurHandler}
                    value={enteredSenderCountry}
                  />
                </div>
              </div>
            </div>
            <div className={styles.billTo}>
              <h2>Bill to</h2>
              <div className={clientNameClassHandler}>
                <label htmlFor="address">Client's Name</label>
                <input
                  required
                  type="text"
                  className={league.className}
                  onChange={clientNameChangeHandler}
                  onBlur={clientNameBlurHandler}
                  value={enteredClientName}
                />
              </div>
              <div className={clientEmailClassHandler}>
                <label htmlFor="clientEmail">Client's Email</label>
                <input
                  required
                  type="email"
                  className={league.className}
                  onChange={clientEmailChangeHandler}
                  onBlur={clientEmailBlurHandler}
                  value={enteredClientEmail}
                />
              </div>
              <div className={clientAddressClassHandler}>
                <label htmlFor="address">Street Address</label>
                <input
                  required
                  type="text"
                  className={league.className}
                  onChange={clientAddressChangeHandler}
                  onBlur={clientAddressBlurHandler}
                  value={enteredClientAddress}
                />
              </div>
              <div className={styles.addressInputGrp}>
                <div className={clientCityClassHandler}>
                  <label htmlFor="city">City</label>
                  <input
                    required
                    type="text"
                    className={league.className}
                    onChange={clientCityChangeHandler}
                    onBlur={clientCityBlurHandler}
                    value={enteredClientCity}
                  />
                </div>
                <div className={clientPostCodeClassHandler}>
                  <label htmlFor="postcode">Post Code</label>
                  <input
                    required
                    type="text"
                    className={league.className}
                    onChange={clientPostCodeChangeHandler}
                    onBlur={clientPostCodeBlurHandler}
                    value={enteredClientPostCode}
                  />
                </div>
                <div className={clientCountryClassHandler}>
                  <label htmlFor="country">Country</label>
                  <input
                    required
                    type="text"
                    className={league.className}
                    onChange={clientCountryChangeHandler}
                    onBlur={clientCountryBlurHandler}
                    value={enteredClientCountry}
                  />
                </div>
              </div>
            </div>
            <div className={styles.description}>
              <div className={styles.descInputGrp}>
                <div className={invoiceDateClassHandler}>
                  <label htmlFor="city">Invoice date</label>
                  <input
                    type="date"
                    className={league.className}
                    onChange={createDateChangeHandler}
                    onBlur={createDateBlurHandler}
                    value={enteredCreateDate.toISOString().slice(0, 10)}
                  />
                </div>
                <div className={paymentTermsClassHandler}>
                  <label htmlFor="city">Payment terms</label>
                  <input
                    required
                    type="number"
                    className={league.className}
                    onChange={paymentTermChangeHandler}
                    onBlur={paymentTermBlurHandler}
                    value={enteredPaymentTerm}
                  />
                </div>
              </div>
              <div className={descriptionClassHandler}>
                <label htmlFor="address">Project description</label>
                <input
                  required
                  type="text"
                  className={league.className}
                  onChange={descriptionChangeHandler}
                  onBlur={descriptionBlurHandler}
                  value={enteredDescription}
                />
              </div>
            </div>
            <div className={styles.itemList}>
              <h1>Item List</h1>
              <div className={styles.itemInputGrp}>
                <div className={styles.container}>
                  <div className={itemNameClassHandler}>
                    <label htmlFor="itemName">Item name</label>
                    <input
                      required
                      type="text"
                      className={league.className}
                      onChange={itemNameChangeHandler}
                      onBlur={itemNameBlurHandler}
                      value={enteredItemName}
                    />
                  </div>
                  <div className={itemQtyClassHandler}>
                    <label htmlFor="Qty">Qty.</label>
                    <input
                      required
                      type="number"
                      className={league.className}
                      onChange={itemQtyChangeHandler}
                      onBlur={itemQtyBlurHandler}
                      value={enteredItemQty}
                    />
                  </div>
                  <div className={itemPriceClassHandler}>
                    <label htmlFor="Price">Price</label>
                    <input
                      required
                      type="number"
                      className={league.className}
                      onChange={itemPriceChangeHandler}
                      onBlur={itemPriceBlurHandler}
                      value={enteredItemPrice}
                    />
                  </div>
                  <div className={styles.total}>
                    <p>Total</p>
                    <h2>{enteredItemQty * enteredItemPrice}</h2>
                  </div>
                  <div className={styles.firstTrashBtn}>
                    <TrashBtn action={() => {}} />
                  </div>
                </div>
              </div>
              <LightGrayBtn title={"+ Add New Item"} action={() => {}} />
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

export default NewForm;
