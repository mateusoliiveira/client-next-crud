import React from "react";

interface TitleChildren {
	title: string;
}

const AppTitle = ({ title }: TitleChildren) => {
	return (
		<h1 className="sm:text-5xl text-xl mb-4 font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-500">
			{title}
		</h1>
	);
};

export default AppTitle;
