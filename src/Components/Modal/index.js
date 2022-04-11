import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import SearchIcon from '@mui/icons-material/Search';
import {FormGroup,FormControlLabel,Checkbox} from "@mui/material";
import {Badge} from "@mui/material";
import {Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody} from "@material-ui/core";
import * as PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {Stack} from "@mui/material";
import Select from "../Select";
import {addPushId} from "../../Redux/action/addPushId";
import {useRef, useState} from "react";
import {deletePostId, sendPostId} from "../../api/api";
import {toast} from "react-toastify";


const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	// border: '2px solid #000',
	border: "none",
	borderRadius: 2,
	boxShadow: 24,
	p: 4,
};

function MailIcon(props) {
	return null;
}

MailIcon.propTypes = {color: PropTypes.string};
export default function BasicModal() {
	const {usersData}=useSelector(state => state);
	const {addPostId}=useSelector(state => state);
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);
	const [addId,setAddId]=useState([])
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);


	const handleChange = (e) => {
		const itemIndex = addId.findIndex((item)=>item === e.target.value);
		if (itemIndex<0) {
			toast.dark("Add id !!!")
	  setAddId(prevState => ([...prevState,e.target.value]))
		}
		}
	const clearIds = () => {
		dispatch(addPushId(null));
		setAddId([])
		toast.error("Clear All id !!!")
		// deletePostId(addPostId.id)
		handleClose();
	}
	const handleClickAddId=(idS)=>{
		toast.success("Done !!!")
		dispatch(addPushId({id:usersData.user.length+2000,allId:[...idS]}));
		console.log("POST Id --->",idS)
	}
	console.log("Checked ---> ", addId)
	return (
		<div>
			<Button onClick={handleOpen} variant={"contained"} color={"primary"} size={"small"}>
				<SearchIcon fontSize={"small"}/>
				<span className={"ml-2"}>Hisobotni shakllantirish</span>
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<TableContainer component={Paper}>
						<Table sx={{minWidth: 650}} aria-label="simple table">
							<TableBody>
								<FormGroup>
									<TableRow sx={{'&:last-child , &:last-child': {border: 0}}}>
										<TableCell component="td" scope="row" size={"small"}>
											<FormControlLabel  control={<Checkbox disabled />} label="Tanlanganlar"/>
											<Badge badgeContent={`${addId.length}`} color="primary">
												<MailIcon color="action" />
											</Badge>
										</TableCell>
									</TableRow>
											{usersData.postId.map((item)=>(
														<TableRow key={item.id}  sx={{'&:last-child td, &:last-child th': {border: 0}}}>
															<TableCell  component="td" scope="row" size={"small"}>
																		<FormControlLabel onChange={handleChange}  value={item.id} control={<Checkbox />} label={item.name}/>
															</TableCell>
														</TableRow>
											))}
								</FormGroup>
							</TableBody>
						</Table>
					</TableContainer>
					<Stack direction="row" justifyContent="end" margin={"10px"} spacing={2}>
								<Button onClick={clearIds} size={"small"}  variant={"contained"} color={"secondary"}>Bekor qilish</Button>
								<Button onClick={()=> {
									handleClickAddId(addId);
									handleClose()
								}} size={"small"}  variant={"contained"} color={"primary"}>Davom etish</Button>
					</Stack>
				</Box>
			</Modal>
		</div>
	);
}
