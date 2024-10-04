import React from "react";
import { Avatar, Button, Menu, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ user, logout }) => {
  // console.log("UserData:", user);
  const navigate = useNavigate();
  return (
    <Menu>
      <Menu.Target>
        <Button
          style={{
            backgroundColor: "transparent",
           color:"black",
            borderRadius: "1rem",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            src={user.picture} // Replace this with the correct avatar URL or image
            alt={user.given_name}
            size="md"
            style={{ marginRight: "8px" }}
          />
          <Text>{user.given_name}</Text>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => navigate("./favourites", { replace: true })}>
          Favourites
        </Menu.Item>

        <Menu.Item onClick={() => navigate("./bookings", { replace: true })}>
          Bookings
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            localStorage.clear();
            logout();
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
