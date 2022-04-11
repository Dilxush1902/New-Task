import axios from "axios";
const URL="https://6252ef5e7f7fa1b1ddeb8f61.mockapi.io/api/v2/"
const URL_ID="https://6252ef5e7f7fa1b1ddeb8f61.mockapi.io/api/v2/options/"
export const api =async () => {
  return await axios.get(URL+"users?page=2&limit=10")
}
export const getPaginationApi = async (page) => {
	return await axios.get(`${URL}users?page=${page}&limit=10`)
}
export const postId = async (id) => {
  return await axios.get(`${URL_ID}${id}`)
}
export const sendPostId = async (data)=>{
	return await axios.post("https://6252ef5e7f7fa1b1ddeb8f61.mockapi.io/api/v2/options/",{data})
}
export const deletePostId = async (id)=>{
	return await axios.delete(`https://6252ef5e7f7fa1b1ddeb8f61.mockapi.io/api/v2/options/${id}`)
}