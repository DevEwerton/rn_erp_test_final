import Button from "@/components/ui/button";
import { useSession } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Clients {
	id: number,
	name: string,
	email: string,
}

export default function ExploreScreen ()
{
	const { signOut } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const [clients, setClients] = useState<Clients[]>([]);

	useEffect(() => {
		getClients();
	}, []);

	async function setDelay (seconds: number)
    {
        return await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, seconds * 1000);
        });
    }

	async function getClients ()
	{
		setIsLoading(true);
		setClients([]);

		await setDelay(5);

		try
		{
			let response = await fetch("https://jsonplaceholder.typicode.com/users");

			let data = await response.json();
	
			if (data.length > 0)
			{
				data = data.map((item: any) => {
					return {
						id: item.id,
						name: item.name,
						email: item.email
					}
				});
	
				let long = Array(1000)
				.fill(null)
				.map((_, jindex) => {
					return data.map((item: any, index: number) => {
						return {
							name: item.name,
							email: item.email.toLocaleLowerCase(),
							id: item.id + (jindex * data.length) 
						}
					})
				})
				.flat();
	
				setClients(long);
			}
		}
		catch (error)
		{
			alert("Opsssss, ocorreu um erro ao tentar carregar os clientes");
			setClients([]);
			console.log(error);
		}

		setIsLoading(false);
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Listagem de Clientes</Text>
			{isLoading && <Text>carregando...</Text>}
			{!isLoading && clients.length === 0 && <Text>nenhum cliente encontrado</Text>}
			<FlatList
				style={styles.list}
				data={clients}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item, index }) => (
					<Text style={styles.item}>{(index + 1)}- {item.name} ({item.email})</Text>
				)}
			/>
			<Button
				label="sair"
				onPress={signOut}
				isLoading={false}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
		display: "flex",
		alignItems: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
	},
	button: {
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 10
    },
	item: {
		fontSize: 16,
		padding: 10,
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
		width: "100%",
	},
	list: {
		width: "100%",
		marginVertical: 20,
	}
});
