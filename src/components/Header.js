import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";
import { toggleDarkMode } from "../slices/themeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate()

  const { darkMode } = useSelector((state) => state.theme);

  return (
    <Menu inverted={darkMode}>
      <Menu.Item onClick={() => navigate('/')}>Cinema</Menu.Item>
      <Menu.Item title="Dark/Light Mode">
        <Icon
          name={darkMode ? "sun" : "moon"}
          onClick={() => dispatch(toggleDarkMode())}
        />
      </Menu.Item>
    </Menu>
  );
};

export default Header;
