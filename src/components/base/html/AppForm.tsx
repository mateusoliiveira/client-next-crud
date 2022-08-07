import React from "react";

interface FormChildren {
	children: React.ReactElement[];
}

const AppForm = ({ children }: FormChildren) => {
	return (
		<div className="justify-center m-auto px-40 flex">
			<form
				className="flex flex-col gap-4"
				onSubmit={(e) => e.preventDefault()}
			>
				{children}
			</form>
		</div>
	);
};

export default AppForm;
