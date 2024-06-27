"use strict";
// // src/utils/errorHandler.ts
// import { Request, Response, NextFunction } from 'express';
// // import { getMembers, getMemberById, createMember, updateMember, deleteMember,deactivateMembers } from '../services/supabaseService';
// export async function getMembers (req: Request, res: Response) => {
//     try {
//       const { page = 1, limit = 10, sortBy = 'id', order = 'asc', search = '' } = req.query;
//       const pagination = {
//         page: parseInt(page as string),
//         limit: parseInt(limit as string)
//       };
//       // Ensure 'order' is typed as 'asc' | 'desc'
//       const sort = {
//         sortBy: sortBy as string,
//         order: (order as string).toLowerCase() === 'desc' ? 'desc' : 'asc' as 'asc' | 'desc'
//       };
//       const members = await getMembers(pagination, sort, search as string);
//       res.status(200).json(members);
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
// }
