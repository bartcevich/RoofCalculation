// export interface IIngredients {
//     [x: string]: any;
//     label: any;
//     image: string[];
//     numberHuman: number;
//     isOpen: boolean;
//     ingredients: string[] | number[];
// }
export interface IIngredients {
    [x: string]: any;
    label: string[];
    numberServings: number[];
    image: string[];
    ingredients: string[] | number[];
    comment: string[];
    purposesUse: string[];
}