import { Hourglass } from "react-loader-spinner";

function Loader() {
	return (
		<Hourglass
			visible={true}
			height="80"
			// width={less768px ? "60" : size || "100"}
			width="80"
			ariaLabel="hourglass-loading"
			wrapperStyle={{}}
			wrapperClass=""
			colors={["grey", "#A4BE5C"]}
		/>
	);
}
export default Loader;
