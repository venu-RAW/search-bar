import React from "react";
import { shallow } from "enzyme";
import SearchBar from "./SearchBar";
import { findByTestAttribute } from "../../../Utils/index";

const testProps = {
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

const setUp = (props = testProps) => {
	const wrapper = shallow(<SearchBar {...props} />);
	return wrapper;
};

describe("SearchBar Component", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = setUp();
	});

	it("should render the component", () => {
		const component = findByTestAttribute(wrapper, "searchBar");
		expect(component.length).toBe(1);
	});

	it("should receive empty string", () => {
		let event = {
			target: {
				value: "",
			},
		};

		wrapper.find("input").simulate("change", event);
		expect(wrapper.state("searchInput")).toBe("");
		expect(wrapper.state().resultArray.length).toBe(0);
	});

	it("should receive an event, check length of resultArray", () => {
		let event = {
			target: {
				value: "S",
			},
		};

		wrapper.find("input").simulate("change", event);
		expect(wrapper.state("searchInput")).toBe("S");
		expect(wrapper.state().resultArray.length).toBe(2);
	});
});
