import { Item } from "./item";

export class Checklist {
    id!: string;
    name!: string;
    itemList!: Item[];
    tagList!: string[];
}
