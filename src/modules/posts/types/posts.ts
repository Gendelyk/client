import { GetAllPostsReturnType } from "../api";

export type Posts = Extract<GetAllPostsReturnType['data'], { id: number }[]>;