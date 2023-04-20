// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const { invoiceId } = req.query;

    const client = await MongoClient.connect(
     process.env.MONGO_URL
    );
    const db = client.db();

    const invoiceCollection = db.collection("invoices");

    const result = await invoiceCollection.findOneAndDelete({ id: invoiceId });

    console.log(result);

    client.close();

    res.status(201).json({ message: "Invoice deleted!" });
  }
};

export default handler;
