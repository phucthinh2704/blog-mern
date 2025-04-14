import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions/index.js";
import * as api from "../../api/index.js"; // import api từ thư mục api

function* fetchPostsSaga() {
	// * và yield là cú pháp của generator function, hoạt động giống async/await
	try {
		const posts = yield call(api.fetchPosts);
		yield put(actions.getPosts.getPostsSuccess(posts.data)); // gọi action getPostsSuccess với post là payload
	} catch (error) {
		console.log(error);
		yield put(actions.getPosts.getPostsFailure(error)); // gọi action getPostsSuccess với post là payload
	}
}

function* createPostSaga (action) {
   try {
		const post = yield call(api.createPost, action.payload);
		yield put(actions.createPost.createPostSuccess(post.data)); 
	} catch (error) {
		console.log(error);
		yield put(actions.createPost.createPostFailure(error)); 
	}
}

function* updatePostSaga (action) {
   try {
		const updatedPost = yield call(api.updatePost, action.payload);
		yield put(actions.updatePost.updatePostSuccess(updatedPost.data)); 
	} catch (error) {
		console.log(error);
		yield put(actions.updatePost.updatePostFailure(error)); 
	}
}

function* mySaga() {
	yield takeLatest(actions.getPosts.getPostsRequest, fetchPostsSaga); 
	yield takeLatest(actions.createPost.createPostRequest, createPostSaga); 
	yield takeLatest(actions.updatePost.updatePostRequest, updatePostSaga); 
   //takeLatest là hàm chỉ nhận 1 action cuối cùng
}

// generator function ES6

export default mySaga;
