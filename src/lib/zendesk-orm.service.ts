import { Injectable } from '@angular/core';

import { ZendeskAPIService } from './zendesk-api.service';
import { ZendeskRequestAPIPayload } from './zendesk-request-api-payload.interface';

/*
 * Create Zendesk requests via the Zendesk API
 */
@Injectable({
	providedIn: 'root',
})
export class ZendeskORMService {
	constructor(private zendesk: ZendeskAPIService) {}

	/*
	 * Send a request to Zendesk
	 */
	public createRequest(
		formId: number = 0,
		requesterName: string,
		requesterEmail: string,
		subject: string,
		body: string,
		successCallback: (dataSent: ZendeskRequestAPIPayload, dataReceived: any) => void = this._defaultSuccessCallback,
		errorCallback: (dataSent: ZendeskRequestAPIPayload, dataReceived: any) => void = this._defaultErrorCallback,
		tags?: Array<string>,
		customFields?: Array<{id: number, value: string}>,
	) {
		// Create request structure
		let payload: ZendeskRequestAPIPayload;
		payload = {
			request: {
				requester: {
					name: requesterName,
					email: requesterEmail
				},
				subject: subject,
				comment: {
					body: body
				},
				custom_fields: [],
			}
		};

		if (0 !== formId) {
			payload.request.ticket_form_id = formId;
		}

		if (tags) {
			payload.request.tags = tags;
		}

		if (customFields) {
			for (let field of customFields) {
				payload.request.custom_fields.push(field);
			}
		}

		this.zendesk.sendRequestWithTypeAndPayloadAndMethod(
			'requests',
			payload,
			'POST',
			successCallback,
			errorCallback
		);
	}

	/*
	 * Console log successful API responses
	 *
	 * Default success handler callback for `this.createRequest()`. Intended to
	 * be replaced by user.
	 */
	private _defaultSuccessCallback(dataSent: ZendeskRequestAPIPayload, dataReceived: any): void {
		console.log('Zendesk post successful! Response: ',dataReceived);
		console.log('data sent to Zendesk: ', dataSent);
	}

	/*
	 * Console log unsuccessful API responses
	 *
	 * Default error handler callback for `this.createRequest()`. Intended to
	 * be replaced by user.
	 */
	private _defaultErrorCallback(dataSent: ZendeskRequestAPIPayload, dataReceived: any): void {
		console.log('Zendesk post unsuccessful. Response: ',dataReceived);
		console.log('data sent to Zendesk: ', dataSent);
	}
}
