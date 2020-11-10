// тут у нас будет дата получаемая с бекенда, которая пока не понятно что где и как
import { MoodObject } from "types/mood";

export const backEndFake: { moodList: MoodObject[]; quoteList: Array<{ quote: string; author: string }> } = {
    moodList: [
        { mood: 1, date: new Date("December 13, 2020 03:24:00") },
        { mood: 5, date: new Date("December 14, 2020 03:24:00") },
        { mood: 8, date: new Date("December 15, 2020 03:24:00") },
        { mood: 10, date: new Date("December 16, 2020 03:24:00") },
    ],
    quoteList: [
        {
            quote: `Есть только два способа прожить свою жизнь. Первый — так, будто никаких чудес не бывает. Второй — так, будто всё на свете является чудом`,
            author: "Альберт Эйнштейн",
        },
        {
            quote: `Никогда не поздно стать тем, кем тебе хочется быть.`,
            author: "Джордж Элиот",
        },
        {
            quote: `Если ты способен выдумать что-то, ты можешь и сделать это.`,
            author: "Уолт Дисней",
        },
        {
            quote: `Когда человек не знает к какой пристани он держит путь, для него ни один ветер не будет попутным.`,
            author: "Сенека",
        },
        {
            quote: `Гонясь за недостижимым, мы совершаем невозможное.`,
            author: "Роберт Ардри",
        },
        {
            quote: `Истинное назначение человека — жить, а не существовать.`,
            author: " Джек Лондон",
        },
    ],
};
