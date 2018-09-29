import React from "react";
import { format } from "../../helpers/dateFormatter";

function ChangeHistory(props) {
  if (!props.changeHistory) {
    return (
      <div>
        <h3>Change History</h3>
        <p>No change history available.</p>
      </div>
    );
  }
  return (
    <div>
      <h3>Change History</h3>
      {props.changeHistory.map(ch => {
        return (
          <p key={ch._id}>
            {ch.description} on {format(ch.updatedDate)}
          </p>
        );
      })}
    </div>
  );
}

export default ChangeHistory;
