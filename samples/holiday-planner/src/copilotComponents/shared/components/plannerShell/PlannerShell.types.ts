import type { ICopilotComponentHostContext } from '@microsoft/sp-copilot-component';

export interface IPlannerShellProps {
  readonly hostContext: ICopilotComponentHostContext;
  readonly targetDocument?: Document;
  readonly children: React.ReactNode;
}