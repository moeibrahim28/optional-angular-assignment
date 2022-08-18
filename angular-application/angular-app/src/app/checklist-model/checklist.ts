import { Item } from "./item";
import { Tag } from "./tag";

export class Checklist {
    id!: string;
    name!: string;
    itemList!: Item[];
    tagsList!: Tag[];
}
