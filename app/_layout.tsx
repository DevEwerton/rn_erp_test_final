import { Stack } from "expo-router";

import { SplashScreenController } from "../components/ui/splash";
import { SessionProvider, useSession } from "../context/AuthContext";

function RootNavigator ()
{
	const { session } = useSession();
	console.log("session: ", session);

	return (
		<Stack
			screenOptions={
				{
					headerStyle: {
						backgroundColor: "#f4511e",
					},
					headerTintColor: "#fff",
					headerTitleStyle: {
					fontWeight: "bold",
					},
					headerShown: false,
				}
			}
		>
			<Stack.Protected guard={!!session}>{/*Double Bang*/}
				<Stack.Screen name="(tabs)" />
			</Stack.Protected>

			<Stack.Protected guard={!session}>
				<Stack.Screen name="(auth)/login" />
			</Stack.Protected>
		</Stack>
	);
}

export default function Root ()
{
	// Set up the auth context and render your layout inside of it.
	return (
		<SessionProvider>
			<SplashScreenController />
			<RootNavigator />
		</SessionProvider>
	);
}