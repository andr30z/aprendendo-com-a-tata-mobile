export function isFromType<C>(data: any, key: string): data is C {
  return data && (data[key] !== undefined || data[key] !== null);
}
