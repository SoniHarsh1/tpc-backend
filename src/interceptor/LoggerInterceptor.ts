import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private logger = new Logger("Request");

  public intercept(context: ExecutionContext, next: CallHandler): Observable<CallHandler> {
    const req = context.switchToHttp().getRequest();
    const userName = req?.user?.email || "anonymous";
    const { statusCode } = context.switchToHttp().getResponse();
    const { method, url, ip } = req;
    const startTime = new Date().getTime();

    const logMessage = `[ip=${ip}][user=${userName}] - ` + `"${method} ${url}" ${statusCode} `;

    return next.handle().pipe(
      map((data) => {
        this.logger.log(`${logMessage} ${this.getTimeDelta(startTime)}ms `);

        return data;
      }),
      catchError((err) => {
        this.logger.error(`${logMessage} ${this.getTimeDelta(startTime)}ms ${err.message} ${err.stack}`);

        return throwError(() => err);
      })
    );
  }

  private getTimeDelta(startTime: number): number {
    return new Date().getTime() - startTime;
  }
}
