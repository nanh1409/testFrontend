import React from "react";
import Chats from "./Chats";
import { Box, Stack, Typography } from "@mui/material";
// import Chat from "../../components/Chat/index";
import { useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import Media from "../../sections/SharedMessage";
import StarredMessages from "../../sections/StarredMessage";
import { Link, useSearchParams } from "react-router-dom";
import ChatComponent from "./Conversation";
import NoChat from "../../assets/Illustration/NoChat";

const GeneralApp = () => {
  const [searchParams] = useSearchParams();

  const theme = useTheme();

  const { sideBar, room_id, chat_type } = useSelector((state) => state.app);

  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        <Chats />
        <Box
          sx={{
            height: "100%",
            width: sideBar.open
              ? `calc(100vw - 740px )`
              : "calc(100vw - 420px )",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#FFF"
                : theme.palette.background.paper,
            borderBottom:
              searchParams.get("type") === "individual-chat" &&
              searchParams.get("id")
                ? "0px"
                : "6px solid #0162C4",
          }}
        >
          {chat_type === "individual" &&
          room_id !== null ? (
            <ChatComponent />
          ) : (
            <Stack
              spacing={2}
              sx={{ height: "100%", width: "100%" }}
              alignItems="center"
              justifyContent={"center"}
            >
              <NoChat />
              <Typography variant="subtitle2">
                Select a conversation or start a{" "}
                <Link
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                  }}
                  to="/"
                >
                  new one
                </Link>
              </Typography>
            </Stack>
          )}
        </Box>
        {sideBar.open &&
          (() => {
            switch (sideBar.type) {
              case "CONTACT":
                return <Contact />;

              case "STARRED":
                return <StarredMessages />;

              case "SHARED":
                return <Media />;

              default:
                break;
            }
          })()}
      </Stack>
    </>
  );
};

export default GeneralApp;
