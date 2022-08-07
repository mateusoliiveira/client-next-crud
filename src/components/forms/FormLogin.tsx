import React, { ChangeEvent, useEffect, useState } from "react";
import AppButton from "../base/html/AppButton";
import AppForm from "../base/html/AppForm";
import AppInput from "../base/html/AppInput";
import AppTitle from "../base/html/AppTitle";
import { signIn } from "next-auth/react";
import AlertCondition from "../mutables/AlertCondition";
import { useRouter } from "next/router";
import { UserCredentials } from "../../interfaces/UserCredentials";
import { RequisitionResult } from "../../interfaces/RequisitionResult";

const FormLogin = () => {
	const router = useRouter();
	const [requisitionResult, setRequisitionResult] = useState<
		RequisitionResult | undefined
	>({
		messages: "",
		status: 0,
	});
	const [credentials, setCredentials] = useState<UserCredentials>({
		email: "",
		password: "",
	});

	const handleLogin = async () => {
		await signIn("credentials", { ...credentials, callbackUrl: "/account" });
	};

	const infoEmailInput = {
		info: {
			id: "email",
			label: "email",
			type: "text",
			disabled: false,
			required: true,
			onChange: (e: ChangeEvent<HTMLInputElement>) =>
				setCredentials({ ...credentials, email: e.target.value }),
		},
	};

	const infoPasswordInput = {
		info: {
			id: "password",
			label: "password",
			type: "password",
			disabled: false,
			required: true,
			onChange: (e: ChangeEvent<HTMLInputElement>) =>
				setCredentials({ ...credentials, password: e.target.value }),
		},
	};

	const infoSubmitButton = {
		info: {
			title: "Entrar",
			id: "submit-login",
			disabled: false,
			required: true,
			color: "purpleToBlue",
			onClick: async () => handleLogin(),
		},
	};

	useEffect(() => {
		setRequisitionResult({
			messages: Object.values(router.query)[0],
			status: Number(router.query.status),
		});
	}, [router.query]);

	return (
		<AppForm>
			<AppTitle title={"Entrar"} />
			<AlertCondition
				messages={requisitionResult?.messages}
				status={requisitionResult?.status}
			/>
			<AppInput {...infoEmailInput}></AppInput>
			<AppInput {...infoPasswordInput}></AppInput>
			<AppButton {...infoSubmitButton} />
		</AppForm>
	);
};

export default FormLogin;
