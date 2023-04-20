import { Schema, model, models } from "mongoose";
import Invoices from "@/models/Invoices";

const InvoiceSchema = new Schema<Invoices>({
  clientAddress: {
    city: String,
    country: String,
    postCode: String,
    street: String,
  },
  clientEmail: String,
  clientName: String,
  createdAt: Date,
  description: String,
  id: String,
  items: {
    0: {
      name: String,
      price: Number,
      quantity: Number,
      total: Number,
    },
    1: {
      name: String,
      price: Number,
      quantity: Number,
      total: Number,
    },
  },
  paymentDue: Date,
  paymentTerms: Number,
  senderAddress: {
    city: String,
    country: String,
    postCode: String,
    street: String,
  },
  status: String,
  total: Number,
});

const invoice = models.invoice || model("invoice", InvoiceSchema);

export default invoice;
