import { createManyAgendas } from './../services/agenda';
import { useMutation, useQuery } from 'react-query';
import { UpdateAgendaPayload } from './../models';
import {
  createAgenda,
  deleteAgenda,
  getAgendas,
  updateAgenda,
} from './../services';

export const useAgendaList = (params: { page: number; perPage: number }) => {
  const { page = 1, perPage = 10 } = params;
  return useQuery(
    ['agendas', { page, perPage }],
    () => getAgendas({ page, perPage }),
    { keepPreviousData: true },
  );
};

export const useCreateAgenda = () => useMutation(createAgenda);
export const useCreateManyAgendas = () => useMutation(createManyAgendas);
export const useUpdateAgenda = () =>
  useMutation(({ id, payload }: { id: string; payload: UpdateAgendaPayload }) =>
    updateAgenda(id, payload),
  );
export const useDeleteAgenda = () => useMutation(deleteAgenda);
