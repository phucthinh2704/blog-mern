import { Trash2 } from "lucide-react";

export default function DeleteButton({ onDelete }) {
	return (
		<button
			className="flex items-center justify-center h-10 w-24 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
			type="button"
			aria-label="Xóa" onClick={onDelete}>
			<Trash2 className="mr-2 h-5 w-5" />
			<span>Xóa</span>
		</button>
	);
}
