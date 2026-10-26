import { TagResponse } from "./TagResponse.js";

export interface CoursesResponse{
    id:string;
    name: string;
    description: string;
    created_at: string;
     tags: TagResponse[];

}