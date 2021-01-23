import { moodsActions, moodsSliceState } from "./slice";
import {
    addMood,
    addMoodToLocalStorage,
    deleteMood,
    deleteMoodFromLocalStorage,
    setMoods,
    setMoodsLocalStorage,
    updateMood,
    updateMoodInLocalStorage,
} from "./saga";
import { MoodObject } from "./types";
import { expectSaga } from "redux-saga-test-plan";

describe("Moods saga", () => {
    const moodList: moodsSliceState = [
        {
            id: "1",
            mood: 1,
            date: new Date("December 10, 2020 03:24:00"),
            comment: "Slept all day",
        },
    ];
    const newMood: MoodObject = {
        id: "2",
        mood: 1,
        date: new Date("December 11, 2020 03:24:00"),
        comment: "Slept all day",
    };

    it("setMoodsGenerator__withListOfMoodsInPayload__success", () => {
        const generator = setMoods({
            type: moodsActions.setMoods.type,
            payload: moodList,
        });
        expect(generator.next().value).toMatchInlineSnapshot(`
                  Object {
                    "@@redux-saga/IO": true,
                    "combinator": false,
                    "payload": Object {
                      "args": Array [
                        Array [
                          Object {
                            "comment": "Slept all day",
                            "date": 2020-12-10T00:24:00.000Z,
                            "id": "1",
                            "mood": 1,
                          },
                        ],
                      ],
                      "context": null,
                      "fn": [Function],
                    },
                    "type": "CALL",
                  }
            `);
        expect(generator.next().done).toBe(true);
    });

    it("setMoodsSaga__withListOfMoodsInPayload__success", () => {
        return expectSaga(setMoods, {
            type: moodsActions.setMoods.type,
            payload: moodList,
        })
            .call(setMoodsLocalStorage, moodList)
            .run();
    });

    it("addMoodGenerator__withMoodObjectInPayload__success", () => {
        const generator = addMood({
            type: moodsActions.addMood.type,
            payload: newMood,
        });
        expect(generator.next().value).toMatchInlineSnapshot(`
            Object {
              "@@redux-saga/IO": true,
              "combinator": false,
              "payload": Object {
                "args": Array [
                  Object {
                    "comment": "Slept all day",
                    "date": 2020-12-11T00:24:00.000Z,
                    "id": "2",
                    "mood": 1,
                  },
                ],
                "context": null,
                "fn": [Function],
              },
              "type": "CALL",
            }
        `);
        expect(generator.next().done).toBe(true);
    });

    it("addMoodSaga__withMoodObjectInPayload__success", () => {
        return expectSaga(addMood, {
            type: moodsActions.addMood.type,
            payload: newMood,
        })
            .call(addMoodToLocalStorage, newMood)
            .run();
    });

    it("updateMoodGenerator__withMoodObjectInPayload__success", () => {
        const generator = updateMood({
            type: moodsActions.updateMood.type,
            payload: newMood,
        });
        expect(generator.next().value).toMatchInlineSnapshot(`
            Object {
              "@@redux-saga/IO": true,
              "combinator": false,
              "payload": Object {
                "args": Array [
                  Object {
                    "comment": "Slept all day",
                    "date": 2020-12-11T00:24:00.000Z,
                    "id": "2",
                    "mood": 1,
                  },
                ],
                "context": null,
                "fn": [Function],
              },
              "type": "CALL",
            }
        `);
        expect(generator.next().done).toBe(true);
    });

    it("updateMoodSaga__withMoodObjectInPayload__success", () => {
        return expectSaga(updateMood, {
            type: moodsActions.updateMood.type,
            payload: newMood,
        })
            .call(updateMoodInLocalStorage, newMood)
            .run();
    });

    it("deleteMoodGenerator__withMoodIdInPayload__success", () => {
        const generator = deleteMood({
            type: moodsActions.deleteMood.type,
            payload: "1",
        });
        expect(generator.next().value).toMatchInlineSnapshot(`
            Object {
              "@@redux-saga/IO": true,
              "combinator": false,
              "payload": Object {
                "args": Array [
                  "1",
                ],
                "context": null,
                "fn": [Function],
              },
              "type": "CALL",
            }
        `);
        expect(generator.next().done).toBe(true);
    });

    it("deleteMoodSaga__withMoodIdInPayload__success", () => {
        return expectSaga(deleteMood, {
            type: moodsActions.deleteMood.type,
            payload: "1",
        })
            .call(deleteMoodFromLocalStorage, "1")
            .run();
    });
});
