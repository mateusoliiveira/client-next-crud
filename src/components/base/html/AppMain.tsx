import React from "react";
import AppContainer from "../AppContainer";
import AppFooter from "./AppFooter";
import AppNavbar from "./AppNavbar";

interface MainChildren {
	children: React.ReactElement;
}

const AppMain = ({ children }: MainChildren) => {
	return (
		<main className="min-h-100 min-h-screen">
			<AppNavbar />
			<AppContainer>{children}</AppContainer>
			<AppFooter />
		</main>
	);
};

export default AppMain;
