export interface QuoteObject {
    id?: number;
    quote: string;
    author: string;
}

export const Steps = {
    NEXT: "NEXT",
    PREVIOUS: "PREVIOUS",
} as const;

export type StepsTypes = keyof typeof Steps;
