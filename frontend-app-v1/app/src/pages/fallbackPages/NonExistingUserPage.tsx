type NonExistingUserPageProps = {
  username: string | undefined;
};

export default function NonExistingUserPage({
  username,
}: NonExistingUserPageProps) {
  return (
    <div id="NonExistingUserPage">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {username ? (
          <i>
            User <b>`{username}`</b> does not exist
          </i>
        ) : (
          <i>You must input a username</i>
        )}
      </p>
    </div>
  );
}
