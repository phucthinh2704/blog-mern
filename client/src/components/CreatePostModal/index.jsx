import React, { useCallback, useState } from "react";
import { Form, Modal, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { modalState$ } from "../../redux/selectors";
import useStyles from "./styles";
import { createPost, hideModal } from "../../redux/actions";

function FileBase({ type, multiple, onDone }) {
	const handleFileChange = (event) => {
		const file = event.target.files[0]; // Lấy tệp tin đầu tiên

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64String = reader.result;
				onDone({ base64: base64String }); // Gửi lại chuỗi Base64
			};
			reader.readAsDataURL(file); // Đọc tệp tin dưới dạng Data URL
		}
	};

	return (
		<input
			type="file"
			accept={type}
			multiple={multiple}
			onChange={handleFileChange}
		/>
	);
}

const CreatePostModal = () => {
	const [data, setData] = useState({
		title: "",
		content: "",
		attachment: "",
	});
	const dispatch = useDispatch();
	const classes = useStyles();
	const { isShow } = useSelector(modalState$); // lấy state modal từ redux store

	const handleClose = useCallback(() => {
		setData((prev) => ({
			...prev,
			title: "",
			content: "",
			attachment: "",
		}));
		console.log(data);
		dispatch(hideModal());
	}, [dispatch, data]);

	const handleOk = useCallback(() => {
		if (!data.content || !data.title) return;
		dispatch(createPost.createPostRequest(data));
		setData((prev) => ({
			...prev,
			title: "",
			content: "",
			attachment: "",
		}));
		console.log(data);
		dispatch(hideModal());
	}, [dispatch, data]);

	return (
		<div>
			<Modal
				title="Create New Post"
				open={isShow}
				onOk={handleOk}
				onCancel={handleClose}>
				<Form layout="vertical">
					<Form.Item
						label="Title"
						name="title"
						rules={[
							{
								required: true,
								message: "Please Enter Title",
							},
						]}>
						<Input
							placeholder="Please Enter Title..."
							required
							value={data.title}
							onChange={(e) =>
								setData({ ...data, title: e.target.value })
							}
						/>
					</Form.Item>
					<Form.Item
						label="Content"
						name="content"
						rules={[
							{
								required: true,
								message: "Please Enter Content",
							},
						]}>
						<Input.TextArea
							placeholder="Please Enter Content"
							className={classes.textarea}
							value={data.content}
							onChange={(e) =>
								setData({ ...data, content: e.target.value })
							}
						/>
					</Form.Item>
					<Form.Item>
						<FileBase
							type="image/*"
							multiple={false}
							onDone={({ base64 }) =>
								setData({ ...data, attachment: base64 })
							}></FileBase>
						<img
							src={data.attachment || null}
							alt="Preview"
						/>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default CreatePostModal;
