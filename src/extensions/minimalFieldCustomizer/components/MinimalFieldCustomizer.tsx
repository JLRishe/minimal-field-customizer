import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';

import styles from './MinimalFieldCustomizer.module.scss';

export interface IMinimalFieldCustomizerProps {
  text: string;
}

const LOG_SOURCE: string = 'MinimalFieldCustomizer';

export default class MinimalFieldCustomizer extends React.Component<IMinimalFieldCustomizerProps, {}> {
  @override
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: MinimalFieldCustomizer mounted');
  }

  @override
  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: MinimalFieldCustomizer unmounted');
  }

  @override
  public render(): React.ReactElement<{}> {
    return (
      <div className={styles.MinimalFieldCustomizer}>
        { this.props.text }
      </div>
    );
  }
}
