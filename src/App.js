import { Component } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import axios from "axios";

const url = "https://venu-raw.github.io/personsMockData/profileData.json";

class App extends Component {
	state = {
		data: [],
	};

	componentDidMount = async () => {
		try {
			let searchData = await axios(url);

			this.setState({
				data: [...searchData.data],
			});
		} catch (error) {
			console.log(error);
		}
	};

	showResult = (result) => {
		console.log("Result: ", result);
	};

	showQuery = (query) => {
		console.log(query);
	};

	render() {
		return (
			<SearchBar
				searchData={this.state.data}
				result={this.showResult}
				query={this.showQuery}
				searchKeys={["firstName", "lastName", "gender", "university"]}
				placeholder="Search..."
				alignIcon="left"
			/>
		);
	}
}

export default App;
