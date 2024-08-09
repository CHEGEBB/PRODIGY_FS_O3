import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			// Replace the Render URL with the localhost address of your backend
			const socket = io("http://localhost:5000", {
				query: {
					userId: authUser._id, // Pass user ID from auth context
				},
				transports: ["websocket", "polling"], // Enable necessary transports
			});

			setSocket(socket);

			// Listen for "getOnlineUsers" event
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			// Cleanup the socket connection on component unmount
			return () => socket.close();
		} else {
			// Close the socket if the user logs out or authUser is null
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
