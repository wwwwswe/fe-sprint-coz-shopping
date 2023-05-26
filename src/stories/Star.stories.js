import React from "react";
import Star from "../components/Star";
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
