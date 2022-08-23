import { User } from "app/model/user";
import { Item } from "./item";

export class Checklist {
    id!: number;
    name!: string;
    user!: User;
    itemList!: Item[];
    tags!: string[];
    isChecked!:boolean[];
}
