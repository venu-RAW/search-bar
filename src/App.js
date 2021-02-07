import SearchBar from "./components/SearchBar/SearchBar";
import { data } from "./data/data";

function App() {
	return (
		<>
			<SearchBar
				searchData={data}
				alignIcon="left"
				// onChange={(search) => {
				// 	console.log(search);
				// }}
				result={(result) => {
					console.log("Result: ", result);
				}}
			/>
		</>
	);
}

export default App;
