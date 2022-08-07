import type { GetServerSidePropsContext, NextPage } from "next";
import AppMain from "../../../components/base/html/AppMain";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]";
import { ApiClient } from "../../../_services";
import FormProductEdit from "../../../components/forms/FormProductEdit";
import { Product } from "../../../interfaces/Product";

const ProductEdit: NextPage<{ product: Product }> = ({
	product,
}: {
	product: Product;
}) => {
	return (
		<AppMain>
			<div className="m-auto">
				<FormProductEdit editable={product} />
			</div>
		</AppMain>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { data } = await ApiClient.get("/products/" + context.query.id);
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);

	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
			product: data,
		},
	};
}

export default ProductEdit;
