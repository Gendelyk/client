import { GetPostReturnType } from "../api";

export type Post = Extract<GetPostReturnType['data'], { id: number }>;