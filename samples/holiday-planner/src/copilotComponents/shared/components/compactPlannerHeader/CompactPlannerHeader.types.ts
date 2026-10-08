export interface ICompactPlannerHeaderProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly onExpand: () => Promise<void>;
}