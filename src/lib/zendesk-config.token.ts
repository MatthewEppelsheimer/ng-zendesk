import { InjectionToken } from '@angular/core';
import { ZendeskConfig } from './zendesk-config.interface';
import { ZendeskConfigDefault } from './zendesk-config-default.const'

/*
 * Injection token for managing module configuration
 */
export const ZENDESK_CONFIG = new InjectionToken(
	'Zendesk configuration',
	{
		providedIn: 'root',
		factory: () => ZendeskConfigDefault,
	},
);
