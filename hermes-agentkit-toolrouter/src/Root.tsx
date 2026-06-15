import {Composition} from 'remotion';
import {HermesAgentKitToolRouter} from './Video';

export const RemotionRoot = () => {
  return (
    <Composition
      id="HermesAgentKitToolRouter"
      component={HermesAgentKitToolRouter}
      durationInFrames={7200}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
