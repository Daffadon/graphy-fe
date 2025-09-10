import { useQuery, useInfiniteQuery, useMutation, type UseQueryOptions, type UseInfiniteQueryOptions, type InfiniteData, type UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type DeleteNote = {
  id: Scalars['ID']['input'];
};

export type Login = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNote: Scalars['Boolean']['output'];
  createUser: Scalars['Boolean']['output'];
  deleteNote: Scalars['Boolean']['output'];
  login: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};


export type MutationCreateNoteArgs = {
  input: NewNote;
};


export type MutationCreateUserArgs = {
  input: NewUser;
};


export type MutationDeleteNoteArgs = {
  input?: InputMaybe<DeleteNote>;
};


export type MutationLoginArgs = {
  input: Login;
};


export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};

export type NewNote = {
  description: Scalars['String']['input'];
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type NewUser = {
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Note = {
  __typename?: 'Note';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  note?: Maybe<Note>;
  notes: Array<Note>;
};


export type QueryNoteArgs = {
  id: Scalars['ID']['input'];
};

export type RefreshTokenInput = {
  token: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
};

export type NotesQueryVariables = Exact<{ [key: string]: never; }>;


export type NotesQuery = { __typename?: 'Query', notes: Array<{ __typename?: 'Note', id: string, title: string, description: string }> };

export type NoteQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type NoteQuery = { __typename?: 'Query', note?: { __typename?: 'Note', id: string, title: string, description: string, text: string } | null };

export type CreateNoteMutationVariables = Exact<{
  input: NewNote;
}>;


export type CreateNoteMutation = { __typename?: 'Mutation', createNote: boolean };

export type DeleteNoteMutationVariables = Exact<{
  input?: InputMaybe<DeleteNote>;
}>;


export type DeleteNoteMutation = { __typename?: 'Mutation', deleteNote: boolean };

export type CreateUserMutationVariables = Exact<{
  input: NewUser;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: boolean };

export type LoginMutationVariables = Exact<{
  input: Login;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };



export const NotesDocument = `
    query Notes {
  notes {
    id
    title
    description
  }
}
    `;

export const useNotesQuery = <
      TData = NotesQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: NotesQueryVariables,
      options?: Omit<UseQueryOptions<NotesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<NotesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<NotesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Notes'] : ['Notes', variables],
    queryFn: fetcher<NotesQuery, NotesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, NotesDocument, variables),
    ...options
  }
    )};

useNotesQuery.getKey = (variables?: NotesQueryVariables) => variables === undefined ? ['Notes'] : ['Notes', variables];

export const useInfiniteNotesQuery = <
      TData = InfiniteData<NotesQuery>,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: NotesQueryVariables,
      options: Omit<UseInfiniteQueryOptions<NotesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<NotesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<NotesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['Notes.infinite'] : ['Notes.infinite', variables],
      queryFn: (metaData) => fetcher<NotesQuery, NotesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, NotesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteNotesQuery.getKey = (variables?: NotesQueryVariables) => variables === undefined ? ['Notes.infinite'] : ['Notes.infinite', variables];


useNotesQuery.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables?: NotesQueryVariables) => fetcher<NotesQuery, NotesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, NotesDocument, variables);

export const NoteDocument = `
    query Note($id: ID!) {
  note(id: $id) {
    id
    title
    description
    text
  }
}
    `;

export const useNoteQuery = <
      TData = NoteQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: NoteQueryVariables,
      options?: Omit<UseQueryOptions<NoteQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<NoteQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<NoteQuery, TError, TData>(
      {
    queryKey: ['Note', variables],
    queryFn: fetcher<NoteQuery, NoteQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, NoteDocument, variables),
    ...options
  }
    )};

useNoteQuery.getKey = (variables: NoteQueryVariables) => ['Note', variables];

export const useInfiniteNoteQuery = <
      TData = InfiniteData<NoteQuery>,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: NoteQueryVariables,
      options: Omit<UseInfiniteQueryOptions<NoteQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<NoteQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<NoteQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Note.infinite', variables],
      queryFn: (metaData) => fetcher<NoteQuery, NoteQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, NoteDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteNoteQuery.getKey = (variables: NoteQueryVariables) => ['Note.infinite', variables];


useNoteQuery.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables: NoteQueryVariables) => fetcher<NoteQuery, NoteQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, NoteDocument, variables);

export const CreateNoteDocument = `
    mutation CreateNote($input: NewNote!) {
  createNote(input: $input)
}
    `;

export const useCreateNoteMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateNoteMutation, TError, CreateNoteMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateNoteMutation, TError, CreateNoteMutationVariables, TContext>(
      {
    mutationKey: ['CreateNote'],
    mutationFn: (variables?: CreateNoteMutationVariables) => fetcher<CreateNoteMutation, CreateNoteMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateNoteDocument, variables)(),
    ...options
  }
    )};


useCreateNoteMutation.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables: CreateNoteMutationVariables) => fetcher<CreateNoteMutation, CreateNoteMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateNoteDocument, variables);

export const DeleteNoteDocument = `
    mutation DeleteNote($input: DeleteNote) {
  deleteNote(input: $input)
}
    `;

export const useDeleteNoteMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<DeleteNoteMutation, TError, DeleteNoteMutationVariables, TContext>
    ) => {
    
    return useMutation<DeleteNoteMutation, TError, DeleteNoteMutationVariables, TContext>(
      {
    mutationKey: ['DeleteNote'],
    mutationFn: (variables?: DeleteNoteMutationVariables) => fetcher<DeleteNoteMutation, DeleteNoteMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeleteNoteDocument, variables)(),
    ...options
  }
    )};


useDeleteNoteMutation.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables?: DeleteNoteMutationVariables) => fetcher<DeleteNoteMutation, DeleteNoteMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeleteNoteDocument, variables);

export const CreateUserDocument = `
    mutation CreateUser($input: NewUser!) {
  createUser(input: $input)
}
    `;

export const useCreateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateUserMutation, TError, CreateUserMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateUserMutation, TError, CreateUserMutationVariables, TContext>(
      {
    mutationKey: ['CreateUser'],
    mutationFn: (variables?: CreateUserMutationVariables) => fetcher<CreateUserMutation, CreateUserMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateUserDocument, variables)(),
    ...options
  }
    )};


useCreateUserMutation.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables: CreateUserMutationVariables) => fetcher<CreateUserMutation, CreateUserMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateUserDocument, variables);

export const LoginDocument = `
    mutation Login($input: Login!) {
  login(input: $input)
}
    `;

export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>
    ) => {
    
    return useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      {
    mutationKey: ['Login'],
    mutationFn: (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, LoginDocument, variables)(),
    ...options
  }
    )};


useLoginMutation.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, LoginDocument, variables);
