"use client";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { searchQuery } = req.query;
  console.log(searchQuery);

  try {
    const response = await fetch(
      `https://financialmodelingprep.com/stable/quote?q=${searchQuery}&apikey=${process.env.FMP_API_KEY}`
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
}
