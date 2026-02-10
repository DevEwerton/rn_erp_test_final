import { createContext, use, type PropsWithChildren } from "react";

import { useStorageState } from "../hooks/use-store-state";

const AuthContext = createContext
<
	{
		signIn: (email: string, password: string) => Promise<void>;
		signOut: () => void;
		session?: string | null;
		isLoading: boolean;
	}
>
(
	{
		signIn: async (email: string, password: string) => {},
		signOut: () => null,
		session: null,
		isLoading: false,
	}
);

// Use this hook to access the user info.
export function useSession ()
{
  const value = use(AuthContext);
  if (!value) { throw new Error("useSession must be wrapped in a <SessionProvider />"); }

  return value;
}

export function SessionProvider ({ children }: PropsWithChildren)
{
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
		<AuthContext.Provider
			value={
				{
					signIn: async (email: string, password: string) => {

						try
						{
							const response = await fetch("https://jsonplaceholder.typicode.com/posts", 
								{
									method: "POST",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify({ email, password }),
								}
							);
		
							if (!response.ok)
							{
								// const errorData = await response.json();
								// throw new Error(errorData.error || "Erro ao fazer login");
							}
		
							const data = await response.json();
	
							setSession(data.token || "authenticated");
						}
						catch (error)
						{
							console.log("error: ", error);
							throw new Error("Erro ao fazer login");
						}
					},
					signOut: () => {
						setSession(null);
					},
					session,
					isLoading,
				}
			}
		>
		{children}
		</AuthContext.Provider>
	);
}
