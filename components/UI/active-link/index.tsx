import Link from "next/link";
import { useRouter } from "next/router";

type LinkProps = {
	children: React.ReactNode;
	href: string;
};

export default function ActiveLink({ children, href }: LinkProps) {
	const Router = useRouter();
	return (
		<Link
			href={href}
			className={`${
				Router.asPath === href ? "text-sky-500 dark:text-sky-700" : ""
			}`}
		>
			{children}
		</Link>
	);
}
