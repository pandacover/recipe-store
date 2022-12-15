import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Session } from "@supabase/supabase-js";

interface ContextType {
	session: Session | null;
	setSession: Dispatch<SetStateAction<Session | null>>;
}

export const SessionContext = createContext<ContextType | null>(null);

export const useSessionContext = () => {
	const context = useContext(SessionContext);
	if (!context)
		throw new Error("useSessionContext should be wrapped with a provider");
	return context;
};
