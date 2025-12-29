import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";

// Custom dummy cache to prevent "Failed to set to read-only cache" errors
// appearing in the logs when using Cloudflare Pages without R2/Worker KV
class DummyIncrementalCache {
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

export default defineCloudflareConfig({
	incrementalCache: () => new DummyIncrementalCache(),
});
// Trigger deployment for environment variables
