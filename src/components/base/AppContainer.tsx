import React from "react";

interface ContainerChildren {
	children: React.ReactElement;
}

const AppContainer = ({ children }: ContainerChildren) => {
	return <section className="p-5">{children}</section>;
};

export default AppContainer;
