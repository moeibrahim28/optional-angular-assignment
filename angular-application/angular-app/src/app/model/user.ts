import { Checklist } from "app/checklist-model/checklist";

export class User {
    id!: number;
    name!: string;
    email!: string;
    checklists!: Checklist[];
}