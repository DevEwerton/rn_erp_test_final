import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
    isLoading: boolean,
    onPress: () => void,
    label: string,
    style?: object,
    active?: boolean
}

export default function Button (props: ButtonProps)
{
    return (
        <TouchableOpacity
            style={[styles.button, props.style, props.active && {...styles.activeButton}]}
            onPress={props.onPress}
            disabled={props.isLoading}
        >
            <Text style={[props.active && styles.activeText]}>{props.isLoading ? "aguarde..." : props.label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 10,
		width: "80%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
    },
    activeButton: {
        backgroundColor: "green",
    },
    activeText: {
        color: "white"
    }
});