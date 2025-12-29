import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";

export default defineCloudflareConfig({
	// Reverting to default cache handling to prevent build timeouts
});
