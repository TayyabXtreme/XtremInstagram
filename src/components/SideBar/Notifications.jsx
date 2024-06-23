import { Box, Link, Tooltip } from "@chakra-ui/react";
import { NotificationsLogo } from "../../assets/contants";
import { Link as RouterLink } from "react-router-dom";
import { ChatIcon } from "@chakra-ui/icons";
import { PiChatCircleDuotone } from "react-icons/pi";


const Notifications = () => {
	return (
		<Tooltip
			hasArrow
			label={"Notifications"}
			placement='right'
			ml={1}
			openDelay={500}
			display={{ base: "block", md: "none" }}
		>
			<Link
				display={"flex"}
				to={`/chat`}
				as={RouterLink}
				alignItems={"center"}
				gap={4}
				_hover={{ bg: "whiteAlpha.400" }}
				borderRadius={6}
				p={2}
				w={{ base: 10, md: "full" }}
				justifyContent={{ base: "center", md: "flex-start" }}
			>
				<PiChatCircleDuotone fontSize={28}/>
				<Box display={{ base: "none", md: "block" }}>Chat</Box>
			</Link>
		</Tooltip>
	);
};

export default Notifications;