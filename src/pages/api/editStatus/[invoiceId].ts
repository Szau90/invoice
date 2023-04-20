import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const { invoiceId } = req.query;
    const status = "paid";

    const client = await MongoClient.connect(
      "mongodb+srv://szau90:FordMondeo12@cluster0.jfdopa9.mongodb.net/invoices?retryWrites=true&w=majority"
    );
    const db = client.db();

    const invoiceCollection = db.collection("invoices");

    const result = await invoiceCollection.findOneAndUpdate(
      {
        id: invoiceId,
      },
      {
        $set: {
          status: status,
        },
      }
    );

    console.log(result);

    client.close();

    res.status(201).json({ message: "Invoice status updated!" });
  }
};

export default handler;
