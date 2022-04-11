const initialState=[]
export const paginationData = (state=initialState,action) => {
  switch (action.type) {
			case "GET_PAGINATION":
				return [...action.payload]
			default:
				return state
		}
}