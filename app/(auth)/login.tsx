import Button from "@/components/ui/button";
import { useSession } from "@/context/AuthContext";
import { useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface User {
    email: string,
    password: string
}

const EMPTY_USER = {
    email: "",
    password: ""
}

export default function LoginScreen ()
{
    const [user, setUser] = useState<User>(EMPTY_USER)
    const { signIn } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    async function setDelay (seconds: number)
    {
        return await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, seconds * 1000);
        });
    }

    async function login ()
    {
        setIsLoading(true);

        if (user.email.trim() === "" || user.password.trim() === "")
        {
            alert("Opsssss, preencha os campos corretamente");
            setIsLoading(false);
            return;
        }

        if (!isValidEmail(user.email))
        {
            alert("Opsssss, preencha o email corretamente");
            setIsLoading(false);
            return;
        }

        await setDelay(3);

        try
        {
            signIn();
        }
        catch (error)
        {
            setIsLoading(false);
            alert("Opsssss, ocorreu um erro ao tentar entrar");
        }
    }

    function isValidEmail (email: string) : boolean
    {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
    }

    function handleChange (field: keyof User, value: string)
    {
        if (field === "email") { value = value.trim().toLocaleLowerCase(); }

        setUser((prev) => ({...prev, [field]: value}));
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>LOGIN</Text>
            <TextInput
                value={user.email}
                style={styles.input}
                placeholder="name@mail.com"
                placeholderTextColor="#999"
                onChangeText={(value) => handleChange("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                value={user.password}
                style={styles.input}
                placeholder="********"
                placeholderTextColor="#999"
                onChangeText={(value) => handleChange("password", value)}
                keyboardType="default"
                secureTextEntry
            />
            <Button
                label="entrar"
                onPress={login}
                isLoading={isLoading}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
		fontSize: 24,
		fontWeight: "bold",
	},
    input: {
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 10,
        width: "80%"
    }
});
