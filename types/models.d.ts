/** TodoMVC model definitions **/

declare interface TodoItemData {
  id?: TodoItemId;
  text?: string;
  completed?: boolean;
}

declare type TodoItemId = number;

declare type TodoFilterType = 'SHOW_ALL' | 'SHOW_ACTIVE' | 'SHOW_COMPLETED';

declare enum TodoFilterTypeEnum{
  SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED
}

declare type TodoStoreState = TodoItemData[];
