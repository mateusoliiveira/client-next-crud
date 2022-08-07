import type { NextPage } from "next";
import AppMain from "../components/base/html/AppMain";
import FormLogin from "../components/forms/FormLogin";

const Login: NextPage = () => {
	return (
		<AppMain>
			<FormLogin />
		</AppMain>
	);
};

export default Login;
