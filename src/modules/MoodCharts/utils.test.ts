import { getTendencyResult } from "modules/MoodCharts/utils";

describe("ResultAnalise utils", () => {
    it("getTendencyResult test", () => {
        expect(getTendencyResult([10, 1])).toEqual("Not enough data to analyze tendency");
        expect(getTendencyResult([10, 7, 3, 1])).toEqual("Your condition has worsened in recent years, perhaps you should seek help from a psychologist");
        expect(getTendencyResult([1, 3, 7, 10])).toEqual("Your condition has improved lately, keep it up, you can be proud of yourself.");
        expect(getTendencyResult([3, 3, 3, 3])).toEqual(
            "Your condition has been stable in the past two weeks. " +
                "This is not the best condition, maybe you should think about what you could improve in your life."
        );
        expect(getTendencyResult([8, 8, 8, 8])).toEqual(
            "Your condition has been stable in the past two weeks. Condition is satisfactory, keep up, the good work."
        );
    });
});
