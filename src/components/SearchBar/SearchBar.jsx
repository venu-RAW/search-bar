import { Component } from "react";
import styles from "./SearchBar.module.scss";
import PropTypes from "prop-types";

class SearchBar extends Component {
	state = {
		searchInput: "",
	};

	handleChange = (e) => {
		this.setState({
			searchInput: e.target.value,
		});
		this.searchResult(this.state.searchInput);
		// this.props.onChange(this.state.searchInput);
	};

	searchResult = (value) => {
		const { searchData } = this.props;
		let resultArray = [];

		console.log(searchData);

		// searchData.filter((val) => {
		// 	// if (val.name.toLowerCase().includes(value.toLowerCase())) {
		// 	// 	console.log(val);
		// 	// 	// resultArray.push(val.name);
		// 	// }
		// 	// return this.props.result(resultArray);
		// });
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
	 * The placeholder type must be a string
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

// if (alignIcon !== "right" && alignIcon !== "left") {
// 	throw new Error("alignIcon value must be right or left");
// }
