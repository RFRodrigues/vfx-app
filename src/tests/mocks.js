import { rest } from "msw";

export const handlers = [
  rest.get("https://www.alphavantage.co/query", (req, res, ctx) => {
    return res(
      ctx.json({
        "Time Series FX (Daily)": {
          "2024-02-19": {
            "1. open": "1.10000",
            "2. high": "1.12000",
            "3. low": "1.08000",
            "4. close": "1.11000",
          },
        },
      })
    );
  })
];
