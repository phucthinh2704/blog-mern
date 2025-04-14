import React, { useCallback } from "react";
import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import moment from "moment";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { deletePost, updatePost } from "../../../redux/actions";
import DeleteButton from "../../DeleteButton";

const Post = ({ post }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const onLikeBtnClick = useCallback(() => {
		dispatch(
			updatePost.updatePostRequest({
				...post,
				likeCount: post.likeCount + 1,
			})
		);
	}, [dispatch, post]);

	const onDelete = useCallback(() => {
		dispatch(deletePost.deletePostRequest({ _id: post._id }));
	}, [dispatch, post]);

	return (
		<Card>
			<CardHeader
				avatar={<Avatar>A</Avatar>}
				title={post.author}
				subheader={moment(post.updatedAt).format("HH:MM MMM DD,YYYY")}
				action={
					<div className={classes.parent}>
						<MoreVertIcon
							style={{ cursor: "pointer" }}></MoreVertIcon>
					</div>
				}
			/>
			<CardMedia
				image={post.attachment}
				title="title"
				alt="image"
				className={classes.media}
			/>
			<CardContent>
				<Typography
					variant="h5"
					color="textPrimary">
					{post.title}
				</Typography>
				<Typography
					variant="body2"
					component="p"
					color="textSecondary">
					{post.content}
				</Typography>
			</CardContent>
			<CardActions
				style={{
					display: "flex",
					justifyContent: "space-between",
					padding: 12,
				}}>
				<div style={{ display: "flex", alignItems: "center", gap: 5 }}>
					<FavoriteIcon
						onClick={onLikeBtnClick}
						color={post.likeCount ? "error" : "action"}
						style={{ cursor: "pointer" }}
					/>
					<Typography
						component="span"
						color="textSecondary">{`${post.likeCount} ${
						post.likeCount <= 1 ? "like" : "likes"
					}`}</Typography>
				</div>
				<DeleteButton onDelete={onDelete}></DeleteButton>
			</CardActions>
		</Card>
	);
};

export default Post;
