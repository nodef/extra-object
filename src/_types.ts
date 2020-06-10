export type tillFn       = (dones: boolean[]) => boolean;
export type reduceFn<T>  = (acc: T, v: any, k: string, x: object) => T;
export type calledFn     = (v: any, k: string, x: object) => void;
export type testFn       = (v: any, k: string, x: object) => boolean;
export type mapFn        = (v: any, k: string, x: object) => any;
export type combineFn    = (a: any, b: any) => any;
export type compareFn    = (a: any, b: any) => number;
export type getFn        = () => any;
