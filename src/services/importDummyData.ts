
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Member } from '../models/member'; 

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

async function importDummyData(filePath: string) {
  try {
   
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const members: Member[] = JSON.parse(rawData);

    
    const { data, error } = await supabase.from('team_members').insert(members);

    if (error) {
      throw new Error(`Error importing dummy data: ${error.message}`);
    }

    return data;
  } catch (error: any) {
    console.error('Error importing dummy data:', error.message);
    throw error;
  }
}


const filePath = path.join(__dirname, '../../dummy-data.json'); 
importDummyData(filePath);


