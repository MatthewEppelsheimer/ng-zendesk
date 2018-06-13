import { ZendeskConfig } from './zendesk-config.interface';

/*
 * Default module configuration
 *
 * This seems to be required to compile the package. Use of this triggers errors
 * alerting users to the need for actual configuration.
 */
export const ZendeskConfigDefault: ZendeskConfig = {
	simulateAPI: 'no',
	subdomain: '',
	token: '',
	configured: false,
}
