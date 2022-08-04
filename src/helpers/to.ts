async function to (promise: Promise<any>): Promise<[any, any]> {
  return await promise
    .then((data: Object): any => [null, data])
    .catch((error: Error): any => [error, null])
}

export default to
