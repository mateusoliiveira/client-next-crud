import { Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import React from "react";

const AuthNavbarCondition = () => {
	const router = useRouter();
	const session = useSession();

	return (
		<>
			<Link href="/">
				<Navbar.Link active={router.pathname === "/"}>
					<span className="dark:text-white cursor-pointer">Início</span>
				</Navbar.Link>
			</Link>
			{!session.data?.user ? (
				<>
					<Link href="/login">
						<Navbar.Link active={router.pathname === "/login"}>
							<span className="dark:text-white cursor-pointer">Entrar</span>
						</Navbar.Link>
					</Link>
					<Link href="/register">
						<Navbar.Link active={router.pathname === "/register"}>
							<span className="dark:text-white cursor-pointer">
								Criar conta
							</span>
						</Navbar.Link>
					</Link>
				</>
			) : (
				<>
					<Link href="/account">
						<Navbar.Link active={router.pathname === "/account"}>
							<span className="dark:text-white cursor-pointer">
								Minha conta
							</span>
						</Navbar.Link>
					</Link>
				</>
			)}
		</>
	);
};

export default AuthNavbarCondition;
