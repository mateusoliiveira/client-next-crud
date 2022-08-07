import App from "next/app";
import Head from "next/head";
import React from "react";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";
export default class MyApp extends App {
	static async getInitialProps({ Component, ctx }: any) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		return { pageProps };
	}
	render() {
		const { Component, pageProps, session } = this.props;
		return (
			<SessionProvider session={session}>
				<React.Fragment>
					<Head>
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1, shrink-to-fit=no"
						/>
						<title>MyApp</title>
					</Head>
					<Component {...pageProps} />
				</React.Fragment>
			</SessionProvider>
		);
	}
}
