import { StateCreator as IStateCreator } from 'zustand'
export type StateCreator<T> = IStateCreator<T, [], [], T>
