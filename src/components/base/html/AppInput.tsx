import { Label, TextInput } from "flowbite-react";
import React from "react";

interface InfoInput {
	info: React.InputHTMLAttributes<{}> & { helper?: string; label: string };
}

const AppInput = ({ info }: InfoInput) => {
	return (
		<div className="">
			<div className="mb-2 block">
				<Label htmlFor={info.id} value={info.label} />
			</div>
			<TextInput
				id={info.id}
				type={info.type}
				required={info.required}
				disabled={info.disabled}
				defaultValue={info.defaultValue}
				helperText={<React.Fragment>{info.helper}</React.Fragment>}
				onChange={info.onChange}
			/>
		</div>
	);
};

export default AppInput;
