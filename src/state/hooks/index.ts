import { useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, AppStore, RootState } from '../store'

/* Use throughout your app instead of plain `useDispatch` and `useSelector`*/
// Call an action
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
// Get a value from the store (read-only)
export const useAppSelector = useSelector.withTypes<RootState>()
// Get the store (read-write). Only use for debugging or advanced use cases
export const useAppStore = useStore.withTypes<AppStore>()