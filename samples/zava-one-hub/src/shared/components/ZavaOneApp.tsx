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

function HostSizeSync(props: Pick<IZavaExperienceProps, 'displayMode' | 'requestResize' | 'targetDocument'>): React.ReactElement | undefined {
  React.useEffect(() => {
    const view = props.targetDocument.defaultView;
    const body = props.targetDocument.body;
    if (!view || !body || !props.requestResize) return undefined;

    let animationFrame = 0;
    let trailingTimer = 0;
    const retryTimers: number[] = [];
    const scheduleResize = (): void => {
      view.cancelAnimationFrame(animationFrame);
      view.clearTimeout(trailingTimer);
      animationFrame = view.requestAnimationFrame(() => {
        props.requestResize?.().catch(() => undefined);
        trailingTimer = view.setTimeout(() => props.requestResize?.().catch(() => undefined), 240);
      });
    };
    if (props.displayMode === 'fullscreen') {
      scheduleResize();
      [120, 480, 1200].forEach((delay) => retryTimers.push(view.setTimeout(() => props.requestResize?.().catch(() => undefined), delay)));
      view.addEventListener('resize', scheduleResize);
      view.visualViewport?.addEventListener('resize', scheduleResize);
      return () => {
        view.cancelAnimationFrame(animationFrame);
        view.clearTimeout(trailingTimer);
        retryTimers.forEach((timer) => view.clearTimeout(timer));
        view.removeEventListener('resize', scheduleResize);
        view.visualViewport?.removeEventListener('resize', scheduleResize);
      };
    }
    const resizeObserver = new view.ResizeObserver(scheduleResize);
    const mutationObserver = new view.MutationObserver(scheduleResize);
    resizeObserver.observe(body);
    mutationObserver.observe(body, { attributes: true, characterData: true, childList: true, subtree: true });
    scheduleResize();

    return () => {
      view.cancelAnimationFrame(animationFrame);
      view.clearTimeout(trailingTimer);
      retryTimers.forEach((timer) => view.clearTimeout(timer));
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [props.displayMode, props.requestResize, props.targetDocument]);

  return undefined;
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

  return (
    <ZavaThemeProvider targetDocument={props.targetDocument} theme={props.theme}>
      <ZavaErrorBoundary resetKey={resetKey}>
        <HostSizeSync displayMode={props.displayMode} requestResize={props.requestResize} targetDocument={props.targetDocument} />
        {useWorkspace ? <ZavaOneWorkspace {...props} surface="workspace" /> : <FocusedExperience {...props} />}
      </ZavaErrorBoundary>
    </ZavaThemeProvider>
  );
}