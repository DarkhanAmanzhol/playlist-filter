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
exports.postMusic = exports.getUniqueMusicTypes = exports.getQuantityMusics = exports.getMusics = void 0;
const postgresql_1 = __importDefault(require("../database/postgresql"));
const query_helper_1 = require("./helpers/query.helper");
function getMusics(page = 0, perPage = 20, column = "singer", order = "ASC", filters = {
    singers: [],
    genres: [],
    years: [],
}) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryFilters = (0, query_helper_1.createFilteredQueries)(filters);
        const playlist = yield postgresql_1.default.query(`SELECT * FROM playlist ${queryFilters} ORDER BY ${column} ${order} LIMIT ${perPage} OFFSET ${page * perPage};`);
        return playlist.rows;
    });
}
exports.getMusics = getMusics;
function getQuantityMusics(filters) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        let query = `SELECT count(*) FROM playlist `;
        if (((_a = filters.singers) === null || _a === void 0 ? void 0 : _a.length) || ((_b = filters.genres) === null || _b === void 0 ? void 0 : _b.length) || ((_c = filters.years) === null || _c === void 0 ? void 0 : _c.length)) {
            query += (0, query_helper_1.createFilteredQueries)(filters);
        }
        const quantity = yield postgresql_1.default.query(query);
        return quantity.rows[0].count;
    });
}
exports.getQuantityMusics = getQuantityMusics;
function getUniqueMusicTypes() {
    return __awaiter(this, void 0, void 0, function* () {
        const singers = yield postgresql_1.default.query("SELECT DISTINCT singer FROM playlist ORDER BY singer");
        const genres = yield postgresql_1.default.query("SELECT DISTINCT genre FROM playlist ORDER BY genre");
        const years = yield postgresql_1.default.query("SELECT DISTINCT year FROM playlist ORDER BY year");
        const uniqueTypes = {
            singers: [],
            genres: [],
            years: [],
        };
        singers.rows.forEach((array) => {
            uniqueTypes.singers.push(array.singer);
        });
        genres.rows.forEach((array) => {
            uniqueTypes.genres.push(array.genre);
        });
        years.rows.forEach((array) => {
            uniqueTypes.years.push(array.year);
        });
        return uniqueTypes;
    });
}
exports.getUniqueMusicTypes = getUniqueMusicTypes;
function postMusic({ singer, song, genre, year }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!singer || !song || !genre || !year)
            return false;
        const response = yield postgresql_1.default.query("INSERT INTO playlist (singer, song, genre, year) values ($1, $2, $3, $4) RETURNING *", [singer, song, genre, year]);
        return response.rows[0];
    });
}
exports.postMusic = postMusic;
