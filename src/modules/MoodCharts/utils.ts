export const getTendencyResult = (tendency: number[]): string => {
    const tendencyFirst = tendency[0];
    const tendencyLast = tendency[tendency.length - 1];
    let tendencyResult = "";
    if (tendency.length < 7) {
        return "Not enough data to analyze tendency";
    }
    if (Math.round(tendencyFirst) === Math.round(tendencyLast)) {
        tendencyResult = "Your condition has been stable in the past two weeks. ";
        if (Math.round(tendencyFirst) >= 7) {
            tendencyResult = tendencyResult + "Condition is satisfactory, keep up, the good work.";
        } else {
            tendencyResult = tendencyResult + "This is not the best condition, maybe you should think about what you could improve in your life.";
        }
    } else if (tendencyFirst > tendencyLast) {
        tendencyResult = "Your condition has worsened in recent years, perhaps you should seek help from a psychologist";
    } else {
        tendencyResult = "Your condition has improved lately, keep it up, you can be proud of yourself.";
    }

    return tendencyResult;
};
