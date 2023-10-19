export class ErrorHandeler extends Error {
  constructor(message = "", data = nul) {
    super(message);
    this.name = "ErrorHandeler";
    this.data = data;
  }
}
