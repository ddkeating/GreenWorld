import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./utility/NavigationHandler";

export default function App() {
	return (
		<NavigationContainer>
			<AppNavigator />
		</NavigationContainer>
	);
}
