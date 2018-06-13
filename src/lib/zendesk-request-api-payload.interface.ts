/*
 * Shape of payloads Zendesk's 'request' API expects to receive
 *
 * @NOTE !!! This does not support all supported payload object members.
 *           This may need to be extended depending on your project requirements.
 *
 * @see https://developer.zendesk.com/rest_api/docs/core/requests
 */
export interface ZendeskRequestAPIPayload {
	request: {
		requester: {
			name: string,
			email: string
		},
		subject: string,
		comment: {
			body: string
		},

		// Not currently supported by ng-zendesk-orm
		// @TODO make it possible to set `request.via`
		via?: {
			channel: string
		},

		ticket_form_id?: number,
		custom_fields?: Array<{id: number, value: string}>,
		tags?: Array<string>,
	}
}
