import { HttpException, HttpStatus } from "@nestjs/common";

export class TestException extends HttpException {
  constructor() {
    super("still testing", HttpStatus.NOT_IMPLEMENTED);
  }
}
