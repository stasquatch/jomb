import React from "react";
import { shallow } from "enzyme";
import ChangeHistory from "./ChangeHistory";

it("renders no change history", () => {
  const changeHistories = [];
  const changeHistory = shallow(
    <ChangeHistory changeHistory={changeHistories} />
  );
  expect(changeHistory.find("p").text()).toEqual(
    "No change history available."
  );
});

it("renders a single change history", () => {
  const changeHistories = [
    {
      _id: 1,
      detail: "detail",
      updatedDate: Date.now()
    }
  ];
  const changeHistory = shallow(
    <ChangeHistory changeHistory={changeHistories} />
  );
  expect(changeHistory.find("p").text()).toMatch("detail");
});

it("renders multiple change histories", () => {
  const changeHistories = [
    {
      _id: 1,
      detail: "first change history",
      updatedDate: Date.now()
    },
    {
      _id: 2,
      detail: "second change history",
      updatedDate: new Date(Date.now() - 100)
    }
  ];
  const changeHistory = shallow(
    <ChangeHistory changeHistory={changeHistories} />
  );
  expect(changeHistory.find("p")).toHaveLength(2);
});
