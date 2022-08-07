import type {
	GetServerSideProps,
	GetServerSidePropsContext,
	NextPage,
} from "next";
import AppMain from "../../../components/base/html/AppMain";
import AppTitle from "../../../components/base/html/AppTitle";
import { ApiClient } from "../../../_services";
import { authOptions } from "../../api/auth/[...nextauth]";
import { Session, unstable_getServerSession } from "next-auth";
import { Product } from "../../../interfaces/Product";

const ProductIndex: NextPage<{ product: Product; session: Session }> = ({
	product,
	session,
}: {
	product: Product;
	session: Session;
}) => {
	return (
		<AppMain>
			<>
				<AppTitle
					title={session ? "Olá " + session?.user?.name : "Seja bem vindo"}
				/>
				{product.name}
			</>
		</AppMain>
	);
};

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const { data } = await ApiClient.get(`/products/${context.query.id}`);
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);
	//context.res.setHeader(
	//		"Cache-Control",
	//		"public, s-maxage=10, stale-while-revalidate=59"
	//);
	return {
		props: {
			product: data,
			session,
		},
	};
};

export default ProductIndex;
