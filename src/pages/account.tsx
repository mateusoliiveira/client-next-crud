import type { GetServerSidePropsContext, NextPage } from "next";
import AppCardProfile from "../components/base/AppCardProfile";
import AppMain from "../components/base/html/AppMain";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import FormProduct from "../components/forms/FormProduct";
import { Session } from "next-auth";

const Account: NextPage<{ session: Session }> = ({
	session,
}: {
	session: Session;
}) => {
	return (
		<AppMain>
			<div className="m-auto">
				<AppCardProfile info={session?.user!} />
				<FormProduct />
			</div>
		</AppMain>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
		},
	};
}

export default Account;
