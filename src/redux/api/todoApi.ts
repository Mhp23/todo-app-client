import {ApiResponse} from '@/core/types';
import {baseRTKQuery} from '../baseRTKQuery';
import {TodoSchema} from '@/schemas/todoSchema';
import {createApi} from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: baseRTKQuery,
  endpoints: builder => ({
    getAllTodos: builder.query<ApiResponse<TodoSchema[]>, void>({
      query: () => ({
        method: 'GET',
        url: '/todo/get-all',
      }),
    }),
    addTodo: builder.mutation<
      ApiResponse<TodoSchema>,
      Pick<TodoSchema, 'description'>
    >({
      query: todoInfo => ({
        method: 'POST',
        body: todoInfo,
        url: '/todo/add',
      }),
    }),
    updateTodo: builder.mutation<
      ApiResponse<TodoSchema>,
      Pick<TodoSchema, '_id' | 'description' | 'completed'>
    >({
      query: todoInfo => ({
        method: 'PUT',
        body: todoInfo,
        url: '/todo/update',
      }),
    }),
    deleteTodo: builder.mutation<
      Omit<ApiResponse, 'data'>,
      Pick<TodoSchema, '_id' | 'accountId'>
    >({
      query: todoInfo => ({
        method: 'DELETE',
        body: todoInfo,
        url: '/todo/delete',
      }),
    }),
  }),
});

export const {
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useLazyGetAllTodosQuery,
} = todoApi;
