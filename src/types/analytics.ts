// Typed Analytics Events
export type AnalyticsEvent =
  | { name: 'page_view'; properties: { path: string } }
  | { name: 'book_discovery_call'; properties?: never }
  | { name: 'download_case_study'; properties: { slug: string } }
  | { name: 'calculate_roi'; properties?: { mode?: string } }
  | { name: 'view_service'; properties: { serviceId: string } }
  | { name: 'contact_form_submit'; properties: { interest: string } }
  | { name: 'architecture_engine_generate'; properties?: { domain?: string } }
  | { name: 'view_project'; properties: { projectId: string } }
  | { name: 'download_resume'; properties?: never };

export interface UserTraits {
  email?: string;
  name?: string;
  company?: string;
  role?: string;
  [key: string]: string | number | boolean | undefined;
}
