import type {
	GetServerSideProps,
	GetServerSidePropsContext,
	NextPage,
} from "next";
import AppCardProduct from "../components/base/AppCardProduct";
import AppMain from "../components/base/html/AppMain";
import AppTitle from "../components/base/html/AppTitle";
import { ApiClient } from "../_services";
import { authOptions } from "./api/auth/[...nextauth]";
import { Session, unstable_getServerSession } from "next-auth";
import { useState } from "react";
import AppButton from "../components/base/html/AppButton";
import AlertCondition from "../components/mutables/AlertCondition";
import { useRouter } from "next/router";
import { Product } from "../interfaces/Product";

const Home: NextPage<{ products: Product[]; session: Session }> = ({
	products,
	session,
}: {
	products: Product[];
	session: Session;
}) => {
	const [allProducts, setAllProducts] = useState<any[]>(products);
	const [requisitionResult, setRequisitionResult] = useState<any>({});
	const router = useRouter();

	const handleDeleteProduct = async (id: string | undefined) => {
		if (!id) {
			return setRequisitionResult({
				messages: ["Produto não encontrado"],
				status: 404,
			});
		}
		try {
			const { status } = await ApiClient.delete("/products/" + id);
			if (status === 200) {
				setAllProducts(allProducts.filter((p) => p.id !== id));
				setRequisitionResult({
					messages: ["Produto deletado com sucesso"],
					status: 200,
				});
			}
		} catch (error: any) {
			setRequisitionResult({
				messages: Object.values(error.response.data.config),
				status: error.response.status,
			});
		}
	};

	const infoDeleteButton = {
		info: {
			title: "Excluir",
			id: "submit-delete",
			disabled: false,
			required: true,
			color: "pinkToOrange",
		},
	};
	const infoEditButton = {
		info: {
			title: "Editar",
			id: "submit-edit",
			disabled: false,
			required: true,
			color: "greenToBlue",
		},
	};

	return (
		<AppMain>
			<>
				<AppTitle
					title={session ? "Olá " + session?.user?.name : "Seja bem vindo"}
				/>
				<AlertCondition
					messages={requisitionResult?.messages}
					status={requisitionResult?.status}
				/>
				{allProducts.map((product: Product) => {
					return (
						<AppCardProduct key={product.id} info={product}>
							<div className="flex gap-2">
								<AppButton
									info={{
										...infoDeleteButton.info,
										onClick: () => handleDeleteProduct(product.id),
									}}
								/>
								<AppButton
									info={{
										...infoEditButton.info,
										onClick: () =>
											router.push("/product/" + product.id + "/edit"),
									}}
								/>
							</div>
						</AppCardProduct>
					);
				})}
			</>
		</AppMain>
	);
};

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const { data } = await ApiClient.get(`/products`);
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);
	context.res.setHeader(
		"Cache-Control",
		"public, s-maxage=10, stale-while-revalidate=59"
	);
	return {
		props: {
			products: data,
			session,
		},
	};
};

export default Home;
