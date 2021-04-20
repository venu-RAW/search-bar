import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";
import App from "./App";

// Test cases
afterEach(cleanup);

it("renders the App component", () => {
	const { getByTestId } = render(<App />);
	expect(getByTestId("app")).toBeTruthy();
});

it("fetches and displays data", async () => {
	axiosMock.get.mockResolvedValueOnce({
		data: [
			{
				email: "stattoo0@netvibes.com",
				firstName: "Shannon",
				gender: "Male",
				id: 1,
				jobTitle: "Accountant I",
				lastName: "Tattoo",
				skills: "USB",
				university: "Sri Padmavati Women's University",
			},
		],
	});

	const url = "https://venu-raw.github.io/personsMockData/profileData.json";

	const { getByTestId } = render(<App />);

	const resolvedResult = await waitFor(() => getByTestId("firstnamedata"));

	expect(axiosMock.get).toHaveBeenCalledTimes(1);
	expect(axiosMock.get).toHaveBeenCalledWith(url);
	expect(resolvedResult).toHaveTextContent("Shannon");
});
