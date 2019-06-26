import React from "react";
import { format } from "../../helpers/dateFormatter";

function ChangeHistory(props) {
  if (!props.changeHistory || props.changeHistory.length === 0) {
    return (
      <div>
        <h3>Change History</h3>
        <p>No change history available.</p>
      </div>
    );
  }

  let orderedHistories = props.changeHistory.sort((a, b) => {
    return new Date(b.updatedDate) - new Date(a.updatedDate);
  });

  return (
    <div>
      <h3>Change History</h3>
      {orderedHistories.map(ch => {
        return (
          <p key={ch._id}>
            {ch.detail} on {format(ch.updatedDate)}
          </p>
        );
      })}
    </div>
  );
}

export default ChangeHistory;
