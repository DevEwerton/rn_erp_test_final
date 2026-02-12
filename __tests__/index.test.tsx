import { render, screen } from "@testing-library/react-native";
import React from "react";
import HomeScreen from "../app/(tabs)/index";

jest.mock("@/context/ThemeColorContext", () =>
{
    return {
        useTheme: () => 
        {
            return { theme: "LIGHT" };
        }
    };
});

jest.mock("react-native-safe-area-context", () =>
{
    return {
        SafeAreaView: ({ children }: any) => 
        {
            return children;
        }
    };
});

describe("HomeScreen tests suite", () =>
{
    it("should render the HomeScreen title correctly", () =>
        {
            // arrange
            render(<HomeScreen />);

            // act
            const title = screen.getByTestId("title-index");

            // assert
            expect(title).toBeTruthy();
            expect(title.props.children).toBe("Cadastro de Cliente");
        }
    );
});