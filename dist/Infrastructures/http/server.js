"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ClientError_1 = __importDefault(require("../../Commons/exceptions/ClientError"));
const routes_1 = __importDefault(require("../../Interfaces/http/api/users/routes"));
const routes_2 = __importDefault(require("../../Interfaces/http/api/authentications/routes"));
const routes_3 = __importDefault(require("../../Interfaces/http/api/categories/routes"));
const routes_4 = __importDefault(require("../../Interfaces/http/api/transactions/routes"));
function initServer() {
    const app = (0, express_1.default)();
    const port = process.env.PORT;
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)());
    app.use(express_1.default.static('uploads'));
    app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Server running at http://localhost:${port}`);
    });
    app.use('/user', routes_1.default);
    app.use('/auth', routes_2.default);
    app.use('/category', routes_3.default);
    app.use('/transaction', routes_4.default);
    app.use((err, req, res, next) => {
        if (err) {
            if (err instanceof ClientError_1.default) {
                return res
                    .status(err.statusCode)
                    .json({ message: err.message, data: null });
            }
            // eslint-disable-next-line no-console
            console.log({ err });
            return res
                .status(500)
                .json({ message: 'Internal server error', data: null });
        }
        return next();
    });
}
exports.default = initServer;
