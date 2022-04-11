import React, {useEffect, useState} from 'react';
import {Link, Route, Switch} from "react-router-dom";
import Staff from "./Components/Filter_components/Staff";
import Provinces from "./Components/Filter_components/Provinces";
import Districts from "./Components/Filter_components/Districts";
import {Fade} from "react-reveal";
import Header from "./Components/Header";
import {Button} from "@material-ui/core";
import DownloadIcon from "@mui/icons-material/Download";
import Filters from "./Components/Filters";
import {StyledTab, StyledTabs} from "./Components/StyledTabs";
import BasicModal from "./Components/Modal";
import {useDispatch} from "react-redux";
import {api, postId} from "./api/api";
import {getUsersData} from "./Redux/action/getUsersData";
import Table from "./Components/Table";
import {postIdData} from "./Redux/action/postIdData";
import {getUserPagination} from "./Redux/action/getUserPagination";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
	const [tab,setTab]=useState(false)
	const [filter,setFilter]=useState("")
	const dispatch=useDispatch();
switch (filter) {
	case "viloyatlar": {
		postId("db2dc765-cd8d-4681-a9ea-320f148ba348")
			.then(res => {
				setPostID(true)
				dispatch(postIdData(res.data.options))
				dispatch(getUserPagination([]))
				console.log(res)
			})
	}
		break;

	case "tumanlar": {
		postId("23d486fe-bc0d-4367-848d-1cc8cf81bc75")
			.then(res => {
				setPostID(true)
				dispatch(postIdData(res.data.options))
				dispatch(getUserPagination([]))
				console.log(res.data)
			});
	}
		break;

	case "xodimlar": {
		postId("fd2286cc-d539-4b00-ae12-9289fdc73222")
			.then(res => {
				setPostID(true)
				dispatch(postIdData(res.data.options))
				dispatch(getUserPagination([]))
				console.log(res.data)
			})
	}
		break;
}	const [postID,setPostID]=useState(false)


	useEffect(()=>{
		console.log("Render")
		api().then(res => {
			dispatch(getUsersData(res.data))
			console.log("Users Data -->", res.data)
		})
	},[])

	return (
		<>
			<ToastContainer/>
			<div>

				<Fade top>
					<Header
						endAdornment ={
							[<Button   color={"primary"} className={"border-0"} ><DownloadIcon fontSize={"small"}  /></Button>,
								<Button size={"small"} color={"primary"}>Загрузить</Button>
							]
						}
						title={"Hisobotlar"}
					/>
				</Fade>
				<Fade bottom>
					<Filters
						children={
						<StyledTabs
							value={tab}
							onChange={(_, value) => setTab(value)}
							indicatorColor="primary"
							textColor="primary"
							centered={false}
							aria-label="full width tabs example"
							TabIndicatorProps={{children: <span className="w-2" />}}
						>
								<StyledTab onClick={()=>setFilter("viloyatlar")}   label={"Viloyatlar"} />
								<StyledTab onClick={()=>setFilter("tumanlar")} label={"Tumanlar"} />
								<StyledTab onClick={()=>setFilter("xodimlar")} label={"Xodimlar"} />

						</StyledTabs>}
						extra={<BasicModal/>}
					/>
				</Fade>
			</div>
			<Fade bottom>
				<Table/>
			</Fade>

		</>
	);
};

export default App;