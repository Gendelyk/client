import { GetMeReturnType } from "../api";

export type User = Extract<GetMeReturnType['data'],{id: number}>
