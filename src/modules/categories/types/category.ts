import { GetCategoryReturnType } from "../api";

export type Category = Extract<GetCategoryReturnType['data'], { id: number }>;