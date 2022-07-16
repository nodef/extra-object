export type tillFn       = (dones: boolean[]) => boolean;
export type reduceFn<T>  = (acc: T, v: any, k: string, x: object) => T;
export type calledFn     = (v: any, k: string, x: object) => void;
export type combineFn    = (a: any, b: any) => any;
export type getFn        = () => any;
