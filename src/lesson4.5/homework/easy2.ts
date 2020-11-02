// Задание первого уровня 2
// Есть объединение (юнион) типов заказов в различных состояниях
// Нужно заменить FIXME на тип который достанет из Order все возможные состояния (state)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// type FIXME = "initial" | "inWork" | "buyingSupplies" | "producing" | "fullfilled";
// или просто type FIXME = string

// второй вариант: через typeof поидее делается так, но это как то не проще, есть другое использованаие typeof?
const orderStates = ["initial", "inWork", "buyingSupplies", "producing", "fullfilled"] as const;
type FIXME = typeof orderStates[number];

type Order =
    | {
          state: "initial";
          sum: number;
      }
    | {
          state: "inWork";
          sum: number;
          workerId: number;
      }
    | {
          state: "buyingSupplies";
          sum: number;
          workerId: number;
          suppliesSum: number;
      }
    | {
          state: "producing";
          sum: number;
          workerId: number;
          suppliesSum: number;
          produceEstimate: Date;
      }
    | {
          state: "fullfilled";
          sum: number;
          workerId: number;
          suppliesSum: number;
          produceEstimate: Date;
          fullfillmentDate: Date;
      };

// еще по идее можно сразу написать вот так через typeof
export const getOrderState = (order: Order): typeof order.state => order.state;
