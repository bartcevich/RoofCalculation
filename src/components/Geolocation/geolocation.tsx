import React from "react";
import { useGeolocation } from "@uidotdev/usehooks";

const GeoLocation = () => {
  const state = useGeolocation();
  //   console.log(state);
  if (state.loading) {
    return <p>loading... </p>; //(you may need to enable permissions)
  }

  if (state.error) {
    return <p>Enable access about your location</p>;
  }

  return (
    <>
      <h2>latitude: {state.latitude}</h2>
      <h2>longitude: {state.longitude}</h2>
    </>
  );
};

const MemoizedLocation = React.memo(GeoLocation);

export default MemoizedLocation;
