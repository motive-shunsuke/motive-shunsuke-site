
export default class DummyIncrementalCache {
    name = "dummy";

    async get(key: string) {
        return null;
    }

    async set(key: string, data: any, ctx: any) {
        return;
    }

    async delete(key: string) {
        return;
    }
}
