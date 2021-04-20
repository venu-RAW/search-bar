import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import SearchBar from "./SearchBar";

// afterEach(cleanup);

describe("<SearchBar /> component", () => {
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

	/*
	it("should render the SearchBar", () => {
		let { asFragment } = wrapper;
		expect(asFragment()).toMatchSnapshot();
	});
	*/

	it("should render the SearchBar Component", () => {
		render(<SearchBar {...testProps} />);

		expect(screen.getByTestId("searchBar")).toBeTruthy();
	});

	it("should have class of left if alignIcon prop is left", () => {
		render(<SearchBar {...testProps} />);

		expect(screen.getByTestId("searchBar")).toHaveClass("left");
	});

	it("should have class of right if alignIcon prop is right", () => {
		const testProps1 = {
			...testProps,
			alignIcon: "right",
		};
		render(<SearchBar {...testProps1} />);
		expect(screen.getByTestId("searchBar")).toHaveClass("right");
	});

	// check the placeholder text for the input element
	it("should find the input element using placeholder text coming from props", () => {
		render(<SearchBar {...testProps} />);

		expect(screen.getByPlaceholderText("Search")).toBeTruthy();
	});

	it("should receive an event, check length of resultArray", () => {
		render(<SearchBar {...testProps} />);

		let event = {
			target: {
				value: "E",
			},
		};

		const input = screen.getByTestId("searchBarInput");
		fireEvent.change(input, event);

		expect(input).not.toBeNull();
		expect(input).toHaveValue("E");
		expect(testProps.query).toHaveBeenCalledWith("E");
		expect(testProps.result).toHaveBeenCalledWith([
			{
				id: 2,
				firstName: "Worden",
			},
			{
				id: 3,
				firstName: "Idell",
			},
		]);
	});

	it("should check the class for searchbtn and searchicon", () => {
		render(<SearchBar {...testProps} />);

		expect(screen.getByTestId("searchbtn")).toHaveClass("searchBtn");
		expect(screen.getByTestId("searchicon")).toHaveClass("fa-search");
	});
});
