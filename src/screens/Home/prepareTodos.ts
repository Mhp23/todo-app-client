import {TodoSchema} from '@/schemas/todoSchema';

export const prepareTodos = (data: TodoSchema[]) => {
  return data.reduce(
    ({completedTodos, uncompletedTodos}, todo: TodoSchema) => {
      if (todo.completed) {
        completedTodos.push(todo);
      } else {
        uncompletedTodos.push(todo);
      }
      return {uncompletedTodos, completedTodos};
    },
    {
      completedTodos: [] as TodoSchema[],
      uncompletedTodos: [] as TodoSchema[],
    },
  );
};
