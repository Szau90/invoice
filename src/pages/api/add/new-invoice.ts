import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      process.env.MONGO_URL
    );
    const db = client.db();

    const invoiceCollection = db.collection("invoices");

    const result = await invoiceCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "invoice inserted!" });
  }
};

export default handler;
