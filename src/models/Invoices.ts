import { ObjectId } from "mongodb";

export interface Item {
  name:string;
  price: number;
  quantity: number;
  total: number;
}

interface Invoices {
  clientAddress: {
    city: string;
    country: string;
    postCode: string;
    street: string;
  };
  clientEmail: string;
  clientName: string;
  createdAt: Date;
  description: string;
  id: string;
  items: Item[];
  paymentDue: Date;
  paymentTerms: number;
  senderAddress: {
    city: string;
    country: string;
    postCode: string;
    street: string;
  };
  status: string;
  total: number;
  _id:string | undefined;
 
}

export default Invoices;

export interface InvoiceState {
  invoice: Invoices[];
  changed: boolean;
}
