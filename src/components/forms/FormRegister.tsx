import React, { ChangeEvent, useState } from "react";
import { RequisitionResult } from "../../interfaces/RequisitionResult";
import { UserRegistration } from "../../interfaces/UserRegistration";
import { ApiClient } from "../../_services";
import AppButton from "../base/html/AppButton";
import AppForm from "../base/html/AppForm";
import AppInput from "../base/html/AppInput";
import AppTitle from "../base/html/AppTitle";
import AlertCondition from "../mutables/AlertCondition";

const FormLogin = () => {
	const [registration, setRegistration] = useState<UserRegistration>({
		email: "",
		name: "",
		password: "",
	});
	const [requisitionResult, setRequisitionResult] = useState<
		RequisitionResult | undefined
	>({
		messages: "",
		status: 0,
	});

	const handleRegister = async () => {
		try {
			setRequisitionResult(undefined);
			const { status } = await ApiClient.post("/users", registration);
			if (status === 201) {
				setRequisitionResult({
					messages: [`usuário ${registration.name} criado com sucesso`],
					status,
				});
			}
		} catch (error: any) {
			setRequisitionResult({
				messages: Object.values(error.response.data.config),
				status: error.response.status,
			});
		}
	};

	const infoEmailInput = {
		info: {
			id: "email",
			label: "email",
			type: "email",
			disabled: false,
			required: true,
			onChange: (e: ChangeEvent<HTMLInputElement>) =>
				setRegistration({ ...registration, email: e.target.value }),
		},
	};

	const infoPasswordInput = {
		info: {
			id: "password",
			label: "senha",
			type: "password",
			disabled: false,
			required: true,
			onChange: (e: ChangeEvent<HTMLInputElement>) =>
				setRegistration({ ...registration, password: e.target.value }),
		},
	};

	const infoNameInput = {
		info: {
			id: "name",
			label: "nome",
			type: "text",
			disabled: false,
			required: true,
			onChange: (e: ChangeEvent<HTMLInputElement>) =>
				setRegistration({ ...registration, name: e.target.value }),
		},
	};

	const infoSubmitButton = {
		info: {
			title: "Entrar",
			id: "submit-login",
			disabled: !Object.values(registration).every((value: string) => value),
			required: true,
			color: "purpleToBlue",
			onClick: () => handleRegister(),
		},
	};

	return (
		<>
			<AppForm>
				<AppTitle title={"Registrar"} />
				<AlertCondition
					messages={requisitionResult?.messages}
					status={requisitionResult?.status}
				/>
				<AppInput {...infoEmailInput}></AppInput>
				<AppInput {...infoNameInput}></AppInput>
				<AppInput {...infoPasswordInput}></AppInput>
				<AppButton {...infoSubmitButton} />
			</AppForm>
		</>
	);
};

export default FormLogin;
