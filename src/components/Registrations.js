export function RegistrationTable() {
  const { data, error, isLoading } = useContractRead({
    address: CERTDAO_ADDRESS,
    abi: certDaoABI.abi,
    functionName: "getRegistrations",
  });

  return (
    <section>
      <ul>
        <li>
          Read Data:{" "}
          <span>{isLoading ? "Loading..." : JSON.stringify(data)}</span>
        </li>
        <li>
          Error: <span>{error ? error.message : "No Error"}</span>
        </li>
      </ul>
    </section>
  );
}
