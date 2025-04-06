export function SuspenseView(props) {
  //return "__Suspense__";
  // Show loading state while fetching
  if (!props.promise) {
    return <span>no data</span>;
  }
  // Show error if failed
  if (props.promise !== undefined && props.error) {
    //debugger;
    return <span>{props.error.toString()}</span>;
  }

  // Show loading animation while waiting
  return <img src="https://brfenergi.se/iprog/loading.gif" />;
}