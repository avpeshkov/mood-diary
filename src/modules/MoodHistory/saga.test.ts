import { moodsActions, moodsSliceState } from "./slice";
import { addMood, deleteMood, setMoods, updateMood } from "./saga";
import { MoodObject } from "./types";

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
});
