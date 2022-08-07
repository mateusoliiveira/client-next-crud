import { Button } from "flowbite-react";
import React from "react";

interface InfoButton {
	info: React.ButtonHTMLAttributes<{}>;
}

const AppButton = ({ info }: InfoButton) => {
	return (
		<Button
			type={info.type}
			disabled={info.disabled}
			gradientDuoTone={info.color}
			onClick={info.onClick}
			title={info.title}
		>
			{info.title}
		</Button>
	);
};

export default AppButton;
