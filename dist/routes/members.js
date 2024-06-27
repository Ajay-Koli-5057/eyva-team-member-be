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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabaseService_1 = require("../services/supabaseService");
const router = (0, express_1.Router)();
router.get('/members', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, sortBy = 'id', order = 'asc', search = '' } = req.query;
        const pagination = {
            page: parseInt(page),
            limit: parseInt(limit)
        };
        const sort = {
            sortBy: sortBy,
            order: order.toLowerCase() === 'desc' ? 'desc' : 'asc'
        };
        const members = yield (0, supabaseService_1.getMembers)(pagination, sort, search);
        res.status(200).json(members);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.get('/members/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const member = yield (0, supabaseService_1.getMemberById)(parseInt(id));
        res.status(200).json(member);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));

router.put('/members/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const member = req.body;
        const updatedMember = yield (0, supabaseService_1.updateMember)(parseInt(id), member);
        res.status(200).json(updatedMember);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.delete('/members', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ids = req.body.ids;
        if (!Array.isArray(ids)) {
            return res.status(400).json({ error: 'IDs must be provided as a valid array' });
        }
        ids = ids.map((id) => parseInt(id));
        if (ids.some((id) => isNaN(id))) {
            return res.status(400).json({ error: 'IDs must be a valid array of numbers' });
        }
        const deletedMember = yield (0, supabaseService_1.deleteMemberIds)(ids);
        res.status(200).json(deletedMember);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
