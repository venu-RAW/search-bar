import React, { Component } from "react";
import styles from "./SearchBar.module.scss";
import PropTypes from "prop-types";

class SearchBar extends Component {
	state = {
		searchInput: "",
	};

	handleChange = (e) => {
		const searchInput = e.target.value;
		const { query } = this.props;

		this.setState({
			searchInput: searchInput,
		});

		this.searchResult(searchInput);
		query(searchInput);
	};

	searchResult = (searchInput) => {
		const { searchData } = this.props;

		let resultArray = searchData
			.filter((data) =>
				data.firstName.toLowerCase().includes(searchInput.toLowerCase())
			)
			.map((obj) => obj.firstName);

		return this.props.result(resultArray);
	};

	render() {
		const { placeholder, alignIcon } = this.props;

		return (
			<div className={`${styles.searchBar} ${styles[alignIcon]}`}>
				<input
					type="text"
					className={styles.searchInput}
					value={this.state.searchInput}
					placeholder={placeholder}
					onChange={this.handleChange}
				/>
				<div className={styles.searchBtn}>
					<i className="fas fa-search"></i>
				</div>
			</div>
		);
	}
}

SearchBar.propTypes = {
	/**
	 * The searchData type must be an array of objects ( Required ).
	 */
	searchData: PropTypes.array.isRequired,
	/**
	 * The result type must funciton. It shows the result for the query.
	 */
	result: PropTypes.func.isRequired,
	/**
	 * The query type must be a function. It shows the user query.
	 */
	query: PropTypes.func.isRequired,
	/**
	 * The placeholder type must be a string.
	 */
	placeholder: PropTypes.string,
	/**
	 * The alignIcon type must be a string ( left or right )
	 * By default is "right"
	 */
	alignIcon: PropTypes.oneOf(["left", "right"]),
};

SearchBar.defaultProps = {
	placeholder: "Search",
	alignIcon: "right",
};

export default SearchBar;
