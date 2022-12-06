import React from 'react';

import { DISCOURSE_URL } from '../constants';

const EXTERNAL_ID_LIMIT_PER_ENTRY = Math.floor(48 / 3);

export default async function DiscourseLink({ data, address }) {
  let { hostName, ownerAddress, status, blockTime, description } = data;

  // replace periods in domain
  let re = /\./gi;
  hostName = hostName.replace(re, "").substring(0, EXTERNAL_ID_LIMIT_PER_ENTRY);

  const external_id = `${hostName}${ownerAddress.substring(
    0,
    EXTERNAL_ID_LIMIT_PER_ENTRY
  )}${address.substring(0, EXTERNAL_ID_LIMIT_PER_ENTRY)}`;

  const result = await fetch(
    `${DISCOURSE_URL}/t/external_id/${external_id}.json`,
    {
      method: "GET",
    }
  );

  if (result.ok) {
    const json = await result.json();
    const link = `${process.env.DISCOURSE_URL}/t/${json?.slug}`;
    return (
      <>
        <td>
          <a href={link}>
            <p>Link</p>
          </a>
        </td>
      </>
    );
  } else {
    return (
      <>
        <td>No link found.</td>
      </>
    );
  }
}
