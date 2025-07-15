"use client";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q: searchQuery } = req.query;

  if (!searchQuery) {
    res.status(401).json({ error: "`query` is expected" });
  }

  try {
    const response = await fetch(
      `https://financialmodelingprep.com/stable/search-name?query=${searchQuery}&apikey=${process.env.FMP_API_KEY}`
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: `Server returned with error: ${error}` });
  }
}
