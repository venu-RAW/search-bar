import { Component } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import axios from "axios";

let url = "https://venu-raw.github.io/personsMockData/profileData.json";

class App extends Component {
	state = {
		data: [],
	};

	componentDidMount = async () => {
		try {
			let searchData = await axios.get(url);
			// console.log(searchData.data);
			this.setState({
				data: [...searchData.data],
			});
		} catch (error) {
			console.log("error", error);
		}
	};

	showResult = (result) => {
		console.log(`Result: `, result);
		return result;
	};

	showQuery = (query) => {
		console.log(`Query: `, query);
	};

	render() {
		return (
			<div data-testid="app">
				{this.state.data &&
					this.state.data.map((data) => (
						<p key={data.id} data-testid="firstnamedata">
							{data.firstName}
						</p>
					))}

				<SearchBar
					searchData={this.state.data}
					result={this.showResult}
					query={this.showQuery}
					// searchKeys={["firstName", "lastName", "gender", "university"]}
					searchKeys={["firstName"]}
					placeholder="Search..."
					alignIcon="left"
				/>
			</div>
		);
	}
}

export default App;
