import { Footer } from "flowbite-react";
import React from "react";

const AppFooter = () => {
	return (
		<Footer container={true}>
			<div className="w-full text-center">
				<div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
					<Footer.Brand
						href="https://flowbite.com"
						src="https://flowbite.com/docs/images/logo.svg"
						alt="Flowbite Logo"
						name=""
					/>
					<Footer.LinkGroup>
						<Footer.Link href="#">Sobre</Footer.Link>
						<Footer.Link href="#">Privacidade</Footer.Link>
						<Footer.Link href="#">Termos</Footer.Link>
						<Footer.Link href="#">Contato</Footer.Link>
					</Footer.LinkGroup>
				</div>
				<Footer.Divider />
				<Footer.Copyright
					href="#"
					by="webapp"
					year={new Date().getFullYear()}
				/>
			</div>
		</Footer>
	);
};

export default AppFooter;
