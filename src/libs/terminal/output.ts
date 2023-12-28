export default class Output {
  constructor(public readonly data: unknown, public readonly status = 0) {}

  get isError () {
    return this.status !== 0
  }

  static success(data?: unknown) {
    return new Output(data)
  }

  static error(status: number, data?: unknown) {
    const out = new Output(data, status)

    if (!out.isError)
      throw new Error('Should be an error status')

    return out
  }
}
