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
  items: [
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
}

export default Invoices;

export interface InvoiceState {
  invoice: Invoices[];
  changed: boolean;
}
