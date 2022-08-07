import React, { ChangeEvent, useState } from "react";
import AppButton from "../base/html/AppButton";
import AppForm from "../base/html/AppForm";
import AppInput from "../base/html/AppInput";
import AppTitle from "../base/html/AppTitle";
import AlertCondition from "../mutables/AlertCondition";
import { ApiClient } from "../../_services";
import { Product } from "../../interfaces/Product";
import { RequisitionResult } from "../../interfaces/RequisitionResult";

const FormProductEdit = ({ editable }: any) => {
	const [requisitionResult, setRequisitionResult] = useState<
		RequisitionResult | undefined
	>({
		messages: "",
		status: 0,
	});
	const [product, setProduct] = useState<Product>({
		name: editable.name,
		price: editable.price,
		quantity: editable.quantity,
	});

	const handleProductEdit = async () => {
		if (!editable.id) {
			return setRequisitionResult({
				messages: ["Produto não encontrado"],
				status: 404,
			});
		}
		try {
			setRequisitionResult(undefined);
			const { status } = await ApiClient.patch(
				"/products/" + editable.id,
				product
			);
			if (status === 200) {
				setRequisitionResult({
					messages: [`produto ${product.name} editado com sucesso`],
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
			defaultValue: editable.name,
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
			defaultValue: editable.price,
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
			defaultValue: editable.quantity,
			onChange: (e: ChangeEvent<HTMLInputElement>) =>
				setProduct({ ...product, quantity: e.target.valueAsNumber }),
		},
	};

	const infoSubmitButton = {
		info: {
			title: "Salvar",
			id: "submit-edited",
			disabled: false,
			required: true,
			color: "greenToBlue",
			onClick: async () => handleProductEdit(),
		},
	};

	return (
		<AppForm>
			<AppTitle title={`Editando ${editable.name}`} />
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

export default FormProductEdit;
