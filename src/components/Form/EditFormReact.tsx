import { useForm, SubmitHandler } from "react-hook-form";
import Invoices from "@/models/Invoices";
import { useEffect } from "react";
import { uiActions } from "@/store/ui-slice";
import { useAppDispatch, useAppSelector } from "@/Hooks/hooks";
import { addDays } from "@/components/Functions/addDate";
import { sumValue } from "@/components/Functions/total";
import styles from "@/styles/NewForm.module.css";
import TrashBtn from "../Ui/TrashBtn";
import LightGrayBtn from "../Ui/LightGrayBtn";
import PurpleBtn from "../Ui/PurpleBtn";
import { useRouter } from "next/router";
import { updateInvoiceData } from "@/store/fetchInvoices";
import GoBackBtn from "../Ui/GoBackBtn";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const EditFormReact: React.FC<{
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
  description: string;
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
  status: string;
}> = (props) => {
  const {
    id,
    senderAddress,
    createdAt,
    clientAddress,
    clientName,
    clientEmail,
    item,
    description,
    status,
  } = props;

  const router = useRouter();
  const dispatch = useAppDispatch();
  const showFirstItem = useAppSelector((state) => state.ui.showFirstItem);
  const showMoreItem = useAppSelector((state) => state.ui.showSecondItem);
  const handler = () => {
    if (showFirstItem) {
      dispatch(uiActions.secondItemOn());
    } else {
      dispatch(uiActions.firstItemOn());
    }
  };
  const trash = () => {
    if (showMoreItem) {
      dispatch(uiActions.secondItemOff());
      unregister(`items.1.name`);
      unregister(`items.1.price`);
      unregister(`items.1.quantity`);
      unregister(`items.1.total`);
    } else {
      dispatch(uiActions.firstItemOff());
    }
  };
  const action = () => {
    dispatch(uiActions.toogle());
  };
  interface items {
    name: string;
    price: number;
    quantity: number;
    total: number;
  }
  const firstITem = item[0];
  const secondItem = item[1];

  const isEmpty = item[1] === undefined;

  let items: [items, items] | [items];

  isEmpty
    ? (items = [
        {
          name: firstITem.name,
          price: firstITem.price,
          quantity: firstITem.quantity,
          total: firstITem.total,
        },
      ])
    : (items = [
        {
          name: firstITem.name,
          price: firstITem.price,
          quantity: firstITem.quantity,
          total: firstITem.total,
        },
        {
          name: isEmpty ? "" : secondItem.name,
          price: isEmpty ? 0 : secondItem.price,
          quantity: isEmpty ? 0 : secondItem.quantity,
          total: isEmpty ? 0 : secondItem.total,
        },
      ]);

  const {
    register,
    unregister,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<Invoices>({
    defaultValues: {
      items: items,
    },
  });

  const onSubmit: SubmitHandler<Invoices> = async (data) => {
    if (!showFirstItem || Object.keys(errors).length > 0) {
      return;
    } else {
      const total = showMoreItem
        ? sumValue(data.items[0].total, data.items[1].total)
        : data.items[0].total;
      const paymentDue = addDays(new Date(data.createdAt), data.paymentTerms);

      const newData = {
        ...data,
        id,
        paymentDue: paymentDue,
        status: status,
        total: total,
      };

      dispatch(updateInvoiceData(id, newData));
      action();
      await router.push(`${id}`);
    }
  };
  useEffect(() => {
    const { unsubscribe } = watch((value, info) => {
      if (
        info.name?.startsWith("items") &&
        (info.name?.endsWith("price") || info.name?.endsWith("quantity"))
      ) {
        const index = parseInt(info.name.split(".")[0]);

        const price = value.items?.at(index)?.price;
        const quantity = value.items?.at(index)?.quantity;
        register(`items.0.total`, { value: value.items?.[index]?.total });
        if (price && quantity) setValue(`items.0.total`, price * quantity);
      }
    });
    return () => unsubscribe();
  }, [watch, register]);

  useEffect(() => {
    const { unsubscribe } = watch((value, info) => {
      if (
        showMoreItem &&
        info.name?.startsWith("items") &&
        (info.name?.endsWith("price") || info.name?.endsWith("quantity"))
      ) {
        const index = parseInt(info.name.split(".")[1]);

        const price = value.items?.at(index)?.price;
        const quantity = value.items?.at(index)?.quantity;
        register(`items.1.total`, { value: value.items?.[1]?.total });
        if (price && quantity) setValue(`items.1.total`, price * quantity);
      }
    });
    return () => unsubscribe();
  }, [watch, register, showMoreItem]);


  const senderStreetClassHandler = errors.senderAddress?.street
    ? ` ${styles.longInput} ${styles.invalid}`
    : styles.longInput;
  const senderCityClassHandler = errors.senderAddress?.city
    ? styles.invalid
    : "";
  const senderPostCodeClassHandler = errors.senderAddress?.postCode
    ? styles.invalid
    : "";
  const senderCountryClassHandler = errors.senderAddress?.country
    ? `${styles.invalid} ${styles.country}`
    : styles.country;
  const clientNameClassHandler = errors.clientName
    ? ` ${styles.longInput} ${styles.invalid}`
    : styles.longInput;
  const clientEmailClassHandler = errors.clientEmail
    ? ` ${styles.longInput} ${styles.invalid}`
    : styles.longInput;
  const clientAddressClassHandler = errors.clientAddress?.street
    ? ` ${styles.longInput} ${styles.invalid}`
    : styles.longInput;
  const clientCityClassHandler = errors.clientAddress?.city
    ? styles.invalid
    : "";
  const clientPostCodeClassHandler = errors.clientAddress?.postCode
    ? styles.invalid
    : "";
  const clientCountryClassHandler = errors.clientAddress?.country
    ? `${styles.invalid} ${styles.country}`
    : styles.country;
  const invoiceDateClassHandler = errors.createdAt ? styles.invalid : "";
  const paymentTermsClassHandler = errors.paymentTerms ? styles.invalid : "";
  const descriptionClassHandler = errors.description
    ? ` ${styles.longInput} ${styles.invalid}`
    : styles.longInput;
  const itemNameClassHandler = errors.items?.[0]?.name
    ? `${styles.name} ${styles.invalid}`
    : styles.name;
  const itemQtyClassHandler = errors.items?.[0]?.quantity
    ? `${styles.qty} ${styles.invalid}`
    : styles.qty;
  const itemPriceClassHandler = errors.items?.[0]?.price
    ? `${styles.price} ${styles.invalid}`
    : styles.price;
  const secondItemNameClassHandler = errors.items?.[1]?.name
    ? `${styles.name} ${styles.invalid}`
    : styles.name;
  const secondItemQtyClassHandler = errors.items?.[1]?.quantity
    ? `${styles.qty} ${styles.invalid}`
    : styles.qty;
  const secondItemPriceClassHandler = errors.items?.[1]?.price
    ? `${styles.price} ${styles.invalid}`
    : styles.price;

  const darkmode = useAppSelector((state) => state.ui.isDarkMode);
  const darkWrapperClassHandler = darkmode
    ? `${styles.wrapper} ${styles.darkWrapper}`
    : styles.wrapper;
  const darkTotalHandler = darkmode
    ? `${styles.total} ${styles.darkTotal}`
    : styles.total;
  const darkSecondTotalHandler = darkmode
    ? `${styles.secondItemTotal} ${styles.darkTotal}`
    : styles.secondItemTotal;

  return (
    <>
      <div className={styles.backdrop} onClick={action} />
      <div className={darkWrapperClassHandler}>
        <div className={styles.box}>
          <div className={styles.hide}>
            <GoBackBtn action={action} />
          </div>
          <h1># Edit {id}</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.billFrom}>
              <h2>Bill from</h2>

              <div className={senderStreetClassHandler}>
                <div className={styles.control}>
                  <label htmlFor="street"> Street Address </label>{" "}
                  {errors.senderAddress?.street && (
                    <span className={styles.errorMsg}>
                      This field is required
                    </span>
                  )}
                </div>
                <input
                  defaultValue={senderAddress.street}
                  {...register("senderAddress.street", {
                    required: true,
                    validate: async (value) => {
                      await sleep(1);
                      return value.trim() !== "";
                    },
                  })}
                />
              </div>

              <div className={styles.addressInputGrp}>
                <div className={styles.first}>
                  <div className={senderCityClassHandler}>
                    <label htmlFor="city"> City</label>
                    <input
                      defaultValue={senderAddress.city}
                      {...register("senderAddress.city", {
                        required: true,
                        validate: async (value) => {
                          await sleep(1);
                          return value.trim() !== "";
                        },
                      })}
                    />
                  </div>
                  <div className={senderPostCodeClassHandler}>
                    <label htmlFor="postCode"> Post Code</label>
                    <input
                      defaultValue={senderAddress.postCode}
                      {...register("senderAddress.postCode", {
                        required: true,
                        validate: async (value) => {
                          await sleep(1);
                          return value.trim() !== "";
                        },
                      })}
                    />
                  </div>
                </div>
                <div className={senderCountryClassHandler}>
                  <label htmlFor="country"> Country</label>
                  <input
                    defaultValue={senderAddress.country}
                    {...register("senderAddress.country", {
                      required: true,
                      validate: async (value) => {
                        await sleep(1);
                        return value.trim() !== "";
                      },
                    })}
                  />
                </div>
              </div>
            </div>

            <div className={styles.billTo}>
              <h2>Bill to</h2>
              <div className={clientNameClassHandler}>
                <div className={styles.control}>
                  <label htmlFor="clientName">Client's Name</label>
                  {errors.clientName && <span>This field is required</span>}
                </div>
                <input
                  defaultValue={clientName}
                  {...register("clientName", {
                    required: true,
                    validate: async (value) => {
                      await sleep(1);
                      return value.trim() !== "";
                    },
                  })}
                />
              </div>
              <div className={clientEmailClassHandler}>
                <div className={styles.control}>
                  <label htmlFor="clientEmail">Client's Email</label>
                  {errors.clientEmail && <span>This field is required</span>}
                </div>
                <input
                  defaultValue={clientEmail}
                  {...register("clientEmail", {
                    required: true,
                    validate: async (value) => {
                      await sleep(1);
                      return value.includes("@");
                    },
                  })}
                />
              </div>
              <div className={clientAddressClassHandler}>
                <div className={styles.control}>
                  <label htmlFor="street"> Street address</label>{" "}
                  {errors.clientAddress?.street && (
                    <span>This field is required</span>
                  )}
                </div>
                <input
                  defaultValue={clientAddress.street}
                  {...register("clientAddress.street", {
                    required: true,
                    validate: async (value) => {
                      await sleep(1);
                      return value.trim() !== "";
                    },
                  })}
                />
              </div>
              <div className={styles.addressInputGrp}>
                <div className={styles.first}>
                  <div className={clientCityClassHandler}>
                    <label htmlFor="city"> City</label>
                    <input
                      defaultValue={clientAddress.city}
                      {...register("clientAddress.city", {
                        required: true,
                        validate: async (value) => {
                          await sleep(1);
                          return value.trim() !== "";
                        },
                      })}
                    />
                  </div>
                  <div className={clientPostCodeClassHandler}>
                    <label htmlFor="postCode"> Post Code</label>
                    <input
                      defaultValue={clientAddress.postCode}
                      {...register("clientAddress.postCode", {
                        required: true,
                        validate: async (value) => {
                          await sleep(1);
                          return value.trim() !== "";
                        },
                      })}
                    />
                  </div>
                </div>
                <div className={clientCountryClassHandler}>
                  <label htmlFor="country"> Country</label>
                  <input
                    defaultValue={clientAddress.country}
                    {...register("clientAddress.country", {
                      required: true,
                      validate: async (value) => {
                        await sleep(1);
                        return value.trim() !== "";
                      },
                    })}
                  />
                </div>
              </div>
            </div>
            <div className={styles.description}>
              <div className={styles.descInputGrp}>
                <div className={invoiceDateClassHandler}>
                  <label htmlFor="createdAt"> Invoice date</label>
                  <input
                    type="Date"
                    defaultValue={new Date(createdAt)
                      .toISOString()
                      .slice(0, 10)}
                    {...register("createdAt", { required: true })}
                  />
                  {errors.createdAt && <span>This field is required</span>}
                </div>
                <div className={paymentTermsClassHandler}>
                  <label htmlFor="paymentTerms"> Payment Terms</label>

                  <select
                    {...register("paymentTerms", {
                      required: true,
                      validate: async (value) => {
                        await sleep(1);
                        return value > 0;
                      },
                    })}
                  >
                    <option value={1}>Net 1 Day</option>
                    <option value={7}>Net 7 Days</option>
                    <option value={14}>Net 14 Days</option>
                    <option value={30}>Net 30 Days</option>
                  </select>

                  {errors.paymentTerms && <span>This field is required</span>}
                </div>
              </div>
              <div className={descriptionClassHandler}>
                <div className={styles.control}>
                  <label htmlFor="description"> Project Description</label>
                  {errors.description && <span>This field is required</span>}
                </div>
                <input
                  defaultValue={description}
                  {...register("description", {
                    required: true,
                    validate: async (value) => {
                      await sleep(1);
                      return value.trim() !== "";
                    },
                  })}
                />
              </div>
            </div>
            <div className={styles.itemList}>
              <h1>Item List</h1>
              <div className={styles.itemInputGrp}>
                <div className={styles.container}>
                  <div className={itemNameClassHandler}>
                    <label htmlFor="item"> Item</label>
                    {showFirstItem && (
                      <input
                        defaultValue={item[0].name}
                        {...register("items.0.name", {
                          required: true,
                          validate: async (value) => {
                            await sleep(1);
                            return value.trim() !== "";
                          },
                        })}
                      />
                    )}
                  </div>
                  <div className={styles.info}>
                    <div className={itemQtyClassHandler}>
                      <label htmlFor="item"> Qty</label>
                      {showFirstItem && (
                        <input
                          type="number"
                          defaultValue={item[0].quantity}
                          {...register("items.0.quantity", {
                            required: true,
                            validate: async (value) => {
                              await sleep(1);
                              return value >= 1;
                            },
                          })}
                        />
                      )}
                    </div>
                    <div className={itemPriceClassHandler}>
                      <label htmlFor="price"> Price</label>
                      {showFirstItem && (
                        <input
                          type="number"
                          defaultValue={item[0].price}
                          {...register("items.0.price", {
                            required: true,
                            validate: async (value) => {
                              await sleep(1);
                              return value >= 1;
                            },
                          })}
                        />
                      )}
                    </div>

                    <div className={darkTotalHandler}>
                      <p>Total</p>
                      {showFirstItem && <h2>{watch("items.0.total", 0)}</h2>}
                    </div>

                    {showFirstItem && (
                      <div className={styles.firstTrashBtn}>
                        <TrashBtn action={trash} />
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.container}>
                  {showMoreItem && (
                    <div className={secondItemNameClassHandler}>
                      <label htmlFor="itemName"> Item</label>
                      <input
                        disabled={!showMoreItem}
                        defaultValue={
                          showMoreItem && !isEmpty ? item[1].name : ""
                        }
                        {...register("items.1.name", {
                          required: true,
                          validate: async (value) => {
                            await sleep(1);
                            return value.trim() !== "";
                          },
                        })}
                      />
                    </div>
                  )}
                  <div className={styles.info}>
                    {showMoreItem && (
                      <div className={secondItemQtyClassHandler}>
                        <label htmlFor="item"> Qty</label>
                        <input
                          disabled={!showMoreItem}
                          type="number"
                          defaultValue={
                            showMoreItem && !isEmpty ? item[1].quantity : 0
                          }
                          {...register("items.1.quantity", {
                            required: true,
                            validate: async (value) => {
                              await sleep(1);
                              return value >= 1;
                            },
                          })}
                        />
                      </div>
                    )}

                    {showMoreItem && (
                      <div className={secondItemPriceClassHandler}>
                        <label htmlFor="item"> Price</label>
                        <input
                          disabled={!showMoreItem}
                          type="number"
                          defaultValue={
                            showMoreItem && !isEmpty ? item[1].price : 0
                          }
                          {...register("items.1.price", {
                            required: true,
                            validate: async (value) => {
                              await sleep(1);
                              return value >= 1;
                            },
                          })}
                        />
                      </div>
                    )}

                    {showMoreItem && (
                      <>
                        <div className={darkSecondTotalHandler}>
                          <h2> {watch("items.1.total", 0)}</h2>
                        </div>
                        <div className={styles.trashBtn}>
                          <TrashBtn action={trash} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.itemBtn}>
                <LightGrayBtn title={"+ Add New Item"} action={handler} />
              </div>
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
          <div style={{ color: "red" }}>
            {Object.keys(errors).length > 0 && (
              <div className={styles.errorMsg}>
                <p>- All fields must be added</p>
              </div>
            )}
            {!showFirstItem && (
              <div className={styles.errorMsg}>
                {" "}
                <p> - An item must be added</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditFormReact;
