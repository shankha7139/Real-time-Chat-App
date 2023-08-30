import {Box} from '@chakra-ui/react'
import { useState } from "react";
import Chatbox from "../Components/ChatBox";
import MyChats from "../Components/MyChats";
import SideDrawer from "../Components/miscelleneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
    const  {user}  =  ChatState();
    const [fetchAgain, setfetchAgain] = useState(false)
  return (
    <div style={{ width: "100%" }}>
      <SideDrawer />
      <Box display={'flex'} justifyContent={"space-between"} w={"100%"} h={"91.45vh"} p={"10px"} >
        <MyChats fetchAgain={fetchAgain}/>
        <Chatbox fetchAgain={fetchAgain} setFetchAgain={setfetchAgain} />
      </Box>  
    </div>
  );
};

export default Chatpage;
