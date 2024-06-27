
import { Member } from '../models/member';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
export const supabase = createClient(supabaseUrl, supabaseKey);

interface Pagination {
  page: number;
  limit: number;
}

interface Sort {
  sortBy: string;
  order: 'asc' | 'desc';
}

export async function getMembers(pagination: Pagination, sort: Sort, search: string) {
  const { page, limit } = pagination;
  const { sortBy, order } = sort;

  let query = supabase.from('team_members').select('*');

  if (search) {
    query = query.or(`name.ilike.%${search}%,userName.ilike.%${search}%,role.ilike.%${search}%,email.ilike.%${search}%`);
  }
 
  const { data, error } = await query
    .order(sortBy, { ascending: order === 'asc' })
    .range((page - 1) * limit, page * limit - 1);

    
  if (error) {
    throw new Error(`Error fetching members: ${error.message}`);
  }
  
  const { count } = await supabase.from('team_members').select('*', { count: 'exact' });
  
   return { items: data,count };
}

export async function getMemberById(id: number) {

  const { data, error } = await supabase.from('team_members').select('*').eq('id', id).single();

  if (error) {
    throw new Error(`Error fetching member by id ${id}: ${error.message}`);
  }

  return data;
}

export async function createMember(member: Member) {
  const { data, error } = await supabase.from('team_members').insert([member]).single();

  if (error) {
    throw new Error(`Error creating member: ${error.message}`);
  }

  return data;
}

export async function updateMember(id: number, member: Partial<Member>) {
    const { data, error } = await supabase
    .from('team_members')
    .update(member)
    .eq('id', id)
    .select();
    
  if (error) {
    throw new Error(`Error updating member with id ${id}: ${error.message}`);
  } 
  return data;
}



  export async function deleteMemberIds(ids: any): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .update({ isActive: false })
        .in('id', ids)
        .select();
  
      if (error) {
        throw new Error(`Error deactivating members: ${error.message}`);
      }
  
      return data || [];
    } catch (error:any) {
      console.error('Error deactivating members:', error.message);
      throw error;
    }
  }