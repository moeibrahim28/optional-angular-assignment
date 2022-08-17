import { Checklist } from "app/checklist-model/checklist";

export class User {
    id!: string;
    name!: string;
    email!: string;
    checklists!: Checklist[];
}