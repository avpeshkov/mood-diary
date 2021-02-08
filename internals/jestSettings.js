import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import serializer from "@emotion/jest";

Enzyme.configure({ adapter: new Adapter() });

Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(serializer);

// https://github.com/facebook/jest/issues/3449#issuecomment-347337666
class Worker {
    constructor(stringUrl) {
        this.url = stringUrl;
        this.onmessage = () => undefined;
    }

    postMessage(msg) {
        this.onmessage(msg);
    }
}

window.Worker = Worker;

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
