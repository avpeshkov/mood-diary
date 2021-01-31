import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import serializer from "jest-emotion";

Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(serializer);

jest.mock("firebase/app");

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});
