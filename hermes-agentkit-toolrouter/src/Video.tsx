import React, {CSSProperties} from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const colors = {
  ink: '#050505',
  paper: '#f7f5f0',
  panel: '#ffffff',
  panelLight: '#fbfaf7',
  line: '#e5e1da',
  muted: '#74706a',
  softMuted: '#a09b93',
  blue: '#2f63ff',
  cyan: '#0a9588',
  green: '#0aa86f',
  amber: '#c88b2d',
  coral: '#ef6a55',
  violet: '#7357a9',
  dark: '#0d0d0d',
};

const fontFamily =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const headlineFamily =
  '"Inter Tight", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const MOTION_SLOWDOWN = 1.4;
const FADE_FRAMES = 36;
const MAIN_SCENE_FRAMES = 540;
const WORLD_ID_SCENE_FRAMES = 540;
const X402_SCENE_FRAMES = 540;
const AGENTKIT_ARCH_SCENE_FRAMES = 540;
const AGENTKIT_USE_CASE_SCENE_FRAMES = 540;
const ENDPOINTS_SCENE_FRAMES = 540;
const QUICKSTART_SCENE_FRAMES = 540;
const OUTRO_SCENE_FRAMES = 420;
const TRY_IT_SCENE_FRAMES = 420;
const QA_SCENE_FRAMES = 420;

const logos = {
  agentmail: 'logos/agentmail.png',
  browserbase: 'logos/browserbase.png',
  cloudflare: 'logos/cloudflare.svg',
  coinbase: 'logos/coinbase.svg',
  exa: 'logos/exa.png',
  hermes: 'logos/hermes.png',
  manus: 'logos/manus.png',
  okta: 'logos/okta.svg',
  shopify: 'logos/shopify.svg',
  stabletravel: 'logos/stabletravel.png',
  vercel: 'logos/vercel.svg',
} as const;

type LogoName = keyof typeof logos;

const clampRaw = (
  frame: number,
  input: [number, number],
  output: [number, number],
) =>
  interpolate(frame, input, output, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

const clamp = (
  frame: number,
  input: [number, number],
  output: [number, number],
) =>
  clampRaw(
    frame,
    [input[0] * MOTION_SLOWDOWN, input[1] * MOTION_SLOWDOWN],
    output,
  );

const sceneOpacity = (frame: number, duration: number) => {
  const enter = clampRaw(frame, [0, FADE_FRAMES], [0, 1]);
  const exit = clampRaw(frame, [duration - FADE_FRAMES, duration], [1, 0]);
  return Math.min(enter, exit);
};

const slideUp = (frame: number, delay = 0, distance = 42) => ({
  opacity: clamp(frame, [delay, delay + 20], [0, 1]),
  transform: `translateY(${clamp(frame, [delay, delay + 26], [distance, 0])}px)`,
});

const Shell = ({
  children,
  duration,
}: {
  children: React.ReactNode;
  duration: number;
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        opacity: sceneOpacity(frame, duration),
        background: colors.paper,
        color: colors.ink,
        fontFamily,
        overflow: 'hidden',
      }}
    >
      <BackgroundGrid />
      <DeckChrome />
      {children}
    </AbsoluteFill>
  );
};

const BackgroundGrid = () => {
  return (
    <AbsoluteFill
      style={{
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.72), rgba(247,245,240,0) 46%)',
      }}
    />
  );
};

const DeckChrome = () => (
  <>
    <Img
      src={staticFile('world-cropped-logo.png')}
      style={{
        position: 'absolute',
        left: 66,
        top: 52,
        width: 230,
        height: 'auto',
        objectFit: 'contain',
      }}
    />
    <div
      style={{
        position: 'absolute',
        right: 78,
        top: 62,
        color: colors.ink,
        fontSize: 26,
        fontWeight: 700,
        letterSpacing: 9,
      }}
    >
      2026
    </div>
  </>
);

const Kicker = ({children}: {children: React.ReactNode}) => (
  <div
    style={{
      color: colors.muted,
      fontSize: 24,
      fontWeight: 760,
      textTransform: 'uppercase',
      letterSpacing: 5,
    }}
  >
    {children}
  </div>
);

const Title = ({
  children,
  size = 104,
  width = 980,
}: {
  children: React.ReactNode;
  size?: number;
  width?: number;
}) => (
  <div
    style={{
      fontSize: size,
      lineHeight: 0.94,
      fontWeight: 950,
      letterSpacing: 0,
      maxWidth: width,
      fontFamily: headlineFamily,
    }}
  >
    {children}
  </div>
);

const Body = ({
  children,
  width = 760,
}: {
  children: React.ReactNode;
  width?: number;
}) => (
  <div
    style={{
      color: colors.muted,
      fontSize: 35,
      lineHeight: 1.32,
      fontWeight: 560,
      maxWidth: width,
    }}
  >
    {children}
  </div>
);

const Pill = ({
  children,
  color = colors.blue,
  muted = false,
}: {
  children: React.ReactNode;
  color?: string;
  muted?: boolean;
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      border: `1.25px solid ${muted ? colors.line : color === colors.ink ? colors.ink : colors.line}`,
      background: muted ? '#f0eee8' : color === colors.ink ? colors.ink : colors.panel,
      color: muted ? colors.muted : color === colors.ink ? colors.paper : colors.ink,
      borderRadius: 999,
      padding: '16px 25px',
      fontSize: 24,
      fontWeight: 840,
      lineHeight: 1,
      whiteSpace: 'nowrap',
      boxShadow:
        color === colors.ink
          ? '0 8px 24px rgba(5,5,5,0.16)'
          : '0 5px 18px rgba(5,5,5,0.05)',
    }}
  >
    {color !== colors.ink && !muted ? (
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: 999,
          background: color,
          flex: '0 0 auto',
        }}
      />
    ) : null}
    {children}
  </div>
);

const Panel = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: CSSProperties;
}) => (
  <div
    style={{
      border: `1.25px solid ${colors.line}`,
      background: colors.panel,
      borderRadius: 34,
      boxShadow: '0 20px 48px rgba(5,5,5,0.06)',
      ...style,
    }}
  >
    {children}
  </div>
);

const LogoMark = ({
  logo,
  size = 64,
  shape = 'circle',
  style,
}: {
  logo: LogoName;
  size?: number;
  shape?: 'circle' | 'square';
  style?: CSSProperties;
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: shape === 'square' ? Math.max(14, size * 0.22) : 999,
      background: colors.panel,
      border: `1.25px solid ${colors.line}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      boxShadow: '0 10px 26px rgba(5,5,5,0.08)',
      flex: '0 0 auto',
      ...style,
    }}
  >
    <Img
      src={staticFile(logos[logo])}
      style={{
        width: size * 0.78,
        height: size * 0.78,
        objectFit: 'contain',
      }}
    />
  </div>
);

const Node = ({
  label,
  detail,
  color,
  logo,
  logoLayout = 'stacked',
  style,
}: {
  label: string;
  detail?: string;
  color: string;
  logo?: LogoName;
  logoLayout?: 'stacked' | 'horizontal';
  style?: CSSProperties;
}) => (
  <div
    style={{
      position: 'absolute',
      width: 286,
      minHeight: 148,
      borderRadius: 32,
      border: `1.25px solid ${colors.line}`,
      background: colors.panelLight,
      display: 'flex',
      flexDirection: logo && logoLayout === 'horizontal' ? 'row' : 'column',
      alignItems: logo && logoLayout === 'horizontal' ? 'center' : 'stretch',
      justifyContent: 'center',
      gap: logo && logoLayout === 'horizontal' ? 20 : 0,
      padding: '24px 26px',
      boxShadow: '0 16px 34px rgba(5,5,5,0.06)',
      ...style,
    }}
  >
    {logo ? (
      <LogoMark
        logo={logo}
        size={logoLayout === 'horizontal' ? 82 : 56}
        shape={logoLayout === 'horizontal' ? 'square' : 'circle'}
        style={logoLayout === 'horizontal' ? undefined : {marginBottom: 14}}
      />
    ) : null}
    {!logo ? (
      <div
        style={{
          width: 13,
          height: 13,
          borderRadius: 999,
          background: color,
          marginBottom: 16,
        }}
      />
    ) : null}
    <div>
      <div
        style={{
          fontSize: 42,
          fontWeight: 930,
          lineHeight: 1.05,
          fontFamily: headlineFamily,
        }}
      >
        {label}
      </div>
      {detail ? (
        <div
          style={{
            marginTop: 8,
            color: colors.muted,
            fontSize: 24,
            fontWeight: 760,
            lineHeight: 1.16,
          }}
        >
          {detail}
        </div>
      ) : null}
    </div>
  </div>
);

const Connector = ({
  x1,
  y1,
  x2,
  y2,
  color = colors.blue,
  progress = 1,
  width = 3,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  progress?: number;
  width?: number;
  dashed?: boolean;
}) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);

  return (
    <div
      style={{
        position: 'absolute',
        left: x1,
        top: y1,
        width: length,
        height: width,
        transform: `rotate(${angle}rad)`,
        transformOrigin: '0 50%',
        opacity: 0.92,
      }}
    >
      <div
        style={{
          width: `${progress * 100}%`,
          height: '100%',
          borderRadius: 999,
          background: dashed
            ? `repeating-linear-gradient(90deg, ${color} 0 22px, transparent 22px 38px)`
            : color,
        }}
      />
    </div>
  );
};

const X402ExplainerScene = () => {
  const frame = useCurrentFrame();
  const steps = [
    ['request', 'Agent asks for a paid resource', colors.blue],
    ['402', 'Server returns Payment Required', colors.amber],
    ['pay', 'Agent pays and retries instantly', colors.green],
    ['access', 'API unlocks without account setup', colors.ink],
  ] as const;

  return (
    <Shell duration={X402_SCENE_FRAMES}>
      <div style={{position: 'absolute', left: 110, top: 150, width: 790}}>
        <div style={slideUp(frame, 0)}>
          <Kicker>x402</Kicker>
        </div>
        <div style={{...slideUp(frame, 10), marginTop: 24}}>
          <Title size={112} width={810}>
            Payment Required becomes an agent primitive.
          </Title>
        </div>
        <div style={{...slideUp(frame, 34), marginTop: 34}}>
          <Body width={790}>
            x402 uses the web's built-in HTTP 402 response to let an agent pay
            for an API call, retry, and keep moving.
          </Body>
        </div>
        <div
          style={{
            ...slideUp(frame, 62, 24),
            marginTop: 44,
            display: 'flex',
            alignItems: 'center',
            gap: 18,
          }}
        >
          <LogoMark logo="coinbase" size={72} />
          <LogoMark logo="cloudflare" size={72} />
          <Pill color={colors.ink}>internet-native payments</Pill>
        </div>
      </div>

      <Panel
        style={{
          position: 'absolute',
          right: 104,
          top: 140,
          width: 820,
          height: 780,
          padding: 34,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 28,
          }}
        >
          <div style={{fontSize: 76, fontWeight: 950, fontFamily: headlineFamily}}>
            x402
          </div>
          <Pill color={colors.amber}>HTTP 402</Pill>
        </div>
        <div style={{display: 'grid', gap: 16}}>
          {steps.map(([label, detail, color], index) => (
            <Panel
              key={label}
              style={{
                ...slideUp(frame, 24 + index * 12, 24),
                padding: '22px 28px',
                display: 'grid',
                gridTemplateColumns: '86px 1fr',
                gap: 24,
                alignItems: 'center',
                boxShadow: 'none',
              }}
            >
              <div
                style={{
                  width: 66,
                  height: 66,
                  borderRadius: 999,
                  background: color,
                  color: color === colors.ink ? colors.paper : colors.ink,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 25,
                  fontWeight: 940,
                }}
              >
                {index + 1}
              </div>
              <div>
                <div style={{fontSize: 36, fontWeight: 950, fontFamily: headlineFamily}}>
                  {label}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 26,
                    color: colors.muted,
                    fontWeight: 720,
                    lineHeight: 1.18,
                  }}
                >
                  {detail}
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </Panel>
    </Shell>
  );
};

const AgentKitArchitectureScene = () => {
  const frame = useCurrentFrame();
  const steps = [
    ['1', 'World ID holder', 'verifies once, privately', colors.ink],
    ['2', 'AgentBook registry', 'maps an agent wallet to that proof', colors.green],
    ['3', 'Agent wallet', 'signs a CAIP-122 challenge', colors.blue],
    ['4', 'x402 API', 'asks for proof or payment', colors.amber],
    ['5', 'Access policy', 'grants free, trial, discount, or paid access', colors.violet],
  ] as const;

  return (
    <Shell duration={AGENTKIT_ARCH_SCENE_FRAMES}>
      <div style={{position: 'absolute', left: 108, top: 136, width: 720}}>
        <div style={slideUp(frame, 0)}>
          <Kicker>AgentKit architecture</Kicker>
        </div>
        <div style={{...slideUp(frame, 10), marginTop: 22}}>
          <Title size={88} width={720}>
            A wallet can prove there is one real human behind the agent.
          </Title>
        </div>
        <div style={{...slideUp(frame, 34), marginTop: 30}}>
          <Body width={690}>
            The client signs a challenge. The server verifies the signature,
            resolves the registering human in AgentBook, then applies policy.
          </Body>
        </div>
        <div
          style={{
            ...slideUp(frame, 66, 22),
            marginTop: 42,
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <Pill color={colors.green}>proof of human</Pill>
          <Pill color={colors.blue}>agent wallet</Pill>
          <Pill color={colors.amber}>x402 challenge</Pill>
        </div>
      </div>

      <Panel
        style={{
          position: 'absolute',
          right: 104,
          top: 130,
          width: 880,
          height: 820,
          padding: 34,
        }}
      >
        <div style={{fontSize: 56, fontWeight: 950, fontFamily: headlineFamily}}>
          Proof path
        </div>
        <div
          style={{
            marginTop: 10,
            color: colors.muted,
            fontSize: 25,
            fontWeight: 720,
            lineHeight: 1.24,
          }}
        >
          AgentKit wraps the normal x402 flow with a proof header before paid
          fallback is needed.
        </div>
        <div style={{display: 'grid', gap: 14, marginTop: 28}}>
          {steps.map(([num, title, detail, color], index) => (
            <div
              key={title}
              style={{
                ...slideUp(frame, 22 + index * 10, 20),
                display: 'grid',
                gridTemplateColumns: '74px 1fr',
                gap: 20,
                alignItems: 'center',
                minHeight: 100,
                padding: '18px 22px',
                borderRadius: 24,
                border: `1.25px solid ${colors.line}`,
                background: colors.panelLight,
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 999,
                  background: color,
                  color: color === colors.ink ? colors.paper : colors.ink,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  fontWeight: 950,
                }}
              >
                {num}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 33,
                    fontWeight: 950,
                    fontFamily: headlineFamily,
                    lineHeight: 1.03,
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    marginTop: 7,
                    color: colors.muted,
                    fontSize: 22,
                    fontWeight: 720,
                    lineHeight: 1.18,
                  }}
                >
                  {detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </Shell>
  );
};

const AgentKitUseCasesScene = () => {
  const frame = useCurrentFrame();
  const useCases = [
    ['Reservations', 'Book tables or tickets without letting one actor hoard supply.', colors.green],
    ['News discovery', 'Curation signals can trace back to unique people.', colors.blue],
    ['Free trials', 'Offer requests per unique human, not per wallet.', colors.amber],
    ['Phone numbers', 'Keep one verified human from spawning unlimited signups.', colors.violet],
  ] as const;
  const partners = [
    ['Browserbase', 'browserbase'],
    ['Exa', 'exa'],
    ['Okta', 'okta'],
    ['Shopify', 'shopify'],
    ['Vercel', 'vercel'],
  ] as const;

  return (
    <Shell duration={AGENTKIT_USE_CASE_SCENE_FRAMES}>
      <div style={{position: 'absolute', left: 110, top: 130, width: 760}}>
        <div style={slideUp(frame, 0)}>
          <Kicker>What AgentKit powers</Kicker>
        </div>
        <div style={{...slideUp(frame, 10), marginTop: 22}}>
          <Title size={108} width={780}>
            Access for useful agents, limits for swarms.
          </Title>
        </div>
        <div style={{...slideUp(frame, 32), marginTop: 32}}>
          <Body width={740}>
            Proof of human gives websites a non-payment signal: how many unique
            people are actually behind agent traffic.
          </Body>
        </div>
        <div
          style={{
            ...slideUp(frame, 60, 22),
            marginTop: 42,
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            maxWidth: 720,
          }}
        >
          {partners.map(([name, logo]) => (
            <div key={name} style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <LogoMark logo={logo} size={56} />
              <div style={{fontSize: 24, fontWeight: 850}}>{name}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          right: 110,
          top: 166,
          width: 880,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
        }}
      >
        {useCases.map(([label, detail, color], index) => (
          <Panel
            key={label}
            style={{
              ...slideUp(frame, 20 + index * 10, 24),
              minHeight: 270,
              padding: 32,
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: color,
                marginBottom: 24,
              }}
            />
            <div style={{fontSize: 42, fontWeight: 950, fontFamily: headlineFamily}}>
              {label}
            </div>
            <div
              style={{
                marginTop: 16,
                fontSize: 29,
                color: colors.muted,
                fontWeight: 700,
                lineHeight: 1.22,
              }}
            >
              {detail}
            </div>
          </Panel>
        ))}
      </div>
    </Shell>
  );
};

const IntroScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pulse = spring({
    frame: frame / MOTION_SLOWDOWN,
    fps,
    config: {damping: 18, stiffness: 90},
  });
  const lineProgress = clamp(frame, [48, 108], [0, 1]);

  return (
    <Shell duration={MAIN_SCENE_FRAMES}>
      <div style={{position: 'absolute', left: 110, top: 150, width: 760}}>
        <div style={slideUp(frame, 6)}>
          <Kicker>Hermes x AgentKit</Kicker>
        </div>
        <div style={{...slideUp(frame, 18), marginTop: 22}}>
          <Title size={100} width={740}>Agentic Apps for Real Humans</Title>
        </div>
        <div style={{...slideUp(frame, 38), marginTop: 30}}>
          <Body width={700}>
            ToolRouter gives Hermes one MCP layer for AgentKit-first endpoints,
            x402 fallback, liveness checks, spend caps, and request traces.
          </Body>
        </div>
        <div
          style={{
            ...slideUp(frame, 68),
            marginTop: 38,
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            maxWidth: 720,
          }}
        >
          <Pill color={colors.green}>AgentKit first</Pill>
          <Pill color={colors.amber}>x402 fallback</Pill>
          <Pill color={colors.blue}>one MCP server</Pill>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          right: 40,
          top: 150,
          width: 980,
          height: 760,
          transform: `scale(${0.82 + pulse * 0.035})`,
          transformOrigin: '100% 50%',
        }}
      >
        <Connector x1={338} y1={364} x2={368} y2={364} progress={lineProgress} />
        <Connector
          x1={668}
          y1={310}
          x2={704}
          y2={184}
          color={colors.green}
          progress={lineProgress}
        />
        <Connector
          x1={668}
          y1={368}
          x2={704}
          y2={368}
          color={colors.coral}
          progress={lineProgress}
        />
        <Connector
          x1={668}
          y1={426}
          x2={704}
          y2={552}
          color={colors.amber}
          progress={lineProgress}
        />
        <Node
          label="Hermes"
          detail="agent loop"
          color={colors.blue}
          logo="hermes"
          logoLayout="horizontal"
          style={{left: 0, top: 284, width: 338}}
        />
        <Node
          label="ToolRouter"
          detail="one MCP layer"
          color={colors.ink}
          style={{left: 368, top: 284, width: 300}}
        />
        <Node
          label="Search"
          detail="verified endpoint"
          color={colors.green}
          style={{right: 0, top: 92}}
        />
        <Node
          label="Browser"
          detail="paid trace"
          color={colors.coral}
          style={{right: 0, top: 284}}
        />
        <Node
          label="Research"
          detail="spend capped"
          color={colors.amber}
          style={{right: 0, top: 476}}
        />
      </div>
      <div
        style={{
          ...slideUp(frame, 44),
          position: 'absolute',
          right: 90,
          bottom: 72,
          fontSize: 28,
          fontWeight: 800,
          color: colors.muted,
          letterSpacing: 0,
        }}
      >
        AgentKit, by dcbuilder.eth
      </div>
    </Shell>
  );
};

const WorldIdScene = () => {
  const frame = useCurrentFrame();
  const bullets = [
    ['Proof of humanity', 'Verify once that you are a unique human.'],
    ['Private by default', 'Apps learn the proof, not your identity.'],
    ['Reusable trust', 'Agents can unlock human-only access and benefits.'],
  ] as const;

  return (
    <Shell duration={WORLD_ID_SCENE_FRAMES}>
      <div style={{position: 'absolute', left: 110, top: 138, width: 760}}>
        <div style={slideUp(frame, 0)}>
          <Kicker>World ID</Kicker>
        </div>
        <div style={{...slideUp(frame, 10), marginTop: 22}}>
          <Title size={94} width={760}>
            Simple proof that a human is here.
          </Title>
        </div>
        <div
          style={{
            ...slideUp(frame, 30),
            marginTop: 30,
            color: colors.muted,
            fontSize: 32,
            lineHeight: 1.28,
            fontWeight: 620,
            maxWidth: 720,
          }}
        >
          World ID lets someone prove they are a unique human without revealing
          anything else about themselves.
        </div>

        <div
          style={{
            ...slideUp(frame, 54, 22),
            marginTop: 34,
            display: 'flex',
            gap: 14,
            flexWrap: 'wrap',
          }}
        >
          <Pill color={colors.blue}>Proof of humanity</Pill>
          <Pill color={colors.ink}>world.org/world-id</Pill>
        </div>

        <div style={{marginTop: 34, display: 'grid', gap: 14}}>
          {bullets.map(([label, detail], index) => (
            <Panel
              key={label}
              style={{
                ...slideUp(frame, 72 + index * 10, 18),
                padding: '18px 22px',
                display: 'grid',
                gridTemplateColumns: '42px 1fr',
                gap: 16,
                alignItems: 'center',
                borderRadius: 22,
                boxShadow: '0 10px 24px rgba(5,5,5,0.04)',
              }}
            >
              <WorldIdMiniIcon size={32} />
              <div>
                <div
                  style={{
                    fontSize: 25,
                    fontWeight: 930,
                    fontFamily: headlineFamily,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    marginTop: 4,
                    color: colors.muted,
                    fontSize: 20,
                    lineHeight: 1.18,
                    fontWeight: 670,
                  }}
                >
                  {detail}
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </div>

      <Panel
        style={{
          ...slideUp(frame, 18, 30),
          position: 'absolute',
          right: 96,
          top: 142,
          width: 860,
          height: 760,
          padding: 0,
          overflow: 'hidden',
          borderRadius: 38,
          borderColor: '#d9d5ce',
          background: colors.panelLight,
        }}
      >
        <Img
          src={staticFile('world-id-orb.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 28,
            bottom: 28,
            right: 28,
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 16,
            alignItems: 'center',
            borderRadius: 22,
            background: 'rgba(255,255,255,0.84)',
            backdropFilter: 'blur(12px)',
            border: `1.25px solid rgba(255,255,255,0.74)`,
            padding: '20px 22px',
          }}
        >
          <div>
            <div
              style={{
                color: colors.softMuted,
                fontSize: 15,
                fontWeight: 860,
                textTransform: 'uppercase',
                letterSpacing: 3,
              }}
            >
              World ID
            </div>
            <div
              style={{
                marginTop: 5,
                fontSize: 25,
                fontWeight: 930,
                fontFamily: headlineFamily,
              }}
            >
              A privacy preserving proof of humanity protocol
            </div>
          </div>
          <WorldIdMiniIcon size={48} />
        </div>
      </Panel>
    </Shell>
  );
};

const ProblemScene = () => {
  const frame = useCurrentFrame();
  const items = [
    ['Provider keys', colors.coral],
    ['Payment logic', colors.amber],
    ['Health checks', colors.violet],
    ['Tool schemas', colors.blue],
    ['Traceability', colors.green],
  ] as const;
  const hermesCard = {left: 0, top: 286, width: 356, height: 148};
  const endpointCard = {left: 600, width: 340, height: 132};
  const endpointRows = [
    ['Search API', endpointCard.left, 18, colors.green],
    ['Browser API', endpointCard.left, 184, colors.coral],
    ['Research API', endpointCard.left, 350, colors.amber],
    ['Email API', endpointCard.left, 516, colors.violet],
  ] as const;

  return (
    <Shell duration={MAIN_SCENE_FRAMES}>
      <div style={{position: 'absolute', left: 110, top: 150}}>
        <div style={slideUp(frame, 0)}>
          <Kicker>Before routing</Kicker>
        </div>
        <div style={{...slideUp(frame, 12), marginTop: 22}}>
          <Title size={88} width={870}>
            Every useful endpoint becomes a mini integration.
          </Title>
        </div>
      </div>

      <Panel
        style={{
          position: 'absolute',
          left: 108,
          bottom: 116,
          width: 760,
          height: 478,
          padding: 34,
        }}
      >
        <div style={{fontSize: 26, fontWeight: 900, color: colors.muted}}>
          Agent loop has to reason about:
        </div>
        <div style={{display: 'grid', gap: 18, marginTop: 28}}>
          {items.map(([label, color], index) => (
            <div
              key={label}
              style={{
                ...slideUp(frame, 32 + index * 8, 24),
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                fontSize: 38,
                fontWeight: 900,
              }}
            >
              <div
                style={{
                  width: 20,
          height: 20,
          borderRadius: 999,
          background: color,
        }}
              />
              {label}
            </div>
          ))}
        </div>
      </Panel>

      <div
        style={{
          position: 'absolute',
          right: 76,
          top: 228,
          width: 940,
          height: 700,
        }}
      >
        <Node
          label="Hermes"
          detail="same user goal"
          color={colors.blue}
          logo="hermes"
          logoLayout="horizontal"
          style={{
            left: hermesCard.left,
            top: hermesCard.top,
            width: hermesCard.width,
            minHeight: hermesCard.height,
          }}
        />
        {endpointRows.map(([label, x, y, color], index) => {
          const progress = clamp(frame, [48 + index * 8, 94 + index * 8], [0, 1]);
          const startX = hermesCard.left + hermesCard.width;
          const startY = hermesCard.top + hermesCard.height / 2;
          const endX = Number(x);
          const endY = Number(y) + endpointCard.height / 2;
          return (
            <React.Fragment key={String(label)}>
              <Connector
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                color={String(color)}
                progress={progress}
                dashed
              />
              <Node
                label={String(label)}
                detail="separate setup"
                color={String(color)}
                style={{
                  left: Number(x),
                  top: Number(y),
                  width: endpointCard.width,
                  minHeight: endpointCard.height,
                  padding: '22px 26px',
                }}
              />
            </React.Fragment>
          );
        })}
      </div>
    </Shell>
  );
};

const MiniDiagramFrame = ({children}: {children: React.ReactNode}) => (
  <div
    style={{
      height: 216,
      borderRadius: 18,
      background: '#efeeeb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}
  >
    {children}
  </div>
);

const ToolRouterDiagramImage = ({src}: {src: string}) => (
  <MiniDiagramFrame>
    <Img
      src={staticFile(src)}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    />
  </MiniDiagramFrame>
);

const BillingDiagram = () => (
  <ToolRouterDiagramImage src="toolrouter-diagrams/simplified-billing.png" />
);

const AvailabilityDiagram = () => (
  <ToolRouterDiagramImage src="toolrouter-diagrams/higher-availability.png" />
);

const HumanBoostsDiagram = () => (
  <ToolRouterDiagramImage src="toolrouter-diagrams/human-boosts.png" />
);

const ReliabilityDiagram = () => (
  <ToolRouterDiagramImage src="toolrouter-diagrams/verified-reliability.png" />
);

type EndpointInventoryRow = {
  name: string;
  id: string;
  provider: LogoName | 'parallel';
  worldBenefit?: 'Access' | 'Free trial';
};

const endpointInventory: EndpointInventoryRow[] = [
  {
    name: 'Browserbase Session',
    id: 'session',
    provider: 'browserbase',
    worldBenefit: 'Access',
  },
  {
    name: 'Exa Search',
    id: 'search',
    provider: 'exa',
    worldBenefit: 'Free trial',
  },
  {
    name: 'Manus Research',
    id: 'research',
    provider: 'manus',
    worldBenefit: 'Free trial',
  },
  {
    name: 'StableTravel Google Flights Search',
    id: 'google_flights_search',
    provider: 'stabletravel',
  },
  {
    name: 'AgentMail Send Message',
    id: 'send_message',
    provider: 'agentmail',
  },
  {name: 'Parallel Extract', id: 'extract', provider: 'parallel'},
  {name: 'Parallel Task', id: 'task', provider: 'parallel'},
  {name: 'StableTravel Locations', id: 'locations', provider: 'stabletravel'},
  {
    name: 'StableTravel Hotels List',
    id: 'hotels_list',
    provider: 'stabletravel',
  },
  {
    name: 'StableTravel Hotels Search',
    id: 'hotels_search',
    provider: 'stabletravel',
  },
  {
    name: 'StableTravel FlightAware Flights',
    id: 'flightaware_flights',
    provider: 'stabletravel',
  },
  {
    name: 'AgentMail Reply To Message',
    id: 'reply_to_message',
    provider: 'agentmail',
  },
  {name: 'Parallel Search', id: 'search', provider: 'parallel'},
  {
    name: 'AgentMail List Messages',
    id: 'list_messages',
    provider: 'agentmail',
  },
  {
    name: 'AgentMail Get Message',
    id: 'get_message',
    provider: 'agentmail',
  },
  {
    name: 'AgentMail Create Inbox',
    id: 'create_inbox',
    provider: 'agentmail',
  },
];

const WorldIdMiniIcon = ({size = 22}: {size?: number}) => (
  <Img
    src={staticFile('world-id-icon.svg')}
    style={{
      width: size,
      height: size,
      objectFit: 'contain',
      flex: '0 0 auto',
    }}
  />
);

const EndpointProviderMark = ({
  provider,
}: {
  provider: EndpointInventoryRow['provider'];
}) => {
  if (provider === 'parallel') {
    return (
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: 12,
          background: colors.panel,
          border: `1.25px solid ${colors.line}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 7px 16px rgba(5,5,5,0.04)',
          flex: '0 0 auto',
        }}
      >
        <div
          style={{
            width: 25,
            height: 25,
            borderRadius: 999,
            background:
              'repeating-linear-gradient(90deg, #1c1c1c 0 3px, transparent 3px 6px)',
            border: `1px solid ${colors.line}`,
          }}
        />
      </div>
    );
  }

  return <LogoMark logo={provider} size={46} shape="square" style={{boxShadow: '0 7px 16px rgba(5,5,5,0.04)'}} />;
};

const EndpointBenefit = ({
  benefit,
}: {
  benefit?: EndpointInventoryRow['worldBenefit'];
}) => {
  const supported = Boolean(benefit);
  return (
    <div
      style={{
        justifySelf: 'start',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        borderRadius: 999,
        border: `1.25px solid ${supported ? '#bfd0ff' : colors.line}`,
        background: supported ? '#f3f6ff' : '#f4f2ee',
        color: supported ? colors.ink : colors.muted,
        padding: '8px 13px',
        fontSize: supported ? 18 : 17,
        lineHeight: 1,
        fontWeight: 840,
        whiteSpace: 'nowrap',
      }}
    >
      {supported ? <WorldIdMiniIcon size={21} /> : null}
      {supported ? `World ID · ${benefit}` : 'No AgentKit support'}
    </div>
  );
};

const EndpointInventoryCard = ({
  row,
  index,
}: {
  row: EndpointInventoryRow;
  index: number;
}) => {
  const frame = useCurrentFrame();
  const supported = Boolean(row.worldBenefit);

  return (
    <div
      style={{
        ...slideUp(frame, 46 + index * 3, 14),
        minHeight: 64,
        borderRadius: 18,
        border: `1.25px solid ${supported ? '#c3d1ff' : colors.line}`,
        background: supported ? '#fbfcff' : colors.panelLight,
        display: 'grid',
        gridTemplateColumns: '48px minmax(0, 1fr) 202px 72px',
        alignItems: 'center',
        gap: 12,
        padding: '8px 12px',
        boxShadow: supported ? '0 12px 26px rgba(47,99,255,0.08)' : 'none',
        overflow: 'hidden',
      }}
    >
      <EndpointProviderMark provider={row.provider} />
      <div style={{minWidth: 0}}>
        <div
          style={{
            fontSize: row.name.length > 31 ? 19 : 22,
            lineHeight: 1.02,
            fontWeight: 900,
            fontFamily: headlineFamily,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {row.name}
        </div>
        <div
          style={{
            marginTop: 5,
            color: colors.muted,
            fontSize: 16,
            fontWeight: 720,
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {row.id}
        </div>
      </div>
      <EndpointBenefit benefit={row.worldBenefit} />
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 9,
          justifySelf: 'end',
          color: colors.ink,
          fontSize: 17,
          fontWeight: 760,
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: 999,
            background: '#407656',
          }}
        />
        Live
      </div>
    </div>
  );
};

const EndpointsScene = () => {
  const frame = useCurrentFrame();
  const left = endpointInventory.slice(0, 8);
  const right = endpointInventory.slice(8);
  const supportedCount = endpointInventory.filter((row) => row.worldBenefit).length;

  return (
    <Shell duration={ENDPOINTS_SCENE_FRAMES}>
      <div style={{position: 'absolute', left: 110, top: 118, width: 1040}}>
        <div style={slideUp(frame, 0)}>
          <Kicker>Endpoint inventory</Kicker>
        </div>
        <div style={{...slideUp(frame, 10), marginTop: 18}}>
          <Title size={68} width={1080}>
            One API surface, every live endpoint listed.
          </Title>
        </div>
        <div
          style={{
            ...slideUp(frame, 30),
            marginTop: 22,
            color: colors.muted,
            fontSize: 28,
            lineHeight: 1.22,
            fontWeight: 650,
            maxWidth: 1180,
          }}
        >
            World ID-supported endpoints are marked in blue, so Hermes can
            prefer human-verified benefit paths before falling back to paid
            routes.
        </div>
      </div>

      <div
        style={{
          ...slideUp(frame, 20, 18),
          position: 'absolute',
          right: 110,
          top: 134,
          display: 'flex',
          gap: 14,
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
          width: 500,
        }}
      >
        <Pill color={colors.blue}>{supportedCount} World ID supported</Pill>
        <Pill color={colors.green}>{endpointInventory.length} live endpoints</Pill>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 110,
          right: 110,
          top: 408,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
        }}
      >
        {[left, right].map((rows, columnIndex) => (
          <div key={columnIndex} style={{display: 'grid', gap: 10}}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '48px minmax(0, 1fr) 202px 72px',
                gap: 12,
                padding: '0 14px 2px',
                color: colors.softMuted,
                fontSize: 17,
                fontWeight: 820,
                textTransform: 'uppercase',
                letterSpacing: 3,
              }}
            >
              <div />
              <div>Endpoint</div>
              <div>World ID</div>
              <div style={{textAlign: 'right'}}>Status</div>
            </div>
            {rows.map((row, rowIndex) => (
              <EndpointInventoryCard
                key={`${row.provider}-${row.name}-${row.id}`}
                row={row}
                index={columnIndex * 8 + rowIndex}
              />
            ))}
          </div>
        ))}
      </div>
    </Shell>
  );
};

const ToolRouterFeatureCard = ({
  title,
  body,
  children,
  delay,
}: {
  title: string;
  body: string;
  children: React.ReactNode;
  delay: number;
}) => {
  const frame = useCurrentFrame();
  return (
    <Panel
      style={{
        ...slideUp(frame, delay, 24),
        minHeight: 444,
        padding: 26,
      }}
    >
      {children}
      <div
        style={{
          marginTop: 24,
          fontSize: 30,
          fontWeight: 930,
          fontFamily: headlineFamily,
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 12,
          color: colors.muted,
          fontSize: 22,
          lineHeight: 1.28,
          fontWeight: 650,
        }}
      >
        {body}
      </div>
    </Panel>
  );
};

const RouterScene = () => {
  const frame = useCurrentFrame();

  return (
    <Shell duration={MAIN_SCENE_FRAMES}>
      <div style={{position: 'absolute', left: 110, top: 104, width: 1320}}>
        <div style={{...slideUp(frame, 10), marginTop: 24}}>
          <Title size={94} width={1040}>
            Tools your agent can actually trust.
          </Title>
        </div>
        <div style={{...slideUp(frame, 32), marginTop: 24}}>
          <Body width={1320}>
            ToolRouter is an MCP server your agent connects to once. Every
            endpoint behind it is verified, paid through AgentKit or x402, and
            traced end-to-end, so when the model calls a tool, you know it
            works before you spend a cent.
          </Body>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 110,
          right: 110,
          bottom: 58,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 26,
        }}
      >
        <ToolRouterFeatureCard
          title="Simplified billing"
          body="One API key and one credit balance for every tool, with provider payments handled behind the scenes."
          delay={56}
        >
          <BillingDiagram />
        </ToolRouterFeatureCard>
        <ToolRouterFeatureCard
          title="Higher availability"
          body="Live status and traces help agents choose a healthy endpoint before they spend."
          delay={66}
        >
          <AvailabilityDiagram />
        </ToolRouterFeatureCard>
        <ToolRouterFeatureCard
          title="Human boosts"
          body="Verified AgentKit accounts can unlock free trials, discounts, or access paths."
          delay={76}
        >
          <HumanBoostsDiagram />
        </ToolRouterFeatureCard>
        <ToolRouterFeatureCard
          title="Verified reliability"
          body="Paid paths are checked hourly. AgentKit boosts are checked every 12 hours."
          delay={86}
        >
          <ReliabilityDiagram />
        </ToolRouterFeatureCard>
      </div>
    </Shell>
  );
};

const ProofScene = () => {
  const frame = useCurrentFrame();
  const rows = [
    ['paid paths', 'checked hourly', colors.green],
    ['AgentKit boosts', 'checked every 12h', colors.blue],
    ['payment mode', 'agentkit_first', colors.amber],
    ['fallback gate', 'x402_only smoke', colors.coral],
  ] as const;

  return (
    <Shell duration={MAIN_SCENE_FRAMES}>
      <div style={{position: 'absolute', left: 110, top: 146}}>
        <div style={slideUp(frame, 0)}>
          <Kicker>Reliability is a product surface</Kicker>
        </div>
        <div style={{...slideUp(frame, 10), marginTop: 18}}>
          <Title size={86} width={780}>
            The agent sees a tool market with receipts.
          </Title>
        </div>
      </div>

      <Panel
        style={{
          position: 'absolute',
          left: 112,
          top: 504,
          width: 630,
          height: 430,
          padding: 38,
          borderColor: colors.green,
        }}
      >
        <div style={{fontSize: 112, fontWeight: 950, lineHeight: 0.9}}>15/16</div>
        <div style={{fontSize: 34, fontWeight: 900, marginTop: 20}}>
          operational right now
        </div>
        <div
          style={{
            color: colors.muted,
            fontSize: 25,
            fontWeight: 720,
            lineHeight: 1.3,
            marginTop: 18,
          }}
        >
          Live endpoint status lets Hermes pick healthy routes before spending.
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: 10,
            marginTop: 34,
          }}
        >
          {Array.from({length: 16}).map((_, index) => (
            <div
              key={index}
              style={{
                opacity: clamp(frame, [40 + index * 2, 70 + index * 2], [0.15, 1]),
                transform: `scaleY(${clamp(frame, [40 + index * 2, 70 + index * 2], [0.4, 1])})`,
                height: 22,
                borderRadius: 999,
                background: index === 15 ? colors.line : colors.green,
              }}
            />
          ))}
        </div>
      </Panel>

      <div
        style={{
          position: 'absolute',
          left: 860,
          top: 354,
          display: 'grid',
          gap: 20,
          width: 890,
        }}
      >
        {rows.map(([label, value, color], index) => (
          <Panel
            key={label}
            style={{
              ...slideUp(frame, 38 + index * 10, 26),
              padding: '25px 30px',
              display: 'grid',
              gridTemplateColumns: '300px 1fr 34px',
              alignItems: 'center',
              minHeight: 94,
            }}
          >
            <div
              style={{
                fontSize: 30,
                fontWeight: 940,
                fontFamily: headlineFamily,
              }}
            >
              {label}
            </div>
            <div style={{fontSize: 30, color: colors.muted, fontWeight: 800}}>
              {value}
            </div>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 999,
                background: color,
              }}
            />
          </Panel>
        ))}
        <Panel
          style={{
            ...slideUp(frame, 92, 26),
            marginTop: 12,
            padding: 28,
            borderColor: colors.ink,
            background: colors.dark,
            color: colors.paper,
          }}
        >
          <div style={{fontSize: 18, color: '#b8c2d6', fontWeight: 850}}>
            trace
          </div>
          <div style={{fontSize: 31, fontWeight: 900, marginTop: 8}}>
            request_id: tr_req_6f39a2
          </div>
        </Panel>
      </div>
    </Shell>
  );
};

const WorkflowScene = () => {
  const frame = useCurrentFrame();
  const steps = [
    ['list categories', 'ToolRouter recommends search, research, browser use'],
    ['call endpoint', 'Hermes sends typed input with maxUsd cap'],
    ['AgentKit first', 'benefit path unlocks access when available'],
    ['x402 fallback', 'paid path remains explicit and traceable'],
  ] as const;

  return (
    <Shell duration={MAIN_SCENE_FRAMES}>
      <div style={{position: 'absolute', left: 108, top: 128}}>
        <div style={slideUp(frame, 0)}>
          <Kicker>A Hermes task, end to end</Kicker>
        </div>
        <div style={{...slideUp(frame, 10), marginTop: 18}}>
          <Title size={82} width={1180}>
            One prompt can safely cross many providers.
          </Title>
        </div>
      </div>

      <Panel
        style={{
          position: 'absolute',
          left: 110,
          top: 428,
          width: 830,
          height: 430,
          padding: 32,
          background: colors.dark,
          color: colors.paper,
          borderColor: colors.dark,
        }}
      >
        <div style={{fontSize: 18, color: '#aab6cb', fontWeight: 850}}>
          hermes
        </div>
        <div
          style={{
            marginTop: 24,
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: 28,
            lineHeight: 1.32,
            fontWeight: 760,
          }}
        >
          <span style={{color: colors.green}}>{'>'}</span> Use ToolRouter to
          research a launch partner, browse their docs, and draft outreach.
        </div>
        <div
          style={{
            marginTop: 36,
            display: 'grid',
            gap: 14,
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: 20,
            color: '#d9e2f3',
            fontWeight: 700,
          }}
        >
          {[
            'toolrouter_list_categories()',
            'toolrouter_call_endpoint(endpoint_id, input, maxUsd)',
            'return summary + request_id',
          ].map((line, index) => (
            <div key={line} style={slideUp(frame, 50 + index * 16, 20)}>
              {line}
            </div>
          ))}
        </div>
      </Panel>

      <div
        style={{
          position: 'absolute',
          right: 110,
          top: 392,
          width: 760,
          display: 'grid',
          gap: 22,
        }}
      >
        {steps.map(([label, detail], index) => (
          <Panel
            key={label}
            style={{
              ...slideUp(frame, 34 + index * 14, 28),
              padding: '25px 30px',
              display: 'grid',
              gridTemplateColumns: '58px 1fr',
              gap: 22,
              alignItems: 'start',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 999,
                background: [colors.blue, colors.violet, colors.green, colors.amber][
                  index
                ],
                color: colors.paper,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 25,
                fontWeight: 950,
              }}
            >
              {index + 1}
            </div>
            <div>
              <div
                style={{
                  fontSize: 31,
                  fontWeight: 950,
                  fontFamily: headlineFamily,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  color: colors.muted,
                  fontSize: 24,
                  fontWeight: 740,
                  lineHeight: 1.28,
                  marginTop: 7,
                }}
              >
                {detail}
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </Shell>
  );
};

const QuickstartScene = () => {
  const frame = useCurrentFrame();
  const steps = [
    [
      'Verify World ID',
      'Unlock AgentKit benefits for delegated tool calls.',
      'Verify',
      colors.ink,
    ],
    [
      'Generate an API key',
      'Create a fresh setup key and use it as TOOLROUTER_API_KEY.',
      'Create key',
      colors.blue,
    ],
    [
      'Set up MCP',
      'Add ToolRouter to Claude Code, Codex, Cursor, VS Code, Hermes, or OpenClaw.',
      'Copy config',
      colors.green,
    ],
    [
      'Run the first prompt',
      'List categories, use the recommended endpoint, and return the request id.',
      'Copy prompt',
      colors.amber,
    ],
  ] as const;

  return (
    <Shell duration={QUICKSTART_SCENE_FRAMES}>
      <div style={{position: 'absolute', left: 110, top: 142, width: 640}}>
        <div style={slideUp(frame, 0)}>
          <Kicker>Quickstart</Kicker>
        </div>
        <div style={{...slideUp(frame, 10), marginTop: 22}}>
          <Title size={96} width={650}>
            Four moves to get an agent using ToolRouter.
          </Title>
        </div>
        <div style={{...slideUp(frame, 32), marginTop: 32}}>
          <Body width={610}>
            Verify World ID, generate a key, connect your MCP client, then run a
            discovery-first prompt.
          </Body>
        </div>

        <Panel
          style={{
            ...slideUp(frame, 58, 28),
            marginTop: 44,
            padding: 20,
            background: colors.dark,
            color: colors.paper,
            height: 132,
            overflow: 'hidden',
          }}
        >
          <div style={{fontSize: 17, color: '#b7b2aa', fontWeight: 840}}>
            mcp setup
          </div>
          <div
            style={{
              marginTop: 12,
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              fontSize: 18,
              lineHeight: 1.22,
              fontWeight: 720,
              color: '#f2efe8',
            }}
          >
            <div>TOOLROUTER_API_URL=https://toolrouter.world</div>
            <div>TOOLROUTER_API_KEY=tr_...</div>
            <div>npx -y @worldcoin/toolrouter</div>
          </div>
        </Panel>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 820,
          top: 126,
          width: 970,
          display: 'grid',
          gap: 18,
        }}
      >
        {steps.map(([title, detail, action, color], index) => (
          <Panel
            key={title}
            style={{
              ...slideUp(frame, 18 + index * 10, 22),
              minHeight: 156,
              padding: '25px 28px',
              display: 'grid',
              gridTemplateColumns: '78px 1fr 190px',
              gap: 24,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 62,
                height: 62,
                borderRadius: 999,
                background: index === 0 ? colors.ink : '#f1eee8',
                color: index === 0 ? colors.paper : colors.ink,
                border: `1.25px solid ${colors.line}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 27,
                fontWeight: 920,
              }}
            >
              {index + 1}
            </div>
            <div>
              <div
                style={{
                  color: colors.softMuted,
                  fontSize: 17,
                  fontWeight: 860,
                  textTransform: 'uppercase',
                  letterSpacing: 3,
                }}
              >
                step {index + 1}
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 34,
                  fontWeight: 940,
                  fontFamily: headlineFamily,
                }}
              >
                {title}
              </div>
              <div
                style={{
                  marginTop: 8,
                  color: colors.muted,
                  fontSize: 21,
                  lineHeight: 1.25,
                  fontWeight: 650,
                }}
              >
                {detail}
              </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Pill color={index === 0 ? colors.ink : color}>{action}</Pill>
            </div>
          </Panel>
        ))}
      </div>

      <Panel
        style={{
          ...slideUp(frame, 82, 22),
          position: 'absolute',
          left: 110,
          top: 914,
          width: 640,
          height: 132,
          padding: '16px 22px',
          overflow: 'hidden',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <Pill color={colors.ink}>First query</Pill>
          <div
            style={{
              color: colors.softMuted,
              fontSize: 16,
              fontWeight: 860,
              textTransform: 'uppercase',
              letterSpacing: 3,
            }}
          >
            after MCP loads
          </div>
        </div>
        <div
          style={{
            marginTop: 10,
            color: colors.muted,
            fontSize: 16,
            lineHeight: 1.18,
            fontWeight: 700,
          }}
        >
          List categories, call the recommended search endpoint, and include the
          ToolRouter request id.
        </div>
      </Panel>
    </Shell>
  );
};

const OutroScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const glow = spring({
    frame: frame / MOTION_SLOWDOWN,
    fps,
    config: {damping: 16, stiffness: 70},
  });

  return (
    <Shell duration={OUTRO_SCENE_FRAMES}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          padding: 120,
        }}
      >
        <div
          style={{
            ...slideUp(frame, 0, 34),
            fontSize: 112,
            fontWeight: 950,
            lineHeight: 1,
            maxWidth: 1450,
            fontFamily: headlineFamily,
          }}
        >
          AgentKit becomes a capability layer inside Hermes.
        </div>
        <div
          style={{
            ...slideUp(frame, 16, 28),
            marginTop: 36,
            color: colors.muted,
            fontSize: 42,
            fontWeight: 760,
            lineHeight: 1.22,
            maxWidth: 1200,
          }}
        >
          ToolRouter makes it operable: discover, verify, pay, trace.
        </div>
        <div
          style={{
            ...slideUp(frame, 34, 22),
            marginTop: 54,
            transform: `scale(${1 + glow * 0.02})`,
          }}
        >
          <Pill color={colors.blue}>Hermes connects once</Pill>
        </div>
      </div>
    </Shell>
  );
};

const TryItScene = () => {
  const frame = useCurrentFrame();

  return (
    <Shell duration={TRY_IT_SCENE_FRAMES}>
      <div
        style={{
          position: 'absolute',
          left: 110,
          top: 156,
          width: 760,
        }}
      >
        <div style={slideUp(frame, 0)}>
          <Kicker>ToolRouter</Kicker>
        </div>
        <div style={{...slideUp(frame, 10), marginTop: 24}}>
          <Title size={118} width={760}>
            Try it out yourself.
          </Title>
        </div>
        <div style={{...slideUp(frame, 30), marginTop: 34}}>
          <Body width={680}>
            Scan the code to open ToolRouter and connect trusted tools through
            one MCP server.
          </Body>
        </div>
        <div
          style={{
            ...slideUp(frame, 54, 24),
            marginTop: 44,
            display: 'flex',
            gap: 14,
            flexWrap: 'wrap',
          }}
        >
          <Pill color={colors.ink}>toolrouter.world</Pill>
          <Pill color={colors.green}>MCP ready</Pill>
        </div>
      </div>

      <Panel
        style={{
          position: 'absolute',
          right: 132,
          top: 154,
          width: 680,
          height: 680,
          padding: 34,
          background: colors.panelLight,
          borderColor: colors.ink,
          ...slideUp(frame, 18, 36),
        }}
      >
        <Img
          src={staticFile('toolrouter-qr.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            imageRendering: 'crisp-edges',
          }}
        />
      </Panel>

      <div
        style={{
          ...slideUp(frame, 70, 20),
          position: 'absolute',
          right: 132,
          top: 866,
          width: 680,
          color: colors.muted,
          fontSize: 22,
          lineHeight: 1.25,
          fontWeight: 740,
          textAlign: 'center',
        }}
      >
        AgentKit-first routes, x402 fallback, health checks, and traces in one
        place.
      </div>
    </Shell>
  );
};

const QAScene = () => {
  const frame = useCurrentFrame();

  return (
    <Shell duration={QA_SCENE_FRAMES}>
      <div
        style={{
          ...slideUp(frame, 4, 28),
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 110px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: headlineFamily,
            fontSize: 210,
            lineHeight: 0.9,
            fontWeight: 950,
            letterSpacing: 0,
          }}
        >
          Q&amp;A
        </div>
      </div>
    </Shell>
  );
};

export const HermesAgentKitToolRouter = () => {
  const introStart = 0;
  const worldIdStart = introStart + MAIN_SCENE_FRAMES;
  const x402Start = worldIdStart + WORLD_ID_SCENE_FRAMES;
  const agentKitArchStart = x402Start + X402_SCENE_FRAMES;
  const agentKitUseCasesStart = agentKitArchStart + AGENTKIT_ARCH_SCENE_FRAMES;
  const problemStart = agentKitUseCasesStart + AGENTKIT_USE_CASE_SCENE_FRAMES;
  const routerStart = problemStart + MAIN_SCENE_FRAMES;
  const endpointsStart = routerStart + MAIN_SCENE_FRAMES;
  const proofStart = endpointsStart + ENDPOINTS_SCENE_FRAMES;
  const workflowStart = proofStart + MAIN_SCENE_FRAMES;
  const quickstartStart = workflowStart + MAIN_SCENE_FRAMES;
  const outroStart = quickstartStart + QUICKSTART_SCENE_FRAMES;
  const tryItStart = outroStart + OUTRO_SCENE_FRAMES;
  const qaStart = tryItStart + TRY_IT_SCENE_FRAMES;

  return (
    <AbsoluteFill style={{background: colors.paper}}>
      <Sequence from={introStart} durationInFrames={MAIN_SCENE_FRAMES} premountFor={30}>
        <IntroScene />
      </Sequence>
      <Sequence
        from={worldIdStart}
        durationInFrames={WORLD_ID_SCENE_FRAMES}
        premountFor={30}
      >
        <WorldIdScene />
      </Sequence>
      <Sequence
        from={x402Start}
        durationInFrames={X402_SCENE_FRAMES}
        premountFor={30}
      >
        <X402ExplainerScene />
      </Sequence>
      <Sequence
        from={agentKitArchStart}
        durationInFrames={AGENTKIT_ARCH_SCENE_FRAMES}
        premountFor={30}
      >
        <AgentKitArchitectureScene />
      </Sequence>
      <Sequence
        from={agentKitUseCasesStart}
        durationInFrames={AGENTKIT_USE_CASE_SCENE_FRAMES}
        premountFor={30}
      >
        <AgentKitUseCasesScene />
      </Sequence>
      <Sequence
        from={problemStart}
        durationInFrames={MAIN_SCENE_FRAMES}
        premountFor={30}
      >
        <ProblemScene />
      </Sequence>
      <Sequence
        from={routerStart}
        durationInFrames={MAIN_SCENE_FRAMES}
        premountFor={30}
      >
        <RouterScene />
      </Sequence>
      <Sequence
        from={endpointsStart}
        durationInFrames={ENDPOINTS_SCENE_FRAMES}
        premountFor={30}
      >
        <EndpointsScene />
      </Sequence>
      <Sequence
        from={proofStart}
        durationInFrames={MAIN_SCENE_FRAMES}
        premountFor={30}
      >
        <ProofScene />
      </Sequence>
      <Sequence
        from={workflowStart}
        durationInFrames={MAIN_SCENE_FRAMES}
        premountFor={30}
      >
        <WorkflowScene />
      </Sequence>
      <Sequence
        from={quickstartStart}
        durationInFrames={QUICKSTART_SCENE_FRAMES}
        premountFor={30}
      >
        <QuickstartScene />
      </Sequence>
      <Sequence
        from={outroStart}
        durationInFrames={OUTRO_SCENE_FRAMES}
        premountFor={30}
      >
        <OutroScene />
      </Sequence>
      <Sequence
        from={tryItStart}
        durationInFrames={TRY_IT_SCENE_FRAMES}
        premountFor={30}
      >
        <TryItScene />
      </Sequence>
      <Sequence from={qaStart} durationInFrames={QA_SCENE_FRAMES} premountFor={30}>
        <QAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
