import {
    Err,
    GlobalErrorHandlerMiddleware as BaseGlobalErrorHandlerMiddleware,
    OverrideProvider,
    Req, Res
} from "@tsed/common";

import {Constant} from "@tsed/di";
import {Exception} from "ts-httpexceptions";

import {QueryFailedError} from "typeorm";

@OverrideProvider(BaseGlobalErrorHandlerMiddleware)
export class GlobalErrorHandlerMiddleware extends BaseGlobalErrorHandlerMiddleware {

    @Constant("errors.headerName", "errors")
    protected headerName: string;

    use(@Err() error: any, @Req() request: Req, @Res() response: Res): any {

        if (error instanceof Exception || error.status) {

            this.setHeaders(response, error, error.origin);

            response.status(error.status).json({
                error: {
                    code: error.status,
                    name: error.name,
                    message: error.message,
                },
            });

            return;
        }

        if (error instanceof QueryFailedError) {
        }

        if (typeof error === "string") {
            response.status(404).json({
                error: {
                    code: 404,
                    message: error,
                },
            });

            return;
        }

        this.setHeaders(response, error, error.origin);

        response.status(error.status || 500).json({
            error: {
                code: error.status || 500,
                name: 'Internal Error',
                message: error.message,
            },
        });

        return;
    }
}
