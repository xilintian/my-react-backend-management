import React from "react";
import { Tag, Space } from "antd";
import "./index.css";
import { useDispatch } from "react-redux";
import { removeTag } from "../../store/reducers/tag";
import { useLocation, useNavigate } from "react-router-dom";

const CommonTag = ({ tags }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLinkTag = (path) => {
    if (path === location.pathname) return;
    navigate(path);
  };

  const handleCloseTag = (path, index) => {
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
            onClick={() => handleLinkTag(tag.path)}
          >
            {tag.label}
          </Tag>
        ) : (
          <Tag
            key={tag.path}
            className={
              tag.path === location.pathname ? "close-tag active" : "close-tag"
            }
            closable
            onClose={() => handleCloseTag(tag.path, index)}
            onClick={() => handleLinkTag(tag.path)}
          >
            {tag.label}
          </Tag>
        )
      )}
    </Space>
  );
};

export default CommonTag;
