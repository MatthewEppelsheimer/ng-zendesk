# Angular Zendesk ORM

A Zendesk API interaction wrapper for Angular applications.

**This currently only supports creating new Zendesk _request_ objects.**

**Requires Angular 6.0.0 or later.**

**License: GPL 2.0 or later.**

## How to Use ##

### 1. Install the module ###

First, install the module in your Angular 6.x or later project with `npm install --save 'ng-zendesk-orm'`.

### 2. Configure the module for your Zendesk Account ###

Second, configure the module for your own Zendesk integration. Do this by providing an object that implements the `ZendeskConfig` interface in your application's root module, using the `ZENDESK_CONFIG` injection token. 

This can seem a bit confusing... I recommend simply copy-pasting from the example below and replacing the three object properties with your own values.

```typescript

// Not included in excerpt: The rest of your root module's imports list
import {
	ZENDESK_CONFIG,
	ZendeskConfig,
} from 'ng-zendesk-orm';

const MyZendeskConfig: ZendeskConfig = {
	simulateAPI: 'no',

	// your subdomain e.g. "example" in "example.zendesk.com"
	subdomain: 'my-zendesk-subdomain',

	// your secret API token
	token: '1234567789';
};

@NgModule({
	providers: [
		{ provide: ZENDESK_CONFIG, factory: () => new ZendeskConfig() },
	],

	// additional module metadata
})
export class YourAppModule { /* ... */ }
```

`subdomain` and `token` are required properties of your `ZendeskConfig` object. `simulateAPI` is, as well and can be one of three different string values. Set it to `'no'` to make your application interact directly with Zendesk, as in a production environment. The other two options are useful for debugging: `'succeed'` and `'fail'` will simulate successful responses and error responses, respectively.

### 3. Create Zendesk requests within your code ###

Third, import `ZendeskORMService` into any service you want to make calls to the Zendesk API from its `createRequest()` method like so:

```typescript
import { Injectable } from '@angular/core';
import {
	ZendeskORMService
	ZendeskRequestAPIPayload
} from 'ng-zendesk-orm';

@Injectable()
export class MyService {
	// inject ZendeskORMService
	constructor( zendesk: ZendeskORMService ) {}
	
	// A method called when user submits a form that should generate
	// a Zendesk request object
	submitForm() {
		this.zendesk.createRequest(
			12345, // your ZenDesk form ID
			'Jane Doe', // requester name
			'jane.doe@example.com', // requester email
			'subject', // subject of the request
			'I have a question. Please get back to me.', // request body
			this.mySuccessCallback, // success handler
			this.myErrorCallback, // error handler
			['array', 'of', 'tags'], // optional
			[ // optional array of custom field objects with id/value properties
				{
					id: 12345 // custom field id
					value: 'value' // value to set
				},
				{
					id: 54321 // custom field id
					value: 'another value' // value to set
				},
			]				
		);
	}
	
	// A callback for successful request creation
	mySuccessCallback(dataSent: ZendeskRequestAPIPayload, dataReceived: any) {
		/* do stuff with response */
	}

	// A callback for UNsuccessful request creation
	myErrorCallback(dataSent: ZendeskRequestAPIPayload, dataReceived: any) {
		/* do stuff with error */
	}
}
```

## What's Included ##

1. `ZendeskORMModule` is this module. Include it in your Angular application to use its functionality.
2. `ZendeskORMService` is an injectable Angular service. Interact with this to create Zendesk requests.
3. `ZENDESK_CONFIG` is an injection token that allows referring to configuration objects.
4. `ZendeskConfig` is an interface describing the shape of configuration objects for this module. Provide an object that implements this interface with the `ZENDESK_CONFIG` injection toekn as described above to configure the module for your own Zendesk account, as described above.
5. `ZendeskRequestAPIPayload` is an interface that describes the shape of payloads sent to Zendesk's "request" API. Your success and error callback methods will need to use this in their call signature.

The module also includes `ZendeskAPIService` for internal use, to interact directly with Zendesk's APIs. (`ZendeskORMService` is a more application-friendly wrapper that uses `ZendeskAPIService` under the hood.) This isn't exported by the module because it is intended for internal private use, so it won't be available to your application.

## Roadmap ##

Nice-to-have features:

- Add test coverage!
- Fully support all 'request' payload interface members
- Add support for HTTP request types beyond 'POST' for "requests"
- Extend support beyond Zendesk requests
- Maybe support Angular `4.x` and later, instead of `6.x` and later?
	- Upgrading from `4.x` to `6.x` isn't terribly onerous in most cases, so I'll only work on this if I get requests for it.

## Maintenance ##

### Build ###

Run `ng build ng-zendesk-orm --prod` to build the library. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Publish updates to NPM ###

```bash
# manually increment version in package.json
# avoid git tags since we're publishing from `dist/` later
npm --no-git-tag-version -f version [major|minor|patch]

# build
ng build ng-zendesk-orm --prod

# switch to built package
cd dist/ng-zendesk-orm/

# publish update npm
npm publish
```

### Run tests ###

**There currently are no tests!**

- Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
- Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
