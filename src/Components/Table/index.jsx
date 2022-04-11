import { useState } from "react";
import {
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table,
  withStyles,
  TableCell
} from "@material-ui/core"
import TableLoader from "../TableLoader";
import TableMessage from "../TableMessage";
import axios from "axios"
import Pagination from "../Pagination";
import {useDispatch, useSelector} from "react-redux";
import {getPaginationApi} from "../../api/api";
import {getUserPagination} from "../../Redux/action/getUserPagination";
// import { useEffect, useState } from "react"
// import { useTranslation } from "react-i18next"
// import Pagination from "../../components/Pagination"
// import axios from "../../utils/axios"
// import StatusTag from "../../components/Tag/StatusTag"
// import moment from "moment"
// import TableMessage from "../../components/TableMessage"
// import { useHistory } from "react-router"

// Style For TableRow
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#F4F6FA",
    },
    cursor: "pointer",
  },
}))(TableRow);

// Style For StyledTableCell
const StyledTableCell = withStyles(() => ({
  head: {
    color: "#1A2024",
    fontSize: 14,
    lineHeight: "24px",
    boxShadow: "inset -1px -1px 0px #E5E9EB",
    border: "1px solid #E5E9EB",
    padding: "12px 16px",
  },
  body: {
    fontSize: 14,
    color: "#1A2024",
    padding: "12px 16px",
    boxShadow: "inset -1px -1px 0px #E5E9EB",
    border: "1px solid #E5E9EB",
  },
}))(TableCell);


const MTable = ({}) => {
	const dispatch=useDispatch();
  const [loading, setLoading] = useState(true)
  const [loadingData, setLoadingData] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
	const {usersData}=useSelector(state => state)
	const {paginationData}=useSelector(state => state)
	const data =loadingData ? usersData.user : paginationData

	const paginationClick = (page) => {
		console.log(page)
		getPaginationApi(page)
			.then(res=> {
				dispatch(getUserPagination(res.data))
				setLoadingData(false);
			})
			.catch(()=>setLoading(false))
	}

  return (
    <div className="bg-white rounded-lg m-4 p-4">
      <TableContainer className="mt-4">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>{"Username"}</StyledTableCell>
              <StyledTableCell>{"Email"}</StyledTableCell>
              <StyledTableCell>{"Phone"}</StyledTableCell>
              <StyledTableCell>{"Company Name"}</StyledTableCell>
              <StyledTableCell>{"Experience"}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{item.username}</StyledTableCell>
                <StyledTableCell>{item.email}</StyledTableCell>
                <StyledTableCell>{item.phone}</StyledTableCell>
                <StyledTableCell>{item.company_name}</StyledTableCell>
                <StyledTableCell>{item.experience}</StyledTableCell>
              </StyledTableRow>
            ))}
            <TableLoader 
              columnsCount={6} // ! Number of columns
              isVisible={!loading} // ! Whether the loader is visible or not
            />
          </TableBody>
        </Table>
      </TableContainer>

      <TableMessage
        isVisible={!loading && !(data?.length > 0)} // ! Whether the message is visible or not
        text="No data found" // ! Message text
      />

      <Pagination
        currentPage={currentPage} // ! Current page default value is 1
        count={data?.count || data.length} // ! Total count of data comes from the backend
        onChange={(pageNumber) => setCurrentPage(pageNumber)} // ! Callback function to handle pagination
        title="Users count" // ! Title of the pagination
								paginationClick={paginationClick}
      />
    </div>
  )
}

export default MTable
