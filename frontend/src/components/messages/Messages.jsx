import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessagesSkeleton from "../skeletons/MessagesSkeleton";
import useListenMessages from "../../hooks/useListenMessages";

export default function Messages() {
	const { loading, messages } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();
	// console.log(messages.length);

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading &&
				messages.length > 0 &&
				messages?.map((mssg, key) => (
					<div ref={lastMessageRef}>
						<Message mssg={mssg} key={key} />
					</div>
				))}
			{loading && [...Array(3)].map((_, idx) => <MessagesSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
		</div>
	);
}
