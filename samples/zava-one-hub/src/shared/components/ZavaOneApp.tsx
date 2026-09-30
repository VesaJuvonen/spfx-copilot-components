import * as React from 'react';
import type { IZavaExperienceProps } from '../models/zavaOne';
import { ZavaThemeProvider } from '../theme/ZavaThemeProvider';
import { CatalogCapabilityExperience } from './CatalogCapabilityExperience';
import {
  CampusMenuExperience,
  CompanyEventsExperience,
  CompanyStockExperience,
  EmployeeSurveysExperience,
  GoalsScorecardsExperience,
  OfficeDetailsExperience,
  PeopleExperience,
  ProjectHealthExperience,
  SalesPerformanceExperience
} from './CompanyCapabilityExperiences';
import {
  AgendaExperience,
  GlossaryExperience,
  MyDayExperience,
  SecurityReportingExperience
} from './FocusedCapabilityExperiences';
import {
  ExpensesTravelExperience,
  ImportantMailExperience,
  PersonalLearningExperience,
  ShiftsExperience,
  TasksExperience,
  WorkFilesExperience
} from './PersonalDetailExperiences';
import {
  ApprovalsExperience,
  EquityExperience,
  ItHelpExperience,
  TimeOffExperience,
  WorkplaceSpaceExperience
} from './PersonalWorkflowExperiences';
import {
  CapabilityExplorerExperience,
  CompanyNewsExperience,
  RecognitionExperience,
  VacationApprovalsExperience,
  ZavaOneWorkspace
} from './ZavaOneExperiences';
import { ZavaErrorBoundary } from './ZavaErrorBoundary';

function HostSizeSync(props: Pick<IZavaExperienceProps, 'displayMode' | 'requestResize' | 'targetDocument'> & {
  onVisibleHeightChange: React.Dispatch<React.SetStateAction<number | undefined>>;
}): React.ReactElement | undefined {
  const visibilityProbeRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const view = props.targetDocument.defaultView;
    const body = props.targetDocument.body;
    if (!view || !body || !props.requestResize) return undefined;

    let animationFrame = 0;
    let trailingTimer = 0;
    const scheduleResize = (includeTrailing = true): void => {
      view.cancelAnimationFrame(animationFrame);
      view.clearTimeout(trailingTimer);
      animationFrame = view.requestAnimationFrame(() => {
        props.requestResize?.().catch(() => undefined);
        if (includeTrailing) trailingTimer = view.setTimeout(() => props.requestResize?.().catch(() => undefined), 240);
      });
    };
    if (props.displayMode === 'fullscreen') {
      const documentElement = props.targetDocument.documentElement;
      const previousBodyOverflow = body.style.overflow;
      const previousDocumentOverflow = documentElement.style.overflow;
      let previousViewportWidth = view.innerWidth;
      const visibilityObserver = visibilityProbeRef.current && view.IntersectionObserver
        ? new view.IntersectionObserver(([entry]) => {
          const visibleHeight = Math.floor(entry.intersectionRect.height);
          if (visibleHeight > 0) {
            props.onVisibleHeightChange(visibleHeight);
            props.requestResize?.(visibleHeight).catch(() => undefined);
          }
        }, { threshold: Array.from({ length: 101 }, (_, index) => index / 100) })
        : undefined;
      const handleViewportResize = (): void => {
        const viewportWidth = view.innerWidth;
        if (Math.abs(viewportWidth - previousViewportWidth) > 32) scheduleResize(false);
        previousViewportWidth = viewportWidth;
      };
      body.style.overflow = 'hidden';
      documentElement.style.overflow = 'hidden';
      if (visibilityObserver && visibilityProbeRef.current) visibilityObserver.observe(visibilityProbeRef.current);
      scheduleResize(false);
      view.addEventListener('resize', handleViewportResize);
      view.visualViewport?.addEventListener('resize', handleViewportResize);
      return () => {
        view.cancelAnimationFrame(animationFrame);
        view.clearTimeout(trailingTimer);
        visibilityObserver?.disconnect();
        body.style.overflow = previousBodyOverflow;
        documentElement.style.overflow = previousDocumentOverflow;
        view.removeEventListener('resize', handleViewportResize);
        view.visualViewport?.removeEventListener('resize', handleViewportResize);
      };
    }
    const resizeObserver = new view.ResizeObserver(() => scheduleResize());
    const mutationObserver = new view.MutationObserver(() => scheduleResize());
    resizeObserver.observe(body);
    mutationObserver.observe(body, { attributes: true, characterData: true, childList: true, subtree: true });
    scheduleResize();

    return () => {
      view.cancelAnimationFrame(animationFrame);
      view.clearTimeout(trailingTimer);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [props.displayMode, props.onVisibleHeightChange, props.requestResize, props.targetDocument]);

  return props.displayMode === 'fullscreen'
    ? <div ref={visibilityProbeRef} aria-hidden="true" style={{ position: 'fixed', inset: 0, height: '100dvh', pointerEvents: 'none', opacity: 0 }} />
    : undefined;
}

function FocusedExperience(props: IZavaExperienceProps): React.ReactElement {
  switch (props.intent) {
    case 'myDay':
      return <MyDayExperience {...props} />;
    case 'agenda':
      return <AgendaExperience {...props} />;
    case 'importantMail':
      return <ImportantMailExperience {...props} />;
    case 'tasks':
      return <TasksExperience {...props} />;
    case 'approvals':
      return <ApprovalsExperience {...props} />;
    case 'expensesTravel':
      return <ExpensesTravelExperience {...props} />;
    case 'timeOff':
      return <TimeOffExperience {...props} />;
    case 'equity':
      return <EquityExperience {...props} />;
    case 'workplaceSpace':
      return <WorkplaceSpaceExperience {...props} />;
    case 'itHelp':
      return <ItHelpExperience {...props} />;
    case 'shifts':
      return <ShiftsExperience {...props} />;
    case 'workFiles':
      return <WorkFilesExperience {...props} />;
    case 'companyEvents':
      return <CompanyEventsExperience {...props} />;
    case 'people':
      return <PeopleExperience {...props} />;
    case 'surveys':
      return <EmployeeSurveysExperience {...props} />;
    case 'campusMenu':
      return <CampusMenuExperience {...props} />;
    case 'projectHealth':
      return <ProjectHealthExperience {...props} />;
    case 'salesPerformance':
      return <SalesPerformanceExperience {...props} />;
    case 'goalsScorecards':
      return <GoalsScorecardsExperience {...props} />;
    case 'companyStock':
      return <CompanyStockExperience {...props} />;
    case 'officeDetails':
      return <OfficeDetailsExperience {...props} />;
    case 'glossary':
      return <GlossaryExperience {...props} />;
    case 'securityReporting':
      return <SecurityReportingExperience {...props} />;
    case 'companyNews':
      return <CompanyNewsExperience {...props} />;
    case 'learning':
      return <PersonalLearningExperience {...props} />;
    case 'recognition':
      return <RecognitionExperience {...props} />;
    case 'vacationApprovals':
      return <VacationApprovalsExperience {...props} />;
    case 'capabilities':
      return <CapabilityExplorerExperience {...props} />;
    case 'workspace':
      return <ZavaOneWorkspace {...props} />;
    default:
      return <CatalogCapabilityExperience {...props} />;
  }
}

export function ZavaOneApp(props: IZavaExperienceProps): React.ReactElement {
  const useWorkspace = props.surface === 'workspace' || props.displayMode === 'fullscreen';
  const resetKey = `${props.intent}|${props.surface}|${props.displayMode}|${props.workspaceMode}|${props.theme}`;
  const [visibleFullscreenHeight, setVisibleFullscreenHeight] = React.useState<number | undefined>();

  React.useEffect(() => {
    if (props.displayMode !== 'fullscreen') setVisibleFullscreenHeight(undefined);
  }, [props.displayMode]);

  return (
    <ZavaThemeProvider targetDocument={props.targetDocument} theme={props.theme}>
      <ZavaErrorBoundary resetKey={resetKey}>
        <HostSizeSync
          displayMode={props.displayMode}
          requestResize={props.requestResize}
          targetDocument={props.targetDocument}
          onVisibleHeightChange={setVisibleFullscreenHeight}
        />
        {useWorkspace
          ? <ZavaOneWorkspace {...props} surface="workspace" containerHeight={visibleFullscreenHeight} />
          : <FocusedExperience {...props} />}
      </ZavaErrorBoundary>
    </ZavaThemeProvider>
  );
}