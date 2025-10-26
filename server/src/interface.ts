import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

export interface IPaginationResult<T = any> {
  data: T[];
  pagination: {
    total: number;
    currentPage: number;
    totalPages: number;
    hasMore?: boolean;
  };
}
