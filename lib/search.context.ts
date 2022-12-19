import { createContext, Dispatch, SetStateAction, useContext } from "react";

type ParamsType = {
	searchParams: string;
	setSearchParams: Dispatch<SetStateAction<string>>;
};

export const SearchContext = createContext<ParamsType | null>(null);

export const useSearchContext = () => {
	const context = useContext(SearchContext);
	if (!context) throw new Error("Wrap useSearchContext with Search Context");

	return context;
};
