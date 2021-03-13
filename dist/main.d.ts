export interface Diffable {
    id: string | number;
    [key: string]: any;
}
export interface DiffResult {
    [key: string]: any;
}
export declare function diff(...objects: Diffable[]): DiffResult;
export default diff;
