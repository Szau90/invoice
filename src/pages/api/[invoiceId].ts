import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const id = req.query.invoiceId;

  try {
    switch (method) {
      case "GET":
        const client = await MongoClient.connect(
          process.env.MONGO_URL
        );
        const db = client.db();
        const invoice = await db.collection("invoices").findOne({ id: id });

        client.close();

        res.status(201).json(JSON.parse(JSON.stringify(invoice)));

        break;

      default:
        res.status(405).end(`${method} Not Allowed`);
        break;
    }
  } catch (error) {
    console.log(error);
  }
}
