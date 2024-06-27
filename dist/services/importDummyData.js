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
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
function importDummyData(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rawData = fs_1.default.readFileSync(filePath, 'utf-8');
            const members = JSON.parse(rawData);
            const { data, error } = yield supabase.from('team_members').insert(members);
            if (error) {
                throw new Error(`Error importing dummy data: ${error.message}`);
            }
          
            return data;
        }
        catch (error) {
            console.error('Error importing dummy data:', error.message);
            throw error;
        }
    });
}
const filePath = path_1.default.join(__dirname, '../../dummy-data.json');
importDummyData(filePath);
