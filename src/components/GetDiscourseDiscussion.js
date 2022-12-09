import React from 'react';
import { useEffect, useState } from 'react';

import { getGovernancePoll } from '../helpers/GovernancePollHelpers';

export default function DiscourseLink({ data, address }) {
  let hostName = data[0];
  let ownerAddress = data[1];

  const [discourseLink, setDiscourseLink] = useState("");

  useEffect(() => {
    async function callReturnGovernanceInfo() {
      let result = await getGovernancePoll(hostName, address, ownerAddress);
      if (result) {
        console.log("result: ", result);
        setDiscourseLink(result?.link);
      } else {
        setDiscourseLink(`${process.env.DISCOURSE_URL}`);
      }
    }
    callReturnGovernanceInfo();
  }, []);

  return (
    <>
      {discourseLink ? (
        <td>
          <a href={discourseLink}>
            <p>Link</p>
          </a>
        </td>
      ) : null}
    </>
  );
}
