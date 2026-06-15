# Agentic Apps for Real Humans - AgentKit

Remotion source for the talk **Agentic Apps for Real Humans - AgentKit**, by
`dcbuilder.eth`.

The video demonstrates how Hermes can use AgentKit through ToolRouter: one MCP
layer, World ID-backed proof of humanity, AgentKit-first execution, x402
fallback, spend caps, live health checks, and traceable request IDs.

## What is included

- Full Remotion source: `src/`, `public/`, `remotion.config.ts`, `tsconfig.json`
- Bun package metadata: `package.json`, `bun.lock`
- Finished static slide deck: `out/hermes-agentkit-toolrouter-static-slides.pptx`

The rendered MP4 is intentionally not committed. It can be regenerated from
source.

## Commands

```bash
bun install
bun run studio
bun run still
bun run render
```

Rendered video output:

```text
out/hermes-agentkit-toolrouter.mp4
```

Finished static deck:

```text
out/hermes-agentkit-toolrouter-static-slides.pptx
```

Main composition:

```text
HermesAgentKitToolRouter
```

## Timing

The current composition is 7,200 frames at 30fps, approximately 4 minutes.
Each scene holds on a settled state, and the final slide is a centered Q&A
screen.
