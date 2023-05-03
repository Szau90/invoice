import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import Invoices, { Item } from "@/models/Invoices";
import { useEffect } from "react";
import { uiActions } from "@/store/ui-slice";
import { useAppDispatch, useAppSelector } from "@/Hooks/hooks";
import { addDays } from "@/components/Functions/addDate";
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
  items: Item[];
  status: string;
}> = (props) => {
  const {
    id,
    senderAddress,
    createdAt,
    clientAddress,
    clientName,
    clientEmail,
    description,
    status,
  } = props;

  const router = useRouter();

  const dispatch = useAppDispatch();

  const darkmode = useAppSelector((state) => state.ui.isDarkMode);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    control,
  } = useForm<Invoices>({
    defaultValues: {
      items: new Array<{
        name: string;
        quantity: number;
        price: number;
        total: number;
      }>(),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const action = () => {
    dispatch(uiActions.toogle());
  };

  const onSubmit: SubmitHandler<Invoices> = async (data) => {
    if (fields.length === 0 || Object.keys(errors).length > 0) {
      return;
    } else {
      const paymentDue = addDays(new Date(data.createdAt), data.paymentTerms);

      const initialValue = 0;
      const total = data.items
        .map((i) => i.total)
        .reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          initialValue
        );

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
  const itemNameClassHandler = errors.items
    ? `${styles.itemName} ${styles.invalid}`
    : styles.itemName;
  const itemQtyClassHandler = errors.items
    ? `${styles.itemQty} ${styles.invalid}`
    : styles.itemQty;
  const itemPriceClassHandler = errors.items
    ? `${styles.itemPrice} ${styles.invalid}`
    : styles.itemPrice;

  const darkWrapperClassHandler = darkmode
    ? `${styles.wrapper} ${styles.darkWrapper}`
    : styles.wrapper;

  useEffect(() => {
    const { unsubscribe } = watch((value, info) => {
      if (
        info.name?.startsWith("items") &&
        (info.name?.endsWith("price") || info.name?.endsWith("quantity"))
      ) {
        const index = parseInt(info.name.split(".")[1]);

        const price = value.items?.at(index)?.price;
        const quantity = value.items?.at(index)?.quantity;

        register(`items.${index}.total`, {
          value: value.items?.[index]?.total,
        });

        if (price && quantity)
          setValue(`items.${index}.total`, price * quantity);
      }
    });
    return () => unsubscribe();
  }, [watch]);

  useEffect(() => {
    remove(0);
  }, [remove]);

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
                <div className={styles.labelGrp}>
                  <label htmlFor="name"> Item Name</label>
                  <label htmlFor="qty"> Qty.</label>
                  <label htmlFor="price"> Price</label>
                  <label htmlFor="total"> Total</label>
                </div>

                <div className={styles.container}>
                  <div>
                    {fields.map((item, index) => (
                      <div key={item.id} className={styles.itemInput}>
                        <input
                          className={itemNameClassHandler}
                          id="name"
                          type="text"
                          {...register(`items.${index}.name`, {
                            required: true,
                            validate: async (value) => {
                              await sleep(1);
                              return value.trim() !== "";
                            },
                          })}
                        />
                        <input
                          className={itemQtyClassHandler}
                          id="qty"
                          type="number"
                          {...register(`items.${index}.quantity`, {
                            required: true,
                            validate: async (value) => {
                              await sleep(1);
                              return value >= 1;
                            },
                          })}
                        />
                        <input
                          className={itemPriceClassHandler}
                          type="number"
                          id="price"
                          {...register(`items.${index}.price`, {
                            required: true,
                            validate: async (value) => {
                              await sleep(1);
                              return value >= 1;
                            },
                          })}
                        />
                        <input
                          className={styles.itemTotal}
                          disabled
                          id="total"
                          type="number"
                          {...register(`items.${index}.total`, {
                            required: true,
                            validate: async (value) => {
                              await sleep(1);
                              return value >= 1;
                            },
                          })}
                        />
                        <TrashBtn
                          action={() => {
                            remove(index);
                          }}
                        />
                      </div>
                    ))}

                    <div className={styles.itemBtn}>
                      <LightGrayBtn
                        title={"+ Add New Item"}
                        action={() => {
                          append({ name: "", quantity: 0, price: 0, total: 0 });
                        }}
                      />
                    </div>
                  </div>
                </div>
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
            {fields.length === 0 && (
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
