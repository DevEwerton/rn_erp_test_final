import Button from "@/components/ui/button";
import { useSession } from "@/context/AuthContext";
import { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LIGHT } from "../../constants/theme";
import { useTheme } from "../../context/ThemeColorContext";

export default function ExploreScreen ()
{
    const { signOut } = useSession();
    const {theme, toggleTheme} = useTheme();

    useEffect(() => {
    }, []);

    return (
        <SafeAreaView style={[styles.container, theme === LIGHT ? styles.light : styles.dark]}>
            <Text style={styles.title}>Configurações</Text>
            <Button
                label={`Mudar para tema ${theme === LIGHT ? "dark" : LIGHT}`}
                onPress={toggleTheme}
                isLoading={false}
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