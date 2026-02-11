import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout ()
{

	return (
		<Tabs
			screenOptions={
				{
					tabBarActiveTintColor: "blue",
					headerShown: false,
					tabBarButton: HapticTab,
				}
			}
		>
			<Tabs.Screen
				name="index"
				options={
					{
						title: "Cadastro",
						tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} />,
					}
				}
			/>
			<Tabs.Screen
				name="explore"
				options={
					{
						title: "Explore",
						tabBarIcon: ({ color }) => <IconSymbol size={24} name="paperplane.fill" color={color} />,
					}
				}
			/>
			<Tabs.Screen
				name="settings"
				options={
					{
						title: "Configurações",
						
						tabBarIcon: ({ color }) => <Fontisto size={24} name="player-settings" color={color} />,
					}
				}
			/>
		</Tabs>
	);
}
