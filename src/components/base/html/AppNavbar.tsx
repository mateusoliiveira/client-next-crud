import { Navbar } from "flowbite-react";
import { useRouter } from "next/router";
import React from "react";
import AuthNavbarCondition from "../../mutables/AuthNavbarCondition";

const AppNavbar = () => {
	const router = useRouter();
	return (
		<Navbar fluid={true} rounded={true}>
			<Navbar.Brand onClick={() => router.push("/")}>
				<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white cursor-pointer">
					Next CRUD w/ Auth
				</span>
			</Navbar.Brand>
			<Navbar.Toggle />
			<Navbar.Collapse>
				<AuthNavbarCondition />
			</Navbar.Collapse>
		</Navbar>
	);
};

export default AppNavbar;
