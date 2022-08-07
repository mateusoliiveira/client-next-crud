import type { NextPage } from "next";
import { useRouter } from "next/router";
import AppButton from "../components/base/html/AppButton";
import AppMain from "../components/base/html/AppMain";
import AppTitle from "../components/base/html/AppTitle";

const Denied: NextPage = () => {
	const router = useRouter();
	const infoBackButton = {
		info: {
			title: "Voltar",
			id: "back",
			disabled: false,
			required: true,
			color: "purpleToBlue",
			onClick: async () => router.back(),
		},
	};

	return (
		<AppMain>
			<>
				<AppTitle title={"Ops, algo deu errado"} />
				<AppButton {...infoBackButton} />
			</>
		</AppMain>
	);
};

export default Denied;
