import { Inject, Injectable } from '@angular/core';

import { HttpService } from 'ng-http-sugar';

import { ZENDESK_CONFIG } from './zendesk-config.token';
import { ZendeskConfig } from './zendesk-config.interface';
import { ZendeskRequestAPIPayload } from './zendesk-request-api-payload.interface';

/*
 * Interact directly with the Zendesk API via HttpService
 */
@Injectable({
	providedIn: 'root',
})
export class ZendeskAPIService {
	routes = {
		requests: 'api/v2/requests.json'
	};

	constructor(
		@Inject(ZENDESK_CONFIG) private config: ZendeskConfig,
		private http: HttpService,
	) {}

	/*
	 * Send a request to Zendesk based on type, payload, and method
	 */
	public sendRequestWithTypeAndPayloadAndMethod(
		// Currently only supports 'request' type; required to make this explicit
		type: 'requests',
		payload: ZendeskRequestAPIPayload,
		// Currently only supports 'POST' method; required to make this explicit
		method: 'POST',
		successCallback: (dataSent: ZendeskRequestAPIPayload, dataReceived: any) => void,
		errorCallback: (dataSent: ZendeskRequestAPIPayload, dataReceived: any) => void,
	): void {
		// Bail out if zendesk isn't
		if (this.config.hasOwnProperty('configured')) {
			console.log('ZendeskORM not yet configured.');
			return;
		}

		const simulate = this.config.simulateAPI;
		const subdomain = this.config.subdomain;
		const token = this.config.token;

		// Development-only API response simulation
		if ('no' !== simulate) {
			console.log('SIMULATING ZENDESK API INTERACTION');

			// Heads-up! This is just a simple ternary operator!
			// Sorry the line formatting is weird.
			('succeed' == simulate) ?
			setTimeout(
				() => successCallback(payload,{'message':'simulated API success'}),
				1500
			) :
			setTimeout(
				() => errorCallback(payload,{'message':'simulated API failure'}),
				1500
			);

			return;
		}

		/*
		 * Okay, go ahead and interact with the actual API
		 */

		let fullRoutePath: string;
		fullRoutePath = 'https://' + subdomain + '.zendesk.com/' + this.routes[type];

		let authorizationString: string;
		authorizationString = this._getEmailFromPayload(payload) + '/token:' + token;

		// No need for authorization with the requests API,
		// and we'll use HttpService's default content-type header
		let headers = [];

		// This will always be true until we support any other type,
		// so this is just here for forward compatibility.
		if ( 'requests' === type ) {
			this.http.post(
				fullRoutePath,
				payload,
				headers,
				null, // no params
				successCallback,
				errorCallback,
			)
		}
	}

	/*
	 * Extract email from payload
	 *
	 * Helper for building authorization header value
	 */
	private _getEmailFromPayload(payload: ZendeskRequestAPIPayload): string {
		return payload.request.requester.email;
	}
}
