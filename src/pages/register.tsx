import type { NextPage } from "next";
import AppMain from "../components/base/html/AppMain";
import FormRegister from "../components/forms/FormRegister";

const Register: NextPage = () => {
	return (
		<AppMain>
			<FormRegister />
		</AppMain>
	);
};

export default Register;
