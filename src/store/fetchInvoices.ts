import Invoices from "@/models/Invoices";

export const sendInvoiceData = (data: Invoices) => {
  return async () => {
    const sendRequest = async () => {
      const response = await fetch("api/add/new-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Sending invoice data failed.");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      throw new Error("Sending invoice data failed.");
    }
  };
};
export const updateInvoiceData = (id: string, data: Invoices) => {
  return async () => {
    const sendUpdatedInvoice = async (invoiceId: string, data: Invoices) => {
      const res = await fetch(`/api/edit/${invoiceId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.data.error.message);
      }
    };

    try {
      await sendUpdatedInvoice(id, data);
    } catch (error) {
      throw new Error("Sending invoice data failed.");
    }
  };
};
