import React, { Component } from "react";
import styles from "./SearchBar.module.scss";
import PropTypes from "prop-types";

/**
 * Renders a <Searchbar /> component
 * @component
 *	<Searchbar
 *		searchData={this.state.data}
 *		result={this.showResult}
 *		searchKeys={["firstName", "lastName", "gender", "university"]}
 *		query={this.showQuery}
 *		placeholder="Search..."
 *		alignIcon="left"
 *	/>
 */

class SearchBar extends Component {
	state = {
		searchInput: "",
		resultArray: [],
	};

	/**
	 * @function handleChange
	 * @param {Event} event
	 ** Sets searchInput inside state and the searchInput value is passed to searchResult().
	 */
	handleChange = (event) => {
		const searchInput = event.target.value;
		const { query } = this.props;

		this.setState({
			searchInput,
		});

		query(searchInput);
		this.searchResult(searchInput);
	};

	/**
	 * @function searchResult
	 * @fires props.result
	 */
	searchResult = (searchInput) => {
		let resultArray = [];
		const { searchData, searchKeys } = this.props;

		if (searchInput.length)
			searchKeys.forEach((key) => {
				resultArray = searchData.filter((data) =>
					data[key].toLowerCase().includes(searchInput.toLowerCase())
				);
			});

		this.setState({
			resultArray,
		});

		/**
		 ** Execute callback named result and return it.
		 */
		return this.props.result(resultArray);
	};

	render() {
		const { placeholder, alignIcon } = this.props;

		return (
			<div
				data-test="searchBar"
				data-testid="searchBar"
				className={`${styles.searchBar} ${styles[alignIcon]}`}
			>
				<input
					data-testid="searchBarInput"
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
	 ** The searchData type must be an array of objects ( Required ).
	 */
	searchData: PropTypes.array.isRequired,

	/**
	 ** The result type must funciton. It shows the result for the query.
	 */
	result: PropTypes.func.isRequired,

	/**
	 ** The query type must be a function. It shows the user query.
	 */
	query: PropTypes.func,

	/**
	 ** The keys on which you want to perform your search.
	 */
	searchKeys: PropTypes.arrayOf(PropTypes.string),

	/**
	 ** The placeholder type must be a string.
	 */
	placeholder: PropTypes.string,

	/**
	 ** The alignIcon type must be a string ( left or right )
	 ** By default is "right"
	 */
	alignIcon: PropTypes.oneOf(["left", "right"]),
};

SearchBar.defaultProps = {
	placeholder: "Search",
	alignIcon: "right",
};

export default SearchBar;
