export interface Agenda {
  id: string;
  title: string;
  status: AgendaStatus;
  description?: string;
  startTime: string;
  endTime: string;
}

export interface CreateAgendaPayload {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
}

export type UpdateAgendaPayload = Partial<CreateAgendaPayload>;

export enum AgendaStatus {
  IN_COMING = 'IN_COMING',
  IN_PROGRESS = 'IN_PROGRESS',
  ARCHIVED = 'ARCHIVED',
}

export type AgendaFormValues = Omit<Agenda, 'startTime' | 'endTime'> & {
  startTime: moment.Moment;
  endTime: moment.Moment;
  startDate: moment.Moment;
  endDate: moment.Moment;
};
