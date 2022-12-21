import Link from "next/link";
import { useRouter } from "next/router";

type LinkProps = {
	children: React.ReactNode;
	href: string;
	className?: string;
};

export default function ActiveLink({
	children,
	href,
	className = "",
}: LinkProps) {
	const Router = useRouter();
	const handleClick = (e: any) => {
		Router.asPath === href && e.preventDefault();
	};
	return (
		<Link
			onClick={handleClick}
			href={href}
			className={`${
				Router.asPath === href ? "text-sky-500 dark:text-sky-700" : ""
			} ${className}`}
		>
			{children}
		</Link>
	);
}
