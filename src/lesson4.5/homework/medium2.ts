// Задание второго уровня 2
// Есть функция которая достает из реакт компонента (любого, и Functional и Class) его defaultProps
// Нужно заменить FIXME на правильный тип

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// type FIXME<T> = Partial<T> | undefined;
//у меня все редакторы ругаются на любое другое решение, можно узнать как правильно решить это с infer?

//  второй вариант, очень сложно, может быть вот так, но опять таки приходится юзать as
type FIXME<T> = T extends (...args: ["defaultProps"]) => infer R ? Extract<R, "defaultProps"> : undefined;

export const getDefaultProps = <T>(component: React.ComponentType<T>): FIXME<T> => {
    return component.defaultProps as FIXME<T>;
};
