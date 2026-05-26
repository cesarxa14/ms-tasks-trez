import {
  Catch,
  ArgumentsHost,
} from '@nestjs/common';
import {
  BaseRpcExceptionFilter,
  RpcException,
} from '@nestjs/microservices';
import { throwError } from 'rxjs';

@Catch(RpcException)
export class AllRpcExceptionsFilter extends BaseRpcExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const error = exception.getError();

    return throwError(() => error);
  }
}