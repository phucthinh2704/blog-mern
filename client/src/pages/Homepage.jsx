import React, { useCallback } from "react";
import { Container } from "@material-ui/core";
import Header from "../components/Header";
import PostList from "../components/PostList";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { showModal } from "../redux/actions";
import CreatePostModal from "../components/CreatePostModal";

const Homepage = () => {
	const classes = useStyles(); // sử dụng hook để lấy các style từ file styles.js
	const dispatch = useDispatch(); // sử dụng hook để lấy dispatch từ redux store
	const openCreatePostModal = useCallback(() => {
		dispatch(showModal());
	}, [dispatch]); // sử dụng hook useCallback để tạo hàm mở modal tạo bài viết

	return (
		<Container maxWidth="lg">
			<Header></Header>
			<PostList></PostList>
			<CreatePostModal></CreatePostModal>
			<button
				className={`w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 cursor-pointer ${classes.fab}`}
				onClick={openCreatePostModal}>
				<span className="text-xl font-bold">+</span>
			</button>
		</Container>
	);
};

export default Homepage;
