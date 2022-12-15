import "../styles/globals.css";
import Router from "next/router";
import type { AppProps } from "next/app";
import { Layout, Spinner } from "../components/UI";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
	const [loading, setLoading] = useState(false);
	Router.events.on("routeChangeStart", () => setLoading(true));
	Router.events.on("routeChangeError", () => setLoading(false));
	Router.events.on("routeChangeComplete", () => setLoading(false));

	if (loading) return <Spinner />;

	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
