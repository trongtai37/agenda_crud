import {
  Agenda,
  CreateAgendaPayload,
  Pagination,
  UpdateAgendaPayload,
} from '../models';
import { API } from './axios';

export const getAgendas = async (params: {
  page?: number;
  perPage?: number;
}) => {
  const { page = 1, perPage = 10 } = params;
  const p = new URLSearchParams();
  p.append('page', String(page));
  p.append('perPage', String(perPage));

  const response = await API.get<{ data: Pagination<Agenda> }>(
    `/agenda?${p.toString()}`,
  );

  return response.data.data;
};

export const createAgenda = async (payload: CreateAgendaPayload) => {
  const response = await API.post<{ data: Agenda }>('/agenda', payload);
  return response.data.data;
};

export const updateAgenda = async (
  id: string,
  payload: UpdateAgendaPayload,
) => {
  const response = await API.patch<{ data: Agenda }>(`/agenda/${id}`, payload);
  return response.data.data;
};

export const deleteAgenda = async (id: string) => {
  const response = await API.delete(`/agenda/${id}`);
  return response.data;
};
