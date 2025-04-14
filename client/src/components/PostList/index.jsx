import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import * as actions from "../../redux/actions"; // import các action từ redux store
import { postsState$ } from "../../redux/selectors";

const PostList = () => {
	const dispatch = useDispatch(); // sử dụng hook để lấy dispatch từ redux store
	const posts = useSelector(postsState$); // lấy state posts từ redux store

	useEffect(() => {
		dispatch(actions.getPosts.getPostsRequest()); // gọi action getPostsRequest để lấy danh sách bài viết
	}, [dispatch]);

	return (
		<Grid
			container
			spacing={2}
			alignItems="stretch">
			{posts.map((post) => (
				<Grid
					key={post._id}
					item
					xs={12}
					sm={6}>
					<Post post={post} />
				</Grid>
			))}
		</Grid>
	);
};

export default PostList;
