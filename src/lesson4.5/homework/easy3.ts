// Задание первого уровня 3
// Есть общая функция omit которая удаляет поле из объекта и возвращает его без этого поля
// Нужно заменить FIXME на соответствующий тип

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// type FIXME<T, K> = Pick<T, Exclude<keyof T, K>>;

// второй вариант: если попробовать еще проще то вот так например
type FIXME<T> = Omit<T, keyof T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const omit = <T extends Record<any, any>, K extends keyof T>(obj: T, keyToOmit: K): FIXME<T> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [keyToOmit]: _, ...withoutKey } = obj;
    return withoutKey;
};
