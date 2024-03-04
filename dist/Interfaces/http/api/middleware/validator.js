"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvariantError_1 = __importDefault(require("../../../../Commons/exceptions/InvariantError"));
function validator(joiSchema) {
    // eslint-disable-next-line func-names
    return function (req, res, next) {
        try {
            const validated = joiSchema.validate(req.body);
            if (validated.error) {
                throw new Error(validated.error.message);
            }
            req.body = validated.value;
            return next();
        }
        catch (error) {
            return next(new InvariantError_1.default(error.message));
        }
    };
}
exports.default = validator;
