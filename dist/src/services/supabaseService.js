"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
exports.getMembers = getMembers;
exports.getMemberById = getMemberById;
exports.createMember = createMember;
exports.updateMember = updateMember;
exports.deleteMemberIds = deleteMemberIds;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
function getMembers(pagination, sort, search) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page, limit } = pagination;
        const { sortBy, order } = sort;
        let query = exports.supabase.from('team_members').select('*');
        if (search) {
            query = query.or(`name.ilike.%${search}%,userName.ilike.%${search}%,role.ilike.%${search}%,email.ilike.%${search}%`);
        }
        const { data, error } = yield query
            .order(sortBy, { ascending: order === 'asc' })
            .range((page - 1) * limit, page * limit - 1);
        if (error) {
            throw new Error(`Error fetching members: ${error.message}`);
        }
        const { count } = yield exports.supabase.from('team_members').select('*', { count: 'exact' });
        const datad = yield exports.supabase.from('team_members').select('data', { count: 'exact' });
        
       
        return { items: data, count };
    });
}
function getMemberById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield exports.supabase.from('team_members').select('*').eq('id', id).single();
        if (error) {
            throw new Error(`Error fetching member by id ${id}: ${error.message}`);
        }
        return data;
    });
}
function createMember(member) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield exports.supabase.from('team_members').insert([member]).single();
        if (error) {
            throw new Error(`Error creating member: ${error.message}`);
        }
        return data;
    });
}
function updateMember(id, member) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield exports.supabase
            .from('team_members')
            .update(member)
            .eq('id', id)
            .select();
        if (error) {
            throw new Error(`Error updating member with id ${id}: ${error.message}`);
        }
        return data;
    });
}
function deleteMemberIds(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield exports.supabase
                .from('team_members')
                .update({ isActive: false })
                .in('id', ids)
                .select();
            if (error) {
                throw new Error(`Error deactivating members: ${error.message}`);
            }
            return data || [];
        }
        catch (error) {
            console.error('Error deactivating members:', error.message);
            throw error;
        }
    });
}
