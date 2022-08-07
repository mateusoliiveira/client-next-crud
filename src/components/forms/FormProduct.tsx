import React, { ChangeEvent, useEffect, useState } from "react";
import AppButton from "../base/html/AppButton";
import AppForm from "../base/html/AppForm";
import AppInput from "../base/html/AppInput";
import AppTitle from "../base/html/AppTitle";
import AlertCondition from "../mutables/AlertCondition";
import { ApiClient } from "../../_services";
import { RequisitionResult } from "../../interfaces/RequisitionResult";
import { Product } from "../../interfaces/Product";

const FormProduct = () => {
	const [requisitionResult, setRequisitionResult] = useState<
		RequisitionResult | undefined
	>({
		messages: "",
		status: 0,
	});
	const [product, setProduct] = useState<Product>({
		name: "",
		price: 0,
		quantity: 0,
	});

	const handleProduct = async () => {
		try {
			setRequisitionResult(undefined);
			const { status } = await ApiClient.post("/products", product);
			if (status === 201) {
				setRequisitionResult({
					messages: [`produto ${product.name} criado com sucesso`],
					status,
				});
			}
		} catch (error: any) {
			setRequisitionResult({
				messages: [error.response.data.validation.body.message],
				status: error.response.status,
			});
		}
	};

	const infoNameInput = {
		info: {
			id: "name",
			label: "nome",
			type: "text",
			disabled: false,
			required: true,
			onChange: (e: ChangeEvent<HTMLInputElement>) =>
				setProduct({ ...product, name: e.target.value }),
		},
	};

	const infoPriceInput = {
		info: {
			id: "price",
			label: "preço",
			type: "text",
			disabled: false,
			required: true,
			onChange: (e: ChangeEvent<HTMLInputElement>) =>
				setProduct({ ...product, price: e.target.valueAsNumber }),
		},
	};

	const infoQuantityInput = {
		info: {
			id: "quantity",
			label: "quantidade",
			type: "text",
			disabled: false,
			required: true,
			onChange: (e: ChangeEvent<HTMLInputElement>) =>
				setProduct({ ...product, quantity: e.target.valueAsNumber }),
		},
	};

	const infoSubmitButton = {
		info: {
			title: "Entrar",
			id: "submit-login",
			disabled: false,
			required: true,
			color: "purpleToBlue",
			onClick: async () => handleProduct(),
		},
	};

	return (
		<AppForm>
			<AppTitle title={"Criando produto"} />
			<AlertCondition
				messages={requisitionResult?.messages}
				status={requisitionResult?.status}
			/>
			<AppInput {...infoNameInput}></AppInput>
			<AppInput {...infoPriceInput}></AppInput>
			<AppInput {...infoQuantityInput}></AppInput>
			<AppButton {...infoSubmitButton} />
		</AppForm>
	);
};

export default FormProduct;
