import Button from "@/components/ui/button";
import { LIGHT } from "@/constants/theme";
import { useTheme } from "@/context/ThemeColorContext";
import { useState } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Client {
	name: string,
	email: string,
	document: string,
	type: number
}

const EMPTY_CLIENT = {
	name: "",
	email: "",
	document: "",
	type: 0
}

export default function HomeScreen ()
{
	const [client, setClient] = useState<Client>(EMPTY_CLIENT);
    const [isLoading, setIsLoading] = useState(false);
	const {theme} = useTheme();

	async function setDelay (seconds: number)
    {
        return await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, seconds * 1000);
        });
    }

	async function save ()
	{
		setIsLoading(true);

		Keyboard.dismiss();

        if 
		(
			client.email.trim() === "" ||
			client.name.trim() === "" ||
			client.document.trim() === ""
		)
        {
            alert("Opsssss, preencha os campos corretamente");
            setIsLoading(false);
            return;
        }

        if (!isValidEmail(client.email))
        {
            alert("Opsssss, preencha o email corretamente");
            setIsLoading(false);
            return;
        }

		if (client.type === 0)
		{
			alert("Opsssss, selecione o tipo do cliente");
			setIsLoading(false);
			return;
		}

        await setDelay(3);

        try
        {
            let response = await fetch("https://jsonplaceholder.typicode.com/posts", 
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(client)
				}
			);

			if (response.ok)
			{
				alert("Cliente cadastrado com sucesso!");
				setClient(EMPTY_CLIENT);
			}
			else
			{
				alert("Opsssss, ocorreu um erro ao tentar cadastrar o cliente");
			}
        }
        catch (error)
        {
            alert("Opsssss, ocorreu um erro ao tentar cadastrar");
        }

		setIsLoading(false);
	}

	function handleChange (field: keyof Client, value: string | number)
    {
		switch (field)
		{
			case ("email"):
				value = sanitizeEmail(value.toString());
				break;

			case "name":
				if (isValidName(value.toString()) === false){ return; }
				break;

			case "document":
				value = formatDocument(value.toString());
				break;
		
			default:
				break;
		}

        setClient((prev) => ({...prev, [field]: value}));
    }

	function sanitizeEmail(value: string): string
	{
		return value.replace(/[^a-zA-Z0-9@._-]/g, "").toLocaleLowerCase();
	}

	function formatDocument(value: string): string
	{
		const numbers = value.replace(/\D/g, "");
		
		if (numbers.length <= 11)
		{
			return numbers
			.replace(/(\d{3})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
		}

		return numbers
		.replace(/(\d{2})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1/$2")
		.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
	}

	function isValidName (name: string): boolean
	{
		return /^[a-zA-ZÀ-ÿ\s]+$/.test(name);
	}

	function isValidEmail (email: string) : boolean
    {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
    }

	return (
		<SafeAreaView style={[styles.container, theme === LIGHT ? styles.light : styles.dark]}>
			<ScrollView 
				style={styles.scroll}
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={styles.areaScroll}
			>
				<View style={styles.areaScroll}>
					<Text style={styles.title}>Cadastro de Cliente</Text>
					<TextInput
						value={client.name}
						style={styles.input}
						onChangeText={(value) => handleChange("name", value)}
						placeholderTextColor="#999"
						placeholder="Nome do Cliente/Razão Social"
						keyboardType="default"
					/>
					<TextInput
						style={styles.input}
						value={client.email}
						onChangeText={(value) => handleChange("email", value)}
						placeholderTextColor="#999"
						placeholder="nome@domainio.com"
						keyboardType="default"
					/>
					<TextInput
						style={styles.input}
						value={client.document}
						onChangeText={(value) => handleChange("document", value)}
						placeholderTextColor="#999"
						placeholder="123.123.123-01/12.123.123/0001-66"
						keyboardType="numeric"
						maxLength={18}
					/>
					<View style={styles.line}>
						<Button
							label="pessoa jurídica"
							onPress={() => handleChange("type", 1)}
							isLoading={false}
							style={{width: "45%", margin: 0}}
							active={client.type === 1}
						/>
						<Button
							label="pessoa física"
							onPress={() => handleChange("type", 2)}
							isLoading={false}
							style={{width: "45%", margin: 0}}
							active={client.type === 2}
						/>
					</View>
					<Button
						label="cadastrar"
						onPress={save}
						isLoading={isLoading}
					/>
				</View>
			</ScrollView>
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
	dark: {
        backgroundColor: "#949494",
    },
    light: {
        backgroundColor: "#f2f2f2",
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
        margin: 10,
		width: "80%",
		textAlign: "center",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
    },
    input: {
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 10,
        width: "80%"
    },
	line: {
		width: "80%",
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 10,
	},
	scroll: {
		width: "100%",
	},
	areaScroll: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 20,
		width: "100%",
	}
});
