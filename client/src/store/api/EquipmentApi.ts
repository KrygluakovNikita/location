import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from '.';
import { GameDto } from '../reducers/UserSlice';

export interface EquipmentDto {
  title: string;
  equipmentId: string;
  description: string;
  count: number;
  price: number;
  descriptionAboutStaff: string;
  photo?: string;
}

export interface IEquipment {
  title: string;
  description: string;
  count?: number;
  price: number;
  descriptionAboutStaff: string;
}
export interface IUpdatePayByGameId {
  gameId: string;
  isPayed: boolean;
}
export interface IGetStatGame {
  startDate: Date;
  endDate: Date;
}
export interface IGetStatGameResponse {
  games: GameDto[];
  count: number;
}

export interface IGetEquipmentByDate {
  date: Date;
}

export interface IEquipmentUploadImage {
  photo: FormData;
  equipmentId: string;
}
export const equipmentApi = createApi({
  reducerPath: 'equipmentApi',
  tagTypes: ['Equipments'],
  baseQuery: customFetchBase,
  endpoints: build => ({
    addEquipment: build.mutation<EquipmentDto, IEquipment>({
      query: body => ({ url: `/equipment`, method: 'POST', body }),
      invalidatesTags: result =>
        result
          ? [
              { type: 'Equipments' as const, equipmentId: result.equipmentId },
              { type: 'Equipments', id: 'LIST' },
            ]
          : [{ type: 'Equipments', id: 'LIST' }],
    }),
    changeEquipment: build.mutation<EquipmentDto, EquipmentDto>({
      query: body => ({ url: `/equipment/${body.equipmentId}`, method: 'PUT', body }),
      invalidatesTags: result =>
        result
          ? [
              { type: 'Equipments' as const, equipmentId: result.equipmentId },
              { type: 'Equipments', id: 'LIST' },
            ]
          : [{ type: 'Equipments', id: 'LIST' }],
    }),
    getByDate: build.mutation<EquipmentDto[], IGetEquipmentByDate>({
      query: (body: IGetEquipmentByDate) => ({ url: `/equipment/by-date`, method: 'POST', body }),
    }),
    getEquipments: build.query<EquipmentDto[], void>({
      query: () => ({ url: `/equipment/`, method: 'GET' }),
      providesTags: ['Equipments'],
    }),
    getEquipmentById: build.query<EquipmentDto, string>({
      query: (equipmentId: string) => ({ url: `/equipment/${equipmentId}`, method: 'GET' }),
      providesTags: ['Equipments'],
    }),
    deleteById: build.mutation<EquipmentDto, string>({
      query: (equipmentId: string) => ({ url: `/equipment/${equipmentId}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Equipments' }],
    }),
    UpdateEquipmentPhoto: build.mutation({
      query: (body: IEquipmentUploadImage) => ({
        url: `/equipment/upload-photo/${body.equipmentId}`,
        method: 'POST',
        body: body.photo,
      }),
    }),
  }),
});

export const {
  useAddEquipmentMutation,
  useDeleteByIdMutation,
  useGetByDateMutation,
  useGetEquipmentsQuery,
  useGetEquipmentByIdQuery,
  useChangeEquipmentMutation,
  useUpdateEquipmentPhotoMutation,
} = equipmentApi;
