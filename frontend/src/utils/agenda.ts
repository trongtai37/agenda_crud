import { Agenda, AgendaFormValues, AgendaStatus } from '../models';
import moment from 'moment';

export const getStatusLabel = (status: AgendaStatus) => {
  switch (status) {
    case AgendaStatus.IN_COMING:
      return 'In Coming';
    case AgendaStatus.IN_PROGRESS:
      return 'In Progress';
    case AgendaStatus.ARCHIVED:
      return 'Archived';
    default:
      return '';
  }
};

export const modelToForm = (agenda: Agenda): AgendaFormValues => {
  return {
    ...agenda,
    startDate: moment(agenda.startTime),
    endDate: moment(agenda.endTime),
    startTime: moment(agenda.startTime),
    endTime: moment(agenda.endTime),
  };
};

export const formToModel = (formValues: AgendaFormValues): Agenda => {
  const { date: sd, months: sm, years: sy } = formValues.startDate.toObject();
  const { date: ed, months: em, years: ey } = formValues.endDate.toObject();

  return {
    id: formValues.id,
    title: formValues.title,
    description: formValues.description,
    status: formValues.status,
    startTime: moment(formValues.startTime)
      .set({ date: sd, months: sm, years: sy })
      .toDate()
      .toISOString(),
    endTime: moment(formValues.endTime)
      .set({ date: ed, months: em, years: ey })
      .toDate()
      .toISOString(),
  };
};
