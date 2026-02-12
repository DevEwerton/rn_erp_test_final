import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import Button from "../components/ui/button";

describe("Button Component tests suite", () =>
{
    it("should render the button with the correct label", () =>
        {
            // arrange
            const label = "cadastrar";
            render(<Button label={label} onPress={() => {}} isLoading={false} />);

            // act
            const buttonElement = screen.getByText(label);

            // assert
            expect(buttonElement).toBeTruthy();
        }
    );

    it("should call onPress function when button is pressed", () =>
        {
            // arrange
            const onPressMock = jest.fn();
            render(<Button label="clique aqui" onPress={onPressMock} isLoading={false} />);
            const buttonElement = screen.getByText("clique aqui");

            // act
            fireEvent.press(buttonElement);

            // assert
            expect(onPressMock).toHaveBeenCalledTimes(1);
        }
    );

    it("should display loading text when isLoading is true", () =>
        {
            // arrange
            const label = "salvar";
            render(<Button label={label} onPress={() => {}} isLoading={true} />);

            // act
            const loadingText = screen.getByText("aguarde...");
            const originalLabel = screen.queryByText(label);

            // assert
            expect(loadingText).toBeTruthy();
            expect(originalLabel).toBeNull();
        }
    );

    it("should not call onPress when button is disabled", () =>
        {
            // arrange
            const onPressMock = jest.fn();
            render(<Button label="salvar" onPress={onPressMock} isLoading={true} />);
            const buttonText = screen.getByText("aguarde...");

            // act
            fireEvent.press(buttonText);

            // assert
            expect(onPressMock).not.toHaveBeenCalled();
        }
    );
});