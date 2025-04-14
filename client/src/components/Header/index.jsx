import { Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
const Header = () => {
   const classes = useStyles(); // sử dụng hook để lấy các class đã định nghĩa trong styles.js
	return (
		<Typography
			variant="h4"
			align="center" className={classes.container}>
			Blog
		</Typography> // variant tương đương với thẻ h4
	);
};

export default Header;
