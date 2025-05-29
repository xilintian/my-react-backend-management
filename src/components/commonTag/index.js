import React, { useState } from "react";
import { Tag, Space } from "antd";
import "./index.css";
import { useDispatch } from "react-redux";
import {
  removeTag,
  clearTags,
  removeOtherTags,
  refresh,
} from "../../store/reducers/tag";
import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "antd";

const CommonTag = ({ tags }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const dropDownList = [
    {
      key: "closeCurrent",
      label: <span type="text">关闭当前</span>,
      onClick: () => {
        handleCloseTag(location.pathname, currentIndex);
      },
    },
    {
      key: "closeOther",
      label: <span type="text">关闭其他</span>,
      onClick: () => {
        dispatch(removeOtherTags(location.pathname));
      },
    },
    {
      key: "closeAll",
      label: <span type="text">关闭所有</span>,
      onClick: () => {
        dispatch(clearTags());
        navigate("/");
      },
    },
    {
      key: "refresh",
      label: <span type="text">刷新</span>,
      onClick: () => {
        dispatch(refresh());
      },
    },
  ];

  const menuProps = {
    items: dropDownList,
    onClick: (e) => {
      const clickItem = dropDownList.find((item) => item.key === e.key);
      clickItem.onClick();
    },
  };

  const handleContextMenu = (path, index, e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex(index);
  };

  const handleLinkTag = (path, e) => {
    e.stopPropagation();
    e.preventDefault();
    if (path === location.pathname) return;
    navigate(path);
  };

  const handleCloseTag = (path, index, e = null) => {
    e?.stopPropagation();
    e?.preventDefault();
    dispatch(removeTag(path));
    const nextPath =
      index === tags.length - 1 ? tags[index - 1].path : tags[index + 1].path;
    navigate(nextPath);
  };

  return (
    <Space className="common-tag" size={[0, 8]} wrap>
      {tags.map((tag, index) =>
        index === 0 ? (
          <Tag
            key={tag.path}
            className={
              tag.path === location.pathname ? "close-tag active" : "close-tag"
            }
            onClick={(e) => handleLinkTag(tag.path, e)}
          >
            {tag.label}
          </Tag>
        ) : (
          <Dropdown
            onContextMenu={(e) => handleContextMenu(tag.path, index, e)}
            key={tag.path}
            trigger={location.pathname === tag.path ? "contextMenu" : ""}
            menu={menuProps}
          >
            <Tag
              key={tag.path}
              className={
                tag.path === location.pathname
                  ? "close-tag active"
                  : "close-tag"
              }
              closable
              onClose={(e) => handleCloseTag(tag.path, index, e)}
              onClick={(e) => handleLinkTag(tag.path, e)}
            >
              {tag.label}
            </Tag>
          </Dropdown>
        )
      )}
    </Space>
  );
};

export default React.memo(CommonTag);
