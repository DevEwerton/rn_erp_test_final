// jest-setup.ts
import '@testing-library/jest-native/extend-expect';

// @ts-ignore
global.__ExpoImportMetaRegistry = {};
// @ts-ignore
global.structuredClone = (val: any) => JSON.parse(JSON.stringify(val));
// @ts-ignore
global.fetch = jest.fn();
// @ts-ignore
global.Request = jest.fn();
// @ts-ignore
global.Response = jest.fn();

jest.mock('expo-router', () => ({
    useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
    useLocalSearchParams: () => ({}),
    Stack: { Screen: () => null },
    Tabs: { Screen: () => null },
}));