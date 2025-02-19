import { render, screen, waitFor } from "@testing-library/react";
import Home from "./Home";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// Mock API response before each test
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          "Time Series FX (Daily)": {
            "2024-02-15": {
              "1. open": "1.10000",
              "2. high": "1.12000",
              "3. low": "1.08000",
              "4. close": "1.11000",
            },
          },
        }),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders Forex Daily Prices title", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  const title = screen.getByText(/Forex Daily Prices/i);
  expect(title).toBeInTheDocument();
});

test("currency dropdowns change value", async () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  const currencyFrom = screen.getByRole("combobox", { name: "Currency From" });
  const currencyTo = screen.getByRole("combobox", { name: "Currency To" });

  await userEvent.selectOptions(currencyFrom, "USD");
  await userEvent.selectOptions(currencyTo, "GBP");

  expect(currencyFrom).toHaveValue("USD");
  expect(currencyTo).toHaveValue("GBP");
});

test("fetches and displays Forex data", async () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  // Click refresh button
  const refreshButton = screen.getByRole("button", { name: "Refresh" });
  await userEvent.click(refreshButton);

  // Wait for UI update
  await waitFor(() => {
    expect(screen.getByText("1.10000")).toBeInTheDocument();
    expect(screen.getByText("1.12000")).toBeInTheDocument();
    expect(screen.getByText("1.08000")).toBeInTheDocument();
    expect(screen.getByText("1.11000")).toBeInTheDocument();
  });
});
