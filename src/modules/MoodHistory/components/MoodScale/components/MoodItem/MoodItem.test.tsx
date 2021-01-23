import React from "react";
import snapshotDiff from "snapshot-diff";

import { MoodItem } from "./MoodItem";

describe("MoodItem", () => {
    //  не уверен что это правильный способ прикрутить snapshot-diff, обясните пожалуйста если делаю что-то не так.
    test("no snapshot difference between equal components", () => {
        expect(
            snapshotDiff(<MoodItem onClick={jest.fn()} mood={1} isFilled={false} />, <MoodItem onClick={jest.fn()} mood={1} isFilled={false} />)
        ).toMatchSnapshot();
    });

    test("no snapshot difference between not filled components", () => {
        expect(
            snapshotDiff(<MoodItem onClick={jest.fn()} mood={1} isFilled={false} />, <MoodItem onClick={jest.fn()} mood={5} isFilled={false} />)
        ).toMatchSnapshot();
    });

    test(" no snapshot difference between  filled components", () => {
        expect(
            snapshotDiff(<MoodItem onClick={jest.fn()} mood={5} isFilled={true} />, <MoodItem onClick={jest.fn()} mood={5} isFilled={true} />)
        ).toMatchSnapshot();
    });
});
