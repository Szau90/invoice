import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Invoices from "@/models/Invoices";
import { InvoiceState } from "@/models/Invoices";

const initialState: InvoiceState = {
  invoice: [],
  changed: false,
};

const manageInvoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    addInvoice(state: InvoiceState, action: PayloadAction<Invoices>) {
      const newInvoice = action.payload;
      const existingInvoice = state.invoice.find((i) => i.id === newInvoice.id);

      state.changed = true;

      if (!existingInvoice) {
        state.invoice.push({
          id: newInvoice.id,
          clientAddress: {
            street: newInvoice.clientAddress.street,
            city: newInvoice.clientAddress.city,
            postCode: newInvoice.clientAddress.postCode,
            country: newInvoice.clientAddress.country,
          },
          clientEmail: newInvoice.clientEmail,
          clientName: newInvoice.clientName,
          createdAt: newInvoice.createdAt,
          description: newInvoice.description,
          items: [
            {
              name: newInvoice.items[0].name,
              price: newInvoice.items[0].price,
              quantity: newInvoice.items[0].quantity,
              total: newInvoice.items[0].total,
            },
            {
              name: newInvoice.items[1].name,
              price: newInvoice.items[1].price,
              quantity: newInvoice.items[1].quantity,
              total: newInvoice.items[1].total,
            },
          ],
          paymentDue: newInvoice.paymentDue,
          paymentTerms: newInvoice.paymentTerms,
          senderAddress: {
            street: newInvoice.senderAddress.street,
            city: newInvoice.senderAddress.city,
            postCode: newInvoice.senderAddress.postCode,
            country: newInvoice.senderAddress.country,
          },
          status: newInvoice.status,
          total: newInvoice.total,
        });
      }
    },
    removeInvoice(state: InvoiceState, action: PayloadAction<Invoices>) {
      const invoiceId = action.payload;
      const existingInvoice = state.invoice.find((i) => i.id === invoiceId.id);
      state.changed = true;

      if (existingInvoice) {
        state.invoice.filter((invoice) => invoice.id !== invoiceId.id);
      } else {
        return;
      }
    },
    replaceInvoice(state, action) {
      state.invoice = action.payload;
    },
  },
});

export const invoiceActions = manageInvoiceSlice.actions;
export default manageInvoiceSlice.reducer;
