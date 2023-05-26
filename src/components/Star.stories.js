import React from "react";
import Star from "./Star";
import starOffImg from "../img/star-off.png";
import starOnImg from "../img/star-on.png";

export default {
  title: "Example/Star",
  component: Star,
};

const Template = (args) => <Star {...args} />;

export const Off = Template.bind({});
Off.args = {
  productId: "123",
};

export const On = Template.bind({});
On.args = {
  productId: "456",
  isBookmarked: true,
};

// 이전 솔로프로젝트가 미완성이라 에러가 발생하는 것 같음