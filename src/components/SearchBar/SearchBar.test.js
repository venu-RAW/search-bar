import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import SearchBar from "./SearchBar";

afterEach(cleanup);

describe("<SearchBar /> component", () => {
	let wrapper;

	let testProps = {
		searchData: [
			{
				id: 1,
				firstName: "Shannon",
			},
			{
				id: 2,
				firstName: "Worden",
			},
			{
				id: 3,
				firstName: "Idell",
			},
			{
				id: 4,
				firstName: "Shanti",
			},
		],
		result: jest.fn(),
		query: jest.fn(),
		searchKeys: ["firstName"],
		placeholder: "Search",
		alignIcon: "left",
	};

	beforeEach(() => {
		wrapper = render(<SearchBar {...testProps} />);
	});

	/*
	it("should render the SearchBar", () => {
		let { asFragment } = wrapper;
		expect(asFragment()).toMatchSnapshot();
	});
	*/

	it("should render the SearchBar Component", () => {
		let { getByTestId } = wrapper;

		expect(getByTestId("searchBar")).toBeTruthy();
	});

	it("should receive empty string", () => {
		let event = {
			target: {
				value: "",
			},
		};
		let { container, getByTestId } = wrapper;

		const searchBarInput = getByTestId("searchBarInput");

		const input = container.querySelector("input");
		fireEvent.change(input, event);

		expect(searchBarInput).not.toBeNull();
		expect(searchBarInput).toHaveValue("");
	});

	it("should receive an event, check length of resultArray", () => {
		let event = {
			target: {
				value: "S",
			},
		};
		let { container, getByTestId } = wrapper;

		const searchBarInput = getByTestId("searchBarInput");

		const input = container.querySelector("input");
		fireEvent.change(input, event);

		expect(searchBarInput).not.toBeNull();
		expect(searchBarInput).toHaveValue("S");
	});
});
