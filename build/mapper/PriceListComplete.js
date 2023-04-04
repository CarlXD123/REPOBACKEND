"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceListCompleteMapper = void 0;
const ts_mapper_1 = require("ts-mapper");
class PriceListCompleteMapper extends ts_mapper_1.TypeMapper {
    constructor() {
        super();
        this.config();
    }
    config() {
        this.createMap()
            .map(src => src.id, dest => dest.id)
            .map(src => src.name, dest => dest.name)
            .map(src => src.status, dest => dest.status);
    }
}
exports.PriceListCompleteMapper = PriceListCompleteMapper;
