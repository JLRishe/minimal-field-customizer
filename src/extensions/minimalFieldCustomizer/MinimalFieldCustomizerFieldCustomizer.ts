import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';

import * as strings from 'MinimalFieldCustomizerFieldCustomizerStrings';
import MinimalFieldCustomizer, { IMinimalFieldCustomizerProps } from './components/MinimalFieldCustomizer';

/**
 * If your field customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IMinimalFieldCustomizerFieldCustomizerProperties {
  // This is an example; replace with your own property
  sampleText?: string;
}

const LOG_SOURCE: string = 'MinimalFieldCustomizerFieldCustomizer';

export default class MinimalFieldCustomizerFieldCustomizer
  extends BaseFieldCustomizer<IMinimalFieldCustomizerFieldCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    console.log('onInit');

    // Add your custom initialization to this method.  The framework will wait
    // for the returned promise to resolve before firing any BaseFieldCustomizer events.
    Log.info(LOG_SOURCE, 'Activated MinimalFieldCustomizerFieldCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    Log.info(LOG_SOURCE, `The following string should be equal: "MinimalFieldCustomizerFieldCustomizer" and "${strings.Title}"`);
    return Promise.resolve();
  }

  @override
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    console.log('onRenderCell');

    // Use this method to perform your custom cell rendering.
    const text: string = `! - ${event.fieldValue}`;

    const minimalFieldCustomizer: React.ReactElement<{}> =
      React.createElement(MinimalFieldCustomizer, { text } as IMinimalFieldCustomizerProps);

    ReactDOM.render(minimalFieldCustomizer, event.domElement);
  }

  @override
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    console.log('onDisposeCell');

    // This method should be used to free any resources that were allocated during rendering.
    // For example, if your onRenderCell() called ReactDOM.render(), then you should
    // call ReactDOM.unmountComponentAtNode() here.
    ReactDOM.unmountComponentAtNode(event.domElement);
    super.onDisposeCell(event);
  }
}
