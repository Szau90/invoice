import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import Invoices from "@/models/Invoices";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const { invoiceId } = req.query;
    const data: Invoices = req.body;
    console.log(data);

    const client = await MongoClient.connect(
     process.env.MONGO_URL
    );
    const db = client.db();

    const invoiceCollection = db.collection("invoices");

    let items;

    const empty = data.items[1] === undefined;

    if (empty) {
      items = [
        {
          name: data.items[0].name,
          price: data.items[0].price,
          quantity: data.items[0].quantity,
          total: data.items[0].total,
        },
      ];
    } else {
      items = [
        {
          name: data.items[0].name,
          price: data.items[0].price,
          quantity: data.items[0].quantity,
          total: data.items[0].total,
        },
        {
          name: data.items[1].name,
          price: data.items[1].price,
          quantity: data.items[1].quantity,
          total: data.items[1].total,
        },
      ];
    }

    const result = await invoiceCollection.replaceOne(
      {
        id: invoiceId,
      },
      {
        clientAddress: {
          city: data.clientAddress.city,
          country: data.clientAddress.country,
          postCode: data.clientAddress.postCode,
          street: data.clientAddress.street,
        },
        clientEmail: data.clientEmail,
        clientName: data.clientName,
        createdAt: data.createdAt,
        description: data.description,
        id: data.id,
        items: items,
        paymentTerms: data.paymentTerms,
        senderAddress: {
          city: data.senderAddress.city,
          country: data.senderAddress.country,
          postCode: data.senderAddress.postCode,
          street: data.senderAddress.street,
        },
        status: data.status,
        paymentDue: data.paymentDue,
        total: data.total,
      }
    );

    console.log(result);

    client.close();

    res.status(201).json({ message: "Invoice updated!" });
  }
};

export default handler;
