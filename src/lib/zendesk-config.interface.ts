/*
 * Specification for application configuration of the ZendeskORM module
 *
 * Implement this interface in an object that with your own Zendesk
 * configuration values, and include that in the `providers` array of your
 * app's root module metadata. Here's an example:
 *
 * ```
 * @NgModule({
 * 	providers: [
 * 		{
 * 			provide: ZendeskConfig,
 * 			useValue: {
 * 				simulateAPI: 'no',
 *
 * 				// your subdomain e.g. "example" in "example.zendesk.com"
 * 				subdomain: 'my-zendesk-subdomain',
 *
 * 				// your secret API token
 * 				token: '1234567789';
 * 			}
 * 		}
 * 	],
 * 	// additional module metadata
 * })
 * ```
 *
 * It is a good practice to actually store most configuration values in your
 * `environment` configuration. You can set values in the example above from
 * there instead, e.g. `token: environment.token`.
 */
export interface ZendeskConfig {
	// Set this to "succeed" to simulate interacting successfully with the Zendesk API
	// Set this to "fail" to simulate interacting unsuccessfully with the Zendesk API
	// Set this to "no" send real requests to the Zendesk API (the default behavior)
	simulateAPI: 'no' | 'succeed' | 'fail';

	// Set this to your Zendesk subdomain
	subdomain: string;

	// Your API token
	token: string;

	// Implementers should NOT inglude this optional property.
	// If set, this indicates that module has not been configured
	configured?: false;
}
