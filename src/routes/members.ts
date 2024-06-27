
import { Router, Request, Response } from 'express';
import { getMembers, getMemberById, createMember, updateMember,deleteMemberIds } from '../services/supabaseService';

const router = Router();

router.get('/members', async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, sortBy = 'id', order = 'asc', search = '' } = req.query;

    const pagination = {
      page: parseInt(page as string),
      limit: parseInt(limit as string)
    };

    
    const sort = {
      sortBy: sortBy as string,
      order: (order as string).toLowerCase() === 'desc' ? 'desc' : 'asc' as 'asc' | 'desc'
    };

    const members = await getMembers(pagination, sort, search as string);
    res.status(200).json(members);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/members/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const member = await getMemberById(parseInt(id));
    res.status(200).json(member);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/members', async (req: Request, res: Response) => {
  try {
    const member = req.body;
    const newMember = await createMember(member);
    res.status(201).json(newMember);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/members/:id', async (req: Request, res: Response) => {
  try {
    
    const { id } = req.params;
    const member = req.body;
    
    const updatedMember = await updateMember(parseInt(id), member);
    res.status(200).json(updatedMember);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/members', async (req: Request, res: Response) => {
  try {
     
    let ids: any = req.body.ids;

    if (!Array.isArray(ids)) {
      return res.status(400).json({ error: 'IDs must be provided as a valid array' });
    }

    ids = ids.map((id: any) => parseInt(id)); 


    if (ids.some((id: any) => isNaN(id))) {
      return res.status(400).json({ error: 'IDs must be a valid array of numbers' });
    }

    const deletedMember = await deleteMemberIds(ids);
    res.status(200).json(deletedMember);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

 
export default router;
